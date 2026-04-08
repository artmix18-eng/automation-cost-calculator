export function formatUAH(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? "−" : ""

  if (abs >= 1_000_000) {
    const m = abs / 1_000_000
    const formatted =
      m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace(".", ".")
    return `${sign}₴ ${formatted}М`
  }

  if (abs >= 1_000) {
    const formatted = new Intl.NumberFormat("uk-UA", {
      maximumFractionDigits: 0,
    }).format(abs)
    return `${sign}₴ ${formatted}`
  }

  return `${sign}₴ ${abs.toFixed(0)}`
}

export function formatHours(value: number): string {
  return `${Math.round(value)} год/міс`
}

export function formatMonths(value: number): string {
  if (!isFinite(value)) return "∞"
  return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} міс`
}

export function formatROI(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${Math.round(value)}%`
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}
