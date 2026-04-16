

## Redesign "Chi Siamo" — Scroll-Illuminated Text with Images/Logos

### What changes

**Keep only 4 features**, rewritten and with optional image/logo support:

1. **Esperienza Internazionale** — merged with "Grandi Opere Civili" content. Mentions international projects (Arabia Saudita, viadotti, raccordi) and large-scale civil works. Optional: photo of a major project.
2. **Opere Pubbliche** — Roma Capitale, ministeri, ENAV, etc. Optional: photo or client logos.
3. **Impiantistica Avanzata** — fotovoltaico, gruppi elettrogeni, cabine MT/BT. Optional: photo.
4. **Qualità Certificata** (renamed) — mentions ISO 45001, 9001, 14001, SA 8000, SOA. Displays certification logos/badges inline next to the text.

### Design approach (inspired by indigo.ai / magnetti.it)

Each feature becomes a **full-width row** taking ~50vh of vertical space. As the user scrolls:

- Text color transitions from **muted gray → primary blue** when centered
- Scale animates **0.9 → 1.05 → 0.9**
- Opacity animates **0.2 → 1 → 0.2**
- A vertical progress line fills on the left side

Each row has a **two-column layout**:
- **Left**: large title + description text (animated)
- **Right**: optional image, photo, or row of certification logos

For "Qualità Certificata", the right side shows a grid of certification badge images (ISO, SOA, SA 8000) that fade in when the section is active.

### Technical details

**Files changed:**
- `src/components/AboutSection.tsx` — Full rewrite:
  - New `features` array with an optional `images` field (array of `{src, alt}`)
  - Each feature rendered as a `useRef` + `useScroll`/`useTransform` driven block
  - Two-column layout: text left, media right
  - Certification logos stored in `/public/loghi-certificazioni/` (placeholder paths for now, user will add actual files)
  - Vertical progress line on the left using scroll-driven fill

**New assets (placeholder paths):**
- `/public/loghi-certificazioni/iso-9001.png`
- `/public/loghi-certificazioni/iso-14001.png`
- `/public/loghi-certificazioni/iso-45001.png`
- `/public/loghi-certificazioni/sa-8000.png`
- `/public/loghi-certificazioni/soa.png`

User can later replace these with actual logo files. The component will gracefully handle missing images.

No other files affected.

