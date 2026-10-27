// JSON-LD for search engines. No social profiles in sameAs: those belong to a different brand.
import { site } from "./site";
import { publications } from "./publications";

const personId = `${site.url}/about#person`;

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.owner,
  jobTitle: "Research writer and editor",
  url: `${site.url}/about`,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "NG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "McPherson University" },
  knowsLanguage: ["English", "Yoruba", "Hausa", "Nigerian Pidgin"],
  workLocation: { "@type": "Place", name: `${site.city}, ${site.country}` },
};

export const worksLd = publications.map((p) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: p.title,
  datePublished: String(p.year),
  isPartOf: { "@type": "Periodical", name: p.journal },
  sameAs: `https://doi.org/${p.doi}`,
  author: p.authors.map((a, i) => (i === p.ownerIndex ? { "@id": personId } : { "@type": "Person", name: a })),
}));

export const organisationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  ...(site.email ? { email: site.email } : {}),
  telephone: "+2347046418092",
  image: `${site.url}/og.png`,
  description:
    "Manuscript editing and publication support for researchers, freelance editing for firms, and dissertation, SPSS and NVivo tutoring for postgraduate students.",
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "NG" },
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  founder: { "@id": personId },
  parentOrganization: { "@type": "Organization", name: "Pen of Wonder Consults" },
};
