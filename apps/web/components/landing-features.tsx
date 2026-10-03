import { Star } from "lucide-react";
import { WALL_OF_LOVE_LAYOUTS } from "@/lib/constants";
import Reveal from "./reveal";
import {
  CollectVisual,
  ManageVisual,
  ShowcaseVisual,
} from "./landing-stage-visuals";

function layoutPhrase() {
  const labels = WALL_OF_LOVE_LAYOUTS.map((layout) => layout.label.toLowerCase());
  return `${labels.slice(0, -1).join(", ")}, or ${labels[labels.length - 1]}`;
}

const stages = [
  {
    step: "1",
    title: "Collect",
    items: [
      "A public link for each space",
      "Text, video, or both",
      "Questions you write",
      "Star ratings, when you turn them on",
      "A theme for the form, and a thank-you page after they send it",
    ],
  },
  {
    step: "2",
    title: "Manage",
    items: [
      "Every submission in one inbox",
      "AI spam detection, on paid plans",
      "Sentiment tagged positive, negative, or neutral, on paid plans",
      "Video is transcribed so sentiment can use what was said, on paid plans",
      "Archive, sort, and edit",
    ],
  },
  {
    step: "3",
    title: "Showcase",
    items: [
      `Wall of Love in a ${layoutPhrase()}`,
      "One testimonial, embedded, with its own border, background, shadow, and type",
      "A link you can share for a single testimonial",
      "Page views for the collection page and the Wall of Love, on paid plans",
    ],
  },
] as const;

const visuals = [CollectVisual, ManageVisual, ShowcaseVisual];

export default function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-24 px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-xl font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            From a link to a page that shows the proof.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            A space is the link you send, the inbox you review, and the page you
            publish.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stages.map((stage, index) => {
            const Visual = visuals[index];
            return (
              <Reveal key={stage.title} delay={index * 0.1} className="h-full">
              <article
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/60 motion-reduce:hover:translate-y-0"
              >
                <p className="font-geist_mono text-xs text-secondary">
                  {stage.step}
                </p>
                <h3 className="mt-2 font-display text-3xl tracking-tight text-foreground">
                  {stage.title}
                </h3>
                <div className="mt-4">
                  <Visual />
                </div>
                <ul className="mt-5 space-y-2.5 text-sm leading-snug text-foreground/80">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-4">
        <div className="grid items-center gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              Paste one testimonial where you already sell.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Set the border, background, shadow, and type, then copy the embed.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-background p-4 font-geist_mono text-xs leading-relaxed text-foreground/80">
{`<iframe
  src="https://testiflow.app/embed/…"
  width="100%"
  height="300"
  title="Testimonial">
</iframe>`}
            </pre>
          </div>
          <figure className="rounded-lg border-l-4 border-primary bg-background p-5">
            <blockquote className="text-sm leading-relaxed text-foreground/90">
              We sent one link. The replies came back the same day, in their
              own words.
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">Lena</span>
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
