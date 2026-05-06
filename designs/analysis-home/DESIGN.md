---
name: Carbon Education System
colors:
  surface: '#f4faff'
  surface-dim: '#cbdde7'
  surface-bright: '#f4faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e7f6ff'
  surface-container: '#dff1fb'
  surface-container-high: '#d9ebf5'
  surface-container-highest: '#d4e5ef'
  on-surface: '#0d1e25'
  on-surface-variant: '#3f4a3c'
  inverse-surface: '#23333a'
  inverse-on-surface: '#e2f3fd'
  outline: '#6f7a6b'
  outline-variant: '#becab9'
  surface-tint: '#006e1c'
  primary: '#006e1c'
  on-primary: '#ffffff'
  primary-container: '#4caf50'
  on-primary-container: '#003c0b'
  inverse-primary: '#78dc77'
  secondary: '#556158'
  on-secondary: '#ffffff'
  secondary-container: '#d9e6da'
  on-secondary-container: '#5b675e'
  tertiary: '#286b33'
  on-tertiary: '#ffffff'
  tertiary-container: '#66aa6a'
  on-tertiary-container: '#003c12'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#94f990'
  primary-fixed-dim: '#78dc77'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005313'
  secondary-fixed: '#d9e6da'
  secondary-fixed-dim: '#bdcabe'
  on-secondary-fixed: '#131e17'
  on-secondary-fixed-variant: '#3e4a41'
  tertiary-fixed: '#abf4ac'
  tertiary-fixed-dim: '#90d792'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#07521d'
  background: '#f4faff'
  on-background: '#0d1e25'
  surface-variant: '#d4e5ef'
typography:
  h1:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  caption:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is anchored in the intersection of environmental stewardship and institutional professionalism. It is designed to evoke a sense of clarity, hope, and scientific rigor for students, faculty, and administrators. 

The visual direction follows a **Modern Minimalist** movement, prioritizing functional airiness over decorative elements. By utilizing a "High-Whites" strategy, the design system ensures that data-heavy calculation interfaces remain digestible and non-intimidating. The aesthetic is punctuated by high-quality organic geometry, conveying a friendly yet authoritative tone that suits an educational environment.

## Colors

The palette is derived from nature and classic academic materials. 

- **Primary Green (#4CAF50):** Used for primary actions, success states, and key data points. It represents growth and positive environmental impact.
- **Mint Secondary (#E8F5E9):** Used for large surface areas, background tints, and subtle highlights to reduce visual noise.
- **Professional Slate (#37474F):** Reserved for high-contrast typography and iconography, providing a grounded, serious foundation that ensures accessibility.
- **Semantic Accents:** Tertiary greens are used for data visualization gradients, while a soft red is reserved for high-emission alerts or errors.

## Typography

This design system utilizes **Lexend** for all levels of hierarchy. Originally designed to reduce visual stress and improve reading proficiency, Lexend is the ideal choice for an educational tool that requires focus and comprehension.

Headlines use a tighter letter-spacing and heavier weights to establish a confident hierarchy. Body text is set with generous line heights (1.5 - 1.6) to ensure that technical explanations and data descriptions remain legible during long reading sessions. Labels and interactive elements use a medium weight to distinguish them from static content.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a centered container with a maximum width of 1200px to maintain readability on desktop screens.

A strict 8px spacing rhythm governs all margins and paddings. To achieve the "light and airy" feel requested, the design system mandates exaggerated vertical white space (using the `lg` and `xl` tokens) between major sections. Elements within cards should use the `md` (24px) padding to ensure content does not feel cramped against the borders.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Low-Contrast Outlines** rather than heavy color blocks. 

- **Level 0 (Background):** Pure white (#FFFFFF) or the Soft Mint tint (#E8F5E9) for section backgrounds.
- **Level 1 (Cards/Containers):** White surfaces with a 1px border in a 10% opacity version of Slate Gray. A very soft, diffused shadow (0px 4px 20px, 4% opacity Slate) is applied to give a slight lift.
- **Level 2 (Interactive/Floating):** Used for dropdowns or modals. These use a more pronounced but still subtle shadow (0px 8px 30px, 8% opacity Slate) to indicate immediate priority.

## Shapes

The design system employs a **Rounded** shape language to maintain a friendly and modern approachable feel.

- **Standard Elements:** Buttons, input fields, and small chips utilize an 8px radius.
- **Large Containers:** Content cards and feature blocks use a 12px or 16px radius to emphasize the "soft" nature of the design.
- **Progress Indicators:** Circular elements and progress bars should use fully rounded (pill) ends to contrast against the structured grid of the layout.

## Components

### Buttons
- **Primary:** Filled Primary Green (#4CAF50) with White text. 8px rounded corners.
- **Secondary:** Mint Secondary (#E8F5E9) background with Primary Green text. No border.
- **Ghost:** Transparent background with a subtle Slate border for less important actions.

### Input Fields
Inputs should be clean with a 1px Slate border at 20% opacity. Upon focus, the border transitions to Primary Green with a 2px outer "glow" (a soft shadow in the primary color).

### Category Cards
Used for categories like Electricity, Gas, and Fuel. These cards feature a thin-lined icon (2px stroke) in Slate Gray, a bold H3 title, and a Mint-tinted background when selected.

### Chips & Tags
Small 8px rounded badges used for status indicators (e.g., "Verified," "Pending"). Use low-saturation background tints with high-saturation text for readability.

### Icons
Utilize 24px grid-based, thin-lined icons. Strokes should be consistent at 1.5px or 2px. Avoid filled icon states unless indicating an active toggle.