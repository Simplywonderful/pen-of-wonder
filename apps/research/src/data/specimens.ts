// The two edit specimens, approved by the owner on 17 Oct 2026.
// Both are illustrative: the study, places and numbers are invented for these pages.
// A paragraph is a list of runs. "del" and "ins" runs can carry the number of the comment they belong to.

export type Run =
  | { kind: "text"; text: string }
  | { kind: "del"; text: string; comment?: number }
  | { kind: "ins"; text: string; comment?: number };

export type Specimen = {
  id: string;
  label: string;
  runs: Run[];
  comments: string[];
};

export const methodsSpecimen: Specimen = {
  id: "methods",
  label: "Methods paragraph from a cross-sectional survey",
  runs: [
    { kind: "text", text: "A descriptive cross-sectional study was carried out among women " },
    { kind: "del", text: "in Oyo State" },
    {
      kind: "ins",
      text: "aged 30 to 65 attending six primary health centres in Ibadan, Oyo State, between March and May 2025,",
      comment: 1,
    },
    { kind: "text", text: " to assess " },
    { kind: "del", text: "there" },
    { kind: "ins", text: "their" },
    { kind: "text", text: " knowledge of breast cancer screening. " },
    { kind: "del", text: "Participants were selected randomly from health centres." },
    {
      kind: "ins",
      text: "Centres were chosen by multistage sampling, and women were recruited consecutively at general outpatient clinics.",
      comment: 2,
    },
    { kind: "text", text: " " },
    {
      kind: "del",
      text: "A total of 420 questionnaires were distributed and 386 were returned which were analysed using SPSS.",
    },
    {
      kind: "ins",
      text: "Of 420 women approached, 386 returned completed questionnaires (response rate 91.9%). Data were analysed in IBM SPSS Statistics version 29.",
      comment: 3,
    },
    { kind: "text", text: " " },
    { kind: "del", text: "Data was presented using tables and percentages." },
  ],
  comments: [
    "STROBE item 5 asks for the setting, places and dates of recruitment, and item 6 for who was eligible. I’ve taken these from your ethics approval letter. Please check the dates.",
    "“Randomly” needs a method behind it, and a reviewer will ask for one. Your protocol describes multistage sampling of centres and consecutive recruitment of women, so I’ve described that instead (STROBE item 6a).",
    "Giving the number approached and the response rate lets readers judge non-response (STROBE item 13a). “Data” takes a plural verb in most health journals. I removed the last sentence because your results tables already show this.",
  ],
};

export const resultsSpecimen: Specimen = {
  id: "results",
  label: "Results sentence that claims too much",
  runs: [
    {
      kind: "del",
      text: "The study proved that knowledge of breast self-examination significantly causes higher screening uptake among the respondents (p=0.03), showing that health education is the solution to late presentation of breast cancer in Nigeria.",
    },
    { kind: "text", text: " " },
    {
      kind: "ins",
      text: "Women with good knowledge of breast self-examination were more likely to report having been screened",
      comment: 1,
    },
    { kind: "ins", text: " (adjusted odds ratio 1.8, 95% CI 1.1 to 3.0; p = 0.03).", comment: 2 },
    {
      kind: "ins",
      text: " Because the study is cross-sectional, this association does not show that knowledge leads to screening.",
      comment: 3,
    },
  ],
  comments: [
    "“Proved” and “causes” claim more than a cross-sectional survey can show. “More likely to” says exactly what you found.",
    "A p-value on its own doesn’t tell readers how big the difference is. Your Table 3 has the adjusted odds ratio and confidence interval, so I’ve reported those (STROBE item 16a).",
    "The point about late presentation across Nigeria goes beyond a sample from one city. It may belong in your discussion as a possibility, next to your limitations. I’ve added one sentence here so a reviewer doesn’t have to ask.",
  ],
};
