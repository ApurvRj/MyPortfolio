---
name: Obsidian Synthetics
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#009bd1'
  on-tertiary-container: '#002d40'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-metric:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  label-tag:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-micro:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets engineering leaders, technical recruiters, and collaborators seeking world-class software craftsmanship. It conveys deep technical rigor, architectural clarity, and hyper-polished restraint. 

The aesthetic fuses **Modern Technical Minimalism** with **Subtle Glassmorphism and Luminescent Borders**:
- Canvas surfaces rely on infinite void tones (deep obsidian `#0a0c10`) layered with charcoal slate containers (`#13171f`).
- Structural cues lean on micro-hairline borders (1px) with low-opacity alpha channels, accented by pinpoint, highly saturated hits of electric indigo/violet and terminal emerald.
- Visual rhythm prioritizes information density without visual noise: code artifacts, metric callouts, and technical primitives read as high-precision instruments rather than decorative widgets.

## Colors

The palette is tuned specifically for deep dark mode fidelity, maintaining strict contrast ratios while preventing eye fatigue across extended viewing sessions:

- **Primary (`#6366f1` / Electric Indigo):** Anchors focal interactive elements, primary links, terminal prompts, and active tab indicators.
- **Secondary (`#10b981` / Terminal Emerald):** Dictates live operational states, system telemetry, success indicators, deployment statuses, and high-impact performance metrics.
- **Tertiary (`#38bdf8` / Cyan Beam):** Reserved for syntactic highlights, structural subheaders, and telemetry graphs.
- **Neutral Canvas (`#0a0c10` / Deep Obsidian):** The foundational backdrop.
- **Neutral Container Surfaces (`#13171f`, `#1b2230`):** Elevated card backgrounds and grouped utility panels.
- **Borders & Dividers:** Built using `rgba(255, 255, 255, 0.08)` for standard boundaries and `rgba(99, 102, 241, 0.35)` for focused states and card hover glows.
- **Text Tones:** Pure White (`#f8fafc`) for headlines, Slate Mist (`#94a3b8`) for running technical prose, and Muted Graphite (`#475569`) for timestamps and metadata.

## Typography

The typography pairs **Inter** for natural semantic legibility with **JetBrains Mono** for developer context, data metrics, status indicators, and syntax representation:

- Apply negative tracking (`-0.02em` to `-0.03em`) on large display headers to tighten visual density and match modern developer IDE title bars.
- Render all technical metadata, dates, commit hashes, badges, metrics, and technology categories in JetBrains Mono.
- Set uppercase styling with `0.04em` to `0.06em` letter spacing for `label-tag` and `label-micro` to create distinction between technical labels and prose.

## Layout & Spacing

The layout is structured upon a **12-column responsive fluid grid** contained within a max-width envelope of `1280px` for wide desktops and `960px` for dense reading/repository feeds:

- **Desktop (1024px+):** 12 columns with 24px (`1.5rem`) gutters and section outer margins of 32px (`2rem`). Hero sections and portfolio case studies span full width or 8/4 splits.
- **Tablet (768px - 1023px):** 8 columns with 20px gutters and 24px margins. Sidebar metrics collapse into top-level horizontal scrolling rows or stacked metrics panels.
- **Mobile (< 768px):** 4 columns with 16px (`1rem`) gutters and 20px (`1.25rem`) margins. Multi-column project cards collapse strictly to single-column full-width stacks.

Component spacing obeys a 4px/8px modular rhythm (`space-xs` through `space-xl`) for consistent padding across cards, badges, and terminal blocks.

## Elevation & Depth

Depth is established through translucent dark layers and luminous borders rather than drop shadows:

- **Base Layer (Elevation 0):** Background void `#0a0c10` with an optional micro-grid or subtle dot matrix pattern generated via SVG (`rgba(255, 255, 255, 0.03)`).
- **Surface Layer (Elevation 1):** Charcoal slate `#13171f` layered with `backdrop-filter: blur(12px)`. Enclosed by a 1px border of `rgba(255, 255, 255, 0.07)`.
- **Raised / Hover Layer (Elevation 2):** Elevated cards, code inspectors, and interactive modals shift surface color to `#1b2230` with `border-color: rgba(99, 102, 241, 0.3)`. Cards gain an ambient outer glow: `box-shadow: 0 0 24px -4px rgba(99, 102, 241, 0.12)`.
- **Active / Accent Glow:** Active statuses or selected states utilize targeted colored halos: emerald elements project `0 0 16px -2px rgba(16, 185, 129, 0.25)` to indicate operational uptime.

## Shapes

The design system maintains a controlled **Rounded** geometry (`roundedness: 2`, base radius `0.5rem` / `8px`):

- **Interactive Triggers & Inputs:** Standard buttons, text inputs, search fields, and code snippets use `8px` (`0.5rem`).
- **Cards & Architectural Containers:** Project panels, preview shells, and terminal displays use `16px` (`rounded-lg` / `1rem`).
- **Pill Primitives:** Status dots, operational live badges, and select tech stack chips enforce fully rounded pill contours (`9999px`) to contrast against rectangular cards.

## Components

### Buttons
- **Primary:** Solid `#6366f1` background, white text (`Inter`, 14px, weight 600), subtle inner border highlight `inset 0 1px 0 rgba(255,255,255,0.2)`. On hover: surface brightens to `#4f46e5` with outer glow `0 0 16px rgba(99, 102, 241, 0.35)`.
- **Secondary / Ghost:** Transparent background with `1px` border of `rgba(255, 255, 255, 0.12)`, text `#94a3b8`. On hover: surface transitions to `rgba(255, 255, 255, 0.05)`, border shifts to `rgba(255, 255, 255, 0.24)`, text shifts to `#f8fafc`.
- **Icon / Code Actions:** Square 36x36px icon buttons with inline tooltips, styled as secondary ghosts for actions like "Copy Snippet" or "View Source".

### Tech Stack Tags & Badges
- **Tech Stack Tag:** JetBrains Mono, uppercase, 11px. Background `rgba(255, 255, 255, 0.03)`, border `1px solid rgba(255, 255, 255, 0.08)`, text `#94a3b8`. On card hover: border adapts subtly to the primary color tint.
- **Operational Status Badge:** Pill shape containing an animated 6px pulse dot (`#10b981`), background `rgba(16, 185, 129, 0.08)`, border `1px solid rgba(16, 185, 129, 0.25)`, text `#10b981` ("AVAILABLE FOR CONTRACT" or "SYSTEM OPERATIONAL").

### Cards & Project Showcase Containers
- Framed in `#13171f` with a 1px border `rgba(255, 255, 255, 0.07)` and 16px border-radius.
- Top card header bar optionally features faux window controls (`#ef4444`, `#eab308`, `#10b981` dots) or file path breadcrumbs in `label-micro`.
- Hover interactions invoke a gentle border illumination transition to `rgba(99, 102, 241, 0.4)` and a `2px` vertical upward translate.

### Lists & Repository Logs
- Divided by 1px rules of `rgba(255, 255, 255, 0.05)`.
- Each list item displays title, branch/commit tag, relative timestamp, and status tag aligned along tabular figures for zero jitter.

### Input Fields & Terminal Search
- Background `#0d1117`, border `1px solid rgba(255, 255, 255, 0.1)`, font `Inter` or `JetBrains Mono` depending on search type (standard vs. command palette).
- Preceded by a monochromatic prefix indicator (`$` or `>`). Focus states project a sharp 1px ring in `#6366f1` without standard browser outlines.

### Code Snippets & Telemetry Blocks
- Dark code container with line numbers highlighted in `#475569`.
- Integrated top-right micro copy button with checkmark confirmation feedback state.