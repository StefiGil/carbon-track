---
name: EcoCalc Institutional
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1024px
  section-gap: 3rem
  element-gap: 1.5rem
  inline-gap: 1rem
  card-padding: 2rem
---

## Brand & Style

This design system is built upon a **Corporate Modern** aesthetic tailored for institutional and environmental reporting. The brand personality is authoritative yet accessible, conveying reliability and precision. It prioritizes clarity and ease of data entry to minimize cognitive load for administrators and analysts.

The visual style utilizes a mix of minimalism and soft tonal layering. Key characteristics include:
- **Professionalism:** A structured layout that mirrors official documentation.
- **Sustainability:** Subtle use of emerald tones to signify ecological focus without appearing overly "organic."
- **Institutional Trust:** High-contrast typography and generous whitespace that evoke the feeling of a modern academic or governmental portal.

## Colors

The palette is anchored by high-contrast neutrals and a signature environmental green. 

- **Primary:** Emerald Green (#10b981) is reserved for primary actions, success states, and active selection indicators.
- **Secondary/Text:** Dark Navy/Black (#0f172a) provides a strong foundation for headlines and primary text, ensuring maximum legibility.
- **Backgrounds:** A light blue-gray (#f8fafc) is used for the page foundation to reduce eye strain compared to pure white.
- **Surfaces:** Pure white (#ffffff) is used exclusively for interactive cards and containers to make them "pop" against the background.
- **Accents:** A soft green tint (#ecfdf5) is utilized for informational banners and selected states to provide a gentle visual cue.

## Typography

The design system utilizes **Inter** for its utilitarian and highly readable characteristics. The type hierarchy is strictly defined to guide the user through complex configuration steps.

- **Headlines:** Use tight letter spacing and heavy weights to establish clear section starts.
- **Body Text:** Uses a slightly lighter gray to differentiate descriptive content from interactive labels.
- **Functional Labels:** Used for form headers and selection metadata, typically rendered in a medium-gray bold weight to provide structure without competing with user data.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the main content area to maintain an institutional "report" feel. The central configuration card is restricted to a maximum width of 1024px to ensure line lengths remain optimal for reading.

- **Rhythm:** A 4px/8px base scaling system is used for all internal paddings.
- **Hierarchy:** Large vertical gaps (48px+) separate the header/intro from the main configuration tool.
- **Groupings:** Form elements are grouped within the white card container using horizontal dividers and 24px internal spacing to separate distinct configuration phases (e.g., Institution Type vs. Period Selection).

## Elevation & Depth

Depth is used sparingly to signify interactivity and layering. 

- **Level 0 (Foundation):** The light gray background serves as the canvas.
- **Level 1 (Containers):** Main interaction cards use a subtle, large-radius ambient shadow (`0 10px 25px -5px rgba(0, 0, 0, 0.05)`) to lift them from the background.
- **Level 2 (Interactions):** Dropdown menus and hover states on selection cards use a slightly more pronounced shadow to indicate they are "above" the container.
- **Selection:** Instead of depth, "active" cards use a primary-colored border (1px or 2px) to denote focus.

## Shapes

The shape language is consistently **Rounded**, striking a balance between modern friendliness and professional structure.

- **Primary Cards:** Use `rounded-xl` (1.5rem / 24px) for the large container to soften the institutional feel.
- **Inputs & Buttons:** Use `rounded-lg` (0.5rem / 8px) to provide a crisp, clickable appearance.
- **Toggles:** The outer container uses `rounded-lg`, while the internal sliding pill or active state maintains the same radius for a nested, harmonious look.

## Components

### Primary Buttons
Large, high-contrast buttons using the Emerald Green (#10b981) background and white text. They include a trailing icon (e.g., an arrow) to imply progression.

### Selection Cards
Used for choosing emission categories (Electricity, Gas, Fuel). 
- **Default State:** Subtle 1px gray border, white background.
- **Selected State:** 1.5px Emerald Green border with a light emerald tint background. Includes a checkmark icon in the top right corner.
- **Icons:** Thin-stroke line icons positioned in the top left.

### Toggle Buttons (Segmented Control)
Used for "Time Analysis Mode." A single container with a light background where the active state is represented by a white "raised" card segment.

### Dropdowns
Clean input fields with a chevron icon. The label sits above the input in a smaller, bold, gray font.

### File Upload Zones (Proposed)
Dashed border containers using the light gray/blue background, featuring a centered upload icon and primary-colored text link to "Browse files." Consistent with the selection card radius.