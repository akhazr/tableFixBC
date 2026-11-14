# FixCraft BC

Static website for FixCraft BC (handyman, painting and small renovations in Metro Vancouver), hosted on GitHub Pages at https://fixcraftbc.ca.

## Before launch, update
- Contact email: `fixcraftbc@gmail.com` appears in `index.html` and `script.js` (`QUOTE_EMAIL`). Change it if you use a different inbox.
- Add a phone number, real project photos and any licence/insurance details once you have them.

## Quote form
The form opens the visitor's email app with the request filled in (no backend needed). To receive submissions directly instead, point the form at a service such as Formspree.

## Local preview
```bash
python3 -m http.server 8080
```
Then visit http://localhost:8080.

## GitHub Pages
Deploys from `main` via `.github/workflows/pages.yml` (Settings → Pages → Source: GitHub Actions).
Custom domain is set in `CNAME`. DNS at the registrar:
- `A` records for `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- `CNAME` for `www` → `akhazr.github.io`
