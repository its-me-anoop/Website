# Hero h1 capture — 20 Sep 2026

## Live (https://www.flutterly.co.uk/)

`document.querySelector('h1').textContent` (whitespace collapsed):

```
One studio. Every page your patientspatients need.
```

`outerHTML` (trimmed):

```html
<h1 class="k-display …">
  … Every page your
  <span class="sr-only">patients</span>
  <span aria-hidden="true"><em>patients</em></span>
  need.
</h1>
```

- `sr-only` present: yes
- `aria-label`: none
- `patients` in textContent: 2

## Local fix (http://localhost:3000/)

`document.querySelector('h1').textContent`:

```
One studio. Every page your patients need.
```

`h1.getAttribute('aria-label')`:

```
One studio. Every page your patients need.
```

`outerHTML` (trimmed):

```html
<h1 aria-label="One studio. Every page your patients need." class="k-display …">
  … Every page your
  <span aria-hidden="true"><em>patients</em></span>
  need.
</h1>
```

- `sr-only` present: no
- `patients` in textContent: 1
