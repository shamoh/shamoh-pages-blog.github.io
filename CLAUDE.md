# CLAUDE.md

Technický blog Libora Kramoliše (anglicky), https://blog.kramolis.cz.

- Astro (statický výstup), Bootstrap 5 z npm (CSS + jen plugin collapse pro menu), žádné jQuery.
- Články jsou HTML exporty z Bloggeru s YAML front matter v `src/posts/`, načítá je `src/lib/posts.ts`
  (žádné content collections: výchozí loader HTML neumí).
- Adresy drží původní Jekyll web (`build.format: 'preserve'`, `/yyyy/mm/dd/<slug>.html` s datem v UTC, `/tags.html`);
  neměnit, jsou zaindexované.
- `compressHTML: false`: komprese maže mezeru na zalomení řádku mezi inline prvky v textech.
- Node.js ≥ 24 (`engines`), ve workflow `node-version: 24`.
- Deploy: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`), doména v `public/CNAME`.
