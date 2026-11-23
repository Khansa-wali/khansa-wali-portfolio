# Khansa Wali — Portfolio

Personal portfolio of **Khansa Wali, Python Developer | AI & Machine Learning**.

A static website built with plain HTML, CSS and vanilla JavaScript. There is no build step, no backend, no database and no admin panel: you edit a few plain files and publish the folder. It deploys as-is to GitHub Pages.

## Pages

| Page | File | What it shows |
|---|---|---|
| Home | `index.html` | Hero, About, Expertise, Featured Projects, Technical Arsenal, Journey, Vision, Contact |
| Services | `services.html` | Seven service areas with expandable details and enquiry buttons |
| Portfolio | `portfolio.html` | Featured project, All Work with category filters and search, Browse by Area, project detail window |
| Contact | `contact.html` | Email, WhatsApp and LinkedIn cards, topic picker, message form |

## Folder structure

```
khansa-portfolio/
├── index.html  services.html  portfolio.html  contact.html
├── css/
│   ├── style.css         shared design system (colours, type, nav, buttons, cards, footer)
│   ├── services.css      services page only
│   ├── portfolio.css     portfolio page only
│   └── contact.css       contact page only
├── js/
│   ├── main.js           shared: nav, scroll reveal, hero canvas, card tilt
│   ├── services.js       services page + its contact settings
│   ├── portfolio.js      portfolio page + its contact settings
│   ├── contact.js        contact page + its contact settings
│   └── projects-data.js  ALL portfolio projects live here
├── assets/
│   ├── img/              profile cut-out (png + webp)
│   └── Khansa-Wali-CV.pdf   you add this file (see below)
└── README.md
```

## Run locally

No installation needed. Either double-click `index.html`, or serve the folder (recommended, closer to how it behaves online):

```bash
cd khansa-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a GitHub repository and push the **contents** of this folder to the `main` branch (so `index.html` is at the repository root).
2. On GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
3. After a minute the site is live at `https://<your-username>.github.io/<repository>/`.

All links are relative, so the site works from that sub-path with no changes.

## Resume (My Resume button)

Every "My Resume" button opens `assets/Khansa-Wali-CV.pdf` in a new tab.

- **First time:** put your PDF in the `assets/` folder and name it exactly `Khansa-Wali-CV.pdf`.
- **Updating later:** replace that file with the new PDF using the **same file name**, then push.
- Until the file exists the button opens a "not found" page. Add the PDF before publishing.

## Adding and managing projects

Open `js/projects-data.js`. Copy an existing project object, paste it into the `projects` list and fill in only what is true. The cards, filter counts, "Browse by Area" tiles, hero line and detail window all update automatically; no HTML or CSS changes are needed.

Required: `id` (lowercase, no spaces; used in the link `portfolio.html#p-<id>`), `title`, `category`, `overview`, `tech`.
Optional (left out = not shown): `featured`, `flagship`, `published`, `order`, `status`, `kind`, `problem`, `solution`, `role`, `features`, `approach`, `challenges`, `image`, `images`, `links: { github, demo }`.

| To… | Do this |
|---|---|
| Hide a project without deleting it | add `published: false` |
| Delete a project | remove its object |
| Change the order | add `order: 1`, `order: 2`… (lower first); without it, file order is used |
| Show it in Featured | add `featured: true` (use `flagship: true` for the one large project) |
| Add screenshots | put images in `assets/img/projects/` and set `image: 'assets/img/projects/name.png'` and/or `images: [...]` |
| Add links | `links: { github: 'https://github.com/Khansa-wali/REPO', demo: 'https://…' }` |

Categories: `web`, `auto`, `data`, `ml`, `vision`, `backend`, `custom` (they match the Services page). A category with no projects shows a clean empty state.

Projects without screenshots show a labelled "Concept illustration". Setting `image` replaces it.

The four project cards on the **Home** page are written directly in `index.html`; update them there if you change those projects.

## Updating other content

There is no admin panel; content is edited in the HTML files.

| Content | Where |
|---|---|
| Hero, About, Vision text | `index.html` |
| Education and journey | `index.html`, section `#journey` |
| Technical skills | `index.html`, section `#arsenal` |
| Services text and technology tags | `services.html` |
| Footer links | bottom of each of the four HTML files |

## Contact settings

Email, WhatsApp and LinkedIn are set in three places (kept in separate files because each page works on its own):

- `js/services.js`: `CONTACT = { email, whatsapp }`
- `js/portfolio.js`: `CONTACT = { email, whatsapp }`
- `js/contact.js`: `CONTACT = { email, linkedin, whatsapp }`

`whatsapp` is digits only with country code (currently `923089661739`). Set it to `''` to switch WhatsApp off everywhere. The email and LinkedIn links also appear as plain links in the HTML (footer and home Contact section).

**How the contact form works:** the site has no server, so "Send Message" opens the visitor's email app with the message filled in. Nothing is sent until they press send there, and the page says so. Collecting messages directly would need an external form service or a backend, which this project does not include.

## Design system

Defined once in `css/style.css` (`:root`): background `#080B14`, cyan `#39D9E6`, blue `#477BFF`, violet `#9B7BFF`; fonts Space Grotesk (headings), Inter (body), JetBrains Mono (labels). New pages should reuse these tokens and the shared nav/footer. Motion respects `prefers-reduced-motion`.

## Tested

Checked with an automated browser (Chromium via Playwright) on 2026-11-23:

- All four pages load with no console errors and no horizontal scrolling at 320, 390, 768, 1024, 1280, 1440 and 1920 px.
- Every internal link, anchor, script, stylesheet and image path resolves, except the resume PDF, which you add yourself.
- Portfolio filters, search, empty states, project detail window (open, Escape to close), and links from the Home page into it.
- Services expand/collapse and enquiry links; Contact topic picker, form and mobile menu.

Not tested: opening the live links (WhatsApp, LinkedIn, GitHub, mail client) from a real device, and Safari/Firefox.

## Troubleshooting

- **My Resume shows "not found":** the PDF is missing or named differently. It must be `assets/Khansa-Wali-CV.pdf`.
- **Changes don't show on GitHub Pages:** wait a minute and hard-refresh (Ctrl/Cmd + Shift + R).
- **A project is missing from Portfolio:** check for `published: false` and for a missing comma or bracket in `js/projects-data.js` (the browser console shows the error).
- **WhatsApp button opens email instead:** `whatsapp` is empty in that page's JS file.

## Not included

No admin panel, backend, database or login. If you want these later, they require hosting that can run a server (GitHub Pages cannot), so it would be a separate project decision.
