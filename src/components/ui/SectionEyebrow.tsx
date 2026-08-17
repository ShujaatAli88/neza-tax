import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden="true" className="eyebrow-rule" />
      <Eyebrow>{children}</Eyebrow>
    </div>
  );
}
