# Lake Urumia Portfolio

Minimal, dark portfolio site with Berber-inspired geometric patterns and decay aesthetics.

## Features

- Dark/light mode toggle (respects system preference)
- Fixed geometric background (content scrolls over it)
- Email obfuscation (bot protection)
- Password-protected EPK page
- Responsive design
- Bandcamp + Vimeo embed ready

## Setup

1. **Add your images** to `/images/`:
   - `portrait.jpg` – about section
   - `work-01.jpg` through `work-04.jpg` – gallery
   - Optimize: max 1200px wide, ~80-150KB each
   - Strip EXIF data before uploading

2. **Add EPK assets** to `/assets/`:
   - `lake-urumia-press-photos.zip`
   - `lake-urumia-logo.zip`
   - `lake-urumia-rider.pdf`
   - `lake-urumia-bio.txt`

3. **Update content**:
   - `index.html`: Replace placeholder text, gigs, social links
   - `epk.html`: Update bio, press quotes, tech specs
   - `js/main.js`: Change email parts (line 24-26)
   - `epk.html`: Change password (line ~170, default is `presskit2025`)

4. **Update embeds**:
   - Replace Bandcamp album ID in `index.html`
   - Replace Vimeo video ID in `index.html`

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin git@github.com:USERNAME/USERNAME.github.io.git
git push -u origin main
```

Then go to repo Settings → Pages → Select "main" branch.

## File Structure

```
lake-urumia/
├── index.html          # Main page
├── epk.html            # Password-protected press kit
├── css/
│   └── style.css       # All styles + theme variables
├── js/
│   └── main.js         # Theme toggle, email obfuscation
├── images/             # Your optimized images
│   ├── portrait.jpg
│   ├── work-01.jpg
│   └── ...
├── assets/             # EPK downloads
│   ├── press-photos.zip
│   ├── rider.pdf
│   └── ...
└── README.md
```

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
  --accent: #8b7355;        /* Berber ochre */
  --text-primary: #c8c4bf;  /* Light grey */
  --bg-deep: #080706;       /* Near black */
}
```

### Background Pattern

The geometric pattern is pure CSS (no images needed). Adjust in `.bg-layer::before`:

```css
/* Diamond grid density */
repeating-linear-gradient(45deg, ..., 40px, ...)  /* Change 40px for spacing */

/* Pattern opacity */
rgba(139, 115, 85, 0.015)  /* Increase for more visible pattern */
```

### EPK Password

In `epk.html`, find this line and change the base64 value:

```javascript
if (btoa(input) === 'cHJlc3NraXQyMDI1')
```

To generate a new one:
```javascript
btoa('yournewpassword')  // Run in browser console
```

## Notes

- EPK password is NOT secure (visible in source) – it's just a gate for casual visitors
- For real security, use Cloudflare Access or move to Netlify with password protection
- Images should have EXIF stripped before upload
- Test both themes before deploying
