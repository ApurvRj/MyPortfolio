/* ---------------------------------------------------------------------------
 * assets/js/home.js
 * Renders every dynamic region of the homepage from the centralized data
 * modules. Layout/interaction wiring lives in assets/js/site.js.
 *
 * Depends on: assets/js/icons.js, data/*.js, assets/js/ui.js
 * ------------------------------------------------------------------------- */
(function () {
  var UI = window.UI;
  if (!UI) return;
  var P = UI.data.profile;
  var C = UI.data.career;
  var PROJECTS = UI.data.projects;

  function set(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }
  function text(id, value) { var el = document.getElementById(id); if (el) el.textContent = value; }
  function esc(v) { return UI.esc(v); }
  function ico(n, s) { return UI.icon(n, s); }

  document.title = P.name + ' | ' + P.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', P.name + ' — ' + P.title + '. ' + P.headline);

  /* ------------------------------------------------------------- header -- */
  set('brand-mark', ico('terminal', 17));
  text('brand-name', P.name);
  set('brand-meta', '<span class="micro-label">' + esc(P.title) + '</span>');
  set('primary-nav', UI.navLinks(false));
  set('header-actions',
    '<a class="icon-button" href="' + esc(P.links.github) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">' + ico('github') + '</a>' +
    '<a class="icon-button" href="' + esc(P.links.linkedin) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">' + ico('linkedin') + '</a>' +
    '<button class="icon-button menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation">' + ico('menu') + '</button>');

  /* --------------------------------------------------------------- hero -- */
  set('hero-eyebrow', '<span class="status-pill"><span class="dot"></span>' + esc(P.availability) + '</span>');
  text('hero-name', P.title);
  var marker = 'Generative AI';
  var parts = P.headline.split(marker);
  set('hero-headline', esc(parts[0]) + '<span class="accent">' + marker + '</span>' + esc(parts.slice(1).join(marker)));
  text('hero-lede', P.headline);
  set('hero-focus', (P.focusAreas || []).map(function (f) {
    return '<div class="focus-item">' + ico(f.icon, 18) +
      '<strong>' + esc(f.label) + '</strong><span>' + esc(f.detail) + '</span></div>';
  }).join(''));
  set('hero-actions',
    '<a class="button button-primary" href="#work">' + ico('arrow-down', 16) + '<span>Explore my projects</span></a>' +
    UI.action(P.links.github, 'View GitHub', 'github', 'button-secondary') +
    UI.action(P.links.email, 'Email me', 'mail', 'button-secondary'));
  set('hero-meta',
    '<span><i></i>' + esc(P.location) + '</span>' +
    '<span><i></i>Infosys · Senior System Engineer</span>' +
    '<span><i></i>SAP Commerce Cloud · GenAI</span>');
  set('portrait',
    '<div class="portrait-accent" aria-hidden="true"></div>' +
    '<div class="portrait-frame">' +
      '<img src="' + esc(P.portrait.src) + '" alt="' + esc(P.portrait.alt) + '" width="900" height="900" decoding="async">' +
      '<div class="portrait-badge"><span class="who">' + esc(P.name) + '</span>' +
      '<span class="where">' + esc(P.location) + '</span></div>' +
    '</div>');

  /* ------------------------------------------------------------ metrics -- */
  set('metrics', UI.metricStrip([
    { value: '3+ yrs', label: 'Enterprise commerce delivery', note: 'Infosys · Becton Dickinson' },
    { value: '2', label: 'Shipped full-stack products', note: 'Live on Vercel' },
    { value: '1', label: 'GenAI product in production', note: 'RAG + pgvector' },
    { value: '2028', label: 'MBA, IIT Patna', note: 'GenAI & Product Management' }
  ]));

  /* ----------------------------------------------------------- projects -- */
  set('projects-grid', PROJECTS.map(UI.projectCard).join(''));

  var filters = document.getElementById('project-filters');
  if (filters) {
    var cats = [];
    PROJECTS.forEach(function (p) {
      (p.categories || []).forEach(function (c) { if (cats.indexOf(c) === -1) cats.push(c); });
    });
    var labels = { ai: 'Generative AI', fullstack: 'Full-stack', ecommerce: 'E-commerce' };
    filters.innerHTML = '<button class="filter" aria-pressed="true" data-filter="all">All work</button>' +
      cats.map(function (c) {
        return '<button class="filter" aria-pressed="false" data-filter="' + esc(c) + '">' + esc(labels[c] || c) + '</button>';
      }).join('');
  }
  text('project-count', String(PROJECTS.length).padStart(2, '0') + ' FEATURED PROJECTS');

  /* -------------------------------------------------------------- about -- */
  set('about-copy',
    '<p class="about-lead">' + esc(P.about[0]) + '</p>' +
    '<p>' + esc(P.about[1]) + '</p>');
  set('about-list',
    '<li><span>Based in</span><span>' + esc(P.location) + '</span></li>' +
    '<li><span>Availability</span><span>' + esc(P.availability) + '</span></li>' +
    '<li><span>Focus</span><span>Software engineering · Generative AI · Product</span></li>' +
    '<li><span>GitHub</span><span><a href="' + esc(P.links.github) + '" target="_blank" rel="noopener noreferrer">github.com/ApurvRj</a></span></li>' +
    '<li><span>LinkedIn</span><span><a href="' + esc(P.links.linkedin) + '" target="_blank" rel="noopener noreferrer">apurv-raj-319960179</a></span></li>' +
    '<li><span>Email</span><span><a href="' + esc(P.links.email) + '">' + esc(P.email) + '</a></span></li>');

  /* ------------------------------------------------------------- skills -- */
  set('skills-grid', (C.skills || []).map(UI.skillCard).join(''));
  set('skills-legend', UI.skillLegend());

  /* --------------------------------------------------------- experience -- */
  set('experience-copy',
    '<p>Enterprise delivery on SAP Commerce Cloud for a global healthcare and medical technology client. ' +
    'Alongside that, I build my own full-stack and Generative AI products end to end.</p>' +
    UI.action(P.links.linkedin, 'Connect on LinkedIn', 'linkedin', 'button-secondary'));
  set('timeline', (C.experience || []).map(function (e, i) {
    return UI.experienceItem(e, i === 0);
  }).join(''));

  /* ---------------------------------------------------------- education -- */
  set('education-grid', (C.education || []).map(UI.educationCard).join(''));
  set('certifications', UI.certificationSection(C.certifications));

  /* ------------------------------------------------------------ contact -- */
  set('contact-left',
    '<h2>Have a thoughtful problem worth solving?</h2>' +
    '<p>I am open to opportunities across software engineering, Generative AI and AI product work. ' +
    'A short note about the problem is the best place to start.</p>');
  set('contact-actions',
    UI.action(P.links.email, 'Send an email', 'mail', 'button-primary') +
    UI.action(P.links.linkedin, 'Connect on LinkedIn', 'linkedin', 'button-secondary'));
  set('contact-card',
    '<span class="micro-label">Direct line</span>' +
    '<div class="email-line"><a href="' + esc(P.links.email) + '">' + esc(P.email) + '</a>' +
    '<button class="icon-button" id="copy-email" aria-label="Copy email address" title="Copy email address">' + ico('copy') + '</button></div>' +
    '<div class="socials">' +
      '<a href="' + esc(P.links.github) + '" target="_blank" rel="noopener noreferrer">' + ico('github') + '<span>GitHub</span></a>' +
      '<a href="' + esc(P.links.linkedin) + '" target="_blank" rel="noopener noreferrer">' + ico('linkedin') + '<span>LinkedIn</span></a>' +
      '<a href="' + esc(P.links.email) + '">' + ico('mail') + '<span>Email</span></a>' +
    '</div>');

  /* ------------------------------------------------------------- footer -- */
  set('footer', '<span>' + esc(P.name.toUpperCase()) + ' / ' + esc(P.title.toUpperCase()) + '</span>' +
    '<span>' + esc(P.footerNote) + '</span>');
  set('console-options',
    '<button class="console-option" data-route="#work">01 / cd projects</button>' +
    '<button class="console-option" data-route="#about">02 / cat about</button>' +
    '<button class="console-option" data-route="#stack">03 / cat skills</button>' +
    '<button class="console-option" data-route="#experience">04 / cat experience</button>' +
    '<button class="console-option" data-route="#education">05 / cat education</button>' +
    '<button class="console-option" data-route="#contact">06 / mail ' + esc(P.name.split(' ')[0].toLowerCase()) + '</button>');
})();