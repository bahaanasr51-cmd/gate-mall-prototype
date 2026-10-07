# HUGO BOSS | Gate Mall Client Appointments (Prototype)

A shareable client website for the Gate Mall store. Clients browse looks curated by the
team, build an Appointment (instead of a basket), pick a day and time, and leave their
name and phone number. Prototype only: sample products, no real stock or client data,
nothing is sent or stored.

## Add the store photo
Save your shop picture as `assets/images/store.jpg` (landscape, 1600 px wide or more).
It appears automatically in the top banner and in the Visit section. No code changes needed.

## Project structure
| Path | Purpose |
|---|---|
| `index.html` | Page structure and text |
| `css/styles.css` | Design |
| `js/app.js` | Site logic (looks, appointment, slots, confirmation) |
| `data/looks.json` | Curated looks created by the team |
| `data/products.json` | **The full menswear collection** (categories, colours, sizes). Edit to add or change items |
| `assets/images/` | Store photo and, later, approved product images |

## Publish on GitHub Pages (free)
1. On GitHub click **New repository**, name it `gate-mall-prototype`.
2. Click **uploading an existing file**, drag in everything from this folder (keep the folders), then **Commit changes**.
3. Go to **Settings > Pages**, choose branch `main` and folder `/ (root)`, then **Save**.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/gate-mall-prototype/`.

## Run on your own computer
Opening `index.html` directly will not load the looks. Use VS Code **Live Server**, or run
`python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Before real use
- The appointment form needs a backend (email or shared sheet) to reach the team.
- Stock connection, hosting and data handling need approval from operations and IT.
- Replace the illustrated pieces with approved product photography.
