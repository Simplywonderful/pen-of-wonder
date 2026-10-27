// The company's legal identity and the policies every footer links to.

export const legal = {
  company: "Pen of Wonder Consults",
  cacNumber: "7809965",
  legalLine: "Pen of Wonder Consults, a registered business name in Nigeria, CAC Business Name No. 7809965.",
  city: "Ibadan",
  region: "Oyo State",
  country: "Nigeria",
  timezone: "WAT (UTC+1)",
  founder: "Wonderful Adebagbo",
} as const;

/** The canonical Academic Integrity Policy lives on the main site; research's old address 301s to it. */
export const academicIntegrity = { world: "main", path: "/academic-integrity" } as const;
