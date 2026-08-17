export function SectionDecor({ colors }: { colors: string[] }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: "radial-gradient(var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(120% 90% at 50% 0%, black 35%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%, black 35%, transparent 92%)",
        }}
      />
      {colors.map((color, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute h-80 w-80 -translate-x-1/2 rounded-full opacity-[0.22] blur-3xl ${
            i % 2 === 0 ? "-top-28" : "top-1/4"
          }`}
          style={{ backgroundColor: color, left: `${((i + 1) / (colors.length + 1)) * 100}%` }}
        />
      ))}
    </>
  );
}
