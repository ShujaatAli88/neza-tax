export function SectionDecor({ colors }: { colors: string[] }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {colors.map((color, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 h-72 w-72 -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
          style={{ backgroundColor: color, left: `${((i + 1) / (colors.length + 1)) * 100}%` }}
        />
      ))}
    </>
  );
}
