const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const resultsCount = document.getElementById('resultsCount');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const formatSize = (sizeMb) => {
  if (typeof sizeMb === 'number') {
    return `${sizeMb.toFixed(1)} MB`;
  }

  return sizeMb;
};

const buildCard = (app) => `
  <article class="app-card">
    <div class="app-header">
      <div>
        <h2 class="app-title">${app.name}</h2>
        <span class="app-version">v${app.version}</span>
      </div>
      <span class="app-badge">${app.platform.replace('iOS', 'iOS').slice(0, 3).toUpperCase()}</span>
    </div>

    <ul class="app-meta">
      <li><span>Bundle ID</span><strong>${app.bundleId}</strong></li>
      <li><span>Platform</span><strong>${app.platform}</strong></li>
      <li><span>Min OS</span><strong>${app.minOs}</strong></li>
      <li><span>Binary Size</span><strong>${formatSize(app.sizeMb)}</strong></li>
    </ul>

    <div class="app-actions">
      <a class="download-btn" href="${app.downloadUrl}" target="_blank" rel="noreferrer">Download IPA</a>
    </div>
  </article>
`;

const renderApps = (apps) => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredApps = apps.filter((app) => {
    const haystack = `${app.name} ${app.bundleId}`.toLowerCase();
    return haystack.includes(query);
  });

  resultsCount.textContent = `${filteredApps.length} app${filteredApps.length === 1 ? '' : 's'}`;

  if (!filteredApps.length) {
    appGrid.innerHTML = '<div class="empty-state">No apps matched your search.</div>';
    return;
  }

  appGrid.innerHTML = filteredApps.map(buildCard).join('');
};

const init = async () => {
  try {
    const response = await fetch('./data/apps.json');
    if (!response.ok) {
      throw new Error(`Unable to load app data (${response.status})`);
    }

    const apps = await response.json();
    renderApps(apps);
    searchInput.addEventListener('input', () => renderApps(apps));
  } catch (error) {
    appGrid.innerHTML = `<div class="empty-state">${error.message}</div>`;
    resultsCount.textContent = '0 apps';
  }
};

init();
