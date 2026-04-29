# Design System: Future Engineering v1.0

The **Future Engineering** design system is a high-fidelity, monochromatic visual framework designed for premium electronics storefronts. It prioritizes technical precision, legibility, and a sophisticated "industrial tech" aesthetic.

## 1. Visual Philosophy
- **Monochromatic Purity**: Elimination of accent colors (Blues/Reds) in favor of high-contrast Black and White.
- **Technical Documentation**: Interfaces should feel like a "System Protocol" or "Hardware Manual."
- **High-Fidelity Interaction**: Use of heavy tracking, italicized headers, and smooth micro-animations.

---

## 2. Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary Black** | `#000000` | Backgrounds, Primary Buttons, Main Text |
| **Terminal Gray** | `#111827` | Section Headers, Secondary Containers |
| **Hardware White** | `#FFFFFF` | Body Background, Primary Contrast |
| **Logic Gray** | `#F9FAFB` | Card Backgrounds, Form Inputs |
| **Subtle Stroke** | `#F3F4F6` | Borders, Dividers |
| **Metadata Gray** | `#9CA3AF` | Captions, Technical Details |

---

## 3. Typography
- **Headings**: `font-black`, uppercase, `tracking-tighter`.
  - *Italicization*: Used for secondary words in headings to create a "engineered" contrast (e.g., `Future *Engineering*`).
- **Body**: `font-medium`, `tracking-tight`.
- **Technical/Metadata**: `font-black`, uppercase, `tracking-[0.3em]`, `text-[10px]`.

---

## 4. Components
### Product Cards
- **Radius**: `rounded-[32px]` (Reduced from 48px for a sharper technical feel).
- **Background**: White on Gray hover.
- **Shadow**: Subtle industrial shadows (e.g., `shadow-2xl shadow-gray-200/50`).

### Buttons
- **Primary**: Solid Black, `rounded-2xl`, white text, uppercase.
- **Secondary**: Transparent with 1px border (`border-black/white`).
- **Interaction**: `hover:scale-105`, `active:scale-95`.

### Inputs
- **Style**: Soft Gray background (`bg-gray-50`), internal border on focus.
- **Corner Radius**: `rounded-2xl`.

---

## 5. Mobile Strategy
- **Navigation**: Hidden sidebar, replaced by contextual top-scroll category filters.
- **Cards**: Single column or tight double column to maximize hardware visualization.
- **Headers**: Dynamic scaling of `text-8xl` to `text-5xl`.
