# Yet Another TEch bLog

Blog Libora Kramoliše, https://blog.kramolis.cz.

Statický web v [Astru](https://astro.build), nasazovaný přes GitHub Actions na GitHub Pages.

## Lokálně

Potřebuje Node.js 24 nebo novější.

```shell
npm install
npm run dev       # vývojový server na http://localhost:4321
npm run build     # hotový web do dist/
npm run preview   # náhled hotového webu z dist/
```

## Struktura

```
src/posts/        články: <yyyy-mm-dd>-<slug>.html s front matter (title, date, tags), HTML z Bloggeru
drafts/           rozepsané články (nepublikují se)
src/pages/        stránky: úvod, štítky (tags.html), článek ([year]/[month]/[day]/[slug].astro), feed.xml
src/lib/posts.ts  načtení článků, adresy a štítky
src/layouts/      společný vzhled
src/site.ts       název blogu, e-mail a menu
public/           soubory beze změny (CNAME, favicon, fotka)
```

Adresa článku je `/<yyyy>/<mm>/<dd>/<slug>.html` podle data v UTC, stejně jako na původním Jekyll webu.

## Nasazení

Každý push do `master` web postaví a nasadí (`.github/workflows/deploy.yml`). Pull request web jen postaví.
Když build nebo nasazení selže, otevře se issue přiřazené vlastníkovi repa (přijde e-mail).

V nastavení repa musí být **Settings → Pages → Build and deployment → Source: GitHub Actions**
a **Custom domain: blog.kramolis.cz**.
