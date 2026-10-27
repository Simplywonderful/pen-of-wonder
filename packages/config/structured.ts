// JSON-LD for search engines, built from the shared config so every world describes the company
// the same way. No sameAs social profiles: there are no company accounts yet.
import { contact } from "./contact.ts";
import { legal } from "./legal.ts";
import { world, worldOrigin, worlds, type WorldId } from "./worlds.ts";

const address = {
  "@type": "PostalAddress",
  addressLocality: legal.city,
  addressRegion: legal.region,
  addressCountry: "NG",
};

const organisationId = `${worldOrigin("main", "production")}/#organization`;

/** The company, for the main site: Pen of Wonder Consults with each live world as a sub-organisation. */
export function organisationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organisationId,
    name: "Pen of Wonder",
    legalName: legal.company,
    url: worldOrigin("main", "production"),
    logo: `${worldOrigin("main", "production")}/icon-512.png`,
    founder: { "@type": "Person", name: legal.founder },
    address,
    ...(contact.email ? { email: contact.email } : {}),
    telephone: `+${contact.whatsapp.number}`,
    subOrganization: worlds
      .filter((w) => w.id !== "main" && w.status === "live")
      .map((w) => ({ "@type": "ProfessionalService", name: w.name, url: worldOrigin(w.id, "production") })),
  };
}

/** A world as a professional service, linked back to the company. */
export function worldServiceLd(id: WorldId, services: string[] = world(id).menu.map((m) => m.label)) {
  const w = world(id);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: w.name,
    url: worldOrigin(id, "production"),
    parentOrganization: { "@id": organisationId, name: "Pen of Wonder", legalName: legal.company },
    address,
    areaServed: ["NG", "GB", "US"],
    ...(contact.email ? { email: contact.email } : {}),
    telephone: `+${contact.whatsapp.number}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${w.name} services`,
      itemListElement: services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };
}
