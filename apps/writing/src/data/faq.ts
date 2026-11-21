// Writing's questions. The ones marked home also appear on the home page. The boundary answer is the
// sentence CLAUDE.md requires on the home page and in the FAQ, word for word.
import { contact } from "@pow/config/contact";
import { quoteLine } from "./services";

export const boundary = "We don't write or edit academic or assessed work. For research support, see our Research team.";

export const questions = [
  { home: true, q: "How much does it cost?", a: quoteLine },
  {
    home: true,
    q: "How long does it take?",
    a: "It depends on the document and on how quickly we get what we need from you. We agree a delivery date in the quote, before any work starts, and tell you straight away if anything puts it at risk.",
  },
  { home: true, q: "Do you write academic work?", a: boundary },
  {
    home: true,
    q: "Do you work with people outside Nigeria?",
    a: "Yes. We're based in Ibadan and everything runs remotely, by WhatsApp, email and calls, so we work with people in Nigeria, the UK and anywhere else.",
  },
  {
    home: false,
    q: "Can I ask for changes?",
    a: "Yes. You see a draft before anything is final, and we agree in the quote how many rounds of changes are included.",
  },
  {
    home: false,
    q: "Will you keep my documents private?",
    a: "Yes. What you send us is used only for your job. We never show your documents as samples without your written permission.",
  },
  {
    home: false,
    q: "Can you guarantee I'll get the job or the grant?",
    a: "No one honestly can. We can promise a document that makes your strongest case clearly and truthfully, and tell you what else might be holding you back.",
  },
  {
    home: false,
    q: "Do you write sales copy or ads?",
    a: "No. Copy that sells, such as ads, landing pages and sales emails, is our Marketing team's work.",
  },
  { home: false, q: "How do we start?", a: `Send a WhatsApp message saying what you need and when you need it. We reply ${contact.replyTime}.` },
];
