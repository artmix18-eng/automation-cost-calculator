# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server on localhost:3000 (Turbopack)
npm run build    # production build + TypeScript check
npm run lint     # ESLint
npm run start    # serve production build
```

Always run `npm run build` after making changes — it's the fastest way to catch TypeScript errors. There are no tests.

## Stack Notes

- **Next.js 16** (App Router) — not Pages Router. All routes live in `app/`.
- **Tailwind v4** — no `tailwind.config.ts` plugin syntax. CSS variables defined in `app/globals.css`.
- **shadcn/ui** uses `@base-ui/react` under the hood (not Radix). `Button` from `@base-ui/react` does **not** support `asChild` — use `<a>` with `buttonVariants()` from `class-variance-authority` instead.
- **Zod v4** — `error:` field instead of `invalid_type_error:` / `required_error:`.
- **`"use client"`** — only on components that use hooks or event handlers. Sections without interactivity are server components.

## Architecture

### Data flow in the calculator

```
data/presets.ts → calculator-form.tsx (useForm + useWatch)
                       ↓ live on every field change
              lib/calculator.ts → calculateROI()
                       ↓
         result-cards.tsx + result-chart.tsx
```

`lib/calculator.ts` contains all ROI formulas as pure functions with no React dependencies. Keep business logic there, not in components.

### Lead capture flow

```
cta-section.tsx (form submit)
  → POST /api/lead
    → lib/telegram.ts → sendTelegramLead()
      → Telegram Bot API
```

### Key files

| File | Purpose |
|------|---------|
| `lib/calculator.ts` | ROI formulas, `CalcInput` / `CalcResult` types |
| `lib/schema.ts` | Zod schemas for calculator form and lead form |
| `lib/format.ts` | UAH (₴), hours, months, ROI formatters |
| `lib/telegram.ts` | Telegram Bot API integration, HTML-escapes user input |
| `data/presets.ts` | 3 preset configurations for the calculator |
| `app/api/lead/route.ts` | POST endpoint — validates body, calls `sendTelegramLead` |
| `components/calculator/calculator-form.tsx` | Main calculator container, preset buttons, 2-col layout |

## Environment Variables

Required in `.env.local` for lead form to work:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Without these, `/api/lead` returns 503. The calculator itself works without them.

## Deployment

`netlify.toml` is configured — deploy via Netlify with `@netlify/plugin-nextjs`. API routes run as Netlify Functions automatically.
