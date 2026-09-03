# ORAVIA — Foundation Document

**The Living Dental Journey** · Every tooth. Every visit. Every next step.
Phases 01–09. Prepared before any code was written, per §42.

---

## PHASE 00 — RESEARCH DOSSIER

§37 requires that claims be sourced and that fact, hypothesis and assumption be kept apart. They are separated below. Anything not in the VERIFIED column must not appear in the deck as a fact.

### VERIFIED FACT — market structure

| Finding | Source | Caution |
|---|---|---|
| 4,500 dentists on the Ordre's roll; ~3,000 in private practice; ~900 unemployed; ~300 new domestic graduates per year plus ~150 returning from foreign universities | Dr Chekib Ayed, then president of the CNOMDT, interviewed in *L'Économiste Maghrébin*, 14 March 2016 | **Ten years old.** Direction of travel (growth) is clear, the absolute number is not. Must be labelled as a 2016 figure or refreshed from the CNOMDT before any investor meeting. |
| The Ministry of Health and the Ordre agreed in May 2025 to map dentist distribution by region, revise the legislative framework, and incentivise private practice in underserved governorates | *Tunisie Tribune*, 28 May 2025 | Signals reform, not market size. Useful as tailwind, not as a number. |

**The honest position:** ORAVIA does not currently have a defensible headcount for Tunisian private dental practices. The deck says so. An investor who catches a fabricated denominator discounts everything else on the slide; an investor who sees a founder flag their own data gap and name the retrieval path reads competence. The first pilot cohort produces the real number.

### VERIFIED FACT — the competitive field is occupied

Tunisian and near-market products found in market:

| Product | Origin | What it is |
|---|---|---|
| **DoliDentiste** (dolidentiste.com) | Tunisia (operated by DOLIEXPERT) | Cloud dental PMS built for Tunisian practices. 144 STMDLP acts pre-loaded with official DCH codes, TND invoicing, adult + child odontogram with 8 tooth states, 42 pre-filled dental medications, PDF prescriptions, 5 permission levels, SMS/email reminders, per-practice subdomain. |
| **Dentisys** (dentisys.tn) | Tunisia | Dental management software — appointments, patient follow-up, treatments, finances. |
| **ClinicFlow** (clinicflow.tn) | Tunisia | All-in-one dental practice management — patients, appointments, billing. |
| **DentiSolution** (Bees Solution, Le Bardo, Tunis) | Tunisia | Daily-task management, supplier/lab transaction tracking, online booking, expense statistics. |
| Dentisto, Dentopus, Pratisoft | Morocco | Regional PMS with orthodontic and cephalometric modules; evidence the Maghreb PMS category is maturing. |
| Visiodent | France | European incumbent, digital radiography and teleorthodontics integration. |

**DoliDentiste published pricing (retrieved from their tariffs page):** 500 TND one-time installation, then 80 TND/month, or 720 TND/year paid annually (list 960 TND). 15-day free trial, no card. Optional 100 TND live training session. Year-one path: 1,460 TND; year two onward: 960 TND.

This is the single most valuable number in the dossier. It establishes the **price anchor a Tunisian dentist already has in their head**, and it is low. ORAVIA's pricing hypothesis has to be argued against 80 TND/month, not against Dentrix or Curve.

**What the incumbents already solve well:** appointments, odontogram, TND billing with correct DCH/STMDLP coding, prescriptions, documents, basic revenue statistics, cloud access from phone. These are table stakes. ORAVIA gets no credit for any of them and cannot ship without them.

**What none of them appear to solve:** the treatment as a longitudinal object. An 8-state odontogram records what a tooth *is* today. It does not record how the tooth *got there*, where the case currently stands, what the next step is, or which patients have fallen out of an unfinished treatment. Every competitor's own marketing describes state and administration. None describes continuity.

### VERIFIED FACT — discontinuity is clinically real and measurable

| Finding | Source |
|---|---|
| In a prospective cohort at 20 Swedish public dental clinics, of root canal treatments initiated, **65.4% were completed with a root filling** — and for molars only **56.6%** | Wigsten et al., 7–9 year prospective cohort, Swedish Public Dental Service, *International Endodontic Journal* (PMC12620333) |
| Among 60 odontogenic maxillofacial infections requiring hospital admission, **unfinished** root canal treatment was the major risk factor in 27% of cases, versus completed RCT implicated in only 12% | *Clinical Oral Investigations*, Seppänen et al. (doi 10.1007/s00784-012-0710-8) |

**This pair is the intellectual foundation of ORAVIA and must be presented carefully.** These are European and clinical-registry figures, not Tunisian ones. They do not prove a Tunisian abandonment rate. What they establish is stronger and safer than a local statistic would be: that treatment non-completion is a *documented, quantified, consequential clinical phenomenon in a well-resourced public system with good records*. If roughly a third of started root canals do not reach obturation in Sweden, the burden of proof shifts to anyone claiming a fragmented paper-and-WhatsApp practice does better.

The second finding converts continuity from an administrative concern into a clinical safety one. An abandoned canal is not a lost invoice. It is an open infection route.

### VERIFIED FACT — the regulatory perimeter

| Finding | Source |
|---|---|
| Loi organique n° 2004-63 of 27 July 2004 governs personal data processing; every processing purpose requires prior declaration to the INPDP, which has one month to object (silence = acceptance) | Law text, art. 7; INPDP procedures |
| The INPDP has exercised its powers since 2009 | Council of Europe, Tunis office |
| Tunisia has been party to Convention 108 since 1 November 2017 | Council of Europe |
| Health data is **sensitive data**: processing falls under arts. 13–14 and requires **prior authorisation**, not merely declaration | Law 2004-63; Décret n° 2007-3004 of 27 November 2007 |
| The INPDP issued **Délibération n° 4 of 5 September 2018** specifically on the processing of health-related personal data | Cited in INPDP guidance on telemedicine acts |
| **Art. 63:** health data may only be processed by physicians or by persons bound, by virtue of their function, to professional secrecy | Law 2004-63, art. 63 |
| Cross-border transfer of personal data requires INPDP authorisation, even to states on the adequacy list | Law 2004-63; INPDP |

**Three architectural consequences, not compliance slides:**

1. **Art. 63 constrains who may hold the data, not just how.** A SaaS vendor processing identified dental records is on contested ground. The mitigation is architectural: tenant-held encryption where feasible, strict processor role, contractual secrecy obligations flowed down to every ORAVIA employee with production access, and a documented legal position obtained from Tunisian counsel before the first paying clinic — not before Series A.

2. **Cross-border transfer authorisation makes hosting a product decision.** Defaulting to a European or US region because it is convenient creates an authorisation dependency and a sales objection. Tunisian or authorised-region hosting should be treated as a requirement.

3. **The Dental Passport (§20) is a legal instrument before it is a feature.** Cross-clinic sharing of identified health data is not permitted by default. Consent, authorisation, scope and revocation must be first-class database objects from the first migration, because retrofitting consent into a schema that assumed sharing is not possible. §20 already said this; the research confirms it is the binding constraint on ORAVIA's most strategic long-term asset.

**What ORAVIA must never say:** that it is "compliant", "GDPR-compliant" or "HIPAA-compliant". It may say it is *architected against* Law 2004-63 and INPDP Délibération 4/2018, and that formal validation is pending Tunisian counsel. That distinction is not pedantry; claiming compliance in health data is how a startup acquires liability it cannot survive.

### HYPOTHESIS — to be tested in the pilot, presented as questions not claims

- **H1.** Tunisian practices lose a material share of started multi-session treatments to non-completion, and cannot currently measure it. *(Test: reconstruct 12 months of case histories in 5 pilot practices and count.)*
- **H2.** The dentist's most acute daily pain is context reconstruction at the chair — the 60–120 seconds spent remembering where a returning patient stood. *(Test: timed observation in-clinic.)*
- **H3.** Practices will pay a premium over the 80 TND/month anchor for recovered treatment revenue, if the recovery is demonstrable. *(Test: show a pilot practice its own recovered-case value before quoting a price.)*
- **H4.** Voice capture in mixed Tunisian Arabic/French dental speech is the adoption unlock, because typing during a procedure is impossible with gloved hands.

### STRATEGIC ASSUMPTION — chosen positions, defensible but unproven

- Continuity, not features, is the axis on which a new entrant can beat an entrenched, cheap, locally-correct incumbent.
- Tooth-level longitudinal data is a compounding asset: it gets more valuable every year it accumulates, which makes it the strongest available defence against a well-funded copyist.
- The Tunisian dental-speech model is a moat because it is unattractive to build for anyone whose market is not the Maghreb.

---

## PHASE 01 — BRAND STRATEGY

### Positioning statement

> For dentists running multi-session treatments across fragmented records, ORAVIA is the clinical layer that keeps every patient's dental journey continuous — because a practice management system tells you what a tooth *is*, and ORAVIA tells you where the treatment *stands*.

### The category move

ORAVIA does not enter the "dental practice management software" category and try to win it on features. It concedes that category — DoliDentiste and others occupy it competently and cheaply — and defines an adjacent one:

**From Practice Management → to Dental Journey Intelligence.**

This matters commercially: competing on features against an 80 TND/month incumbent is a losing price war. Competing on recovered treatment value is a different conversation, with a different buyer emotion and a different price ceiling.

### Brand personality

Five attributes, each with a design consequence:

| Attribute | Means | Design consequence |
|---|---|---|
| **Instrumental** | It is a precision tool, not an app | Nothing decorative survives; every mark carries information |
| **Continuous** | Its subject is time, not state | The visual signature is a *line*, not an icon |
| **Restrained** | Confidence needs no volume | One accent colour, one type family, generous silence |
| **Clinically literate** | It speaks dentistry natively | FDI numbering, correct vocabulary, real procedures |
| **Deferential** | The dentist decides | AI output visibly provisional until approved |

### Verbal identity

- **Name:** ORAVIA — *ora* (mouth) + *via* (way, path). The name already contains the thesis.
- **Descriptor:** The Living Dental Journey
- **Tagline:** Every tooth. Every visit. Every next step. — كل سن. كل حصة. كل خطوة قادمة.
- **Voice:** declarative, unhurried, specific. States what is, never sells. Numbers over adjectives. Never uses "revolutionary", "seamless", "powered by AI".

### The mark

Not a tooth icon. A **crown arch whose root descends and continues past the tooth as a threaded line punctuated by nodes** — the final node in the signature colour.

It reads simultaneously as tooth anatomy, as a timeline, and as a path. The gold node means *here is where this patient is now* — which is the entire product expressed in a single element. Recognisable without the wordmark, per §26.

### Colour system

The foundation is a near-black with a faint violet cast rather than a neutral dark — a flat black reads as a document, a chromatic one reads as an environment. On top of it sit three depths of light: drifting radial fields, the journey line, and a grain veil that stops the large gradients from banding.

| Token | Hex | Meaning rule — not decoration |
|---|---|---|
| `--n0` | `#07070E` | Ground. Near-black carrying a trace of the signature hue |
| `--n1` / `--n2` | `#0B0A16` / `#12101F` | Raised clinical surfaces |
| `--ivory` | `#F3F0EA` | Enamel ivory. Primary type |
| `--slate` / `--dim` | `#A3A6BE` / `#6E7191` | Secondary and supporting type |
| `--v` | `#7C6BF5` | **The signature. Reserved to mean one thing: the current position in the journey.** |
| `--v-lt` | `#A98BFF` | The signature at reading weight, for type |
| `--cy` | `#4DD6E8` | Data accent, used only where the line resolves |

Clinical states carry their own restrained set — enamel, slate, sage, amber, coral — and the signature violet doubles as the *active treatment* state. That is not a collision but the point: the colour that means "now" on the brand mark is the same colour that means "this is the tooth being treated today" on the chart.

The discipline that makes this a system rather than a palette: **violet is never used for emphasis.** A designer reaching for it to make a headline pop breaks the semantic contract. Because colour may not carry state alone, every clinical state renders as **colour + glyph + text label**, always all three, in the chart, the legend, the panel, the passport and the time machine alike.

### Typography

- **IBM Plex Sans Arabic** for Arabic, across weights 200–700. Chosen because it is a genuine Arabic type design rather than a Latin face with Arabic bolted on, and because IBM Plex's engineered character matches "premium medical instrument" better than a humanist or calligraphic Arabic would.
- **IBM Plex Sans** for Latin and technical terms — same superfamily, so mixed Arabic/French/English strings inside one sentence (which is how Tunisian dentists actually speak) sit on the same baseline without visual seams.

One superfamily, not two competing ones. Weight, size and spacing carry the hierarchy.

---

## PHASE 02 — PRODUCT ARCHITECTURE

### The central abstraction

Everything in ORAVIA hangs off one relationship, and nothing is allowed to exist outside it:

```
Patient → Case → Tooth → Session → Procedure → Evidence → Next Step
```

The **Case** is the unit that competitors lack. A PMS models patient + appointment + act. ORAVIA models the *case* as a first-class, stateful, long-lived object with a lifecycle. That single schema decision is what makes continuity computable rather than remembered.

### Layered architecture

```
  ┌─────────────────────────────────────────────────┐
  │  SURFACES   Today · Patient · Chair · Secretary  │
  │             Practice · Patient Portal            │
  ├─────────────────────────────────────────────────┤
  │  ENGINES    Memory · Journey · Continuity ·      │
  │             Intelligence                         │
  ├─────────────────────────────────────────────────┤
  │  ASSIST     Voice→structure · Brief generation · │
  │             Summarisation   [all → Approval Gate]│
  ├─────────────────────────────────────────────────┤
  │  DOMAIN     Case · Tooth · Session · Procedure · │
  │             Evidence · Consent · Task            │
  ├─────────────────────────────────────────────────┤
  │  PLATFORM   Tenancy · RBAC · Audit · Encryption ·│
  │             Consent registry · Retention         │
  └─────────────────────────────────────────────────┘
```

**The Approval Gate is an architectural component, not a UI convention.** No AI-derived clinical fact can reach the Domain layer except through a state transition signed by a clinician. This is enforced in the write path, so it cannot be bypassed by a future feature, a bug, or a well-meaning engineer.

---

## PHASE 03 — FOUR-ENGINE FUNCTIONAL SPECIFICATION

Every feature below names the engine it serves, per §40. Anything that failed the seven-question test in §40 was cut and is listed at the end.

### ENGINE 01 — DENTAL MEMORY
*Preserve exactly what happened.*

| Capability | Why it exists |
|---|---|
| Append-only clinical event log | The record must be reconstructable years later; edits supersede, never overwrite |
| Tooth as persistent entity (FDI) with its own lifetime history | A tooth outlives cases, dentists and software |
| Surface-level charting (M/O/D/B/L) | Caries recurrence is surface-specific; tooth-level is too coarse to be clinically useful |
| Evidence attachment at session level — radiographs, photos, documents | Evidence orphaned from its session is evidence lost |
| Full audit trail: who changed what, when, from what to what | §21 requirement and the only defence in a dispute |
| Supersession model — corrections create new versions, prior state remains readable | §02: nothing disappears when edited |

### ENGINE 02 — TREATMENT JOURNEY
*Always know where the patient stands.*

| Capability | Why it exists |
|---|---|
| Case lifecycle with explicit stages, each stage `pending / active / complete / skipped` | Makes "where are we" a query, not a memory |
| Computed current stage, next stage, completion percentage | The dentist should never count sessions manually |
| Overdue detection per stage against expected interval | An unfinished canal has a clinical clock, not just a calendar one |
| Multiple concurrent independent cases per patient | §12 — tooth 46 endo and tooth 16 caries are separate journeys |
| Dentist-defined plan templates (endo, crown, implant, perio, ortho) | AI proposes sequence *only* from plans the dentist authored |

### ENGINE 03 — PATIENT CONTINUITY
*Detect who is falling out of care, and create work.*

The engine's output is **not notifications**. It is a prioritised, assignable, closable **task queue** — §18's distinction between data and action.

| Detector | Generated task |
|---|---|
| Session completed, next not booked, > N days | Book next session — *the highest-value detector in the product* |
| Appointment missed | Contact and reschedule |
| Case stage overdue against clinical interval | Clinical follow-up, escalated |
| Treatment accepted but never started | Pending decision follow-up |
| Recall due / overdue | Recall queue |
| No activity across all cases > N months | Reactivation |

Each task carries: priority, reason, patient, case, owner, due date, outcome. Closing a task is logged. **Queue health is itself a Practice Intelligence metric** — a queue nobody works is a queue that lies.

### ENGINE 04 — PRACTICE INTELLIGENCE
*Answer "what needs me today" before "here are 40 statistics."*

§05 warns against dashboard overload, so the dashboard is ordered, not comprehensive:

1. **Attention band** — open urgent tasks, overdue cases, today's unconfirmed appointments. Nothing else competes for first position.
2. **Continuity band** — treatment completion rate, cases stalled by stage, recall compliance, reactivation.
3. **Operations band** — no-show and cancellation rate, chair utilisation, average sessions per case, average case duration.
4. **Value band** — outstanding treatment value, case acceptance, revenue per completed case.

The headline metric ORAVIA is accountable for is **treatment completion rate**. If the product works, that number rises. If it does not rise, the product does not work. Naming a single falsifiable metric is deliberate.

### Features cut by the §40 test

Cut, with reason, to demonstrate the discipline is real: patient loyalty points (serves no engine); in-app chat between staff (WhatsApp already wins, no continuity value); inventory management (serves administration, not journey — reconsider post-PMF); AI-suggested diagnoses from radiographs (violates §24 and requires regulatory clearance ORAVIA will not have); social-media booking widget (acquisition, not continuity); gamified patient streaks (childish per §25, and clinically meaningless).

---

## PHASE 04 — MVP SCOPE

§29's P0 list is correct but under-sequenced. Reordered into three shippable increments so the thesis is testable before the whole is built.

### Increment A — "The record holds" (weeks 1–8)
Auth · tenant workspace · RBAC (owner/dentist/secretary/assistant) · patient management with `ORA-P-` identifiers and duplicate prevention · appointment calendar · patient profile · audit trail from day one.

*Nothing differentiated ships here.* This is the floor required to be taken seriously, and it is where ORAVIA is at parity with — not ahead of — DoliDentiste. Underestimating this increment is the classic failure of thesis-led products.

### Increment B — "The journey is computable" (weeks 9–16)
Case object with stages · tooth-level records on FDI · interactive 2D dental chart · treatment timeline · session records with evidence · dentist-defined next step.

**This is the increment that proves the thesis.** At its end, a dentist can select tooth 46 and read its history without reconstructing it. If that does not visibly land with pilot dentists, the strategy is wrong and should change before more is built.

### Increment C — "The practice acts" (weeks 17–24)
Continuity detectors · task queue with ownership and closure · Today view · attention-first dashboard · treatment completion rate.

Ship order matters: **Increment C is what a practice pays for**, but it is meaningless without B, and B is unusable without A.

### Deliberately deferred

**3D visualisation is P1, not P0** — and the deck must say so. A 3D arch that renders beautifully and holds no longitudinal data is exactly the gimmick §42's self-audit warns against. The 2D FDI chart carries every clinical function; 3D adds comprehension, not capability. Also deferred: voice capture (P1, after the record it writes into exists), patient portal (P1), Dental Passport (P2, gated on legal validation), multi-clinic (P2).

---

## PHASE 05 — INFORMATION ARCHITECTURE

```
TODAY ──────────── the default landing surface for every role
  ├─ appointments with clinical briefs attached
  ├─ attention queue (urgent first)
  └─ confirmations, arrivals, no-shows

PATIENTS
  └─ PATIENT ─── clinical command centre, not a CRM record
       ├─ header: identity, ORA-P id, last visit, next appointment, open cases
       ├─ DENTAL MAP ─── entry point to everything clinical
       │     └─ TOOTH ─── identity · surfaces · state · full history · evidence
       ├─ CASES ─── one journey each, with stage, next step, completion
       │     └─ SESSION ─── procedures · notes · evidence · next step
       ├─ TIMELINE ─── all cases merged chronologically
       ├─ HISTORY · IMAGING · DOCUMENTS
       └─ APPOINTMENTS · ADMINISTRATIVE

CALENDAR ───────── appointments bound to case and session, never free-floating
CONTINUITY ─────── the task queue as a working surface
PRACTICE ───────── attention band first, statistics second
SETTINGS ───────── team, roles, plan templates, consent register, audit log
```

**Navigation principle:** the dental map is the primary route into clinical data, not a tab beside it. In a PMS the patient record is a form with an odontogram widget. In ORAVIA the mouth *is* the interface.

**Role divergence (§16):** the secretary's Today shows contact-driven work — confirmations, missed appointments, recall calls, unbooked next sessions — and no clinical detail beyond what the call requires. This is least-privilege, not simplification.

---

## PHASE 06 — UX/UI DESIGN SYSTEM

**Spacing:** 4px base; scale 4/8/12/16/24/32/48/64/96. Clinical density is higher than marketing density — the chairside interface may be tight, the deck may breathe.

**Type scale:** 12 / 14 / 16 / 20 / 26 / 34 / 46 / 62 / 84. Arabic set slightly larger than Latin at equal rank, because Arabic letterforms carry more detail at small sizes.

**Radius:** 2px on data surfaces, 8px on containers, 999px on status pills only. Varying radius by hierarchy — not one radius on everything.

**Clinical state rendering — the non-negotiable rule:** every state is `colour + icon + text`. Always three. A colour-blind dentist, a printed chart, and a low-quality screen must all convey the same clinical fact. This is a patient-safety requirement, not an accessibility checkbox.

**Motion:** one orchestrated moment per surface, and motion that answers an action. Stage transitions animate because something changed. Nothing fades in because it loaded.

**RTL:** the layout is authored in logical properties (`inline-start`/`inline-end`), never left/right, so Arabic and French UIs are the same layout mirrored rather than two maintained designs. FDI numerals and the dental arch stay in clinical orientation regardless of text direction — the arch is anatomy, not text, and must not mirror.

---

## PHASE 07 — DOMAIN MODEL

Abbreviated to the entities that carry the thesis. Every table carries `tenant_id`, and tenant isolation is enforced at the row level, not in application code.

```
tenant            id, name, settings, region
user              id, tenant_id, role, secrecy_undertaking_at
patient           id, tenant_id, public_id "ORA-P-004281", identity,
                  contact, match_keys[]
tooth             id, patient_id, fdi_code, present, current_state
                  ← persists for the patient's lifetime, survives every case

case              id, patient_id, primary_tooth_id, diagnosis,
                  plan_template_id, status, opened_at, closed_at
case_stage        id, case_id, ordinal, name, status,
                  expected_interval_days, due_at, completed_at
                  ← where "overdue" and "next step" are computed

session           id, case_id, appointment_id, performed_at, dentist_id, notes
procedure         id, session_id, tooth_id, surfaces[], act_code (DCH/STMDLP),
                  material, outcome
evidence          id, session_id, tooth_id, kind, uri, captured_at

clinical_event    id, patient_id, tooth_id, case_id, kind, payload,
                  recorded_by, recorded_at, supersedes_id
                  ← append-only; the Memory engine reads this, nothing else writes history

appointment       id, patient_id, case_id, stage_id, chair_id,
                  starts_at, duration, objective, status
task              id, tenant_id, patient_id, case_id, detector, priority,
                  reason, assignee_id, due_at, closed_at, outcome
consent           id, patient_id, scope, granted_at, expires_at,
                  revoked_at, granted_to, legal_basis
                  ← first-class from migration 1, per §20 and Law 2004-63
audit_log         id, tenant_id, actor_id, entity, entity_id, action,
                  before, after, at
ai_suggestion     id, source_kind, raw_input, structured_output,
                  status(pending|approved|rejected|edited), reviewed_by, reviewed_at
                  ← the Approval Gate; nothing reaches clinical tables without a row here
```

Two decisions worth defending:

**`tooth` belongs to `patient`, not to `case`.** It is the only way tooth 46's 2024 caries, 2026 endodontic treatment and 2031 crown replacement live on one thread. Modelling teeth inside cases would make the Time Machine impossible.

**`ai_suggestion` sits outside the clinical tables entirely.** Approval is a write, not a flag. An AI output that is never approved leaves no trace in the record, which is exactly what §24 demands.

Act codes use **DCH / STMDLP** — the coding the Tunisian market already runs on, per the DoliDentiste research. Inventing a coding scheme would be an unforced adoption error.

---

## PHASE 08 — TECHNICAL ARCHITECTURE

Deliberately conservative, because §29 says not to sacrifice reliability for visual complexity, and because this is health data.

| Layer | Choice | Reasoning |
|---|---|---|
| Client | Progressive web app, works on the phone in the corridor | The DoliDentiste testimonial names phone access between appointments as the winning behaviour |
| API | Boring monolith, typed, REST | A multi-tenant health system's hard problems are isolation and auditing, not service topology |
| Data | PostgreSQL with row-level security keyed on `tenant_id` | Isolation enforced by the database, not by remembering a `WHERE` clause |
| Evidence | Object storage, tenant-scoped keys, encrypted at rest, signed short-lived URLs | Radiographs must never be reachable by guessable URL |
| Hosting | Tunisian or INPDP-authorised region | Cross-border transfer requires authorisation; this is a product constraint, not an ops preference |
| Voice | Recorded → transcribed → entity-extracted → **queued as `ai_suggestion`** | Never a direct write path |
| Audit | Append-only, separate retention, not deletable by tenant admins | An audit log a customer can erase is not an audit log |

**On the Tunisian speech pipeline (§11):** the honest engineering position is that no off-the-shelf model handles Tunisian Arabic code-switched with French dental terminology well. The tractable path is not a general Tunisian ASR model but a **constrained-vocabulary** one: the space of things a dentist says at the chair is small and highly structured — an FDI number, a procedure from a known set, a status, a symptom, a next step. Recognition against a ~500-term closed dental lexicon with a fixed slot structure is a dramatically easier problem than open-domain Tunisian ASR, and it is where the first version should live. Collecting labelled chairside audio from pilot practices, with consent, is the actual moat — the model is downstream of the data.

---

## PHASE 09 — PITCH DECK NARRATIVE

18 slides, Arabic, following §32, with the research above load-bearing rather than decorative.

The narrative spine: **a record that remembers everything and understands nothing → the cost of that gap → a system whose primary object is the journey → evidence that it is buildable → an honest market and an honest ask.**

Three deliberate departures from a conventional deck, each defensible:

1. **The competitor slide names DoliDentiste and its real price.** Investors verify. A deck that pretends the category is empty when a Tunisian competitor sells at 80 TND/month fails the first ten minutes of diligence. Naming the anchor and arguing past it is stronger than hiding it.

2. **The market slide states the data gap rather than filling it.** The only dentist headcount available is from 2016. TAM/SAM/SOM are presented as a construction with visible assumptions and a named path to the real number, not as three confident circles.

3. **3D is presented as P1.** §42's self-audit asks whether 3D serves the product or becomes a gimmick. Presenting it as the eventual comprehension layer over a 2D-complete clinical core is both true and more credible than leading with it.

Slides 15 and 17 carry explicit qualification labels. Slide 21's caution is honoured throughout: no compliance is claimed anywhere.
