Internet Status Monitor (installable web app)

1. Upload this whole folder to any HTTPS host (GitHub Pages, Netlify, Cloudflare Pages)
   so that index.html, manifest.webmanifest, sw.js and the icons folder sit together.
2. Open the site and use the "Install app" button, or the install icon in the
   Chrome / Edge address bar.
   iPhone / iPad: Safari > Share > Add to Home Screen.

To test on your own computer, open a terminal in this folder and run:
   python3 -m http.server 8000
then visit http://localhost:8000 (localhost counts as secure).
Opening index.html directly from disk still works as a normal page, but it cannot be installed.

If you change index.html later, change CACHE = "online-status-v3" in sw.js to v4
so installed copies pick up the update.
