# Wireframe and Layout Plan

## Concept
**Northstar** is a fictional productivity/workspace brand. The visual direction is calm, editorial, and optimistic: warm off-white backgrounds, dark green-black text, soft pastel feature panels, rounded cards, and a dashboard illustration created entirely with HTML and CSS.

## Desktop wireframe

```text
┌───────────────────────────────────────────────────────────────────┐
│ BRAND                           Features  How it works  Stories CTA│
├───────────────────────────────────────────────────────────────────┤
│ EYEBROW              │                                            │
│ Large hero headline  │       Dashboard illustration               │
│ Supporting copy      │       + floating info cards                │
│ Primary + text CTA   │                                            │
│ Social proof         │                                            │
├───────────────────────────────────────────────────────────────────┤
│ Small horizontal caption / decorative divider                    │
├───────────────────────────────────────────────────────────────────┤
│ Section heading                 Supporting paragraph               │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐           │
│ │ Feature 01     │ │ Feature 02     │ │ Feature 03     │           │
│ │ Description    │ │ Description    │ │ Description    │           │
│ │ Illustration   │ │ Illustration   │ │ Illustration   │           │
│ └────────────────┘ └────────────────┘ └────────────────┘           │
├───────────────────────────────────────────────────────────────────┤
│ How it works / introduction │ Three numbered process steps        │
├───────────────────────────────────────────────────────────────────┤
│                 Quote / brand statement                            │
├───────────────────────────────────────────────────────────────────┤
│ Final CTA heading              Supporting copy + CTA               │
├───────────────────────────────────────────────────────────────────┤
│ Footer brand / tagline / links                                    │
│ Copyright                                                        │
└───────────────────────────────────────────────────────────────────┘
```

## Mobile behavior
- Navigation links collapse behind a menu button.
- Hero content stacks vertically; the dashboard illustration moves below the main call-to-action.
- Feature cards become a single column.
- The process section becomes a single column.
- CTA and footer content stack vertically.
- Responsive typography and container widths prevent horizontal overflow.

## Semantic structure
- `header`: brand and primary navigation
- `main`: hero, features, process, quote, and CTA sections
- `article`: each feature and process step
- `footer`: site links and copyright
- `button`: mobile menu toggle, with state communicated through ARIA attributes

## Interaction
Vanilla JavaScript toggles the mobile menu, updates its accessible label and `aria-expanded` state, closes the menu after a link is chosen, resets the menu after resizing to desktop, and sets the footer year dynamically.
