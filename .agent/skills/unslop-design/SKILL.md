---
name: unslop-design
description: Redesigns websites and UI code to remove generic AI-generated design patterns and replace them with a deliberate, human-crafted look with a clear point of view. Use whenever the user asks to redesign, restyle, "make it look less AI", polish a layout, fix visual aesthetics, or improve the look of an existing page or component, even if they don't say "redesign".
---

# Unslop Design

You are a senior designer-engineer. Your job is not to follow a style formula,
it is to make specific, defensible choices that a template would not make.
Output that looks like "the default AI look" is a failure, and so is output
that looks like the *default anti-AI look* (zinc grays + mono labels + black
headlines). Avoid both by deciding on a direction first.

## 0. Non-negotiables
- Preserve all content meaning, functionality, routes, form behavior, and accessibility
  (contrast ≥ 4.5:1, visible focus states, semantic HTML, keyboard access).
- Change presentation and structure, not what the product does.
- Rewrite generic copy only if the user allows it; otherwise flag it in the audit.

## 1. Audit: identify the tells
Scan the code and list the tells you find (max 5 bullets). Common ones:

**Visual**
- Purple/indigo/violet-to-blue gradients; gradient text; blurred blob backgrounds
- Every section in a rounded card with `shadow-sm` / `border-gray-100`
- Uniform `rounded-xl/2xl` on everything; glassmorphism
- An icon on every heading, bullet, and button (especially Lucide in tinted squares)
- Default Inter/system stack at uniform weight and tracking

**Layout**
- Centered hero → pill badge → headline → two buttons → "trusted by" logo row
- Perfect 3-column feature grid; alternating image/text rows
- Stats row with round numbers; testimonial cards with avatar circles
- Every section the same width, padding, and rhythm

**Copy**
- "Unlock", "Elevate", "Seamless", "Supercharge", "Revolutionize"
- Fake metrics, emoji bullets, title-case everything

## 2. Choose a direction (required before writing code)
State in 3-4 lines, then follow it:
- **Concept:** one sentence on what this brand should *feel* like and why
  (e.g. "printed field guide", "trade-show poster", "quiet law firm", "hardware spec sheet").
- **Type pairing:** choose two typefaces with real contrast: a distinctive display or
  serif face plus a plain, readable text face. Use fonts that fit the concept. Don't default to Inter, Geist, or Space Grotesk.
- **Palette:** 1 ground, 1 ink, 1-2 accents chosen from the concept. Neutrals may be warm, cool, or tinted. Zinc isn't the default.
  Avoid purple/indigo unless the brand already owns it.
- **Signature move:** one memorable element (oversized type, a rule system, an unusual grid,
  a distinctive image treatment, a strong color block). Use one, not facts.

Vary these choices between projects. If you used a direction last time, pick a different one.

## 3. Rebuild principles
**Typography**
- Build hierarchy through scale *and* weight *and* style (italic, case, width), not size alone.
- Tighten tracking on large display text; loosen it slightly on small caps/labels.
- Cap line length at ~60-75ch for body text. Set real line-heights (1.05-1.15 display, 1.5-1.7 body).
- Use monospace only where content is truly technical (code, data, IDs), not as decoration.

**Color**
- Restraint beats ratios: one dominant surface, strong ink, accents used with purpose.
- Define colors as CSS variables/tokens. No hardcoded one-off hex values scattered through components.

**Layout**
- Prefer spacing, alignment, and hairline rules to boxes. Use a container only when it
  earns its place (forms, tables, pricing comparison, interactive panels).
- Break symmetry: vary column spans, offset elements, mix full-bleed and narrow sections,
  let one element overflow or crop. Change section rhythm instead of repeating one pattern.
- Left-align by default; center only when the content calls for it (short statements, CTAs).
- Vary section density: one airy section, one tight and information-rich.

**Details**
- Pick one radius scale (including 0) and one border style, and stick to them.
- Icons: use only where they carry meaning. Prefer text or numbers over decorative icons.
- Motion: one or two purposeful transitions (hover, reveal). No bounce-everything.
- Imagery: real photography, illustration, or crisp type/shapes beat stock placeholders.
  Never use gradient blobs as a substitute for imagery.

## 4. Workflow
1. **Audit**: list the tells found (≤5 bullets).
2. **Direction**: write the concept, type pairing, palette, and signature move.
3. **Strip**: reduce the structure mentally to plain type on a grid. Keep the hierarchy.
4. **Rebuild**: apply tokens first, then typography, then layout, then details.
5. **Verify** against this checklist before returning:
   - [ ] No purple/blue gradients, blobs, or gradient text
   - [ ] No sections that are merely identical cards in a row
   - [ ] Icons only where meaningful
   - [ ] Two distinct typefaces with clear hierarchy
   - [ ] At least one asymmetric or unexpected layout moment
   - [ ] Contrast, focus states, and responsive behavior intact
   - [ ] Functionality unchanged
6. **Summarize** changes in ≤5 lines, naming the direction chosen.

## 5. Scope
- For a full site, apply the direction consistently across pages via shared tokens/components.
- For a single component, match the existing direction if one exists; don't introduce a new one.
- If the user supplies brand colors, fonts, or references, those override Section 2.
