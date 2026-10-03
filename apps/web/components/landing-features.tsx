import { Quote, Star } from "lucide-react";
import { WALL_OF_LOVE_LAYOUTS } from "@/lib/constants";

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

function CollectVisual() {
  return (
    <div className="rounded-lg border border-border bg-background p-3" aria-hidden="true">
      <p className="font-geist_mono text-[11px] text-muted-foreground">
        testiflow.app/your-brand
      </p>
      <p className="mt-3 text-sm text-foreground">How was working with us?</p>
      <span className="mt-2 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-primary text-primary"
          />
        ))}
      </span>
      <div className="mt-3 flex h-8 items-center rounded-md border border-dashed border-border px-2 text-xs text-muted-foreground">
        Write, or record a video
      </div>
    </div>
  );
}

function ManageVisual() {
  const rows = [
    { label: "5 stars", tag: "Positive", tone: "bg-secondary text-secondary-foreground" },
    { label: "Video", tag: "Neutral", tone: "border border-border text-foreground" },
    { label: "Archived", tag: "Spam", tone: "bg-destructive text-destructive-foreground" },
  ];

  return (
    <ul className="space-y-2" aria-hidden="true">
      {rows.map((row) => (
        <li
          key={row.tag}
          className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-xs"
        >
          <span className="text-muted-foreground">{row.label}</span>
          <span className={`rounded-md px-1.5 py-0.5 font-medium ${row.tone}`}>
            {row.tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShowcaseVisual() {
  return (
    <div className="grid grid-cols-2 gap-2" aria-hidden="true">
      {["Same-day replies.", "Two minutes.", "Kept this one.", "In their words."].map(
        (line) => (
          <div
            key={line}
            className="rounded-lg border border-border bg-background p-2"
          >
            <Quote className="h-3 w-3 text-primary" />
            <p className="mt-1.5 text-[11px] leading-snug text-foreground/80">
              {line}
            </p>
          </div>
        ),
      )}
    </div>
  );
}

const visuals = [CollectVisual, ManageVisual, ShowcaseVisual];

export default function LandingFeatures() {
  return (
    <section id="features" className="scroll-mt-24 px-4 pb-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl font-display text-3xl tracking-tight text-foreground sm:text-4xl">
          From a link to a page that shows the proof.
        </h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          A space is the link you send, the inbox you review, and the page you
          publish.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stages.map((stage, index) => {
            const Visual = visuals[index];
            return (
              <article
                key={stage.title}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
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
            );
          })}
        </div>

        <div className="mt-4 grid items-center gap-6 rounded-xl border border-border bg-card p-5 sm:p-6 lg:grid-cols-2">
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
      </div>
    </section>
  );
}
