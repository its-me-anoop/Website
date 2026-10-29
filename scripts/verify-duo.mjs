import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { apps } from '../public/duo/data.js';
import { readState, stateQuery, matchingApps } from '../public/duo/directory-model.js';
const initial = readState('');
assert.equal(matchingApps(initial).length, 7);
assert.equal(matchingApps({...initial,query:'UTILITIES'}).length,2);
assert.equal(matchingApps({...initial,category:'Create'}).length,2);
assert.deepEqual(matchingApps({...initial,media:true}).map(app=>app.id),['sipli']);
assert.equal(matchingApps({...initial,use:'Write & plan'}).length,2);
assert.equal(matchingApps({...initial,query:'no such app'}).length,0);
assert.deepEqual(readState('?category=invalid&app=fake&use=bad&media=ipad'),initial);
const state={...initial,query:'Photo & Video',category:'Create',app:'darkroom'};
assert.deepEqual(readState(stateQuery(state)),state);
assert.equal(apps.filter(app=>app.owned).length,1);
assert.equal(apps.filter(app=>app.screenshots.length).length,1);
for(const app of apps){
  assert.equal(app.status,'claimed');
  assert.match(app.url,new RegExp(`^https://apps\\.apple\\.com/gb/app/[^/]+/id${app.storeId}$`));
  assert.equal(app.priceLabel,'Free · In-App Purchases');
  assert.ok(app.evidence && app.sourceLabel && app.mediaEvidence);
  for(const path of [app.icon,...app.screenshots.map(image=>image.src)]) await access(new URL(`../public${path}`,import.meta.url));
}
const html=await readFile(new URL('../public/duo/index.html',import.meta.url),'utf8');
assert.doesNotMatch(html,/<form\b|stripe|checkout/i);
const luminance=hex=>hex.match(/\w\w/g).map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((a,c,i)=>a+c*[.2126,.7152,.0722][i],0);
for(const [foreground,background] of [['606177','f6f6fa'],['5540cc','ffffff'],['ffffff','5540cc'],['53427e','eeebfb'],['2e6055','e8f2ef']]){
  const values=[luminance(foreground),luminance(background)].sort((a,b)=>b-a);
  assert.ok((values[0]+.05)/(values[1]+.05)>=4.5,`Contrast ${foreground}/${background}`);
}
console.log('Duo directory: search, filters, URL restoration, seven evidence records, media assets, privacy and core text contrasts passed.');
