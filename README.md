# Rayyan Web Studio

Build a complete, premium, production-quality portfolio website for a freelance web design and development studio named "Webs by Rayyan". The owner wants to sell custom websites to businesses. This must be a substantial, multi-page-feeling, fully responsive agency website, not a generic one-screen landing page. Make strong design decisions and implement the complete experience rather than returning a plan.

BRAND & ART DIRECTION
- Brand name everywhere: Webs by Rayyan. Do not use the old name "Custom Web Designerz".
- Positioning: independent premium web design & development studio creating distinctive, conversion-focused websites for ambitious businesses.
- Visual direction: luxury digital studio, editorial art direction, deep near-black/charcoal base, warm ivory typography, restrained champagne/brass accent, subtle glass and metallic materials. Avoid generic purple/blue SaaS gradients, overused blobs, template-looking layouts, excessive rounded cards, and cheesy stock imagery.
- Create a distinctive custom WB monogram / wordmark logo for Webs by Rayyan. Render it as a dimensional 3D metallic emblem in the hero and as a crisp SVG/vector mark in navigation/footer/favicon. The 3D mark should have believable bevel/highlights, reflections, lighting, depth and gentle motion. It should look art-directed and polished, not like an emoji or flat text.
- Use a refined type system: expressive editorial display serif or sophisticated display face paired with a clean modern sans. Strong hierarchy, generous whitespace, intentional grids, immaculate alignment.
- Aim for a memorable, award-quality studio aesthetic with excellent visual polish and a coherent design system.

TECH / QUALITY
- Use the default Lovable stack, React + TypeScript + Tailwind + shadcn/ui where useful.
- Use Three.js / React Three Fiber / Drei if available for the 3D hero emblem and tasteful 3D scene. Install appropriate packages if needed. If real-time 3D is too heavy on a device, provide a beautiful CSS/SVG fallback. Do not fake 3D with a static emoji.
- Use Framer Motion or Motion for page transitions, scroll reveals, hover states, staggered entrances and smooth micro-interactions. Add tasteful parallax and pointer-responsive lighting where appropriate.
- Add a custom cursor only on desktop and only if it remains usable; preserve native cursor on touch devices.
- Performance matters: lazy-load below-the-fold imagery and demo routes, avoid huge unoptimized assets, respect prefers-reduced-motion, and keep mobile smooth.
- Responsive across desktop/tablet/mobile. Real working navigation, functional filters, working links, accessible focus states, semantic HTML, and no dead buttons.
- Use beautiful, relevant imagery from reliable image sources or generated/available assets. Never show broken image placeholders. Provide graceful fallbacks.
- Build real separate demo experiences and routes, not just screenshots or repeated cards. Each demo should be independently navigable and visually differentiated. Use a consistent "concept project / demo" disclosure so no one mistakes concept work for commissioned client work.
- Use polished loading states and graceful route handling.

SITE STRUCTURE
1) HOME (/)
- Premium sticky nav: logo, Work, Services, About, Process, Contact; a strong "Start a project" CTA. Mobile menu works.
- Hero: striking editorial headline such as "Digital experiences, made to move businesses." supporting copy explaining custom websites for brands that want to stand out. Clear CTAs "Explore the work" and "Start a project". Include a beautiful large 3D WB emblem / sculptural object, sophisticated lighting and subtle motion. Add a small availability/status detail, not fake metrics.
- An elegant scrolling ticker / marquee with capabilities (Strategy / Design / Development / E-commerce / Experience).
- Featured work section with striking visual project tiles and meaningful project descriptions.
- "20 concepts. 20 different worlds." portfolio section with 20 demo projects, searchable/filterable by category. Each card shows a distinct visual preview, business type, concise concept description, and opens its own live demo route. Filters should work.
- Services section with well-presented offerings: custom website design, development, e-commerce, landing pages, redesign & optimization. Explain outcomes, not buzzwords.
- Studio/about section introducing Webs by Rayyan in a confident but honest way; don't invent awards, clients, years of experience, team size, testimonials, revenue, or results.
- Process section with clear steps: Discover, Direction, Design, Build, Launch.
- A refined CTA/contact section with project inquiry form (name, email, business, project type, budget range, message). Form validation and success state. If no backend is configured, clearly implement a frontend-ready submission experience with mailto fallback and do not falsely claim messages were sent. Add WhatsApp CTA using a clearly editable placeholder number/config; don't invent a real number.
- Footer with brand, navigation, social links only if real URLs are provided (otherwise use editable placeholders / omit), and copyright year dynamically.
2) ABOUT (/about): dedicated studio story, approach, values, process, and CTA. No fabricated credentials.
3) SERVICES (/services): full detailed service pages/sections with deliverables, ideal clients, workflow, FAQs and CTA.
4) WORK (/work): portfolio index with working category filters and 20 distinct demos.
5) CONTACT (/contact): dedicated polished inquiry form and contact methods with editable config.
6) 20 live, distinct demo website routes under /demos/<slug>. Every demo is a polished mini-site with its own identity, navigation, hero, sections, calls-to-action and footer, not a generic single template. Make each demo look like a real business website concept. Include a clear discreet banner or footer note "Independent concept demo by Webs by Rayyan — not a commissioned client project." Include "Back to studio" link. Each demo should have a distinct visual style and industry-specific content:
   01 /demos/atelier-haus — luxury interior design studio; warm stone, editorial layouts, architecture imagery.
   02 /demos/solenne — premium skincare / beauty brand; soft cream, minimal product-led design.
   03 /demos/forma-fitness — boutique fitness studio; bold energetic typography, class schedule and membership CTA.
   04 /demos/ember-and-oak — artisan restaurant; rich warm tones, menu highlights, reservation CTA (demo only).
   05 /demos/northline-real-estate — luxury property agency; large architectural imagery, property listings.
   06 /demos/monarch-legal — modern law firm; restrained navy/ivory, practice areas, consultation CTA.
   07 /demos/arc-auto — premium automotive showroom; dark cinematic imagery, vehicle showcase.
   08 /demos/bloom-house — florist / flower studio; botanical editorial design, arrangements.
   09 /demos/kinfolk-cafe — specialty coffee shop; earthy palette, menu and location section.
   10 /demos/vertex-saas — SaaS software product; clean high-conversion product landing page, feature grid and pricing preview.
   11 /demos/stillwater-wellness — wellness / spa retreat; calm minimal design, treatment cards.
   12 /demos/stride-running — sportswear / running brand; athletic editorial art direction.
   13 /demos/solstice-travel — boutique travel company; immersive destination imagery, trip cards.
   14 /demos/clearview-clinic — modern dental / healthcare clinic; clean trustworthy design, services and appointment CTA (no medical claims).
   15 /demos/everafter — wedding photography studio; romantic image-led portfolio.
   16 /demos/forge-architecture — architecture practice; gallery-led minimal grid.
   17 /demos/paw & co — pet grooming / care brand; friendly, playful but polished design (use slug paw-and-co).
   18 /demos/brightpath-education — tutoring / education company; approachable modern learning design.
   19 /demos/urban-key — property rental / coworking spaces; modern city visual language.
   20 /demos/velour-jewels — luxury jewellery brand; black, ivory, metallic accents, editorial product presentation.
Each route should feel like a separate client brief, with distinct typography, colors, layouts, components, and imagery. Provide realistic sample content but no fake real-world addresses, contact details, testimonials or claims. All interactions should work as demos.

PORTFOLIO DETAILS
- The 20 projects must be visible in the work section and linked to their correct routes.
- Add useful category filters: All, E-commerce, Hospitality, Professional, Lifestyle, Technology, Property, Creative. Make sure all 20 projects are assigned sensibly.
- Use different image compositions and treatments for each demo card. Don't repeat the same generic thumbnail.
- Demo pages should have substantial content and polished responsive layouts, not just a hero and placeholder text.
- Add a small "Concept" tag to all concept projects to be transparent.

MOTION / VISUAL DETAILS
- Smooth scroll behavior, refined section reveals, staggered cards, magnetic-but-accessible CTA hover, subtle image zooms, animated underline links, elegant transitions between routes.
- 3D emblem has a slow elegant rotation / floating movement and responsive lighting. Add a subtle interactive tilt on pointer movement where appropriate.
- Include ambient grain/noise texture, fine borders, restrained glow, layered depth and cinematic lighting. Keep effects subtle and premium.
- Use a custom designed preloader only if brief and not annoying.
- Avoid motion overload; ensure content remains readable and interaction responsive.

COPYWRITING
- Write polished, concise, confident English. Avoid spelling errors, lorem ipsum, exaggerated claims, fake numbers, fake testimonials, and generic filler.
- The studio should sound premium, collaborative and business-focused.
- Make the work itself the proof. Do not say "100% professional" or claim awards/clients that are not verified.
- Primary conversion message: "Have a project in mind? Let's make it happen."
- Make it clear this is a one-person studio / independent creative developer only if needed; don't invent a team.

CONFIGURABILITY
- Centralize editable contact details, WhatsApp number, email, social URLs, and currency in a clearly named config file. Use obvious placeholders and do not fabricate real contact details.
- Provide a README / short setup note explaining exactly where Rayyan can edit email, WhatsApp number, social links, and project details.
- Make all CTAs route to relevant sections/pages and work.

FINAL QUALITY PASS
- Check every route, all 20 demo links, mobile nav, filters, contact validation, reduced-motion behavior, and no broken assets.
- Ensure the homepage immediately looks premium in the first viewport and makes visitors want to explore the demos.
- Build the actual site now; don't respond with only a proposal or wireframe.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1b912018-69f3-4e71-bb34-b1d1d33ed440).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
