import { Zap, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <Zap size={18} className="text-primary" />
            <span>AutoFlow</span>
          </a>
          <p className="text-xs text-muted-foreground">
            Автоматизуємо рутину — звільняємо час
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Send size={14} />
            Telegram
          </a>
          <span className="text-sm text-muted-foreground">© 2025 AutoFlow</span>
        </div>
      </div>
    </footer>
  );
}
