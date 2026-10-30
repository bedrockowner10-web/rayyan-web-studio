import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getDemo } from "@/data/projects";
import { DemoSite } from "@/components/demo/DemoSite";

export const Route = createFileRoute("/demos/$slug")({
  loader: ({ params }) => {
    const d = getDemo(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData: d }) => ({
    meta: d
      ? [
          { title: `${d.name} — Concept demo · Webs by Rayyan` },
          { name: "description", content: d.blurb },
          { property: "og:title", content: `${d.name} — Concept demo` },
          { property: "og:description", content: d.blurb },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Demo unavailable" }, { name: "robots", content: "noindex" }],
    links: d ? [{ rel: "stylesheet", href: `https://fonts.googleapis.com/css2?family=${d.fonts.google}&display=swap` }] : [],
  }),
  component: () => <DemoSite d={Route.useLoaderData()} />,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center text-center">
      <div><h1 className="font-display text-5xl">Demo not found</h1><Link to="/work" className="link-underline mt-4 inline-block text-primary">See all concepts</Link></div>
    </div>
  ),
});
