# भजनामृत — Bhajan App: Full Guide & Design Reference

## What This App Does
**भजनामृत** (Bhajanamrit) is a devotional hymn (bhajan) reader app built for bhakts of **श्री श्री बाबा श्री जी**, with a collection of **~285 bhajan PDFs**.

### Core Features
| Feature | Description |
|---|---|
| **Bhajan List** | Shows all ~285 bhajans in a searchable list |
| **PDF Viewer** | Opens a bhajan PDF in a full-screen react-pdf viewer |
| **Fuzzy Search** | Uses Fuse.js to search bhajans by name |
| **Download Page** | Links to Android APK download from GitHub Releases |

### Routes
| Route | File | Purpose |
|---|---|---|
| `/` | `page.tsx` | Redirects to `/bhajan` |
| `/bhajan` | `bhajan/page.tsx` | Main list of all bhajans |
| `/bhajan/[id]` | `bhajan/[id]/page.tsx` | PDF viewer for a specific bhajan |
| `/download` | `download/page.tsx` | Android APK download + instructions |

---

## App Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **PDF Rendering**: `react-pdf` (v9) with `pdfjs-dist` worker from CDN
- **Search**: `fuse.js` (fuzzy search)
- **Icons**: `lucide-react`

### Data
- **`/public/filesList.json`** — JSON array with `id`, `name`, `fileName` for each bhajan
- **`/public/bhajanPDF/`** — All ~285 PDF files stored locally (served as static assets)

### Key Components
| File | Role |
|---|---|
| `src/app/bhajan/page.tsx` | Home list with search, header, bhajan cards |
| `src/app/bhajan/[id]/page.tsx` | Bhajan detail — finds item by ID, renders header + PDF |
| `src/app/bhajan/[id]/headercomp.tsx` | Back-button header with bhajan name |
| `src/app/_comp/comp2.tsx` | `react-pdf` Document + Page renderer |
| `src/app/_comp/_compo.tsx` | Older iframe PDF viewer (not actively used) |
| `src/app/download/page.tsx` | Download page for Android APK |

---

## Design Tokens (Current)
| Token | Value |
|---|---|
| Primary Red | `#FF4C4C` (Tailwind: `primary-primaryRed`) |
| Dark Red (text) | `#ab3116` |
| Background | `bg-yellow-100` |
| Card background | `#FFF5E1` |
| Header | Red bar, 60px height |

---

## UX Issues Identified (to fix in redesign)

### Critical Issues for 70+ Year Old Users
1. **Font sizes too small** — List items are just 50px tall with small text. For 70+ users, minimum touch targets should be 64–80px, and text 18–22px minimum.
2. **No font size control** — Users cannot adjust text size.
3. **Search UX confusing** — The search toggle (icon → input field) is non-obvious. Older users prefer a visible search bar.
4. **PDF zoom** — The PDF viewer has no zoom controls. 70+ year olds need larger text.
5. **No clear "back" affordance** — The back chevron is small.
6. **No loading state** — The PDF loads without any spinner/progress.
7. **Mobile grid** — Currently `grid-cols-1` on mobile is good, but card height is too small.
8. **Download page** — Good structure, but text is too small; APK info not immediately clear.

### Nice-to-Haves
- **Alphabet/Category filter** — Quick jump to bhajans starting with a letter.
- **Favorite bhajans** — Star/bookmark a bhajan for quick access.
- **Recently viewed** — Show last 3–5 bhajans on the home screen.
- **Dark mode toggle** — Some elderly users prefer high contrast.

---

## Mobile-First Redesign Plan

### Design Philosophy for 70+ Users
> "Simple. Big. Clear. Immediate."

- **Minimum touch target**: 72px height per list item
- **Font size**: Body 18px minimum; bhajan names 20px; headings 26px+
- **Color contrast**: WCAG AA minimum (4.5:1 ratio)
- **No hover-only affordances** — Everything must be tap-friendly
- **Visible search bar** — Always visible, not hidden behind icon
- **Large back button** — Minimum 44px, clearly labeled
- **PDF zoom controls** — Persistent zoom +/- buttons
- **Loading skeleton** — Visual feedback during PDF load

### Color Palette (Enhanced)
| Role | Color | Rationale |
|---|---|---|
| Primary | `#C0392B` (Deep Saffron Red) | Sacred, warm, high-contrast |
| Primary Dark | `#922B21` | Hover/active states |
| Gold Accent | `#F0A500` | Auspicious yellow-gold |
| Background | `#FDF6E3` | Warm cream — easy on eyes |
| Card | `#FFFFFF` | High contrast cards |
| Text Primary | `#1A1A1A` | Near-black for readability |
| Text Secondary | `#5D4037` | Warm brown |

### Layout Structure

#### `/bhajan` (Home/List Page)
```
┌─────────────────────────────────┐
│  [Logo]  भजनामृत  [Download ↓] │  ← Sticky header, 70px
├─────────────────────────────────┤
│  🔍 [ Search bhajans...       ]│  ← Always-visible search bar
├─────────────────────────────────┤
│  श्री श्री बाबा श्री जी         │  ← Subtitle
│  आत्म विभोर के सूत्र             │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ 📄  Aa jaiyo dwar...      │  │  ← Card: 72px height, 20px text
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 📄  Aagaye hai ganpati... │  │
│  └───────────────────────────┘  │
│  ... (all bhajans)              │
└─────────────────────────────────┘
```

#### `/bhajan/[id]` (PDF Viewer Page)
```
┌─────────────────────────────────┐
│  [← वापस]  Bhajan Name  [ + - ]│  ← Sticky, 70px, zoom controls
├─────────────────────────────────┤
│                                 │
│         PDF Content             │  ← Full remaining height
│         (scrollable)            │
│                                 │
└─────────────────────────────────┘
```

#### `/download` (Download Page)
```
┌─────────────────────────────────┐
│  [← वापस]  Download App        │
├─────────────────────────────────┤
│                                 │
│       भजनामृत Logo              │
│                                 │
│   [ 📥 Android App डाउनलोड ]   │  ← Large CTA button
│                                 │
│   Installation Guide (steps)    │
│                                 │
└─────────────────────────────────┘
```

---

## File Change Summary

| File | Change Type | What |
|---|---|---|
| `src/app/globals.css` | MODIFY | Font imports, CSS variables, base styles |
| `tailwind.config.ts` | MODIFY | Extended color tokens |
| `src/app/layout.tsx` | MODIFY | Font loading, meta tags |
| `src/app/bhajan/page.tsx` | MODIFY | Full redesign — visible search, large cards |
| `src/app/bhajan/[id]/page.tsx` | MODIFY | Zoom state, pass to viewer |
| `src/app/bhajan/[id]/headercomp.tsx` | MODIFY | Larger back button, zoom controls |
| `src/app/_comp/comp2.tsx` | MODIFY | Accept zoom level prop, show loading |
| `src/app/download/page.tsx` | MODIFY | Larger text, better Hindi labels |

---

## Accessibility Notes
- All interactive elements must have `aria-label`
- Color contrast checked against WCAG AA
- Font: **Noto Sans Devanagari** for Hindi text + **Hind** as fallback
- No animations that could cause disorientation (only subtle fades)
- Tap areas minimum 72×72px on mobile
