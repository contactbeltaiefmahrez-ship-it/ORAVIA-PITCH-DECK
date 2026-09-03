# ORAVIA — investor deck

## Opening it

Double-click **index.html**. That's the whole procedure. No installation,
no terminal, no build step, no server.

Keep the three files together in one folder — `index.html`, `styles.css`
and `app.js`. Moving one without the others breaks the deck.

## Presenting

| Key | Does |
|---|---|
| `←` | next slide (the deck is right-to-left, so left is forward) |
| `→` | previous slide |
| `space` | next slide |
| `P` | presentation mode — hides the chrome, goes full screen |
| `Esc` | leave presentation mode |
| `Home` / `End` | first / last slide |

On a phone or tablet, swipe. The dots down the left edge jump to any slide,
and hovering one shows its title.

## The five slides to click during a live pitch

Most of the deck is composition, but five slides are genuinely interactive
and reward being driven rather than shown:

- **08 — the dental map.** Click any tooth; the panel rewrites with that
  tooth's record. Arrow keys walk the arch once a tooth has focus.
- **09 — the time machine.** Tap the years; the same arch re-colours across
  2024–2027 so the mouth's history reads as one continuous change.
- **06 — the four engines.** Hover or click an engine; the reading panel
  changes with it.
- **10 — voice.** Press "شغّل المثال". The waveform lights, the sentence
  types out in real chairside code-switched speech, the structured record
  assembles, and the approval gate appears. Approving it is the point of
  the slide: nothing reaches the record before a clinician signs.
- **14 — practice pulse.** The gauge draws and the number counts on arrival.

## Internet connection

Two web fonts load if there's a connection. Without one the deck falls back
to system fonts and everything still works — safe to present offline.

## Files

| File | What it is |
|---|---|
| `ORAVIA-STRATEGY.md` | Phases 01–09: research dossier, brand, architecture, four-engine spec, MVP, IA, design system, domain model, technical architecture |
| `index.html` | the 22 slides |
| `styles.css` | design tokens, atmosphere, motion language, slide compositions |
| `app.js` | navigation and every generated SVG diagram |

## Before an investor sees this

Two things are deliberately unfinished, and both are flagged inside the deck
rather than hidden:

1. The dentist headcount is from 2016. Request the current figure from the
   Conseil National de l'Ordre des Médecins Dentistes de Tunisie, then
   cross-check against the regional mapping the Ministry and the Ordre
   announced in May 2025.
2. Nothing claims legal compliance anywhere. Before the first paying clinic,
   get a written position from Tunisian counsel on Law 2004-63 art. 63 and
   INPDP Délibération 4/2018 — specifically whether a SaaS vendor may
   process identified dental records, and on data residency.

Every patient, tooth and number shown as clinic data is fictional. The three
sourced external facts — the Swedish completion study, the hospitalisation
study, and DoliDentiste's published pricing — are real and cited on-slide.
