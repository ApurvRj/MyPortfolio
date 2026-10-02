/* ---------------------------------------------------------------------------
 * assets/js/case-study.js
 * Renders a full engineering case study from a single project record in
 * data/*.js. Each section is chosen by `kind`, so both projects share the same
 * components while showing their own (different) set of sections.
 *
 * Depends on: assets/js/icons.js, data/*.js, assets/js/ui.js
 * ------------------------------------------------------------------------- */
(function () {
  var UI = window.UI;
  if (!UI) return;
  var P = UI.data.profile;
  var ALL = UI.data.projects;

  function esc(v) { return UI.esc(v); }
  function ico(n, s) { return UI.icon(n, s); }

  var params = new URLSearchParams(window.location.search);
  var slug = params.get('slug');
  var index = ALL.map(function (p) { return p.slug; }).indexOf(slug);
  if (index === -1) index = 0;
  var project = ALL[index];
  var next = ALL[(index + 1) % ALL.length];
  var app = document.getElementById('case-app');

  document.title = project.name + ' — Case study | ' + P.name;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', project.name + ': ' + project.shortDescription);

  /* ----------------------------------------------------------- fragments -- */
  function section(entry, body, planned) {
    return '<section class="case-section' + (planned ? ' is-planned' : '') + '" id="' + esc(entry.id) + '">' +
      '<div class="case-section-head"><div>' +
        '<span class="case-num">' + esc(entry.num) + ' /</span>' +
        '<h2>' + esc(entry.heading || entry.label) + '</h2>' +
      '</div>' + (entry.badge || '') + '</div>' + body + '</section>';
  }

  function subGrid(items, twoCol) {
    return '<div class="grid ' + (twoCol ? 'two' : 'three') + '">' + items.join('') + '</div>';
  }

  function subCard(title, body, tag) {
    return '<div class="sub-card">' + (tag ? '<span class="node-tag">' + esc(tag) + '</span>' : '') +
      (title ? '<h3>' + esc(title) + '</h3>' : '') + body + '</div>';
  }

  function diagramBlock(diagram) {
    if (!diagram) return '';
    return '<div class="diagram-actions">' +
        '<a class="button button-secondary" href="' + esc(diagram.src) + '" target="_blank" rel="noopener noreferrer">' +
          ico('external-link', 16) + '<span>Open diagram full size</span></a>' +
      '</div>' +
      '<div class="diagram-frame"><img src="' + esc(diagram.src) + '" alt="' + esc(diagram.alt) + '" loading="lazy" decoding="async"></div>' +
      (diagram.caption ? '<p class="diagram-caption">' + esc(diagram.caption) + '</p>' : '');
  }

  /* ------------------------------------------------------------- overview -- */
  function renderOverview(entry) {
    var o = project.overview || {};
    var links = '<div class="action-row">' +
      UI.action(project.live, 'Live website', 'rocket', 'button-primary') +
      UI.action(project.github, 'GitHub repository', 'github', 'button-secondary') + '</div>';

    var body =
      '<p class="lede">' + esc(o.introduction) + '</p>' +
      '<div style="margin:20px 0">' + links + '</div>' +
      subGrid([
        subCard('Problem statement', '<p>' + esc(o.problem) + '</p>'),
        subCard('Objectives', UI.bulletList(o.objectives, 'is-plain')),
        subCard('Target users', UI.bulletList(o.users)),
        subCard('Solution overview', '<p>' + esc(o.solution) + '</p>')
      ], true);
    return section(entry, body);
  }

  /* ------------------------------------------------------------- features -- */
  function renderFeatures(entry) {
    var features = project.features || [];
    if (!features.length) return '';
    var body = '<p style="margin-bottom:16px">Expand an item to read the implementation detail and the relevant route or pipeline.</p>';
    body += '<div class="grid two feature-grid">' + features.map(function (f, i) {
      return '<div class="feature-col">' +
        '<details class="feature-card"' + (i === 0 ? ' open' : '') + '>' +
        '<summary><span class="f-index">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="f-title">' + esc(f.title) + '</span>' + ico('chevron-down', 17) + '</summary>' +
        '<div class="f-body"><p>' + esc(f.detail) + '</p>' +
        UI.codeBlock(f.codeLabel, f.code, 'is-primary') + '</div></details>' +
      '</div>';
    }).join('') + '</div>';
    body += '<div class="callout" style="margin-top:16px"><strong>On screenshots</strong>' +
      '<p>Feature screenshots for this deployment have not been captured for the portfolio yet, so the ' +
      'documentation relies on the implemented routes, data flow and code paths listed above. ' +
      'No placeholder or stock imagery is used to imply otherwise.</p></div>';
    return section(entry, body);
  }

  /* ---------------------------------------------------------------- stack -- */
  function renderStack(entry) {
    var stack = project.techStack || [];
    if (!stack.length) return '';
    var body = '<div class="grid three">' + stack.map(function (group) {
      return '<div class="stack-category"><h3>' + esc(group.group) + '</h3><ul>' +
        group.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
        '</ul></div>';
    }).join('') + '</div>';
    return section(entry, body);
  }

  /* --------------------------------------------------------- architecture -- */
  function renderArchitecture(entry) {
    var a = project.architecture || {};
    var body = a.summary ? '<div class="arch-summary"><p class="lede">' + esc(a.summary) + '</p></div>' : '';
    body += diagramBlock(a.diagram);
    body += '<div class="grid two" style="margin-top:16px">' + (a.layers || []).map(function (layer) {
      return '<div class="arch-item"><header><h3>' + esc(layer.title) + '</h3>' +
        '<span class="node-tag" style="margin:0">' + esc(layer.node) + '</span></header>' +
        '<p>' + esc(layer.detail) + '</p></div>';
    }).join('') + '</div>';
    if (a.notes && a.notes.length) {
      body += '<div class="callout" style="margin-top:16px"><strong>Architecture notes</strong>' +
        UI.bulletList(a.notes, 'is-plain') + '</div>';
    }
    return section(entry, body);
  }

  /* ------------------------------------------------------------- workflow -- */
  function renderWorkflow(entry) {
    var wf = (project.workflows || {})[entry.id];
    if (!wf) return '';
    entry.heading = entry.heading || wf.title;
    var steps = wf.steps || [];
    var groups = wf.groups || [];
    var body = wf.subtitle ? '<p class="lede" style="margin-bottom:18px">' + esc(wf.subtitle) + '</p>' : '';

    function stepHtml(step, i) {
      return '<div class="flow-step">' +
        '<div class="rail"><span class="bubble' + (i % 3 === 2 ? ' is-alt' : '') + '">' +
          String(i + 1).padStart(2, '0') + '</span><span class="connector"></span></div>' +
        '<div class="content"><strong>' + esc(step.title) + '</strong><p>' + esc(step.detail) + '</p></div></div>';
    }

    var html = '';
    var cursor = 0;
    groups.forEach(function (group) {
      for (var j = cursor; j < group.from; j += 1) html += stepHtml(steps[j], j);
      html += '<div class="flow-group-label">' + esc(group.label) + '</div>';
      for (var k = group.from; k <= group.to; k += 1) html += stepHtml(steps[k], k);
      cursor = group.to + 1;
    });
    for (var m = cursor; m < steps.length; m += 1) html += stepHtml(steps[m], m);
    body += '<div class="flow">' + html + '</div>';
    if (wf.note) body += '<div class="callout" style="margin-top:16px"><strong>Note</strong><p>' + esc(wf.note) + '</p></div>';
    return section(entry, body);
  }

  /* ------------------------------------------------------------- database -- */
  function renderDatabase(entry) {
    var d = project.database || {};
    var body = d.summary ? '<p class="lede" style="margin-bottom:16px">' + esc(d.summary) + '</p>' : '';
    if (d.tables && d.tables.length) {
      body += '<div class="grid two">' + d.tables.map(function (t) {
        return '<div class="table-card"><header><strong>' + esc(t.name) + '</strong>' +
          '<span>' + esc(t.key) + '</span></header>' +
          '<div class="fields">' + (t.fields || []).map(function (f) {
            return '<span class="field">' + esc(f) + '</span>';
          }).join('') + '</div><p>' + esc(t.note) + '</p></div>';
      }).join('') + '</div>';
    }
    if (d.relationships && d.relationships.length) {
      body += '<div style="margin-top:18px"><p class="micro-label" style="margin-bottom:12px">Relationships</p>' +
        UI.bulletList(d.relationships, 'is-plain') + '</div>';
    }
    if (d.rpc) {
      body += '<div class="sub-card" style="margin-top:18px"><span class="node-tag">Transactional RPC</span>' +
        '<h3>' + esc(d.rpc.name) + '</h3><p>' + esc(d.rpc.note) + '</p>' +
        UI.bulletList(d.rpc.steps) + '</div>';
    }
    if (d.triggers && d.triggers.length) {
      body += '<div class="grid two" style="margin-top:18px">' + d.triggers.map(function (t) {
        return subCard(t.name, '<p>' + esc(t.detail) + '</p>', 'Trigger');
      }).join('') + '</div>';
    }
    if (d.vector) {
      body += '<div style="margin-top:18px"><p class="micro-label" style="margin-bottom:10px">Vector storage</p>' +
        UI.codeBlock('extension', d.vector.extension, 'is-primary') +
        UI.codeBlock('documents table', d.vector.table, 'is-primary') +
        UI.codeBlock('match_documents()', d.vector.fn, 'is-tertiary') + '</div>';
    }
    if (d.interactions && d.interactions.length) {
      body += '<div style="margin-top:18px"><p class="micro-label" style="margin-bottom:12px">Database interactions</p>' +
        UI.bulletList(d.interactions) + '</div>';
    }
    return section(entry, body);
  }

  /* ------------------------------------------------------------- security -- */
  function renderSecurity(entry) {
    var s = project.security || {};
    var body = s.summary ? '<p class="lede" style="margin-bottom:16px">' + esc(s.summary) + '</p>' : '';
    body += '<div class="grid two">' + (s.items || s.implemented || []).map(function (item) {
      return subCard(item.title, '<p>' + esc(item.detail) + '</p>', 'Implemented');
    }).join('') + '</div>';
    if (s.hardening && s.hardening.length) {
      body += '<div class="callout is-warn" style="margin-top:18px"><strong>Pending hardening — not implemented</strong>' +
        UI.bulletList(s.hardening, 'is-warn') + '</div>';
    }
    return section(entry, body);
  }

  /* ----------------------------------------------------------- deployment -- */
  function renderDeployment(entry) {
    var d = project.deployment || {};
    var body = d.summary ? '<p class="lede" style="margin-bottom:16px">' + esc(d.summary) + '</p>' : '';
    body += '<div class="grid two">' + (d.items || []).map(function (item) {
      return subCard(item.title, '<p>' + esc(item.detail) + '</p>');
    }).join('') + '</div>';
    return section(entry, body);
  }

  /* ----------------------------------------------------------- challenges -- */
  function renderChallenges(entry) {
    var body = '<p style="margin-bottom:16px">Each item below is drawn from the implementation or the project documentation. ' +
      'No challenge or performance claim is invented for presentation purposes.</p>';
    body += '<div class="grid two">' + (project.challenges || []).map(function (c) {
      return '<div class="challenge-card">' +
        (c.area ? '<span class="challenge-area">' + esc(c.area) + '</span>' : '') +
        '<h3>' + esc(c.issue) + '</h3>' +
        '<p><b style="color:var(--tertiary)">Challenge:</b> ' + esc(c.challenge) + '</p>' +
            '<div class="solution-line"><b>Solution</b><span>' + esc(c.solution) + '</span></div></div>';
    }).join('') + '</div>';
    return section(entry, body);
  }

  /* ------------------------------------------------------------- future --- */
  function renderFuture(entry) {
    var f = project.future || {};
    entry.heading = entry.heading || 'Future scope';
    entry.badge = '<span class="status-pill is-planned"><span class="dot"></span>Planned &mdash; not implemented</span>';
    var body = '<div class="callout" style="margin-bottom:18px"><strong>Read this first</strong>' +
      '<p>' + esc(f.intro) + '</p></div>';

    body += '<div class="grid two">' +
      '<div class="sub-card"><span class="node-tag">Working today</span><h3>Implemented</h3>' +
        UI.bulletList(f.implementedToday, 'is-plain') + '</div>' +
      '<div class="sub-card"><span class="node-tag">Not implemented</span><h3>Planned work</h3>' +
        UI.bulletList(
          (f.notImplemented || []).map(function (n) { return n.stage + ': ' + n.planned; })
            .concat(f.hardeningPending || [])
            .concat(f.recommendationSystem ? ['Recommendation system: product-based first, then behaviour-based, then personalisation'] : []),
          'is-warn'
        ) + '</div></div>';

    if (f.notImplemented && f.notImplemented.length) {
      body += '<div style="margin-top:20px"><p class="micro-label" style="margin-bottom:12px">' +
        'Stage-by-stage: planned versus today</p><div class="table-scroll"><table class="data-table">' +
        '<thead><tr><th>Stage</th><th>Planned</th><th>Today in the repository</th></tr></thead><tbody>' +
        f.notImplemented.map(function (n) {
          return '<tr><td class="cell-strong">' + esc(n.stage) + '</td><td>' + esc(n.planned) + '</td><td>' + esc(n.today) + '</td></tr>';
        }).join('') + '</tbody></table></div></div>';
    }

    if (f.recommendationSystem) {
      var r = f.recommendationSystem;
      body += '<div style="margin-top:22px"><p class="micro-label" style="margin-bottom:10px">' + esc(r.title) + '</p>' +
        '<p style="margin-bottom:14px">' + esc(r.strategy) + '</p>';
      body += '<div class="table-scroll"><table class="data-table"><thead><tr>' +
        '<th>Component</th><th>Already in Sūtra Atelier</th><th>To add</th></tr></thead><tbody>' +
        (r.alreadyAvailable || []).map(function (a) {
          return '<tr><td class="cell-strong">' + esc(a.component) + '</td><td>' + esc(a.have) + '</td><td>' + esc(a.add) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      body += '<div style="margin-top:16px" class="table-scroll"><table class="data-table"><thead><tr>' +
        '<th>Placement</th><th>Shopper sees</th><th>Data needed</th><th>Phase</th></tr></thead><tbody>' +
        (r.placements || []).map(function (p) {
          return '<tr><td class="cell-strong">' + esc(p.page) + '</td><td>' + esc(p.shows) + '</td><td>' + esc(p.data) + '</td><td>' + esc(p.phase) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      body += '<div class="sub-card" style="margin-top:16px"><span class="node-tag">How it works</span>' +
        UI.bulletList(r.howItWorks) + '</div>';
      if (r.constraints && r.constraints.length) {
        body += '<div class="callout is-warn" style="margin-top:14px"><strong>Hard constraints</strong>' +
          UI.bulletList(r.constraints, 'is-warn') + '</div>';
      }
      body += '</div>';
    }

    if (f.risks && f.risks.length) {
      body += '<div style="margin-top:22px"><p class="micro-label" style="margin-bottom:12px">Risks and open decisions</p>' +
        '<div class="grid two">' + f.risks.map(function (r) {
          return subCard(r.risk, '<p>' + esc(r.detail) + '</p>', 'Open question');
        }).join('') + '</div></div>';
    }
    return section(entry, body, true);
  }

  /* ----------------------------------------------------------- proposed --- */
  function renderProposed(entry) {
    var p = project.future && project.future.proposedArchitecture;
    if (!p) return '';
    entry.heading = entry.heading || 'Proposed future architecture';
    var stages = p.stages || p.components || [];
    entry.badge = '<span class="status-pill is-planned"><span class="dot"></span>Proposed</span>';
    var body = '<div class="callout" style="margin-bottom:18px"><strong>Proposed — no part of this runs today</strong>' +
      '<p>' + esc(p.summary) + '</p></div>';
    body += '<div class="grid two">' + stages.map(function (s) {
      return '<div class="sub-card"><span class="node-tag">' + esc(s.n) + '</span>' +
        '<h3>' + esc(s.title) + '</h3><p>' + esc(s.detail) + '</p></div>';
    }).join('') + '</div>';
    body += '<div style="margin-top:16px">' + diagramBlock(p.diagram) + '</div>';
    if (p.openQuestions && p.openQuestions.length) {
      body += '<div class="callout" style="margin-top:16px"><strong>Open questions and risks</strong>' +
        UI.bulletList(p.openQuestions) + '</div>';
    }
    if (p.boundaries && p.boundaries.length) {
      body += '<div class="callout" style="margin-top:16px"><strong>Boundaries and non-goals</strong>' +
        UI.bulletList(p.boundaries) + '</div>';
    }
    return section(entry, body, true);
  }

  /* ------------------------------------------------------------ roadmap --- */
  function renderRoadmap(entry) {
    var plan = (project.future && project.future.roadmap) || [];
    if (!plan.length) return '';
    entry.heading = entry.heading || 'Roadmap';
    var body = '<p style="margin-bottom:16px">A suggested build order: prove the reliable core first, then add automation only once the core works.</p>' +
      '<div class="roadmap">' + plan.map(function (r) {
        return '<div class="roadmap-item"><b>' + esc(r.phase) + '</b>' +
          '<div><strong>' + esc(r.title) + '</strong><p>' + esc(r.detail) + '</p></div></div>';
      }).join('') + '</div>';
    return section(entry, body, true);
  }

  /* ------------------------------------------------------------ assemble -- */
  var RENDERERS = {
    overview: renderOverview,
    features: renderFeatures,
    stack: renderStack,
    architecture: renderArchitecture,
    workflow: renderWorkflow,
    database: renderDatabase,
    security: renderSecurity,
    deployment: renderDeployment,
    challenges: renderChallenges,
    future: renderFuture,
    proposed: renderProposed,
    roadmap: renderRoadmap
  };

  function renderHero() {
    return '<div class="case-hero' + (project.accent === 'secondary' ? ' is-secondary' : '') + '">' +
      '<div class="case-hero-inner"><div>' +
        UI.statusPill(project) +
        '<h1>' + esc(project.name) + '</h1>' +
        '<p class="micro-label" style="margin-bottom:10px">' + esc(project.categoryLabel) + '</p>' +
        '<p class="case-tagline">' + esc(project.tagline) + '</p>' +
        '<p class="case-lede">' + esc(project.detailedDescription) + '</p>' +
        '<div class="case-chip-row">' + UI.tagList(project.techTags, project.accent === 'secondary' ? 'green' : 'accent') + '</div>' +
        '<div class="action-row">' +
          UI.action(project.live, 'Visit live website', 'rocket', 'button-primary') +
          UI.action(project.github, 'View repository', 'github', 'button-secondary') +
        '</div>' +
      '</div><div class="case-thumb">' +
        '<img src="' + esc(project.thumbnail) + '" alt="' + esc(project.thumbnailAlt || project.name) + '" decoding="async"></div>' +
      '</div></div>';
  }

  function renderVerification() {
    var v = project.verification;
    if (!v) return '';
    return '<div class="case-section" style="border-color:rgba(255,180,171,.28)">' +
      '<div class="case-section-head"><div><span class="case-num">—</span>' +
      '<h2>' + esc(v.heading) + '</h2></div>' +
      '<span class="status-pill is-planned"><span class="dot"></span>Evidence-based</span></div>' +
      '<div class="callout is-warn" style="margin-bottom:16px"><strong>Scope of these claims</strong>' +
      '<p>' + esc(v.note) + '</p></div>' +
      '<div class="grid two">' +
        '<div class="sub-card"><span class="node-tag">Documented and implemented</span><h3>Verified</h3>' +
          UI.bulletList(v.verified, 'is-plain') + '</div>' +
        '<div class="sub-card"><span class="node-tag">Requires configuration or still pending</span><h3>Not verified live</h3>' +
          UI.bulletList(v.pending, 'is-warn') + '</div>' +
      '</div></div>';
  }

  function renderToc() {
    var items = (project.sections || []).filter(function (e) { return RENDERERS[e.kind]; });
    if (items.length < 4) return '';
    return '<nav class="case-toc" aria-label="Case study sections"><span class="micro-label">Jump to</span>' +
      items.map(function (e) {
        var wf = (project.workflows || {})[e.id];
        var label = e.label || e.heading || (wf && wf.title) || e.id;
        return '<a class="tag" href="#' + esc(e.id) + '">' + esc(label) + '</a>';
      }).join('') + '</nav>';
  }

  function renderFooterNav() {
    return '<div class="case-footer-nav">' +
      '<a class="case-next" href="index.html#work"><span>Back</span><strong>All featured projects</strong></a>' +
      '<a class="case-next" href="project.html?slug=' + encodeURIComponent(next.slug) + '">' +
        '<span>Next case study</span><strong>' + esc(next.name) + ' &rarr;</strong></a>' +
      '</div>';
  }

  /* --------------------------------------------------------- page chrome -- */
  var headerName = document.getElementById('case-project-name');
  if (headerName) headerName.textContent = project.name;
  var headerMeta = document.getElementById('case-project-meta');
  if (headerMeta) headerMeta.textContent = project.categoryLabel + ' · ' + project.statusLabel;
  var headerActions = document.getElementById('case-header-actions');
  if (headerActions) {
    headerActions.innerHTML =
      UI.action(project.live, 'Live', 'rocket', 'button-primary') +
      UI.action(project.github, 'Code', 'github', 'button-secondary');
  }
  var footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = '<span>' + esc(P.name.toUpperCase()) + ' / ' + esc(P.title.toUpperCase()) + '</span>' +
      '<span><a href="index.html#work">All projects</a> · ' + esc(P.footerNote) + '</span>';
  }

  var out = renderHero() + renderVerification() + renderToc();
  (project.sections || []).forEach(function (entry) {
    var renderer = RENDERERS[entry.kind];
    if (!renderer) return;
    var block = renderer(entry);
    if (block) out += block;
  });
  out += renderFooterNav();

  if (app) app.innerHTML = out;
  if (window.UI && window.UI.observeReveal) window.UI.observeReveal();
})();
