import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  id?: string;
  align?: "center" | "left";
  invert?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, id, align = "center", invert }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className={`font-hand text-2xl ${invert ? "text-apricot" : "text-ember-dark"}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-1 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
          invert ? "text-paper" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${invert ? "text-paper/80" : "text-muted"}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
