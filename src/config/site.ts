/**
 * ============================================================
 *  WEBS BY RAYYAN — EDIT YOUR STUDIO DETAILS HERE
 * ============================================================
 * Replace every placeholder below with your real details.
 * Social links left as empty strings ("") are hidden automatically.
 */
export const siteConfig = {
  name: "Webs by Rayyan",
  tagline: "Independent web design & development studio",
  // Your real inbox — used by the contact form's email fallback.
  email: "hello@example.com",
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Example: "447700900123". Leave as the placeholder until you add yours.
  whatsappNumber: "0000000000",
  whatsappMessage: "Hi Rayyan, I'd like to talk about a website project.",
  // Currency used for budget ranges in the inquiry form.
  currency: "USD",
  currencySymbol: "$",
  budgets: ["Under 2,500", "2,500 – 5,000", "5,000 – 10,000", "10,000+", "Not sure yet"],
  // Availability note shown in the hero. Update as your calendar changes.
  availability: "Booking new projects",
  // Add real URLs to show them in the footer & contact page.
  socials: {
    instagram: "",
    linkedin: "",
    dribbble: "",
    behance: "",
    x: "",
  } as Record<string, string>,
};

export const isPlaceholderWhatsApp = () => /^0+$/.test(siteConfig.whatsappNumber);

export const whatsappUrl = () =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/", hash: "process", label: "Process" },
  { to: "/contact", label: "Contact" },
] as const;
