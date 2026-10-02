(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const sourceClass = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors text-center font-headline-sm text-body-sm font-medium';
  const liveClass = 'flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary text-on-primary font-headline-sm text-body-sm font-semibold hover:bg-inverse-primary transition-colors text-center';

  function externalAction(project, type, label, icon, classes) {
    const url = project.links[type];
    if (!url) return `<button type="button" disabled aria-disabled="true" title="Add ${label} URL in project-data.js" class="${classes} opacity-50 cursor-not-allowed"><span class="material-symbols-outlined text-[16px]">${icon}</span><span>${label} pending</span></button>`;
    return `<a class="${classes}" href="${url}" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined text-[16px]">${icon}</span><span>${label}</span></a>`;
  }

  projects.forEach((project) => {
    const card = document.getElementById(project.stitchId);
    if (!card) return;
    card.querySelectorAll('img').forEach((image) => {
      image.loading = 'lazy';
      image.addEventListener('error', () => {
        const preview = image.parentElement;
        preview.classList.add('flex', 'items-center', 'justify-center');
        preview.innerHTML = '<span class="font-label-micro text-label-micro text-outline">VISUAL PREVIEW UNAVAILABLE</span>';
      }, { once: true });
    });
    const actionContainers = card.querySelectorAll('div.grid.grid-cols-3, div.grid.grid-cols-2');
    const actions = actionContainers[actionContainers.length - 1];
    if (!actions) return;
    actions.className = 'grid grid-cols-3 gap-2 pt-1';
    actions.innerHTML = `${externalAction(project, 'live', 'Live', 'rocket_launch', liveClass)}${externalAction(project, 'github', 'GitHub', 'code', sourceClass)}<a class="${sourceClass} hover:text-primary" href="/project.html?slug=${encodeURIComponent(project.slug)}"><span class="material-symbols-outlined text-[16px]">article</span><span>View Details</span></a>`;
  });

  const filterContainer = document.getElementById('filter-container');
  if (filterContainer) {
    const allChip = filterContainer.querySelector('[data-filter="all"]');
    if (allChip) allChip.textContent = `All (${projects.length})`;
  }
})();
