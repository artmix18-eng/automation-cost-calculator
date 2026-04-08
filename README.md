# AutoFlow — ROI Calculator for Business Automation

A portfolio-grade SaaS landing page that helps businesses calculate the exact ROI of automating their workflows. Built with a focus on real business logic, clean UI, and a lead capture system.

## Live Demo

> Deploy link here (Vercel)

---

## What It Does

Enter your team's parameters — headcount, hourly rate, hours spent on routine tasks, automation potential — and instantly see:

- **Monthly net savings** (₴)
- **Annual savings** (₴)
- **Hours saved per month**
- **Payback period** in months
- **12-month ROI** (%)
- **Cumulative savings chart** with breakeven line

Three preset profiles (Marketing, Sales Ops, Support) let you explore typical scenarios instantly.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Theme | next-themes (dark/light) |
| Notifications | Sonner |
| Deploy | Vercel |

---

## Calculator Logic

All formulas live in `lib/calculator.ts` — pure functions, fully typed, zero UI dependencies.

```
monthlyHoursSaved   = employees × hoursPerWeek × (automationPercent / 100) × 4.33
monthlyCostSaved    = monthlyHoursSaved × hourlyRate
monthlyNetSavings   = monthlyCostSaved − monthlyToolCost
paybackMonths       = implementationCost / monthlyNetSavings
annualROI           = ((monthlyNetSavings × 12 − implementationCost) / implementationCost) × 100
```

---

## Project Structure

```
app/
├── page.tsx                  # Landing page (7 sections)
├── layout.tsx                # Root layout, ThemeProvider, SEO metadata
├── globals.css               # CSS variables for dark/light theme
└── api/lead/route.ts         # POST endpoint → Telegram bot notification

components/
├── calculator/               # Calculator form, result cards, chart
├── sections/                 # All landing sections
├── layout/                   # Header, Footer, ThemeToggle
└── ui/                       # shadcn/ui components + FadeInSection

lib/
├── calculator.ts             # ROI formulas and types
├── format.ts                 # UAH, hours, months, % formatters
├── schema.ts                 # Zod schemas for calculator + lead form
└── telegram.ts               # Lead notification via Telegram Bot API

data/
├── presets.ts                # 3 input presets (Marketing, Sales, Support)
├── faq.ts                    # FAQ items
└── use-cases.ts              # Client case studies with metrics
```

---

## Lead Capture

When a visitor submits the contact form, the app sends a structured message to a Telegram chat via Bot API — including their calculator results.

---

## Getting Started

```bash
git clone https://github.com/artmix18-eng/automation-cost-calculator.git
cd automation-cost-calculator
npm install
```

Create `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Design Decisions

- **Frontend-only MVP** — no database or auth needed for a portfolio/lead-gen tool
- **Business logic isolated from UI** — `lib/calculator.ts` has zero React dependencies, easy to test
- **Live calculation** — results update on every slider/input change via `useWatch`, no submit button needed
- **Dark mode default** — fits the B2B SaaS aesthetic, toggle available
- **Telegram over email** — faster lead notification for a solo operator

---

## What's Next (v2)

- PDF report generation (jsPDF)
- Share results via URL params
- Before/After workflow visualization
- Admin dashboard mockup
- i18n (EN/UK)
