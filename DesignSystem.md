# Design System

> **Purpose:** Visual and interaction reference for the Dokkan-2
> customer-facing E-Commerce application.\
> **Scope:** Shared visual foundations only. This document is not an
> Admin Dashboard specification and does not prescribe page-specific
> business logic.

------------------------------------------------------------------------

## 1. Design Principles

Dokkan-2 uses a consistent visual language across the Online Store while
supporting two languages and two layout directions.

1.  **Consistency:** Reuse the same design tokens and component patterns
    across pages.
2.  **Clarity:** Prioritize readable typography, clear hierarchy, and
    visible interaction states.
3.  **Restraint:** Prefer subtle borders and shadows over heavy
    decoration.
4.  **Responsive behavior:** Components must adapt to mobile, tablet,
    and desktop without losing usability.
5.  **Bidirectional behavior:** The same layout must support Arabic
    (RTL) and English (LTR).
6.  **Token-first styling:** Use the CSS variables and Tailwind theme
    utilities defined in `src/index.css`; avoid arbitrary color values.

### Scope boundaries

This guide adopts visual foundations from the Auren Admin Dashboard
reference, then adapts them to a customer-facing store.

**Included:** color usage, typography, border treatment, border radius,
shadows, spacing, transitions, responsive behavior, RTL/LTR conventions,
and shared UI-state styling.

**Not included:** Admin Dashboard page layouts, analytics, metric/stat
cards, admin sidebars, dashboard hero banners, or admin data-table
patterns. Store pages should be designed around their own customer
journeys and content.

------------------------------------------------------------------------

## 2. Color System

### 2.1 Source of truth

Color tokens are defined in `src/index.css` under `:root`, `.dark`, and
`@theme`.

Use semantic utilities such as `bg-bg-main`, `bg-card-bg`,
`text-text-primary`, `border-border-main`, and `bg-brand-active`. Do not
hardcode hex values inside components when a token exists.

### 2.2 Unified `--theme-*` Variables

The Dokkan-2 color system uses a single unified set of `--theme-*` CSS variables defined in `src/index.css` under `:root` (Light Mode) and `.dark` (Dark Mode), mapped directly into Tailwind CSS v4 `@theme`.

  --------------------------------------------------------------------------------------------------------------------------------------
  Variable                   Light Hex         Dark Hex          Tailwind Utility        Intended Usage
  -------------------------- ----------------- ----------------- ----------------------- -----------------------------------------------
  `--theme-bg-main`          `#f7f2ed`         `#1a1513`         `bg-bg-main`            Main page background canvas
  `--theme-card-bg`          `#ded8d1`         `#1f1a18`         `bg-card-bg`            Cards, panels, and elevated surfaces
  `--theme-input-bg`         `#eadecf`         `#2a221e`         `bg-input-bg`           Input fields and card hover backgrounds
  `--theme-text-primary`     `#2a2421`         `#f3ece7`         `text-text-primary`     Primary headings, key labels, and body text
  `--theme-text-secondary`   `#7a6f68`         `#a0948c`         `text-text-secondary`   Secondary text, descriptions, metadata, icons
  `--theme-brand-active`     `#c2a38e`         `#e8c39e`         `text-brand-active`     Primary brand gold accent, active states
  `--theme-brand-hover`      `#b08f79`         `#f3d4b6`         `bg-brand-hover`        Brand accent hover state
  `--theme-active-bg`        `#ece3db`         `#2e2622`         `bg-active-bg`          Active navigation item / highlighted surface
  `--theme-border-main`      `#e4dcd5`         `#38302c`         `border-border-main`    Borders, dividers, and card outlines
  `--theme-disabled`         `#d8d0c8`         `#3a322c`         `bg-disabled`           Disabled controls and subdued surfaces
  `--theme-status-success`   `#10b981`         `#34d399`         `text-status-success`   Successful actions, valid states
  `--theme-status-warning`   `#f59e0b`         `#fbbf24`         `text-status-warning`   Cautionary notices and pending states
  `--theme-status-danger`    `#c6604f`         `#c6604f`         `text-status-danger`    Errors, alerts, and destructive actions
  `--theme-status-info`      `#3b82f6`         `#60a5fa`         `text-status-info`      Informational messages and progress states
  --------------------------------------------------------------------------------------------------------------------------------------

### 2.4 Color usage rules

-   The brand gold is an accent, not a default background for every
    component.
-   Keep the main canvas visually distinct from cards and inputs.
-   Use primary text for important content and secondary text for
    supporting information.
-   Use status colors only when the meaning is genuinely semantic; do
    not use them as decoration.
-   For tinted surfaces and subtle borders, use Tailwind alpha
    modifiers, for example:
    -   `bg-brand-active/10`
    -   `border-brand-active/20`
    -   `bg-status-success/10`
    -   `border-status-danger/20`
    -   `text-text-secondary/75`
-   Check text/background contrast in both themes. Do not assume that a
    color combination that works in Light Mode will also work in Dark
    Mode.

------------------------------------------------------------------------

## 3. Typography

### 3.1 Font family

The project uses the system font stack as declared in the Dokkan reference:

```css
font-family: system-ui, -apple-system, sans-serif;
```

### 3.2 Typography hierarchy

Use this as a practical starting scale. Adjust only when the content or
responsive layout requires it.

  -------------------------------------------------------------------------
  Role                  Suggested size               Weight Usage
  --------------- -------------------- -------------------- ---------------
  Page title                 `24–32px`                `700` Main page
                                                            heading

  Section heading            `18–22px`            `600–700` Product
                                                            sections and
                                                            content groups

  Card/product               `14–16px`            `600–700` Product names
  title                                                     and card
                                                            headings

  Body text                  `14–16px`            `400–500` Descriptions
                                                            and general
                                                            content

  Supporting text            `12–13px`                `400` Product
                                                            metadata and
                                                            helper text

  Microcopy                  `11–12px`            `400–500` Small hints and
                                                            timestamps

  Button/label               `12–14px`            `500–600` Actions and
                                                            form labels
  -------------------------------------------------------------------------

### 3.3 Typography rules

-   Maintain a clear hierarchy; avoid making every heading bold or
    oversized.
-   Use `tracking-tight` sparingly for larger headings where it improves
    appearance.
-   Use `leading-relaxed` or suitable line height for longer
    descriptions.
-   Use `tabular-nums` for prices, quantities, counters, and other
    values whose digits should align.
-   Avoid relying on uppercase styling for Arabic text.
-   Use truncation only when the layout requires a fixed-height or
    single-line element; provide a way to access the full product name
    when necessary.
-   Test Arabic and English text because their word lengths and line
    wrapping differ.

------------------------------------------------------------------------

## 4. Borders

Borders should define structure without making the interface feel
boxed-in or visually heavy.

### 4.1 Border thickness

  Thickness   Recommended use
  ----------- ---------------------------------------------------------
  `1px`       Default card, input, and separator border
  `2px`       Focused, selected, or intentionally emphasized controls
  `3px`       Rare accent treatment only; not a default card border

### 4.2 Border color and usage

-   Use `border-border-main` for standard component boundaries.
-   Use alpha variants such as `border-border-main/70` for less
    prominent separators.
-   Use `border-brand-active/20` for subtle brand-related emphasis.
-   Use status-colored borders only when the component communicates a
    status.
-   Avoid stacking multiple borders around the same visual group.

**Default principle:** most store cards and inputs should use a subtle
`1px` border, not a thick outline.

------------------------------------------------------------------------

## 5. Border Radius

Use a small, consistent radius scale. Radius should reflect the
component's role and size.

  ------------------------------------------------------------------------
  Token / utility                     Approx. radius Recommended use
  --------------------- ---------------------------- ---------------------
  `rounded-md`                                 `6px` Compact controls and
                                                     small inner elements

  `rounded-lg`                                 `8px` Small badges and
                                                     compact containers

  `rounded-xl`                                `12px` Buttons, inputs, icon
                                                     containers

  `rounded-2xl`                               `16px` Main cards and larger
                                                     panels

  `rounded-3xl`                               `24px` Large product imagery
                                                     or intentionally soft
                                                     feature surfaces

  `rounded-full`                            `9999px` Pills, circular
                                                     indicators, and
                                                     avatars
  ------------------------------------------------------------------------

Rules: - Do not use the largest radius on every element. - Keep nested
components visually coherent; inner elements should not look more
rounded than their parent without a reason. - Product images may use a
different radius from the card shell when the design calls for it. -
Avoid mixing many unrelated radius values on one page.

------------------------------------------------------------------------

## 6. Shadows & Elevation

Shadows communicate layering and interaction. They should remain subtle
and must not replace borders when a boundary is needed.

  -----------------------------------------------------------------------
  Level                   Suggested utility       Usage
  ----------------------- ----------------------- -----------------------
  No elevation            `shadow-none`           Flat surfaces and
                                                  nested content

  Very subtle             `shadow-xs`             Small interactive
                                                  elements

  Default                 `shadow-sm`             Cards and dropdown
                                                  surfaces when needed

  Elevated                `shadow-md`             Hovered cards,
                                                  popovers, and dialogs

  Strong                  `shadow-lg`             Use rarely for overlays
                                                  that must clearly sit
                                                  above the page
  -----------------------------------------------------------------------

### Shadow rules

-   Prefer `shadow-sm` or no shadow for static store cards.
-   Use a restrained hover elevation such as `hover:shadow-md` only when
    the element is interactive.
-   A small hover movement such as `hover:-translate-y-0.5` may be used
    selectively; do not apply it to every element.
-   Use brand glow effects sparingly, for example
    `shadow-brand-active/20`, and only for primary emphasis.
-   Keep shadow direction and intensity visually consistent across the
    application.
-   Verify shadows in both Light Mode and Dark Mode; dark surfaces may
    need a border more than a stronger shadow.

------------------------------------------------------------------------

## 7. Spacing System

Spacing must be consistent and responsive. It must also be
direction-independent so the layout works in both RTL and LTR.

### 7.1 Spacing scale

Use Tailwind's spacing scale as the default system:

  Utility     Approx. size Typical use
  --------- -------------- -------------------------------
  `1`                `4px` Tiny icon/text separation
  `2`                `8px` Tight control spacing
  `3`               `12px` Compact internal spacing
  `4`               `16px` Standard component spacing
  `5`               `20px` Comfortable grouping
  `6`               `24px` Card padding and section gaps
  `8`               `32px` Larger section separation
  `10`              `40px` Major layout separation

These are reference values, not fixed requirements for every component.

### 7.2 Spacing rules

-   Use smaller gaps inside compact controls and larger gaps between
    distinct content sections.
-   Prefer a consistent page container and spacing rhythm across related
    pages.
-   Use responsive spacing where needed, for example
    `p-4 sm:p-5 lg:p-6`.
-   Avoid excessive card padding on mobile; content should remain
    readable without wasting viewport space.
-   Do not use physical left/right spacing utilities for directional
    layout. Use logical spacing utilities described in the RTL/LTR
    section.
-   Keep spacing tied to layout roles rather than adjusting individual
    margins randomly.

------------------------------------------------------------------------

## 8. Responsive Design

Every shared component and page must work across mobile, tablet, and
desktop.

### 8.1 General breakpoints

Use Tailwind's standard responsive prefixes unless the project defines a
specific need for another breakpoint.

  -----------------------------------------------------------------------
  Range                               General approach
  ----------------------------------- -----------------------------------
  Mobile: below `640px`               Single-column layouts where
                                      appropriate, compact spacing,
                                      touch-friendly controls

  Small/tablet: `640px–767px`         Gradually increase spacing and
                                      allow suitable two-column layouts

  Tablet: `768px–1023px`              Use available width efficiently;
                                      avoid desktop-only density

  Desktop: `1024px+`                  Wider grids and more generous
                                      spacing where content benefits
  -----------------------------------------------------------------------

### 8.2 Responsive rules

-   Design from the smallest viewport upward.
-   Avoid fixed widths for content cards and page sections unless
    required.
-   Use `w-full`, `min-w-0`, flexible grid columns, and sensible
    `max-w-*` constraints.
-   Prevent long product names, prices, and buttons from overflowing.
-   Keep controls comfortably usable on touch screens.
-   Product grids should change column count based on available width,
    not only device labels.
-   Images should preserve their intended aspect ratio and use a
    consistent crop strategy.
-   Test navigation, product cards, forms, cart rows, and checkout
    layouts at narrow widths.
-   Responsive changes must not break the reading order or the RTL/LTR
    direction.

------------------------------------------------------------------------

## 9. Bidirectional Layout (RTL / LTR)

### 9.1 Core requirement

**One layout, two directions, all screen sizes.**

Dokkan-2 must support: - Arabic with `dir="rtl"`. - English with
`dir="ltr"`.

The application should use the same component structure and visual rules
in both languages. Direction changes should be handled through document
direction and logical CSS properties, not by maintaining separate Arabic
and English layouts.

### 9.2 Set direction at the document/application level

Set the appropriate `dir` attribute based on the active language.
Components should inherit direction instead of hardcoding it
individually.

Example:

``` jsx
<html lang="ar" dir="rtl">
```

For English:

``` jsx
<html lang="en" dir="ltr">
```

The actual implementation should update the document language and
direction when the user changes the application language.

### 9.3 Use logical properties

Prefer logical utilities over physical left/right utilities.

  Avoid when direction should adapt   Prefer          Meaning
  ----------------------------------- --------------- -----------------------------
  `ml-4`                              `ms-4`          Margin inline-start
  `mr-4`                              `me-4`          Margin inline-end
  `pl-4`                              `ps-4`          Padding inline-start
  `pr-4`                              `pe-4`          Padding inline-end
  `left-0`                            `start-0`       Position at inline-start
  `right-0`                           `end-0`         Position at inline-end
  `text-left`                         `text-start`    Align to inline-start
  `text-right`                        `text-end`      Align to inline-end
  `border-l`                          `border-s`      Border at inline-start
  `border-r`                          `border-e`      Border at inline-end
  `rounded-l-*`                       `rounded-s-*`   Logical start-side rounding
  `rounded-r-*`                       `rounded-e-*`   Logical end-side rounding

Use `gap-*` for spacing between flex/grid children whenever possible; it
avoids manual directional margins.

### 9.4 Flexbox and Grid

-   Prefer layout primitives such as `flex`, `grid`, `gap-*`, and
    logical alignment.
-   Remember that row direction follows the writing direction. Verify
    the order of children when changing `dir`.
-   Do not add `flex-row-reverse` automatically to RTL layouts; first
    check whether the inherited direction already produces the intended
    order.
-   Use explicit ordering only when the design requires a stable visual
    order independent of language.
-   Avoid absolute positioning with `left` and `right` when `start` and
    `end` are appropriate.

### 9.5 Icons and directional graphics

Not every icon should be mirrored.

-   Mirror directional icons when their meaning depends on direction,
    such as back/forward arrows or navigation chevrons.
-   Do not mirror non-directional icons such as search, cart, heart,
    user, or product category icons.
-   Do not mirror product photos, logos, or decorative imagery just
    because the language changes.
-   Check breadcrumb separators, carousels, pagination, and
    previous/next controls in both directions.

### 9.6 Mixed-direction content

Some values should remain LTR even inside an RTL page.

Examples include: - Email addresses. - URLs. - Phone numbers when their
formatting requires it. - Product codes, SKUs, and technical
identifiers. - Certain numeric strings and payment references.

Use a local `dir="ltr"` or an appropriate bidi isolation strategy for
these values. Do not force the entire page to LTR because one field
contains English or numbers.

### 9.7 RTL/LTR validation

Every page and shared component should be checked in both directions.
Validate: - Text alignment and wrapping. - Logical margins and
padding. - Icon placement and icon direction. - Navigation and
breadcrumb order. - Product image and text arrangement. - Form labels,
validation messages, and input adornments. - Price, quantity, and
mixed-language values. - Responsive behavior at mobile, tablet, and
desktop widths.

------------------------------------------------------------------------

## 10. Interaction & Motion

### 10.1 Transitions

-   Use short, consistent transitions for hover, focus, and state
    changes.
-   Prefer `transition-colors` for color-only changes.
-   Use `transition-all` only when multiple properties genuinely need to
    animate.
-   Avoid long or distracting motion on frequently repeated product
    cards.
-   Respect `prefers-reduced-motion`.

### 10.2 Hover and focus

-   Hover states should be subtle and should not be the only indication
    that an element is interactive.
-   Keyboard focus must be visible using a consistent focus ring.
-   Use brand color for primary focus indication, with sufficient
    contrast against the current surface.
-   Interactive elements must have clear disabled and loading states.

### 10.3 Buttons

Shared buttons should maintain consistent: - Height and horizontal
padding. - Font size and weight. - Border radius. - Primary, secondary,
and destructive visual variants. - Hover, focus, disabled, and loading
states.

Avoid making every button gold. Reserve the brand-filled variant for the
primary action in a given context.

### 10.4 Inputs

Inputs should use: - A consistent height and radius. - `bg-input-bg` for
the field surface where appropriate. - `text-text-primary` for entered
values. - `text-text-secondary` for placeholders and supporting
content. - A visible focus state. - Clear error and success feedback. -
Logical padding for leading/trailing icons.

------------------------------------------------------------------------

## 11. Shared Surface & Feedback Patterns

These are visual rules for common store UI states, not page-specific
layouts.

### Cards and surfaces

-   Use `bg-card-bg` for distinct content surfaces.
-   Use a subtle `border border-border-main` when the surface needs
    separation.
-   Apply radius and padding consistently.
-   Use shadows selectively rather than automatically on every card.

### Status badges

-   Use semantic status tokens.
-   Prefer lightly tinted backgrounds and subtle borders over solid
    saturated fills.
-   Keep badge text legible and concise.
-   Do not communicate status by color alone; include a text label or
    accessible meaning.

### Loading states

-   Skeletons should resemble the shape of the content they replace.
-   Use `bg-input-bg` or another existing surface token for
    placeholders.
-   Keep loading animation subtle and respect reduced-motion
    preferences.
-   Disable repeated actions while the related operation is loading.

### Empty and error states

-   Explain what happened in concise language.
-   Provide a useful next action when one exists.
-   Use danger colors for errors, not for ordinary empty states.
-   Keep the same spacing, typography, and surface language as the rest
    of the store.

------------------------------------------------------------------------

## 12. Implementation Rules

1.  Treat `src/index.css` as the source of truth for theme colors and
    Tailwind theme mappings.
2.  Use semantic theme utilities instead of hardcoded color values in
    components.
3.  Reuse shared UI components when they match the requirement; do not
    duplicate styles unnecessarily.
4.  Keep visual decisions consistent across all store pages.
5.  Use logical CSS properties for direction-sensitive spacing and
    positioning.
6.  Do not assume RTL is solved by changing text alignment alone;
    inspect the entire component layout.
7.  Do not mirror every icon or image in RTL.
8.  Do not add new font families, border radii, shadow styles, or color
    tokens without a clear need.
9.  Test both Light and Dark themes if both are supported by the
    application.
10. Test Arabic RTL and English LTR at mobile, tablet, and desktop
    sizes.
11. When a page needs a unique layout, adapt the shared visual language
    rather than copying an unrelated Admin Dashboard pattern.
12. Keep this document focused on visual foundations. Page-specific
    requirements and API behavior belong in their relevant project
    documentation.

------------------------------------------------------------------------

## 13. Practical Review Checklist

Before considering a page or shared component visually complete, verify:

-   [ ] Uses the existing theme tokens.
-   [ ] Text hierarchy is clear and readable.
-   [ ] Borders are subtle and generally `1px` unless emphasis is
    needed.
-   [ ] Border radius follows the shared scale.
-   [ ] Shadows are restrained and used intentionally.
-   [ ] Spacing is consistent and responsive.
-   [ ] No unintended horizontal overflow.
-   [ ] Arabic RTL direction works correctly.
-   [ ] English LTR direction works correctly.
-   [ ] Directional icons behave correctly; non-directional icons remain
    unchanged.
-   [ ] Mixed-direction values such as email and product codes remain
    readable.
-   [ ] Focus, hover, disabled, loading, empty, and error states are
    considered.
-   [ ] Mobile, tablet, and desktop layouts remain usable.
