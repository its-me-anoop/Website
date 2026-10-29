import { apps, checked } from './data.js';
import { readState, stateQuery, matchingApps } from './directory-model.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const title = 'Duo Discover — Apps worth unfolding';
const modal = $('#modal');
let state = readState(location.search);
let composing = false;
let returnFocus = null;
let returnApp = null;
let returnFocusId = null;

function appIcon(app, size = 52) {
  return `<img class="app-icon" src="${app.icon}" width="${size}" height="${size}" alt="" decoding="async">`;
}
function storeBadge(app) {
  return `<a class="store-badge" href="${app.url}" target="_blank" rel="noopener noreferrer" aria-label="${escape(app.name)} on the App Store (opens in a new tab)"><img src="/duo/assets/app-store-badge.svg" width="120" height="40" alt="Download on the App Store"></a>`;
}
function card(app) {
  const media = app.screenshots.length ? `${app.screenshots.length} Duo simulator captures` : 'Duo screenshots not verified';
  return `<article class="app-card" aria-labelledby="app-${app.id}">
    <div class="card-heading">${appIcon(app)}<div><h3 id="app-${app.id}">${app.name}</h3><p>${app.developer}</p></div></div>
    <div class="card-meta"><span>${app.storeCategory}</span><span>${app.priceLabel}</span></div>
    <p class="app-summary">${app.summary}</p>
    <div class="duo-reason"><h4>What Duo adds</h4><p>${app.benefit}</p></div>
    <div class="card-disclosures"><span class="evidence-tag">Developer claim</span>${app.owned ? '<span class="ownership-tag">Our app · Flutterly</span>' : ''}</div>
    <p class="media-status ${app.screenshots.length ? 'media-available' : ''}">${media}</p>
    <div class="card-actions">${storeBadge(app)}<button class="text-button" id="details-${app.id}" data-app="${app.id}" aria-label="Details and evidence for ${escape(app.name)}">Details & evidence</button></div>
  </article>`;
}
function updateUrl() {
  history.replaceState(null, '', `${location.pathname}${stateQuery(state)}${location.hash}`);
}
function renderCollection(writeUrl = true) {
  const results = matchingApps(state);
  $('#app-grid').innerHTML = results.map(card).join('');
  $('#count').textContent = results.length === apps.length ? `${apps.length} apps` : `${results.length} of ${apps.length} apps`;
  $('#empty').hidden = results.length > 0;
  $('#clear-search').hidden = state.query.length === 0;
  $('#search').value = state.query;
  $('#media-filter').setAttribute('aria-pressed', String(state.media));
  $$('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === state.category)));
  $$('[data-pick]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pick === state.use)));
  $('#active-pick').hidden = !state.use;
  $('#active-pick').innerHTML = state.use ? `<span>Exploring: <strong>${escape(state.use)}</strong></span><button class="text-button" id="clear-use">Clear use case</button>` : '';
  if (writeUrl) updateUrl();
}
function resetFilters() {
  state = { query: '', category: 'All', use: '', media: false, app: null };
  renderCollection();
  $('#search').focus();
}
$('#search').addEventListener('compositionstart', () => { composing = true; });
$('#search').addEventListener('compositionend', () => { composing = false; state.query = $('#search').value; renderCollection(); });
$('#search').addEventListener('input', event => {
  if (!composing) { state.query = event.target.value; renderCollection(); }
});
$('#clear-search').addEventListener('click', () => { state.query = ''; renderCollection(); $('#search').focus(); });
$('#media-filter').addEventListener('click', () => { state.media = !state.media; renderCollection(); });
$('#reset-filters').addEventListener('click', resetFilters);

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.category) { state.category = button.dataset.category; state.use = ''; renderCollection(); }
  if (button.dataset.pick) { state.use = button.dataset.pick; state.category = 'All'; state.query = ''; renderCollection(); }
  if (button.id === 'clear-use') { state.use = ''; renderCollection(); }
  if (button.dataset.app) openDetail(button.dataset.app, button);
  if (button.dataset.modal) openInfo(button.dataset.modal, button);
});

function gallery(app) {
  if (!app.screenshots.length) return `<div class="media-notice"><h3>Duo screenshots aren’t verified yet.</h3><p>${app.mediaEvidence}</p></div>`;
  return `<section class="screenshot-section" aria-labelledby="gallery-title"><h3 id="gallery-title">The actual Duo views</h3><p>${app.mediaEvidence}</p><div class="duo-gallery">${app.screenshots.map(image => `<figure><a href="${image.src}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size ${escape(app.name)} ${image.label.toLowerCase()} screenshot (opens in a new tab)"><img src="${image.src}" width="${image.width}" height="${image.height}" alt="${escape(app.name)} on iPhone Duo: ${image.label.toLowerCase()}" decoding="async"></a><figcaption><strong>${image.label}</strong><span>${image.width} × ${image.height} · Open full-size</span></figcaption></figure>`).join('')}</div></section>`;
}
function showDialog(label, content, trigger, appId = null) {
  if (!modal.open) { returnFocus = trigger || document.activeElement; returnApp = appId; returnFocusId = trigger?.id || null; }
  $('#modal-eyebrow').textContent = label;
  $('#modal-body').innerHTML = content;
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  $('#close-modal').focus();
}
function openDetail(id, trigger, fromHistory = false) {
  const app = apps.find(item => item.id === id);
  if (!app) return;
  if (!fromHistory) {
    state.app = id;
    history.pushState({ duoDialog: true }, '', `${location.pathname}${stateQuery(state)}${location.hash}`);
  }
  document.title = `${app.name} — Duo Discover`;
  showDialog('App details & evidence', `<div class="detail-heading">${appIcon(app, 64)}<div><h2 id="modal-title">${app.name}</h2><p>${app.developer}</p></div></div>
    ${app.owned ? '<div class="ownership-notice"><strong>Our app · Flutterly</strong><p>Sipli is made by Anoop Jose / Flutterly, the team behind this directory. This is our own listing, not an independent review.</p></div>' : ''}
    <dl class="app-facts"><div><dt>App Store category</dt><dd>${app.storeCategory}</dd></div><div><dt>UK download price</dt><dd>${app.priceLabel}</dd></div><div><dt>Version in source</dt><dd>${app.version}</dd></div></dl>
    <p class="detail-summary">${app.summary}</p>
    <section class="evidence-panel" aria-labelledby="evidence-title"><div class="evidence-panel-heading"><h3 id="evidence-title">What the developer says Duo adds</h3><span class="evidence-tag">Developer claim</span></div><p class="benefit-lead">${app.benefit}</p><p>${app.evidence}</p><dl class="source-facts"><div><dt>Source</dt><dd>${app.sourceLabel}</dd></div><div><dt>Checked</dt><dd>${checked}</dd></div><div><dt>Independent device test</dt><dd>Not completed</dd></div></dl><a class="source-link" href="${app.url}" target="_blank" rel="noopener noreferrer">Read the App Store source</a></section>
    ${gallery(app)}
    <p class="detail-legal">App details and prices are a dated snapshot. Check the App Store before downloading. App icons and source media remain the property of their respective owners.</p>
    <div class="detail-actions">${storeBadge(app)}<button class="button button-outline" id="back-to-collection">Back to collection</button></div>`, trigger, id);
}
function openInfo(kind, trigger) {
  const method = kind === 'method';
  document.title = `Duo Discover — ${method ? 'Our approach' : 'About & privacy'}`;
  const content = method ? `<h2 id="modal-title">Know what’s behind the claim.</h2><p class="dialog-intro">Start with a useful workflow and a public source. Keep what a developer says separate from what we’ve actually tried.</p><h3>Developer claim</h3><p>Each of these seven apps explicitly mentions Duo support in its App Store description or release notes. We reviewed the source. This is not an independent device test.</p><h3>Duo screenshots</h3><p>Sipli’s three developer-owned simulator captures match the native inner and cover display dimensions and are identified as such. For the other six apps, verified public Duo media wasn’t available. Ordinary iPhone and iPad images are omitted.</p><h3>Independent device tests</h3><p>A device-tested label will require our own documented checks, with the device, app version, date and results. No app currently has this label.</p><h3>Ownership & paid exposure</h3><p>Sipli belongs to Anoop Jose / Flutterly, the team behind this directory. Its ownership is disclosed. No sponsored placements or affiliate commissions are active. Future paid placements will be labelled and won’t buy a stronger evidence claim.</p><p>All listing sources and UK prices were checked on ${checked}. Store availability, features and prices can change.</p>` : `<h2 id="modal-title">Simple discovery. Clear sources.</h2><p class="dialog-intro">Duo Discover is an independent app guide by Flutterly.</p><h3>Your privacy</h3><p>This directory has no accounts, submission forms, newsletter sign-up, checkout or authored analytics. It does not collect personal information through forms or store visitor data in your browser.</p><p>Our hosting provider may process technical request information to serve the site. App Store and full-size image links open the destination shown. External services have their own privacy policies.</p><h3>About the collection</h3><p>Developer claims, simulator captures and independent device tests are distinguished. Sipli is our own app. No paid placements or affiliate commissions are active. App details and prices are dated snapshots.</p><p>We are not affiliated with Apple. iPhone is a trademark of Apple Inc. App names and artwork belong to their respective owners.</p>`;
  showDialog(method ? 'Our curation approach' : 'About this directory', content, trigger);
}
function closeDialog() {
  if (state.app && history.state?.duoDialog) { history.back(); return; }
  if (state.app) { state.app = null; updateUrl(); }
  modal.close();
}
$('#close-modal').addEventListener('click', closeDialog);
modal.addEventListener('click', event => { if (event.target.closest('#back-to-collection')) closeDialog(); });
modal.addEventListener('cancel', event => { event.preventDefault(); closeDialog(); });
modal.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...modal.querySelectorAll('button,a[href]')].filter(control => !control.disabled && !control.hidden);
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
modal.addEventListener('close', () => {
  document.title = title;
  const target = returnFocus?.isConnected ? returnFocus : returnFocusId ? document.getElementById(returnFocusId) : returnApp ? document.querySelector(`[data-app="${returnApp}"]`) : null;
  target?.focus({ preventScroll: true });
});
window.addEventListener('popstate', () => {
  state = readState(location.search);
  renderCollection(false);
  if (state.app) openDetail(state.app, null, true);
  else if (modal.open) modal.close();
});
renderCollection(false);
if (state.app) openDetail(state.app, null, true);
