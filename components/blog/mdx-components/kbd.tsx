interface KbdProps {
  children: React.ReactNode;
}

export function Kbd({ children }: KbdProps) {
  const keys = typeof children === "string" ? children.split("+") : [children];
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {keys.map((key, i) => (
        <kbd
          key={i}
          className="inline-flex items-center justify-center min-w-[1.6em] h-[1.6em] px-1.5 rounded-md bg-card border border-border text-xs font-mono text-foreground shadow-[0_1px_0_0_var(--border)]"
        >
          {typeof key === "string" ? key.trim() : key}
        </kbd>
      ))}
    </span>
  );
}
