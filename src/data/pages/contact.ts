export const contact = {
  title: "Contact | Pen of Wonder Research",
  description:
    "Send your manuscript for a free one-page review, ask about a test edit, or book a tutoring session. Replies within one working day.",

  h1: "Contact",
  intro: "Send a message here, on WhatsApp or by email. We reply within one working day.",
  // The words inside ring are circled by the one gold proof mark on this page.
  reviewBefore: "For a free review, send the manuscript as a share link, the target journal if you have one, and your deadline. We’ll reply with the ",
  reviewRing: "three changes",
  reviewAfter: " we’d make first.",

  form: {
    heading: "Send a message",
    name: "Your name",
    email: "Email address",
    role: "I am a",
    message: "Message",
    messageHint: "What you need, and any deadline.",
    link: "Link to your file (optional)",
    linkHint: "A Google Drive, Dropbox or OneDrive link with view access.",
    submit: "Send message",
    sending: "Sending…",
    errors: {
      name: "Please add your name so we know who we’re writing to.",
      email: "Please add your email so we can reply.",
      emailFormat: "That email address looks incomplete. Please check it.",
      role: "Please choose the option that describes you best.",
      message: "Please add a short message, even one line.",
      link: "That link doesn’t look complete. It should start with https://",
      summary: "A few things need fixing before this can be sent.",
      network: "Your message didn’t send. Please check your connection and try again; nothing you typed has been lost.",
      notConnected:
        "The form isn’t connected yet, so nothing was sent. Please use WhatsApp or email for now; nothing you typed has been lost.",
    },
  },

  otherHeading: "Or reach us directly",

  thanks: {
    title: "Message sent | Pen of Wonder Research",
    description: "Thank you for your message to Pen of Wonder Research.",
    h1: "Thank you. Your message is on its way.",
    body: "We reply within one working day. If you sent a manuscript for the free review, you’ll have the one-page review within 3 working days.",
    back: "Back to the home page",
  },
} as const;
