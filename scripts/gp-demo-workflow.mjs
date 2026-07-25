/**
 * GP demo workflow.
 *
 * The sample practice site is the studio's main sales tool, and the
 * two things it claims — that the online request journey really works
 * and that a practice can pick its own colours without losing any of
 * the NHS patterns — are exactly the two things a screenshot cannot
 * prove. So they are driven here instead: the triage form completed
 * from the keyboard, its validation, the page with JavaScript turned
 * off, and the colour scheme surviving a navigation.
 *
 * Usage:
 *   1. npm run build && PORT=3100 npm start
 *   2. BASE_URL=http://localhost:3100 npm run test:gp
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const b = await chromium.launch();
let fail = 0;
const ok = (c,m) => { console.log((c?'✓':'✗')+' '+m); if(!c) fail++; };

// ── 1. Keyboard-only journey ──
{
  const p = await b.newPage({ viewport:{width:1280,height:900} });
  await p.goto(BASE + '/demo/gp-practice/online-consultation', { waitUntil:'networkidle' });
  await p.getByRole('radio', { name: /a new or ongoing health problem/i }).focus();
  await p.keyboard.press('Space');
  ok(await p.getByRole('radio', { name: /a new or ongoing health problem/i }).isChecked(), 'radio selects with Space');
  await p.getByRole('button', { name: /continue/i }).click();
  const focused = await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0,40));
  ok(/Who is this request for/i.test(focused||''), `focus moves to the new question (got: ${focused})`);
  await p.getByRole('radio', { name: /^Me/ }).check();
  await p.getByRole('button', { name: /continue/i }).click();
  // type immediately: this is the race the layout effect fixes
  await p.getByRole('textbox').fill('');
  await p.getByRole('textbox').type('A cough that will not settle', { delay: 5 });
  const val = await p.getByRole('textbox').inputValue();
  ok(val === 'A cough that will not settle', `keystrokes are not lost (got: "${val}")`);
  await p.getByRole('button', { name: /send request/i }).click();
  ok(await p.getByRole('heading', { name: /that is everything we need/i }).isVisible(), 'reaches the confirmation');
  ok(await p.getByText(/Nothing you typed was sent or saved/i).isVisible(), 'confirmation never claims a real submission');
  await p.close();
}

// ── 2. Validation ──
{
  const p = await b.newPage({ viewport:{width:1280,height:900} });
  await p.goto(BASE + '/demo/gp-practice/online-consultation', { waitUntil:'networkidle' });
  await p.getByRole('button', { name: /continue/i }).click();
  const alert = p.getByRole('alert').filter({ hasText: /select what you need/i });
  ok(await alert.isVisible(), 'blocks an empty answer with an alert');
  await p.close();
}

// ── 3. No JavaScript ──
{
  const ctx = await b.newContext({ javaScriptEnabled:false, viewport:{width:1280,height:900} });
  const p = await ctx.newPage();
  await p.goto(BASE + '/demo/gp-practice/online-consultation', { waitUntil:'domcontentloaded' });
  ok(await p.getByRole('heading', { level:1, name:/get help online/i }).isVisible(), 'page content renders without JS');
  ok(await p.getByRole('heading', { name:/do not use this form if it is urgent/i }).isVisible(), 'urgent care card renders without JS');
  const nav = await p.getByRole('navigation', { name:/primary/i }).isVisible();
  ok(nav, 'primary nav renders without JS');
  await ctx.close();
}

// ── 4. Theme persists across a reload and a navigation ──
{
  const ctx = await b.newContext({ viewport:{width:1280,height:900} });
  const p = await ctx.newPage();
  await p.goto(BASE + '/demo/gp-practice', { waitUntil:'networkidle' });
  // Click the label, as a mouse user does (the input itself is sr-only).
  await p.locator('label:has(input[value="forest"])').click();
  await p.waitForTimeout(300);
  const themed = await p.evaluate(() => document.querySelector('.demo-gp-root')?.getAttribute('data-theme'));
  ok(themed === 'forest', `switcher applies the theme (got: ${themed})`);
  await p.goto(BASE + '/demo/gp-practice/online-consultation', { waitUntil:'networkidle' });
  const after = await p.evaluate(() => document.documentElement.getAttribute('data-gp-theme'));
  ok(after === 'forest', `theme survives navigation (got: ${after})`);
  const masthead = await p.evaluate(() => getComputedStyle(document.querySelector('.demo-gp-root')).getPropertyValue('--dgp-blue').trim());
  ok(masthead === '#155c3c', `tokens actually change (got: ${masthead})`);
  await ctx.close();
}

// ── 5. The switcher is operable from the keyboard alone ──
{
  const ctx = await b.newContext({ viewport:{width:1280,height:900} });
  const p = await ctx.newPage();
  await p.goto(BASE + '/demo/gp-practice', { waitUntil:'networkidle' });
  await p.getByRole('radio', { name: /NHS blue/i }).focus();
  await p.keyboard.press('ArrowRight');
  await p.waitForTimeout(300);
  const viaKeyboard = await p.evaluate(() => document.documentElement.getAttribute('data-gp-theme'));
  ok(viaKeyboard === 'forest', `arrow keys move between schemes (got: ${viaKeyboard})`);
  const focusVisible = await p.evaluate(() => {
    const el = document.activeElement;
    return el ? el.matches(':focus-visible') : false;
  });
  ok(focusVisible, 'the focused scheme shows a visible focus indicator');
  await ctx.close();
}

await b.close();
console.log(fail ? `\n${fail} check(s) failed` : '\nAll GP demo checks passed');
process.exit(fail ? 1 : 0);
