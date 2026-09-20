# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `brand-identity` skill** before writing any frontend code, every session, no exceptions. It carries the Berry Swift visual identity and points at the full spec — hexes, type scale, button states, logo rules, contrast ratios — in `brand guidelines/Berry Swift Brand Guidelines.md`.
- **Invoke the `brand-voice` skill** before writing any customer-facing words, down to a single button label.
- **The brand guidelines are the authority.** Where anything in this file disagrees with them, the guidelines win and this file gets fixed. One fact in two places that disagree is the drift the `brand-change` skill exists to prevent.

## Brand Voice (Copywriting)
Apply these to all customer-facing copy on the landing page:
- **Speak directly to the reader as "you."** Never refer to the audience in the third person ("customers," "clients," "people," "homeowners," "most clients"). One exception: an **eligibility label** naming who an offer applies to — the "New recurring clients" tag on the offer card. Label only, never a sentence. "New clients get a free deep clean upgrade" takes a verb, so it is running copy and goes back to "you." Full rule and rationale: the brand guidelines, Writing rules.
- **Use "we" for the company** — warm, personal, first-person when talking to the reader.
- **Avoid "but" wherever possible** without making the sentence awkward. Prefer additive phrasing. Example: "You'll love the basic clean and the deep clean" — not "You'll love the basic clean, but the deep clean more."
- Prefer instructional/directive phrasing over describing what other people do (e.g., "Start with a deep clean, then move into recurring service" rather than "Most clients start with a deep clean").

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.
- Ultimately whats going to happen is we are syncing all of the changes to Github and Github will automatically push those changes to Vercel. But when I'm making changes with you here we will always test on `http://localhost:3000` until I tell you explicitly to push that to Github or commit those changes to Github

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Hard Rules
- Colour, type, logo, buttons, imagery and spacing come from the brand guidelines. Never invent a colour, a third typeface, or a new interaction pattern.
- Only animate `transform` and `opacity`. Never `transition-all`.
- Every clickable element needs hover, focus-visible, and active states. No exceptions.
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
