# Style & Design System Reference

## 1. Theme CSS Variables

Theming is done entirely via CSS custom properties on `:root` and `[data-theme]`:

```css
:root {
  --amin-primary: #1e3a8a;
  --amin-accent: #3b82f6;
  --amin-radius: 12px;
}

[data-theme='green'] { --amin-primary: #065f46; --amin-accent: #10b981; }
[data-theme='dark'] { --amin-primary: #1e293b; --amin-accent: #64748b; }
[data-theme='slate'] { --amin-primary: #475569; --amin-accent: #94a3b8; }
[data-theme='purple'] { --amin-primary: #7e22ce; --amin-accent: #a855f7; }
[data-theme='orange'] { --amin-primary: #c2410c; --amin-accent: #f97316; }
```

## 2. Tailwind v4 Theme Extension

```css
@theme {
  --font-sans: "Cairo", ui-sans-serif, system-ui, sans-serif;
  --font-digital: "Orbitron", ui-monospace, SFMono-Regular, monospace;
  --font-dotted: "Codystar", cursive;
  --color-amin-blue: var(--amin-primary);
  --color-amin-light: #f1f5f9;
  --color-amin-accent: var(--amin-accent);
  --radius-lg: var(--amin-radius);
  --radius-md: calc(var(--amin-radius) * 0.75);
  --radius-xl: calc(var(--amin-radius) * 1.5);
}
```

## 3. Utility CSS Classes

| Class | Purpose |
|---|---|
| `amin-card` | White card with border + shadow + rounded corners + overflow hidden |
| `amin-input` | Full-width input with border, focus ring, transition |
| `amin-btn-primary` | Blue filled button |
| `amin-btn-secondary` | White bordered button |
| `glass-effect` | Transparent glassmorphism variant (applied to `<html>`) |
| `gradient-bg` | Animated gradient background variant (applied to `<html>`) |
| `custom-scrollbar` | Styled scrollbar (WebKit only) |
| `no-print` | Hide element during print |

## 4. Print Styles

```css
@media print {
  aside, header, button, .no-print { display: none !important; }
  main { padding: 0 !important; margin: 0 !important; }
  .amin-card { border: none !important; box-shadow: none !important; padding: 0 !important; }
  body { background: white !important; margin: 1cm !important; }
  .page-break { page-break-before: always; }
}
```

## 5. Animation Patterns

### Spinner Loading
```tsx
<div className="animate-spin rounded-full h-12 w-12 border-4 border-amin-blue border-t-transparent" />
```

### Rotating Border
```css
@keyframes rotate-border {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-rotate-border { animation: rotate-border 4s linear infinite; }
```

### Blink Animation
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.animate-blink { animation: blink 1s infinite; }
```

### Gradient Background Animation
```css
@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## 6. Focus & Interaction Styles

- Input focus: `ring-4 ring-amin-accent/30 border-amin-accent` + scale + shadow
- Card focus-within: `border-amin-accent/30 shadow-md`
- Table row focus-within: `bg-blue-50/50`
- Button hover: scale + color transition
- Modal backdrop: `bg-black/40 backdrop-blur-sm`

## 7. Shadow Depths

```css
/* Card: */ shadow-sm
/* Modal: */ shadow-2xl
/* Input focus: */ shadow-xl
/* Dropdown: */ shadow-xl
```

## 8. Border Radius Design

- Cards: `rounded-lg` (12px default, adjustable via `--amin-radius`)
- Buttons: `rounded-md`
- Inputs: `rounded-md`
- Modals: `rounded-2xl`
- Icons in cards: `rounded-xl`
- Badges: `rounded-full`

## 9. Font Stack

- Primary: "Cairo" (Arabic-optimized sans-serif)
- Digital/monospace: "Orbitron" (for financial numbers)
- Decorative: "Codystar" (dotted/cursive for special display)
- Fallback: `ui-sans-serif, system-ui, sans-serif`

## 10. Color Token Map

| Token | Default | Usage |
|---|---|---|
| `amin-blue` | `#1e3a8a` | Primary buttons, active nav, card accents |
| `amin-light` | `#f1f5f9` | Page background |
| `amin-accent` | `#3b82f6` | Focus rings, highlights |
| `slate-900` | `#0f172a` | Headings, primary text |
| `slate-600` | `#475569` | Secondary text |
| `slate-400` | `#94a3b8` | Placeholder, disabled |
| `slate-100` | `#f1f5f9` | Borders, dividers |
| `slate-50` | `#f8fafc` | Light backgrounds |
| `green-600` | `#16a34a` | Positive values, success |
| `red-600` | `#dc2626` | Negative values, errors, delete |
| `amber-600` | `#d97706` | Warnings |
| `white` | `#ffffff` | Card backgrounds |
