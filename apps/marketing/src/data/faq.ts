// Marketing's questions. The ones marked home also appear on the home page.
import { contact } from "@pow/config/contact";
import { adSpendLine } from "./services";

export const questions = [
  { home: true, q: "Which platforms do you run ads on?", a: "Meta (Facebook and Instagram), LinkedIn, TikTok and X." },
  { home: true, q: "What ad budget do I need?", a: `${adSpendLine} We'll tell you honestly if ads aren't the right move for you yet.` },
  { home: true, q: "Do you make the creatives too?", a: "Yes: the angles, the briefs and the ads themselves." },
  {
    home: true,
    q: "Do you answer my leads for me?",
    a: "No. We advise on how leads should be handled (reply speed, first message, follow-up) but your team runs the inbox. That keeps our reporting honest about what the ads did.",
  },
  { home: true, q: "Where are you based?", a: "Ibadan, Nigeria. Everything runs remotely, so where you are doesn't matter." },
  { home: true, q: "How do we start?", a: `Send a WhatsApp message about your offer. We reply ${contact.replyTime}.` },
  {
    home: false,
    q: "What should I have in place before running ads?",
    a: "An offer that has already sold to at least five people who have the problem, three to five fliers and three to five videos with several copy variations, a way to reply the moment someone shows interest, and a way to close.",
  },
  {
    home: false,
    q: "Can you guarantee results?",
    a: "No one honestly can. We can promise a clear plan, clean tracking, real tests and plain reports, and that we'll tell you early if something isn't working.",
  },
  {
    home: false,
    q: "How often will I hear from you?",
    a: "We agree a reporting schedule at the start, and you can message us on WhatsApp in between.",
  },
  {
    home: false,
    q: "Do you write CVs or business plans?",
    a: "Not in Marketing. Those belong to Pen of Wonder Writing, which opens soon.",
  },
];
