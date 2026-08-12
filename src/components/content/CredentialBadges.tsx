import { cn } from "@/lib/cn";

export interface Badge {
  label: string;
  value: string;
}

export function CredentialBadges({
  badges,
  onDark = false,
}: {
  badges: Badge[];
  onDark?: boolean;
}) {
  const visible = badges.filter((b) => Boolean(b.value));
  if (visible.length === 0) return null;

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-1 font-mono text-[0.8rem]",
        onDark ? "text-[var(--color-chrome-muted)]" : "text-[var(--color-ink-60)]",
      )}
    >
      {visible.map((b) => (
        <li key={b.label}>
          {b.label}{" "}
          <span
            className={cn(
              "license-number",
              onDark ? "text-[var(--color-eggshell)]" : "text-[var(--color-ink)]",
            )}
          >
            {b.value}
          </span>
        </li>
      ))}
    </ul>
  );
}
