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
          className="inline-flex items-center justify-center min-w-[1.6em] h-[1.6em] px-1.5 rounded-md bg-[#001535] border border-[#002A6B] text-xs font-mono text-[#F0F5FB] shadow-[0_1px_0_0_#002A6B]"
        >
          {typeof key === "string" ? key.trim() : key}
        </kbd>
      ))}
    </span>
  );
}
