// Checked against Crossref on 17 Oct 2026 (titles, journals, pages, author order).
// APA 7: article titles in sentence case, the site owner's name set in bold by the component.

export type Publication = {
  authors: string[];
  ownerIndex: number;
  year: number;
  title: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
};

export const publications: Publication[] = [
  {
    authors: ["Adeyanju, A. A.", "Adebagbo, W. B.", "Molehin, O. R.", "Oyenihi, O. R."],
    ownerIndex: 1,
    year: 2025,
    title:
      "Exploring the multi-drug resistance (MDR) inhibition property of sildenafil: Phosphodiesterase 5 as a therapeutic target and a potential player in reversing MDR for a successful breast cancer treatment",
    journal: "AIMS Medical Science",
    volume: "12",
    issue: "2",
    pages: "145–170",
    doi: "10.3934/medsci.2025010",
  },
  {
    authors: ["Adeyanju, A. A.", "Oyedeji, T. A.", "Adebagbo, W. B.", "Oluyitan, O. P.", "Adeyanju, S. A."],
    ownerIndex: 2,
    year: 2021,
    title:
      "Protective effects of luteolin and gallic acid against storage-induced oxidative damage in whole blood of female Wistar rats",
    journal: "Applied In Vitro Toxicology",
    volume: "7",
    issue: "2",
    pages: "61–70",
    doi: "10.1089/aivt.2020.0028",
  },
];
