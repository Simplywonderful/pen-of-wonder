// Writing's services, one page each, from the brief's service list (section 6). Professional documents
// only: nothing here is assessed or academic work. No prices: every job is quoted on request (owner's
// choice, 21 Nov 2026). No turnaround times or revision counts are promised; they're agreed in the quote.

export type Service = {
  slug: string;
  name: string;
  /** What the WhatsApp message asks about. */
  ask: string;
  summary: string;
  /** The title tag: 60 characters at most. */
  title: string;
  /** The meta description: 120 to 155 characters. */
  description: string;
  intro: string;
  who: string;
  includes: { name: string; detail: string }[];
  /** What we need from the client to start. */
  needs: string[];
  notes: { heading: string; body: string }[];
  questions: { q: string; a: string }[];
  /** Related guides on the blog (slugs), linked once they're live. */
  guides: string[];
};

export const quoteLine =
  "Every job is quoted on request, once we've seen what you have and what it's for. The first conversation is free.";

export const services: Service[] = [
  {
    slug: "cvs",
    name: "CVs and cover letters",
    ask: "a CV",
    summary: "A CV and cover letter written for the jobs you're applying for, for Nigerian, UK and international applications.",
    title: "CV Writing and Cover Letters | Pen of Wonder Writing",
    description:
      "CV writing and cover letters for jobs in Nigeria, the UK and abroad: results-led, aimed at the roles you want, and easy for screening software to read.",
    intro:
      "We rewrite your CV around the jobs you actually want: a profile aimed at the role, results instead of duties, and a plain layout that reads well to a recruiter and to the screening software many employers use.",
    who: "Job seekers, career changers, graduates entering work and experienced professionals applying in Nigeria, the UK, the US or internationally.",
    includes: [
      { name: "A CV for your target roles", detail: "Rewritten from your current CV or career history, with a profile aimed at the jobs you're applying for and results under every role." },
      { name: "A cover letter you can adapt", detail: "Written for one real job advert, with notes on which parts to change for each new application." },
      { name: "The right format for the country", detail: "A CV for UK, Nigerian or international employers, or a shorter résumé for US applications, laid out for applicant tracking systems." },
      { name: "Editable files", detail: "A PDF to send and a Word file you can update yourself." },
    ],
    needs: [
      "Your current CV, or a list of your jobs, dates and responsibilities",
      "Two or three job adverts you're aiming for",
      "Time for a short conversation about what you achieved in each role",
    ],
    notes: [
      {
        heading: "Why we ask so many questions",
        body: "Most CVs list duties because duties are easy to remember. Results take digging: what changed because you were there, and how do you know? We ask until we find them, and we never add a figure you can't stand behind in an interview.",
      },
    ],
    questions: [
      { q: "Do you write CVs for jobs outside Nigeria?", a: "Yes. We write CVs for UK, US and international applications as well as Nigerian ones, and adjust length, layout and conventions to the country." },
      { q: "Can you guarantee I'll get interviews?", a: "No one honestly can. We can promise a CV that shows your strongest evidence clearly, uses the words employers search for, and is easy to read in seconds." },
      { q: "Will my CV work with applicant tracking systems?", a: "We use a plain single-column layout, standard headings and the job advert's own words where they're true for you, which is what these systems read best." },
    ],
    guides: ["how-to-write-a-cv-that-gets-interviews", "how-applicant-tracking-systems-read-your-cv", "how-to-write-a-cover-letter-that-gets-read"],
  },
  {
    slug: "linkedin",
    name: "LinkedIn profiles",
    ask: "a LinkedIn profile",
    summary: "A LinkedIn headline, About section and experience written so recruiters and clients find you and understand what you do.",
    title: "LinkedIn Profile Writing | Pen of Wonder Writing",
    description:
      "LinkedIn profile writing: a headline, About section and experience in the words recruiters and clients search for, saying clearly what you do.",
    intro:
      "We rewrite your LinkedIn profile so the right people find it and know within seconds what you do, who you do it for and why they should get in touch.",
    who: "Job seekers who want recruiters to find them, and consultants, freelancers and founders who want clients to.",
    includes: [
      { name: "Headline", detail: "What you do and who for, in the words people search for, with a few options to choose from." },
      { name: "About section", detail: "Written in your first-person voice, with your strongest examples and a clear next step for the reader." },
      { name: "Experience", detail: "Your recent roles rewritten to show results, consistent with your CV." },
      { name: "Skills and keywords", detail: "A list taken from real job adverts or client requests in your field, placed where LinkedIn search reads them." },
      { name: "Featured and banner suggestions", detail: "What to pin to your profile and what your banner could say." },
    ],
    needs: ["A link to your current profile", "Your CV, if you have one", "The kind of role or client you want to attract next"],
    notes: [
      {
        heading: "Your voice, not ours",
        body: "A profile should sound like the person a recruiter or client will meet. We interview you, then write in your voice, and you approve every line before it goes up. You update the profile yourself; we don't ask for your password.",
      },
    ],
    questions: [
      { q: "Do you need my LinkedIn login?", a: "No. We send you the finished text and you paste it in. Your account stays yours." },
      { q: "Should my LinkedIn profile match my CV?", a: "The facts should match exactly: job titles, employers and dates. The writing can be more personal, because a profile is read by many people for many reasons." },
    ],
    guides: ["a-linkedin-profile-that-recruiters-and-clients-find", "how-to-write-a-cv-that-gets-interviews"],
  },
  {
    slug: "grants",
    name: "Grant writing",
    ask: "a grant application",
    summary: "Grant applications, concept notes and budget narratives for NGOs, community groups and small organisations.",
    title: "Grant Writing for NGOs and Small Organisations",
    description:
      "Grant writing for NGOs and small organisations: concept notes, full proposals and budget narratives built on your evidence and the funder's own guidance.",
    intro:
      "We write grant applications with you: a problem backed by evidence, objectives a funder can check, activities and a budget that match, and an honest account of what your organisation can deliver.",
    who: "NGOs, charities, community groups, social enterprises and small businesses applying for grants or donor funding.",
    includes: [
      { name: "Fit check", detail: "We read the funder's guidelines with you first and say plainly if the call isn't a good match." },
      { name: "Concept notes", detail: "A short, sharp case for the project, when a funder asks for one before a full proposal." },
      { name: "Full proposals", detail: "Problem statement, objectives, activities, timeline, monitoring and evaluation, and organisational capacity, in the funder's own headings and word limits." },
      { name: "Budget narratives", detail: "The written explanation of your budget, checked so every cost links to an activity and every activity has a cost." },
    ],
    needs: [
      "The funder's call or guidelines, and the deadline",
      "What your organisation has done before, with any reports or records",
      "The project idea, the people it serves and where",
      "Your budget figures, or the costs you expect",
    ],
    notes: [
      {
        heading: "Your evidence, never ours",
        body: "A proposal stands on facts about your organisation and the people you serve. We shape and sharpen what you give us, but we never invent results, beneficiary numbers or partnerships. A funder may check, and your name is on it.",
      },
      {
        heading: "Start early",
        body: "A good proposal needs time for questions, gathering documents and a careful final read. Tell us the deadline in your first message, and we'll say honestly whether there's time to do it well.",
      },
    ],
    questions: [
      { q: "Can you guarantee our grant will be funded?", a: "No. Funding decisions belong to the funder and depend on many things outside the proposal. We can make sure your case is clear, consistent and well evidenced." },
      { q: "Do you find grants for us?", a: "We can point you to where small organisations usually look, but our service is writing the application once you've found a call that fits." },
    ],
    guides: ["how-to-write-a-grant-proposal-for-a-small-ngo"],
  },
  {
    slug: "business-plans",
    name: "Business plans and proposals",
    ask: "a business plan",
    summary: "Business plans, pitch documents, company profiles and bid proposals that a lender, investor or client will read to the end.",
    title: "Business Plan and Proposal Writing | Pen of Wonder",
    description:
      "Business plan writing, company profiles, pitch documents and bid proposals that make your case clearly to lenders, investors and clients.",
    intro:
      "We write the documents that ask someone to back your business: a plan for a lender or investor, a profile for a new client, a proposal for a tender, or the words for a pitch.",
    who: "Founders, small and medium businesses, and organisations bidding for contracts or raising money.",
    includes: [
      { name: "Business plans", detail: "Executive summary, the problem and your answer to it, market, competition, operations, team and the financial story behind your numbers." },
      { name: "Company profiles and capability statements", detail: "What you do, for whom, what you've delivered and why a client should choose you, in a few clear pages." },
      { name: "Bid and sales proposals", detail: "A response to a tender or a client's brief, structured around what they asked for." },
      { name: "Pitch document text", detail: "The words for each slide of a pitch deck, short enough to read in a glance." },
    ],
    needs: ["What the document is for and who will read it", "Your figures, or your accountant's", "Past work, clients or results you can show", "Any template or format the reader requires"],
    notes: [
      {
        heading: "Numbers stay yours",
        body: "We write the story around your financial figures and check that the words and the numbers agree. We don't prepare accounts or give financial advice; if your projections need a professional, we'll say so.",
      },
    ],
    questions: [
      { q: "Do you prepare financial projections?", a: "We write the narrative around your projections and check they're consistent, but the figures come from you or your accountant." },
      { q: "Can you write a proposal for a specific tender?", a: "Yes. Send the tender documents and the deadline, and we'll tell you honestly whether there's time to do it well." },
    ],
    guides: [],
  },
  {
    slug: "ghostwriting",
    name: "Ghostwriting",
    ask: "ghostwriting",
    summary: "Articles, LinkedIn posts, blog posts, speeches and newsletters written in your voice, under your name.",
    title: "Ghostwriting: Articles, Posts and Speeches | Pen of Wonder",
    description:
      "Ghostwriting in your own voice: articles, LinkedIn posts, blog posts, speeches and newsletters for professionals and founders. Professional writing only.",
    intro:
      "We write articles, posts, speeches and newsletters that sound like you, from your ideas and experience, for you to publish under your own name.",
    who: "Professionals, founders and leaders who have things worth saying and no time to write them.",
    includes: [
      { name: "Articles and blog posts", detail: "Pieces for your website or for publications, built from an interview with you." },
      { name: "LinkedIn posts", detail: "A set of posts from your own stories and opinions, in your voice." },
      { name: "Speeches and talks", detail: "Words written to be spoken, timed to your slot." },
      { name: "Newsletters", detail: "A regular letter to your clients or members." },
    ],
    needs: ["Your ideas, stories and opinions, usually in a recorded conversation", "Examples of writing or talks you like", "Who will read or hear it"],
    notes: [
      {
        heading: "What this isn't",
        body: "Ghostwriting here is professional writing that you publish as yourself. We don't write academic or assessed work, and we don't write sales copy or ads: for copy that sells, see our Marketing team.",
      },
    ],
    questions: [
      { q: "Will it really sound like me?", a: "That's the job. We start with a conversation, read things you've written or said, and you approve every piece before it goes out." },
      { q: "Do you write books?", a: "Book ghostwriting belongs to our Publishing team, which opens soon. For now, ask on WhatsApp and we'll tell you honestly whether we can take it on." },
    ],
    guides: [],
  },
  {
    slug: "editing",
    name: "Editing and proofreading",
    ask: "editing",
    summary: "Editing and proofreading for reports, business documents and books in progress. Not for academic or assessed work.",
    title: "Editing and Proofreading for Business Documents",
    description:
      "Editing and proofreading for reports, business documents and books in progress: clearer sentences and a consistent style. Not academic work.",
    intro:
      "We edit documents that will be read by people who matter to you: reports, proposals, policies, company documents and books in progress. You get clearer writing, a consistent style and a clean final copy.",
    who: "Organisations, businesses, professionals and authors with a document that needs to be right before it goes out.",
    includes: [
      { name: "Copy editing", detail: "Sentences made clearer and shorter, with consistent terms, spelling and style throughout." },
      { name: "Proofreading", detail: "A last check for typing errors, punctuation and layout slips before you send or print." },
      { name: "Tracked changes", detail: "Every change visible in Word, so you decide what stays." },
    ],
    needs: ["The document, in Word if possible", "Who will read it and when it's due", "Any style guide you need to follow"],
    notes: [
      {
        heading: "Who this isn't for",
        body: "We don't edit or proofread academic or assessed work. Researchers preparing a paper for a journal can find manuscript editing with our Research team.",
      },
    ],
    questions: [
      { q: "What's the difference between editing and proofreading?", a: "Editing improves the writing itself: clarity, flow, consistency. Proofreading is the last check for small errors before a document goes out. Many documents need both." },
      { q: "Can you edit my book?", a: "Yes, for books in progress. Full book publishing services will sit with our Publishing team when it opens." },
    ],
    guides: [],
  },
];
