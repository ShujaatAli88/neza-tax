export function CalendarDateBadge({
  month,
  day,
  color,
}: {
  month: string;
  day: number;
  color: string;
}) {
  const tint = `color-mix(in srgb, ${color}, white 84%)`;

  return (
    <div className="relative shrink-0 pt-1.5">
      <span
        aria-hidden="true"
        className="absolute top-0 left-3 h-3 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-rule)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-0 right-3 h-3 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-rule)" }}
      />
      <div
        className="w-16 overflow-hidden rounded-xl transition-transform duration-200 group-hover:-translate-y-0.5"
        style={{ boxShadow: `0 10px 20px -6px color-mix(in srgb, ${color}, transparent 45%)` }}
      >
        <div
          className="flex h-6 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, ${color}, white 12%), color-mix(in srgb, ${color}, black 18%))`,
          }}
        >
          <span className="font-mono text-[0.62rem] font-bold tracking-wider text-white uppercase">{month}</span>
        </div>
        <div className="flex h-11 items-center justify-center" style={{ backgroundColor: tint }}>
          <span
            className="text-[1.55rem] leading-none font-bold"
            style={{ color, fontFamily: "var(--font-display)" }}
          >
            {day}
          </span>
        </div>
      </div>
    </div>
  );
}
