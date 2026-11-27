import type { LinkTo, Page } from "../types";

const H = "/hotels/nathia-gali";
const WA: LinkTo = { label: "Open WhatsApp", href: "https://wa.me/923008497999" };
const CONTACT: LinkTo = { label: "Contact", href: "/contact" };
const REACH = "WhatsApp +92 300 8497999, call 042-111-111-744, or write to Serene Heights Group, H. No. 71 C3, Gulberg III, Park View Lane, Lahore.";
const NOT_SENT = "Your message goes to us only when you press send in WhatsApp. If WhatsApp did not open, or you closed it before sending, we have not received anything. Open it again or call 042-111-111-744.";

export const utilityPages: Page[] = [
  {
    path: "/thank-you/enquiry",
    side: "invest",
    template: "plain",
    name: "Thank you: investment enquiry",
    title: "Thank you for your enquiry",
    description: "What happens after you send an investment enquiry to Serene Heights on WhatsApp.",
    intro: "Your message is ready in WhatsApp. Please check that you pressed send there.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "What happens now",
        parts: [
          { p: [NOT_SENT] },
          { h: "Our reply", p: ["The team answers in the same WhatsApp chat. It helps to say which project you are asking about, whether you want an apartment or a Smart Property Unit, and the country you are writing from."] },
          { h: "Before you pay anything", p: ["Ask for the current price and payment schedule, the approvals and the agreements. Read them with a lawyer. Confirm payment details with our office before you send money."] },
        ],
        links: [WA],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        d: "Useful reading while you wait.",
        links: [
          { label: "How it works", href: "/invest/how-it-works" },
          { label: "Documents and approvals", href: "/documents" },
          { label: "Risks and exit", href: "/invest/risks-and-exit" },
        ],
      },
    ],
    pending: ["Reply hours and how soon the team replies to enquiries"],
  },
  {
    path: "/thank-you/site-visit",
    side: "invest",
    template: "plain",
    name: "Thank you: site visit",
    title: "Thank you for asking to visit",
    description: "What happens after you ask Serene Heights for a site visit on WhatsApp.",
    intro: "Your request is ready in WhatsApp. The visit is booked only when the team confirms the date with you.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "What happens now",
        parts: [
          { p: [NOT_SENT] },
          { h: "Wait for a confirmed time", p: ["Please do not set out until the team has agreed the day, the time and the meeting place. This is a construction site, so visits are arranged in advance."] },
          { h: "For the day", list: ["Wear closed shoes and bring a warm layer.", "Nathia Gali is about 80 km and two hours by road from Islamabad. Allow more at weekends.", "Check the road first in snow or heavy rain.", "Bring your booking papers if you have already bought."] },
        ],
        links: [WA],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        d: "Prepare for your visit.",
        links: [
          { label: "Site visit checklist", href: "/insights/site-visit-checklist" },
          { label: "Construction progress", href: "/nathiagali/progress" },
          { label: "Location", href: "/nathiagali/location" },
        ],
      },
    ],
    pending: ["Site visit days and hours, and the meeting point"],
  },
  {
    path: "/thank-you/stay",
    side: "hotel",
    template: "plain",
    name: "Thank you: stay request",
    title: "Thank you for your stay request",
    description: "What happens after you ask Serene Heights Nathia Gali for dates on WhatsApp.",
    intro: "Your request is ready in WhatsApp. It is not a booking until the team confirms it.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "What happens now",
        parts: [
          { p: [NOT_SENT] },
          { h: "The team confirms", p: ["The hotel is under construction. The team will tell you whether a stay is possible on your dates. If it is, ask them to confirm the apartment, the rate, what is included and the cancellation terms in writing."] },
          { h: "Please wait before you travel", p: ["Do not pay for transport or other bookings on the strength of a request alone. Ask for a written confirmation first."] },
        ],
        links: [WA],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        d: "Plan your time in Nathia Gali.",
        links: [
          { label: "Getting here", href: `${H}/location` },
          { label: "Things to do", href: `${H}/things-to-do` },
          { label: "Policies", href: `${H}/policies` },
        ],
      },
    ],
    pending: ["Hotel opening date and how stay requests are confirmed"],
  },
  {
    path: "/404",
    side: "both",
    template: "plain",
    name: "Page not found",
    title: "We could not find that page",
    description: "The page you asked for is not here. Find Serene Heights projects, the hotel, contact details and the site map.",
    intro: "The address may have changed or been typed wrongly. These links should get you back on your way.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "What you can do",
        parts: [
          { list: ["Check the address for a spelling mistake.", "Use the menu at the top of the page.", "Look through the site map, which lists every page."] },
          { p: ["If a link on this site brought you here, please tell us so that we can mend it."] },
        ],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "The hotel at Nathia Gali", href: H },
          { label: "Site map", href: "/sitemap" },
          CONTACT,
        ],
      },
    ],
  },
  {
    path: "/privacy-policy",
    side: "both",
    template: "plain",
    name: "Privacy policy",
    title: "Privacy policy",
    description: "What happens to your details on this site: forms open WhatsApp with your own message and the site does not store it.",
    intro: "The forms on these pages open WhatsApp with a message you can read before you send it. This site does not store what you type into them.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "How your details are handled",
        parts: [
          { h: "Who we are", p: ["This policy covers the pages of the Serene Heights Group website. You can reach us here: " + REACH] },
          {
            h: "Our forms",
            p: [
              "When you fill in a form, your browser uses your answers to write a WhatsApp message. WhatsApp opens with that message. You can change it, send it or close it. Until you press send, we receive nothing.",
              "We do not keep a copy of the form on this website.",
            ],
          },
          {
            h: "When you send a message",
            p: ["We then receive your WhatsApp number, your profile name as WhatsApp shows it, and what you wrote. WhatsApp handles the message under its own privacy policy. Our team uses it to reply, to arrange what you asked for and to keep a record of the conversation. The same applies if you call or write to us."],
          },
          { h: "What we ask you not to send", p: ["Please do not send bank passwords, card numbers or one-time codes. Send identity papers only when a named member of the team has asked for them for a purchase, and check with our office first."] },
          { h: "Technical information", p: ["The company that hosts this website may record technical information, such as your IP address, browser and the page requested, in order to deliver the site and keep it secure. See the cookies page for what is kept in your browser."] },
          { h: "Other services", p: ["Links may take you to other websites, such as WhatsApp, YouTube, Instagram, Facebook and maps. They have their own policies. Online booking, investor accounts and individual project sites run by Serene Heights are separate services from these pages and may handle your details differently, for example if you create an account. Read their notices or ask us before you use them."] },
          { h: "Sharing", p: ["We do not sell your personal information. We may share details with people who help us to deal with your request, or when the law requires it."] },
          { h: "How long we keep messages", p: ["We have not yet published a fixed period. Ask us how long we will keep your messages, or ask us to delete them."] },
          { h: "Your choices", p: ["You can ask to see, correct or delete the details we hold about you. Write to us by WhatsApp or at the office address above. You may also have rights under the law of the country where you live. Some records may have to be kept by law."] },
          { h: "Changes", p: ["If the site begins to store form entries or measure visits, this page will be changed first."] },
        ],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [
          { label: "Cookies and consent", href: "/cookies" },
          { label: "Terms of use", href: "/terms" },
          CONTACT,
        ],
      },
    ],
    pending: [
      "Review and approval by the client's lawyer before launch",
      "Legal name and registration of the data controller, a privacy contact, message retention period and effective date",
      "Confirm hosting logs, any analytics and whether group pages load third-party maps or videos",
      "Privacy notices for the booking, investor and project sites that share this domain",
    ],
  },
  {
    path: "/terms",
    side: "both",
    template: "plain",
    name: "Terms of use",
    title: "Terms of use",
    description: "How to use the Serene Heights Group website, what its information is for and what it does not offer.",
    intro: "This website gives general information about Serene Heights. It does not sell a property, confirm a room or make a contract with you.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "Using this website",
        parts: [
          { h: "Information, not an offer", p: ["Prices, sizes, plans, availability and dates can change. Nothing here is a binding offer. A purchase is governed by the agreements you sign, and a stay by the confirmation you receive."] },
          { h: "Pictures", p: ["Many images are renders of planned buildings. They show design intent and may differ from the finished work. Floor plans are for guidance. The plan and specification in your agreement are what count."] },
          { h: "Projects and the hotel", p: ["Serene Heights Nathia Gali is under construction. Pages about the hotel describe what is planned. Facilities and opening may change."] },
          { h: "Enquiries", p: ["Sending a form opens WhatsApp with your message. Sending that message is a request. It does not reserve a unit, a visit or a room until the team confirms it."] },
          { h: "Investment information", p: ["Nothing here is financial, legal or tax advice. Please read the investment disclaimer too."] },
          { h: "Guides and travel", p: ["Travel times, roads, weather, fees and opening hours change. Check them with local sources before you set out. You are responsible for your own safety on roads and trails."] },
          { h: "Links", p: ["Some links lead to other websites. We do not control them and are not responsible for what they say or do."] },
          { h: "Content", p: ["The text, images, plans and names on this site belong to Serene Heights or to the people who let us use them. You may share links and print pages for your own use. Please ask before you copy or republish them for business."] },
          { h: "Fair use", p: ["Do not try to damage the site, send harmful material through it, collect other people's details or pretend to be Serene Heights."] },
          { h: "Availability", p: ["We try to keep the site correct and working, but errors and interruptions happen. Tell us if you find one. Nothing on this page removes a right that the law gives you."] },
          { h: "Contact", p: [REACH] },
        ],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Investment disclaimer", href: "/disclaimer" },
          { label: "Hotel policies", href: `${H}/policies` },
        ],
      },
    ],
    pending: ["Review and approval by the client's lawyer before launch", "Legal entity that runs the site, governing law, liability wording and effective date"],
  },
  {
    path: "/cookies",
    side: "both",
    template: "plain",
    name: "Cookies and consent",
    title: "Cookies and consent",
    description: "What these pages keep in your browser, why there is no advertising tracking in them, and how to clear it.",
    intro: "These group pages do not set advertising or analytics cookies. Your browser may keep your place on a page for the visit.",
    blocks: [
      {
        id: "storage",
        kind: "table",
        h: "What is kept in your browser",
        head: ["What", "Why", "How long"],
        rows: [["Your scroll position", "To return you to the same place on a page", "Session storage: until you close the tab or clear it"]],
      },
      {
        id: "text",
        kind: "text",
        h: "Your choices",
        parts: [
          { h: "Why you are not asked to accept cookies", p: ["These pages do not use optional cookies at present. If we add measurement, advertising or similar tools, we will say so here and ask for your choice before they run where the law requires it."] },
          { h: "Forms", p: ["Forms prepare a WhatsApp message from what you type. The site does not save that text in a cookie."] },
          { h: "Other websites and services", p: ["WhatsApp, YouTube, social networks and maps set their own cookies when you use them. Serene Heights booking, investor and project sites are separate services. They may use cookies or browser storage to sign you in, measure visits or remember choices, even where they share our web address."] },
          { h: "Clearing your browser", p: ["You can delete stored data or block cookies in your browser settings. These group pages should still work. A service with an account may ask you to sign in again."] },
          { h: "Questions", p: [REACH] },
        ],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [{ label: "Privacy policy", href: "/privacy-policy" }, CONTACT],
      },
    ],
    pending: [
      "Review and approval by the client's lawyer before launch",
      "Update before adding analytics, advertising tags or embedded maps and videos; list the cookies of the booking, investor and project sites served on the same domain",
    ],
  },
  {
    path: "/sitemap",
    side: "both",
    template: "plain",
    name: "Site map",
    title: "Site map",
    description: "Every page of the Serene Heights Group website: projects, investing, overseas buyers, the hotel and insights.",
    intro: "Every page on this site, by subject.",
    blocks: [
      { id: "text", kind: "text", h: "All pages", parts: [{ p: ["Choose a page below. If you cannot find what you need, ask us."] }] },
      { id: "next", kind: "band", h: "Where next", links: [{ label: "Home", href: "/" }, CONTACT] },
    ],
  },
  {
    path: "/disclaimer",
    side: "invest",
    template: "plain",
    name: "Investment disclaimer",
    title: "Investment disclaimer",
    description: "What Serene Heights does not promise: returns, dates, resale and occupancy are not guaranteed. Read before you buy.",
    intro: "Returns are not guaranteed. You could earn less than you expect, or lose money. Read the agreements and take your own advice before you buy.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "Please read this first",
        parts: [
          { h: "Projections are not promises", p: ["Any figure for rental income, capital gain, profit or return is the developer's projection. It rests on assumptions that may not come true. Past prices and other projects do not show what will happen here."] },
          { h: "Hotel income changes", p: ["Income depends on guests, rates, seasons, costs and how the hotel is run. It may be low, late or nil. A profit share is paid only if there is profit to share under your agreement."] },
          { h: "Construction and dates", p: ["Serene Heights Nathia Gali is under construction. Work can be delayed, changed or cost more than planned. Any date you are given is an estimate unless your signed agreement says otherwise. Rely on that agreement and not on this website."] },
          { h: "Selling or leaving", p: ["There may not be a buyer when you want to sell, and the price may be lower than you paid. Transfer may need consent, documents and fees. Describing a unit as transferable does not mean it can be sold at any time or price."] },
          { h: "Prices and availability", p: ["Published prices and payment plans can change and may leave out taxes, fees and other charges. Ask for the full cost and schedule in writing."] },
          { h: "Approvals and documents", p: ["Ask for current copies and check them with the authority that issued them. A statement on this site is not a substitute for that check."] },
          { h: "Religious compliance", p: ["Sources published by the developer describe transactions as Shariah-compliant. Ask for the basis of that statement and take advice from a scholar you trust."] },
          { h: "Images", p: ["Renders, sample interiors and plans are illustrative. Your signed specification is what counts."] },
          { h: "Buyers outside Pakistan", p: ["Currency, tax, transfer and property rules may affect you. Exchange rates can reduce the value of what you pay or receive. This site is not meant to offer an investment where that would be unlawful."] },
          { h: "Not advice", p: ["We are the seller's side. Nothing here takes account of your situation. Speak to an independent lawyer, tax adviser and financial adviser before you commit money."] },
        ],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [
          { label: "Risks and exit", href: "/invest/risks-and-exit" },
          { label: "Documents and approvals", href: "/documents" },
          CONTACT,
        ],
      },
    ],
    pending: [
      "Review and approval by the client's lawyer before launch, including rules on marketing to buyers abroad",
      "Evidence for the Shariah-compliance statement, and the legal entity named as seller",
    ],
  },
];
