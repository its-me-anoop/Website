import { apps } from './data.js';
export const categories = ['All', 'Work', 'Create', 'Play', 'Everyday'];
const uses = new Set(apps.map(app => app.use));
const ids = new Set(apps.map(app => app.id));
export function readState(search) {
  const params = new URLSearchParams(search);
  return {
    query: params.get('q') || '',
    category: categories.includes(params.get('category')) ? params.get('category') : 'All',
    use: uses.has(params.get('use')) ? params.get('use') : '',
    media: params.get('media') === 'duo',
    app: ids.has(params.get('app')) ? params.get('app') : null,
  };
}
export function stateQuery(state) {
  const params = new URLSearchParams();
  if (state.query) params.set('q', state.query);
  if (state.category !== 'All') params.set('category', state.category);
  if (state.use) params.set('use', state.use);
  if (state.media) params.set('media', 'duo');
  if (state.app) params.set('app', state.app);
  return params.size ? `?${params}` : '';
}
export function matchingApps(state) {
  const query = state.query.trim().toLocaleLowerCase('en-GB');
  return apps.filter(app => (
    (state.category === 'All' || app.category === state.category)
    && (!state.use || app.use === state.use)
    && (!state.media || app.screenshots.length > 0)
    && [app.name, app.developer, app.benefit, app.kind, app.category, app.storeCategory, app.summary]
      .join(' ').toLocaleLowerCase('en-GB').includes(query)
  ));
}
