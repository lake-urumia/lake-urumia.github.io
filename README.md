# Lake Urumia Portfolio

Minimal, dark portfolio site with Berber-inspired geometric patterns and decay aesthetics.

## Features

- Dark/light mode toggle (respects system preference, no flash on load)
- Fixed photographic background with geometric pattern overlay
- Framed "work" gallery that fills itself from `your-images/`
- Click-to-load Vimeo embed (player JS only loads on demand)
- Opt-in background audio (nothing downloads until the visitor presses play)
- Email obfuscation (bot protection)
- Password-protected EPK page with auto-generated photo previews
- Self-hosted fonts, social-sharing meta tags, reduced-motion support
- Responsive design

## Adding gallery images (the easy way)

Drop images into **`your-images/`** named `work-1.jpg`, `work-2.jpg`, `work-3.jpg`, ...
(numbered without gaps). The "work" section and menu link appear automatically.
Full instructions: `your-images/README.txt`.

## Setup checklist

1. **Social sharing domain**: in `index.html`, replace
   `https://lakeurumia.example.com` in the `og:image` tag with the real domain
   once the site is live.
2. **Background audio**: `audio/loop.mp3` is ~38 MB. It now only downloads
   when a visitor presses play, but it is still worth re-encoding:
   any free converter at 96-128 kbps brings it to roughly 1-2 MB per 2 minutes
   with no audible loss for ambient material.
3. **EPK password**: in `epk.html`, change the base64 value
   (`btoa('yournewpassword')` in the browser console generates a new one).
4. **Email**: parts live at the top of `initEmail()` in `js/main.js` and
   `initEpkEmail()` in `epk.html`.
5. **Press photos**: originals go in `images/press/`, then regenerate the
   small grid previews into `images/press/web/` (1000 px wide, quality ~82),
   e.g. with ImageMagick:
   `magick input.jpg -auto-orient -resize "1000x1000>" -quality 82 -strip images/press/web/input.jpg`
   and add the filename to `PRESS_PHOTOS` in `epk.html`.

## Deploy to GitHub Pages

```bash
git add .
git commit -m "update site"
git remote add origin git@github.com:USERNAME/USERNAME.github.io.git
git push -u origin main
```

Then go to repo Settings → Pages → Select "main" branch.

## File Structure

```
lake-urumia/
├── index.html          # Main page
├── epk.html            # Password-protected press kit
├── your-images/        # DROP GALLERY IMAGES HERE (work-1.jpg, work-2.jpg, ...)
├── css/
│   ├── style.css       # All styles + theme variables
│   └── fonts.css       # Self-hosted font declarations
├── fonts/              # Self-hosted woff2 files
├── js/
│   └── main.js         # Theme, gallery loader, video facade, audio
├── images/
│   ├── bg.jpg / bg.webp    # Background photo
│   ├── og-image.jpg        # Social sharing preview
│   ├── video-poster.jpg    # Click-to-play video poster
│   └── press/              # Full-res press photos (+ web/ previews)
└── audio/
    └── loop.mp3        # Background audio (opt-in playback)
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

The geometric overlay is pure CSS on top of `images/bg.jpg`. Adjust in `.bg-layer::before`:

```css
/* Diamond grid density */
repeating-linear-gradient(45deg, ..., 40px, ...)  /* Change 40px for spacing */

/* Pattern opacity */
rgba(139, 115, 85, 0.015)  /* Increase for more visible pattern */
```

### Picture frames

Gallery, press, and video images sit in a "gallery mount" frame (`.frame` in
`style.css`): dark matte, thin outer border, and an inner ochre line that
brightens on hover. Wrap any image in
`<div class="frame"><span class="frame-inner"><img ...></span></div>` to reuse it.

## Notes

- EPK password is NOT secure (visible in source), it's just a gate for casual visitors
- For real security, use Cloudflare Access or move to Netlify with password protection
- Images should have EXIF stripped before upload (the generated previews already are)
- Test both themes before deploying
