import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const TEAM = [
  {
    name: "Lojan Essam Farouk",
    initials: "LF",
    tilt: "-rotate-2",
    points: [
      "3rd-year Computer Engineering student",
      "Ex-IBM DevSecOps intern",
      "F1 driverless team member",
      "IEEE member",
    ],
  },
  {
    name: "Judy Essam Farouk",
    initials: "JF",
    tilt: "rotate-2",
    points: [
      "Senior Computer Engineering student",
      "Ex-software engineer at Blink22",
      "Former head of the driverless team",
      "Former IEEE member",
    ],
  },
];

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="border-t border-beige bg-card/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="team-title" eyebrow="The team" title="The people behind Daftar" />
        <ul className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2">
          {TEAM.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={i * 0.1} className="card relative h-full p-7">
                <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden />
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-apricot font-heading text-2xl font-bold text-navy ${m.tilt}`}
                  >
                    {m.initials}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-navy">{m.name}</h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-muted">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
