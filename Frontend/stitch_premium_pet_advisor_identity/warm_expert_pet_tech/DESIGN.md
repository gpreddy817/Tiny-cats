---
name: Warm & Expert Pet Tech
colors:
  surface: '#fff8f6'
  surface-dim: '#ead6d1'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e4'
  surface-container-high: '#f9e4df'
  surface-container-highest: '#f3ded9'
  on-surface: '#241916'
  on-surface-variant: '#57423d'
  inverse-surface: '#3a2e2b'
  inverse-on-surface: '#ffede9'
  outline: '#8a716c'
  outline-variant: '#dec0b9'
  surface-tint: '#a33d23'
  primary: '#a33d23'
  on-primary: '#ffffff'
  primary-container: '#e76f51'
  on-primary-container: '#590f00'
  inverse-primary: '#ffb4a2'
  secondary: '#8e4e14'
  on-secondary: '#ffffff'
  secondary-container: '#ffab69'
  on-secondary-container: '#783d01'
  tertiary: '#43664d'
  on-tertiary: '#ffffff'
  tertiary-container: '#779b7f'
  on-tertiary-container: '#0f321d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a2'
  on-primary-fixed: '#3c0700'
  on-primary-fixed-variant: '#83260e'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb780'
  on-secondary-fixed: '#2f1400'
  on-secondary-fixed-variant: '#6f3800'
  tertiary-fixed: '#c5eccc'
  tertiary-fixed-dim: '#aad0b1'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#2c4e36'
  background: '#fff8f6'
  on-background: '#241916'
  surface-variant: '#f3ded9'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The brand personality centers on the "Invisible Expert"—an AI-powered advisor that feels like a trusted human specialist rather than a machine. The target audience includes discerning pet owners and prospective adopters who value premium quality, clinical expertise, and emotional warmth.

The design style is a blend of **Modern Corporate** and **Soft Minimalism**. It prioritizes clarity and whitespace (inspired by Apple) while using tactile, organic elements (inspired by Airbnb) to create a welcoming atmosphere. We avoid "techy" tropes like neon glows or dark-mode AI aesthetics in favor of a bright, sun-drenched palette that evokes a comfortable home environment. The emotional response should be one of immediate relief, trust, and quiet joy.

## Colors
The palette is rooted in earth tones to ground the digital experience in the physical world of pet care.
- **Primary (Burnt Orange):** Used for key actions and brand moments. It provides energy without the aggression of pure red.
- **Secondary (Warm Amber):** Used for highlighting features, secondary buttons, and decorative accents.
- **Accent (Sage Green):** Represents the "advisor" aspect—calm, organic, and professional. Use this for informative tags or subtle backgrounds.
- **Neutral/Background:** We use a warm off-white (#FFFDF8) for the global background to reduce eye strain and increase the "homely" feel, while pure white is reserved for cards and surface elements to create clear elevation.

## Typography
We utilize **Sora** for headings to provide a distinctive, geometric, and friendly character. Its wide stance and rounded terminals mirror the "playful yet premium" brand promise. For all functional and long-form text, **Inter** is used for its exceptional legibility and neutral, systematic tone.

Maintain a generous line-height to ensure the UI feels airy and unhurried. Use `display-lg` sparingly for hero sections, and ensure all mobile transitions downsize font scales to prevent awkward text wrapping on smaller devices.

## Layout & Spacing
The layout follows a **Fixed Grid** approach on desktop (max 1280px) and a **Fluid Grid** on mobile. We use an 8px base unit for all spacing decisions to ensure a harmonious rhythm.

- **Desktop:** 12-column grid with 24px gutters.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins.

We emphasize "breathable" layouts. Avoid packing too much information into a single view. Use `xxl` spacing between major sections to allow the user's eye to rest, mimicking the spaciousness of high-end editorial magazines.

## Elevation & Depth
This design system avoids heavy shadows. Instead, it uses **Ambient Shadows** and **Tonal Layers** to create a sense of soft depth.

1.  **Level 0 (Background):** #FFFDF8. The canvas.
2.  **Level 1 (Cards/Surfaces):** Pure #FFFFFF with a subtle, very diffused shadow: `0px 4px 20px rgba(231, 111, 81, 0.04)`. Note the slight primary color tint in the shadow to maintain warmth.
3.  **Level 2 (Modals/Popovers):** Higher elevation with a more pronounced shadow: `0px 12px 40px rgba(0, 0, 0, 0.08)`.
4.  **Glassmorphism:** Use only for persistent navigation bars or floating action overlays. Apply a `backdrop-filter: blur(12px)` with a `white / 70%` opacity background and a thin `1px` white border at 50% opacity.

## Shapes
The shape language is dominated by large, friendly radii. Buttons and cards should feel "squishy" and safe to touch. 
- **Standard Radius:** 16px (rounded-lg).
- **Large Radius:** 24px (rounded-xl) for main content containers and hero images.
- **Full Radius:** Used for tags, chips, and profile avatars.

Avoid sharp corners entirely, as they conflict with the organic, pet-friendly nature of the brand.

## Components
- **Buttons:** Primary buttons use a Burnt Orange fill with white text and 16px rounded corners. They should have a subtle scale transform (98%) on press. Secondary buttons use a Sage Green or Warm Amber outline.
- **Input Fields:** Use a subtle off-white fill (#F9F9F9) with a 1px border (#E5E7EB). On focus, the border should transition to Burnt Orange with a soft 4px outer glow in the same color.
- **Cards:** White background, 24px rounded corners, and the defined Level 1 ambient shadow. Content inside should have at least 24px of internal padding.
- **Chips/Tags:** Used for cat breeds or traits. High-contrast labels (e.g., Sage Green text on a light Sage Green background) with a pill shape.
- **Progressive Disclosure:** Use rounded accordions with subtle motion to reveal "Advisor" insights, keeping the AI's complexity hidden until requested.
- **Glass Navigation:** A sticky top header with 70% white opacity and blur, creating a sense of premium layering without obstructing content flow.