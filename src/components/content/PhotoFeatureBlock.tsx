import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PhotoFeatureBlockProps {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  color: string;
  eyebrow: string;
  title: string;
  body: string | string[];
  cta?: { label: string; href: string };
  imagePosition?: "left" | "right";
  /** "cutout" (default) expects a transparent PNG floating on the color panel.
   *  "framed" is for an ordinary rectangular photo, filling the panel edge-to-edge. */
  imageFit?: "cutout" | "framed";
}

export function PhotoFeatureBlock({
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  color,
  eyebrow,
  title,
  body,
  cta,
  imagePosition = "left",
  imageFit = "cutout",
}: PhotoFeatureBlockProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  const photo =
    imageFit === "framed" ? (
      <div className="relative min-h-[320px]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 340px, 100vw" className="object-cover" />
      </div>
    ) : (
      <div
        className="relative flex min-h-[320px] items-center justify-center overflow-hidden p-8"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${color}, white 42%), color-mix(in srgb, ${color}, black 10%))`,
        }}
      >
        {/* Simulated out-of-focus office backdrop — soft bokeh light + blurred window mullions */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ filter: "blur(30px)" }}>
          <div
            className="absolute -left-6 top-[8%] h-28 w-28 rounded-full opacity-70"
            style={{ backgroundColor: "white" }}
          />
          <div
            className="absolute right-[10%] top-[38%] h-36 w-36 rounded-full opacity-40"
            style={{ backgroundColor: "var(--color-seal)" }}
          />
          <div
            className="absolute left-[30%] -bottom-8 h-24 w-44 rounded-full opacity-40"
            style={{ backgroundColor: "white" }}
          />
          <div
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30"
            style={{ backgroundColor: color }}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: "repeating-linear-gradient(100deg, white 0 2px, transparent 2px 110px)",
            filter: "blur(4px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-9 h-5 w-[150px] rounded-full opacity-30 blur-md sm:w-[175px]"
          style={{ backgroundColor: "black" }}
        />
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes="(min-width: 768px) 280px, 260px"
          className="relative h-auto w-[220px] drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] sm:w-[260px]"
        />
      </div>
    );

  const text = (
    <div className="p-8 md:p-10">
      <p className="eyebrow mb-2" style={{ color }}>
        {eyebrow}
      </p>
      <h3 className="text-[1.35rem]">{title}</h3>
      <div className="prose-measure mt-3 space-y-3 text-[1.05rem] text-[var(--color-ink-60)]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-semibold"
          style={{ color }}
        >
          {cta.label}
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${color}, transparent 88%)` }}
          >
            <ArrowRight size={13} aria-hidden="true" />
          </span>
        </Link>
      )}
    </div>
  );

  const gridCols = imagePosition === "left" ? "md:grid-cols-[340px_1fr]" : "md:grid-cols-[1fr_340px]";

  return (
    <div className={`card-surface grid overflow-hidden md:items-center ${gridCols}`}>
      {imagePosition === "left" ? (
        <>
          {photo}
          {text}
        </>
      ) : (
        <>
          {text}
          {photo}
        </>
      )}
    </div>
  );
}
