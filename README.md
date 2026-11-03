# Akash Kr Gupta — AI Dubbing Portfolio

Static GitHub Pages site: https://akash46-ops.github.io/akash-kr-gupta-ai-dubbing-portfolio/

Two pages, one shared style and script:
- `index.html` — home: hero, A/B player, voice lab, language orbit + 6 featured samples, latest 3 LinkedIn videos, process, career, craft, contact.
- `content.html` — LinkedIn videos & posts gallery (All / Videos / Posts) and the full sample library with language/format filters. Deep link a language: `content.html?lang=Hindi#library`.
- `assets/app.css`, `assets/app.js` — shared styles and behaviour.

To add a sample: put the MP4 in assets/video and a JPG poster with the same name in assets/img, then add a line to the `S` array in assets/app.js (add its file name to `FEAT` to feature it on home).
To add a LinkedIn video or post: add an entry at the top of the `LI` array in assets/app.js (activity id, type, title, month, age).
