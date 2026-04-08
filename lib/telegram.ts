import type { CalcResult } from "./calculator"

export interface LeadData {
  name: string
  contact: string
  company: string
  calcResults?: Partial<CalcResult>
}

export async function sendTelegramLead(data: LeadData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error(
      "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables"
    )
  }

  const { name, contact, company, calcResults } = data

  let resultsBlock = ""
  if (calcResults) {
    const lines: string[] = []

    if (calcResults.monthlyHoursSaved !== undefined)
      lines.push(`⏱ <b>Економія годин:</b> ${calcResults.monthlyHoursSaved} год/міс`)

    if (calcResults.monthlyNetSavings !== undefined)
      lines.push(
        `💰 <b>Чиста економія/міс:</b> ₴${calcResults.monthlyNetSavings.toLocaleString("uk-UA")}`
      )

    if (calcResults.annualSavings !== undefined)
      lines.push(
        `📅 <b>Економія за рік:</b> ₴${calcResults.annualSavings.toLocaleString("uk-UA")}`
      )

    if (calcResults.paybackMonths !== undefined) {
      const pb = isFinite(calcResults.paybackMonths)
        ? `${calcResults.paybackMonths} міс`
        : "∞"
      lines.push(`🔁 <b>Окупність:</b> ${pb}`)
    }

    if (calcResults.annualROI !== undefined)
      lines.push(`📈 <b>ROI за 12 міс:</b> ${calcResults.annualROI}%`)

    if (lines.length > 0) {
      resultsBlock = "\n\n<b>📊 Результати калькулятора:</b>\n" + lines.join("\n")
    }
  }

  const text =
    `🔔 <b>Новий лід з калькулятора ROI</b>\n\n` +
    `👤 <b>Ім'я:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Контакт:</b> ${escapeHtml(contact)}\n` +
    `🏢 <b>Компанія:</b> ${escapeHtml(company)}` +
    resultsBlock

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram API error ${response.status}: ${body}`)
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
