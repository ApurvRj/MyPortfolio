/* ---------------------------------------------------------------------------
 * assets/js/site.js
 * Shared behaviour for every page: mobile navigation, project filters,
 * expandable timeline rows, the terminal console, copy-to-clipboard and
 * scroll reveal. Safe to run on pages where a given element is absent.
 * ------------------------------------------------------------------------- */
(function () {
  function each(selector, handler) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), handler);
  }

  /* -------------------------------------------------------- mobile nav --- */
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    each('#primary-nav a', function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------- project filter -- */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  var count = document.getElementById('project-count');
  if (filters.length && projects.length) {
    each('.filter', function (filter) {
      filter.addEventListener('click', function () {
        var selection = filter.getAttribute('data-filter');
        Array.prototype.forEach.call(filters, function (f) {
          f.setAttribute('aria-pressed', String(f === filter));
        });
        var visible = 0;
        Array.prototype.forEach.call(projects, function (project) {
          var show = selection === 'all' || (project.getAttribute('data-category') || '').indexOf(selection) !== -1;
          project.classList.toggle('is-hidden', !show);
          /* Projects are wrapped in a .project-col grid cell; hide that too so
           * a filtered-out project leaves no empty column behind. */
          var column = project.parentElement && project.parentElement.classList.contains('project-col')
            ? project.parentElement : project;
          column.classList.toggle('is-hidden', !show);
          if (show) visible += 1;
        });
        if (count) {
          count.textContent = String(visible).padStart(2, '0') + ' PROJECT' + (visible === 1 ? '' : 'S') + ' SHOWN';
        }
      });
    });
  }

  /* ------------------------------------------------------ timeline rows -- */
  each('.role-toggle', function (button) {
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      var detail = button.nextElementSibling;
      if (detail) detail.classList.toggle('open', !open);
    });
  });

  /* ---------------------------------------------------------- clipboard -- */
  var toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    if (message) toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  each('[data-copy]', function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy');
      var done = function () { showToast('Copied: ' + value); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, done);
      } else {
        done();
      }
    });
  });

  /* ------------------------------------------------------------ console -- */
  var dialog = document.getElementById('console');
  var launcher = document.getElementById('command-launcher');
  var closeBtn = document.getElementById('close-console');
  var output = document.getElementById('console-output');
  if (dialog && launcher) {
    launcher.addEventListener('click', function () { dialog.showModal(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { dialog.close(); });
    document.addEventListener('keydown', function (event) {
      if (event.key === '~' && !dialog.open) { event.preventDefault(); dialog.showModal(); }
      if (event.key === 'Escape' && dialog.open) dialog.close();
    });
    each('.console-option', function (button) {
      button.addEventListener('click', function () {
        var route = button.getAttribute('data-route');
        if (output) {
          output.innerHTML = '<span class="prompt">$</span> ' + button.textContent +
            '<br><span class="prompt">OK</span> Navigating to ' + route + ' ...';
        }
        dialog.close();
        var target = document.querySelector(route);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------ active nav ----- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        Array.prototype.forEach.call(navLinks, function (link) {
          link.setAttribute('aria-current', String(link.getAttribute('href') === id));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------- reveal -- */
  if (window.UI && window.UI.observeReveal) window.UI.observeReveal();
})();