import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">{description}</p>
    </div>
  );
}
