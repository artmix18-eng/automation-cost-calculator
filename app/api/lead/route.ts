import { NextRequest, NextResponse } from "next/server"
import { sendTelegramLead } from "@/lib/telegram"
import type { LeadData } from "@/lib/telegram"

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { name, contact, company, calcResults } = body as Partial<LeadData>

  if (!name || !contact || !company) {
    return NextResponse.json(
      { error: "Missing required fields: name, contact, company" },
      { status: 400 }
    )
  }

  try {
    await sendTelegramLead({ name, contact, company, calcResults })
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"

    if (message.includes("Missing TELEGRAM_BOT_TOKEN")) {
      return NextResponse.json(
        { error: "Telegram not configured" },
        { status: 503 }
      )
    }

    return NextResponse.json({ error: message }, { status: 502 })
  }
}
