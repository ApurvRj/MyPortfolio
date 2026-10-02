/* ---------------------------------------------------------------------------
 * tools/validate-data.js
 * Structural validation of data/*.js against the exact contract consumed by
 * assets/js/case-study.js and assets/js/home.js. Run:  node tools/validate-data.js
 * Exits non-zero when any required field is missing or a referenced file
 * (thumbnail / diagram) does not exist on disk.
 * ------------------------------------------------------------------------- */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
function need(cond, msg) { if (!cond) fail(msg); }
function needStr(v, msg) { need(typeof v === 'string' && v.trim().length > 0, msg); }
function needArr(v, msg) { need(Array.isArray(v) && v.length > 0, msg); }
function needFile(rel, msg) {
  if (!rel) { fail(msg + ' (missing path)'); return; }
  if (!fs.existsSync(path.join(root, rel))) fail(msg + ' -> ' + rel + ' not found');
}

/* ------------------------------------------------------------- load data -- */
const sandbox = { window: {} };
vm.createContext(sandbox);
['data/profile.js', 'data/career.js', 'data/project-karmavriti.js',
 'data/project-sutra.js', 'data/projects.js'].forEach(function (f) {
  try {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
  } catch (e) {
    fail('Exception while loading ' + f + ': ' + e.message);
  }
});
const W = sandbox.window;

/* -------------------------------------------------------------- profile --- */
const PROFILE = W.PORTFOLIO_PROFILE;
need(PROFILE, 'window.PORTFOLIO_PROFILE is missing (data/profile.js)');
if (PROFILE) {
  needStr(PROFILE.name, 'profile.name');
  needStr(PROFILE.title, 'profile.title (used in footer, uppercased)');
  needStr(PROFILE.footerNote, 'profile.footerNote (used in footer)');
  needStr(PROFILE.email, 'profile.email');
  need(PROFILE.links && PROFILE.links.email, 'profile.links.email (contact link)');
  need(PROFILE.links && PROFILE.links.github, 'profile.links.github');
  need(PROFILE.links && PROFILE.links.linkedin, 'profile.links.linkedin');
  needArr(PROFILE.nav, 'profile.nav[] (header navigation)');
  PROFILE.nav.forEach(function (n, i) {
    needStr(n.label, 'profile.nav[' + i + '].label');
    needStr(n.href, 'profile.nav[' + i + '].href');
  });
}

/* -------------------------------------------------------------- career ---- */
const CAREER = W.PORTFOLIO_CAREER;
need(CAREER, 'window.PORTFOLIO_CAREER is missing (data/career.js)');
if (CAREER) {
  need(CAREER.skillContexts && Object.keys(CAREER.skillContexts).length,
    'career.skillContexts (skills legend + card context tones)');
  ['skills', 'experience', 'education'].forEach(function (k) {
    warn('career.' + k + ': ' + (Array.isArray(CAREER[k]) ? CAREER[k].length + ' entries' : 'MISSING'));
  });
  if (!Array.isArray(CAREER.certifications)) {
    warn('career.certifications missing — renderer shows the honest empty-state notice instead');
  }
}

/* ------------------------------------------------------------- projects --- */
const RENDERER_KINDS = ['overview', 'features', 'stack', 'architecture', 'workflow',
  'database', 'security', 'deployment', 'challenges', 'future', 'proposed', 'roadmap'];
const PROJECTS = W.PORTFOLIO_PROJECTS;
need(Array.isArray(PROJECTS) && PROJECTS.length === 2,
  'window.PORTFOLIO_PROJECTS should contain 2 projects');

(PROJECTS || []).forEach(function (project) {
  const id = project.slug || project.name || '<unknown>';
  const at = function (field) { return id + ': ' + field; };

  /* top-level fields used by hero / header / hero actions */
  needStr(project.slug, at('slug'));
  needStr(project.name, at('name'));
  needStr(project.shortDescription, at('shortDescription (meta description)'));
  needStr(project.detailedDescription, at('detailedDescription (case lede)'));
  needStr(project.tagline, at('tagline'));
  needStr(project.categoryLabel, at('categoryLabel (header meta)'));
  needStr(project.statusLabel, at('statusLabel (header meta)'));
  needStr(project.thumbnail, at('thumbnail'));
  needFile(project.thumbnail, at('thumbnail file'));
  needArr(project.techTags, at('techTags[] (hero chips)'));
  need(typeof project.order === 'number', at('order (numeric sort key)'));
  warn(at('live URL: ' + (project.live ? 'set' : 'absent — button renders disabled')));
  warn(at('github URL: ' + (project.github ? 'set' : 'absent — button renders disabled')));

  /* verification block */
  const v = project.verification;
  if (!v) warn(at('verification absent — renderer skips the evidence block'));
  if (v) {
    needStr(v.heading, at('verification.heading'));
    needStr(v.note, at('verification.note'));
    needArr(v.verified, at('verification.verified[]'));
    needArr(v.pending, at('verification.pending[]'));
  }

  /* section outline */
  needArr(project.sections, at('sections[]'));
  const seen = {};
  (project.sections || []).forEach(function (entry, i) {
    const where = at('sections[' + i + ']');
    needStr(entry.id, where + '.id');
    needStr(entry.num, where + '.num');
    need(typeof entry.kind === 'string', where + '.kind');
    if (RENDERER_KINDS.indexOf(entry.kind) === -1) {
      fail(where + '.kind "' + entry.kind + '" has no renderer (known: ' + RENDERER_KINDS.join(', ') + ')');
    }
    if (seen[entry.id]) fail(where + '.id "' + entry.id + '" duplicated');
    seen[entry.id] = true;
    /* workflow sections derive their heading from workflows[id].title, and
     * future/proposed/roadmap renderers set entry.heading themselves */
    if (entry.kind !== 'workflow' && entry.kind !== 'future' &&
        entry.kind !== 'proposed' && entry.kind !== 'roadmap') {
      needStr(entry.label, where + '.label (TOC + section head fallback)');
    }
  });

  /* per-kind payloads — only validated when the project actually uses the kind */
  const kinds = (project.sections || []).map(function (e) { return e.kind; });
  const has = function (k) { return kinds.indexOf(k) !== -1; };

  if (has('overview')) {
    const o = project.overview || {};
    ['introduction', 'problem', 'solution'].forEach(function (k) { needStr(o[k], at('overview.' + k)); });
    needArr(o.objectives, at('overview.objectives[]'));
    needArr(o.users, at('overview.users[]'));
  }
  if (has('features')) {
    needArr(project.features, at('features[]'));
    (project.features || []).forEach(function (f, i) {
      needStr(f.title, at('features[' + i + '].title'));
      needStr(f.detail, at('features[' + i + '].detail'));
    });
  }
  if (has('stack')) {
    needArr(project.techStack, at('techStack[]'));
    (project.techStack || []).forEach(function (g, i) {
      needStr(g.group, at('techStack[' + i + '].group'));
      needArr(g.items, at('techStack[' + i + '].items[]'));
    });
  }
  if (has('architecture')) {
    const a = project.architecture || {};
    needStr(a.summary, at('architecture.summary'));
    needArr(a.layers, at('architecture.layers[]'));
    (a.layers || []).forEach(function (l, i) {
      needStr(l.title, at('architecture.layers[' + i + '].title'));
      needStr(l.node, at('architecture.layers[' + i + '].node'));
      needStr(l.detail, at('architecture.layers[' + i + '].detail'));
    });
    if (a.diagram) {
      needStr(a.diagram.alt, at('architecture.diagram.alt'));
      needFile(a.diagram.src, at('architecture.diagram file'));
    } else warn(at('architecture.diagram absent — no diagram rendered'));
  }
  if (has('workflow')) {
    need(project.workflows, at('workflows{} required by workflow sections'));
    (project.sections || []).filter(function (e) { return e.kind === 'workflow'; })
      .forEach(function (entry) {
        const wf = (project.workflows || {})[entry.id];
        need(wf, at('workflows["' + entry.id + '"] (referenced by section id)'));
        if (wf) {
          needStr(wf.title, at('workflows.' + entry.id + '.title'));
          needArr(wf.steps, at('workflows.' + entry.id + '.steps[]'));
          wf.steps.forEach(function (s, i) {
            needStr(s.title, at('workflows.' + entry.id + '.steps[' + i + '].title'));
            needStr(s.detail, at('workflows.' + entry.id + '.steps[' + i + '].detail'));
          });
        }
      });
  }
  if (has('database')) {
    const db = project.database || {};
    if (!db.summary) warn(at('database.summary absent — no lede rendered'));
    needArr(db.tables, at('database.tables[]'));
    (db.tables || []).forEach(function (t, i) {
      needStr(t.name, at('database.tables[' + i + '].name'));
      needStr(t.key, at('database.tables[' + i + '].key'));
      needArr(t.fields, at('database.tables[' + i + '].fields[]'));
    });
    if (db.rpc) {
      needStr(db.rpc.name, at('database.rpc.name'));
      needStr(db.rpc.note, at('database.rpc.note'));
      needArr(db.rpc.steps, at('database.rpc.steps[]'));
    }
    if (db.vector) {
      ['extension', 'table', 'fn'].forEach(function (k) {
        needStr(db.vector[k], at('database.vector.' + k));
      });
    }
    if (!db.triggers || !db.triggers.length) warn(at('database.triggers absent — renderer skips trigger cards'));
  }
  if (has('security')) {
    const s = project.security || {};
    if (!s.summary) warn(at('security.summary absent — no lede rendered'));
    const items = s.items || s.implemented;
    needArr(items, at('security.implemented[] {title, detail}'));
    (items || []).forEach(function (m, i) {
      needStr(m.title, at('security.implemented[' + i + '].title'));
      needStr(m.detail, at('security.implemented[' + i + '].detail'));
    });
    if (!s.hardening || !s.hardening.length) warn(at('security.hardening absent — pending work not disclosed'));
  }
  if (has('deployment')) {
    const d = project.deployment || {};
    if (!d.summary) warn(at('deployment.summary absent — no lede rendered'));
    needArr(d.items, at('deployment.items[] {title, detail}'));
    (d.items || []).forEach(function (e, i) {
      needStr(e.title, at('deployment.items[' + i + '].title'));
      needStr(e.detail, at('deployment.items[' + i + '].detail'));
    });
  }
  if (has('challenges')) {
    needArr(project.challenges, at('challenges[]'));
    (project.challenges || []).forEach(function (c, i) {
      needStr(c.issue, at('challenges[' + i + '].issue'));
      needStr(c.challenge, at('challenges[' + i + '].challenge'));
      needStr(c.solution, at('challenges[' + i + '].solution'));
      if (!c.area) warn(at('challenges[' + i + '].area absent — card renders without a category tag'));
    });
  }
  if (has('future')) {
    const f = project.future || {};
    needStr(f.intro, at('future.intro'));
    needArr(f.implementedToday, at('future.implementedToday[]'));
    if (f.notImplemented && f.notImplemented.length) {
      f.notImplemented.forEach(function (n, i) {
        ['stage', 'planned', 'today'].forEach(function (k) {
          needStr(n[k], at('future.notImplemented[' + i + '].' + k));
        });
      });
    } else warn(at('future.notImplemented absent — stage-by-stage table skipped'));
    if (f.recommendationSystem) {
      const rsys = f.recommendationSystem;
      needStr(rsys.title, at('future.recommendationSystem.title'));
      needStr(rsys.strategy, at('future.recommendationSystem.strategy'));
      (rsys.alreadyAvailable || []).forEach(function (a, i) {
        ['component', 'have', 'add'].forEach(function (k) {
          needStr(a[k], at('future.recommendationSystem.alreadyAvailable[' + i + '].' + k));
        });
      });
      (rsys.placements || []).forEach(function (p, i) {
        ['page', 'shows', 'data', 'phase'].forEach(function (k) {
          needStr(p[k], at('future.recommendationSystem.placements[' + i + '].' + k));
        });
      });
    }
    if (f.risks && f.risks.length) {
      f.risks.forEach(function (r, i) {
        needStr(r.risk, at('future.risks[' + i + '].risk'));
        needStr(r.detail, at('future.risks[' + i + '].detail'));
      });
    } else warn(at('future.risks absent — risks card skipped'));
  }
  if (has('proposed')) {
    const p = project.future && project.future.proposedArchitecture;
    need(p, at('future.proposedArchitecture (required by proposed section)'));
    if (p) {
      needStr(p.summary, at('future.proposedArchitecture.summary'));
      const stages = p.stages || p.components;
      needArr(stages, at('future.proposedArchitecture.stages[] {n,title,detail}'));
      (stages || []).forEach(function (s, i) {
        ['n', 'title', 'detail'].forEach(function (k) {
          needStr(s[k], at('proposedArchitecture.stages[' + i + '].' + k));
        });
      });
      if (p.diagram) needFile(p.diagram.src, at('proposedArchitecture.diagram file'));
      else warn(at('proposedArchitecture.diagram absent'));
    }
  }
  if (has('roadmap')) {
    const plan = (project.future || {}).roadmap || [];
    needArr(plan, at('future.roadmap[]'));
    plan.forEach(function (r, i) {
      ['phase', 'title', 'detail'].forEach(function (k) {
        needStr(r[k], at('future.roadmap[' + i + '].' + k));
      });
    });
  }
});

/* ----------------------------------------------------------------- done --- */
if (warnings.length) {
  console.log('Warnings (' + warnings.length + '):');
  warnings.forEach(function (w) { console.log('  - ' + w); });
}
if (errors.length) {
  console.error('\nFAILED - ' + errors.length + ' problem(s):');
  errors.forEach(function (e) { console.error('  x ' + e); });
  process.exit(1);
}
console.log('\nOK - data contract satisfied for ' + (PROJECTS || []).length + ' project(s).');