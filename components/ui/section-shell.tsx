import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section className={cn("relative py-20 sm:py-24", className)} id={id}>
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

