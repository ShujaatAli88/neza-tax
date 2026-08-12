import { ShieldCheck } from "lucide-react";

export function GuaranteeBlock() {
  return (
    <div className="card-surface flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:p-10">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[var(--color-white)]"
        style={{ backgroundColor: "var(--color-seal)" }}
      >
        <ShieldCheck size={26} strokeWidth={2} />
      </span>
      <div>
        <p className="eyebrow mb-2" style={{ color: "var(--color-seal)" }}>
          The guarantee
        </p>
        <p className="prose-measure text-[1.05rem]">
          If you&rsquo;re not happy with the service or the fee, you don&rsquo;t pay. Estimates are
          always free, before any work starts, with no obligation.
        </p>
      </div>
    </div>
  );
}
