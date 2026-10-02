/* ---------------------------------------------------------------------------
 * assets/js/ui.js
 * Reusable presentation components shared by the homepage and the case-study
 * pages. Content is read from the data/*.js modules only — no project content
 * is duplicated inside components.
 *
 * Depends on: assets/js/icons.js, data/*.js
 * ------------------------------------------------------------------------- */
(function () {
  var PROFILE = window.PORTFOLIO_PROFILE || {};
  var CAREER = window.PORTFOLIO_CAREER || { skills: [], experience: [], education: [], certifications: [] };
  var PROJECTS = (window.PORTFOLIO_PROJECTS || []).slice().sort(function (a, b) { return a.order - b.order; });

  /* ------------------------------------------------------------- helpers -- */
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c];
    });
  }
  function safeUrl(url) {
    if (!url) return null;
    var v = String(url).trim();
    if (/^(https?:|mailto:)/i.test(v)) return v;
    if (v.charAt(0) === '#') return v;
    return null;
  }
  function ico(name, size) { return window.icon ? window.icon(name, size) : ''; }

  /* External (or internal) action button. Renders a disabled state instead of
   * a dead link when a URL has not been supplied. */
  function action(url, label, iconName, variant, extraClass) {
    var href = safeUrl(url);
    var cls = 'button ' + (variant || 'button-secondary') + (extraClass ? ' ' + extraClass : '');
    if (!href) {
      return '<span class="' + cls + '" aria-disabled="true" title="Not available yet">' +
        ico(iconName, 16) + '<span>' + esc(label) + '</span></span>';
    }
    var external = /^https?:/i.test(href);
    return '<a class="' + cls + '" href="' + esc(href) + '"' +
      (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
      ico(iconName, 16) + '<span>' + esc(label) + '</span></a>';
  }

  function tagList(tags, cls) {
    return (tags || []).map(function (t) {
      return '<span class="tag ' + (cls || '') + '">' + esc(t) + '</span>';
    }).join('');
  }

  function bulletList(items, modifier) {
    return '<ul class="bullet-list ' + (modifier || '') + '">' + (items || []).map(function (i) {
      return '<li>' + esc(i) + '</li>';
    }).join('') + '</ul>';
  }

  function codeBlock(label, code, variant) {
    if (!code) return '';
    return '<div class="code-block ' + (variant || '') + '">' +
      (label ? '<div class="code-label"><span>' + esc(label) + '</span></div>' : '') +
      '<pre>' + esc(code) + '</pre></div>';
  }

  /* ------------------------------------------------------------ section --- */
  function sectionHead(num, title, note, extra) {
    return '<div class="section-head"><div>' +
      (num ? '<p class="eyebrow"><span class="pulse"></span>' + esc(num) + '</p>' : '') +
      '<h2 class="section-title">' + esc(title) + '</h2></div>' +
      (note ? '<p class="section-note">' + esc(note) + '</p>' : '') +
      (extra || '') + '</div>';
  }

  function statusPill(project) {
    var tone = project.statusTone === 'live' ? '' : (project.statusTone === 'planned' ? ' is-planned' : ' is-neutral');
    return '<span class="status-pill' + tone + '"><span class="dot"></span>' + esc(project.statusLabel) + '</span>';
  }

  /* ------------------------------------------------------------- metrics -- */
  function metricStrip(metrics) {
    if (!metrics || !metrics.length) return '';
    return '<div class="metric-strip">' + metrics.map(function (m) {
      return '<div class="metric"><b>' + esc(m.value) + '</b><span>' + esc(m.label) + '</span>' +
        (m.note ? '<small>' + esc(m.note) + '</small>' : '') + '</div>';
    }).join('') + '</div>';
  }

  /* -------------------------------------------------------- project card -- */
  function projectCard(project) {
    return '<article class="project" data-category="' + esc((project.categories || []).join(' ')) + '">' +
      '<div class="project-thumb">' +
        '<img src="' + esc(project.thumbnail) + '" alt="' + esc(project.thumbnailAlt || project.name) + '" loading="lazy" decoding="async">' +
        (project.flagship ? '<span class="flagship-flag">Flagship project</span>' : '') +
      '</div>' +
      '<div class="project-body">' +
        '<div class="project-topline">' +
          '<span class="micro-label">' + esc(project.categoryLabel) + '</span>' +
          statusPill(project) +
        '</div>' +
        '<h3>' + esc(project.name) + '</h3>' +
        '<p class="project-tagline">' + esc(project.tagline) + '</p>' +
        '<p class="desc">' + esc(project.shortDescription) + '</p>' +
        '<div class="tags">' + tagList(project.techTags, project.accent === 'secondary' ? 'green' : 'accent') + '</div>' +
        '<div class="project-actions">' +
          action(project.live, 'Live site', 'rocket', 'button-primary') +
          action(project.github, 'GitHub', 'github', 'button-secondary') +
          '<a class="button button-secondary" href="project.html?slug=' + encodeURIComponent(project.slug) + '">' +
            ico('file-text', 16) + '<span>Case study</span></a>' +
        '</div>' +
      '</div></article>';
  }

  /* -------------------------------------------------------------- skills -- */
  function skillCard(category) {
    var ctx = CAREER.skillContexts || {};
    var items = (category.items || []).map(function (item) {
      var context = ctx[item.context] || { label: item.context, tone: 'neutral' };
      return '<div class="skill-item"><span class="name">' + esc(item.name) + '</span>' +
        '<span class="context-chip ' + esc(context.tone) + '" title="' + esc(context.label) + '">' +
        esc(context.label) + '</span></div>';
    }).join('');
    return '<div class="skill-card"><header>' + ico(category.icon, 16) +
      '<h3>' + esc(category.category) + '</h3></header>' +
      '<div class="skill-items">' + items + '</div></div>';
  }

  function skillLegend() {
    var ctx = CAREER.skillContexts || {};
    return '<div class="legend">' + Object.keys(ctx).map(function (key) {
      return '<span><i class="' + esc(ctx[key].tone) + '"></i>' + esc(ctx[key].label) + '</span>';
    }).join('') + '</div>';
  }

  /* ---------------------------------------------------------- experience -- */
  function experienceItem(exp, open) {
    var meta = '<div class="role-meta">' +
      '<span class="tag accent">' + esc(exp.designation) + '</span>' +
      (exp.domain ? '<span class="tag">' + esc(exp.domain) + '</span>' : '') +
      (exp.client ? '<span class="tag">Client: ' + esc(exp.client) + '</span>' : '') + '</div>';
    var stack = exp.stack && exp.stack.length
      ? '<div class="role-meta">' + tagList(exp.stack) + '</div>' : '';
    return '<div class="role">' +
      '<button class="role-toggle" aria-expanded="' + (open ? 'true' : 'false') + '">' +
        '<span class="role-date">' + esc(exp.duration) + '</span>' +
        '<span><span class="role-title">' + esc(exp.designation) + '</span>' +
        '<span class="role-company">' + esc(exp.company) + (exp.client ? ' · ' + esc(exp.client) : '') + '</span></span>' +
        ico('chevron-down', 17) +
      '</button>' +
      '<div class="role-detail' + (open ? ' open' : '') + '">' +
        '<p>' + esc(exp.summary) + '</p>' + meta +
        '<div class="micro-label" style="margin-bottom:8px">Areas of work</div>' +
        bulletList(exp.responsibilities) + stack +
      '</div></div>';
  }

  /* ---------------------------------------------------------- education -- */
  function educationCard(edu) {
    return '<div class="edu-card">' +
      '<span class="edu-icon">' + ico('graduation-cap', 18) + '</span>' +
      '<h3>' + esc(edu.degree) + '</h3>' +
      (edu.institution ? '<div class="edu-inst">' + esc(edu.institution) + '</div>' : '') +
      (edu.branch ? '<p>' + esc(edu.branch) + '</p>' : '') +
      (edu.institutionNote && !edu.institution ? '<p>' + esc(edu.institutionNote) + '</p>' : '') +
      '<div class="edu-meta">' +
        '<span class="tag ' + (edu.status === 'ongoing' ? 'accent' : 'green') + '">' +
          esc(edu.status === 'ongoing' ? 'In progress' : 'Completed') + '</span>' +
        '<span class="tag">' + esc(edu.graduationYear) + '</span>' +
      '</div></div>';
  }

  /* ----------------------------------------------------- certifications --- */
  function certificationSection(certs) {
    if (certs && certs.length) {
      return '<div class="grid three">' + certs.map(function (c) {
        return '<div class="card"><h3>' + esc(c.name) + '</h3>' +
          '<p>' + esc(c.issuer) + (c.date ? ' · ' + esc(c.date) : '') + '</p>' +
          (c.url ? '<div style="margin-top:12px">' + action(c.url, 'View certificate', 'external-link', 'button-secondary') + '</div>' : '') +
          '</div>';
      }).join('') + '</div>';
    }
    return '<div class="cert-empty"><strong>No certifications listed yet</strong>' +
      'This section is only populated from verified certificate data. Add entries as ' +
      '<span class="mono">{ name, issuer, date, url }</span> in ' +
      '<span class="mono">data/career.js</span> and they will render here automatically. ' +
      'Nothing is invented or placeholder-linked.</div>';
  }

  /* ---------------------------------------------------------------- nav --- */
  function navLinks(primary) {
    return (PROFILE.nav || []).map(function (item) {
      var href = primary ? 'index.html' + item.href : item.href;
      return '<a href="' + esc(href) + '">' + esc(item.label) + '</a>';
    }).join('');
  }

  /* ------------------------------------------------------------- reveal --- */
  function observeReveal() {
    var nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  window.UI = {
    esc: esc,
    safeUrl: safeUrl,
    action: action,
    icon: ico,
    tagList: tagList,
    bulletList: bulletList,
    codeBlock: codeBlock,
    sectionHead: sectionHead,
    statusPill: statusPill,
    metricStrip: metricStrip,
    projectCard: projectCard,
    skillCard: skillCard,
    skillLegend: skillLegend,
    experienceItem: experienceItem,
    educationCard: educationCard,
    certificationSection: certificationSection,
    navLinks: navLinks,
    observeReveal: observeReveal,
    data: { profile: PROFILE, career: CAREER, projects: PROJECTS }
  };
})();