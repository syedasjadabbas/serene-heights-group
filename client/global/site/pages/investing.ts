import type { Page } from "../types";

const WHATSAPP = { label: "WhatsApp +92 300 8497999", href: "https://wa.me/923008497999" };
const CALL = { label: "Call 042-111-111-744", href: "tel:+9242111111744" };
const DISCLAIMER = [{ label: "Investment disclaimer", href: "/disclaimer" }];
const NG_MAP = "https://www.google.com/maps/search/?api=1&query=34.0745,73.379";

export const investingPages: Page[] = [
  {
    path: "/invest",
    side: "invest",
    template: "hub",
    name: "Investing with Serene Heights",
    title: "Investing with Serene Heights",
    description: "Own a hotel apartment or a 50 sq ft share in Nathia Gali, or space in Lahore. Prices, payment plans, risks and how to check them.",
    intro: "You can buy a whole hotel apartment, a share of one, or space in our Lahore tower. Start with how it works, then read the risks before you look at the price.",
    image: { src: "/media/ng/tower-closeup.webp", alt: "Render of the upper floors and balconies of the Nathia Gali tower" },
    actions: [
      { label: "How it works", href: "/invest/how-it-works" },
      { label: "See the payment plan", href: "/nathiagali/payment-plan" },
    ],
    blocks: [
      {
        id: "start",
        kind: "cards",
        h: "Start here",
        cards: [
          { t: "How it works", d: "What you buy, who runs the hotel and how owners share the income.", href: "/invest/how-it-works", cta: "Read" },
          { t: "Earnings explained", d: "Where income comes from, what can reduce it and what to ask.", href: "/invest/earnings", cta: "Read" },
          { t: "Steps to buy", d: "From first question to ownership, and what you sign.", href: "/invest/buying-steps", cta: "Read" },
          { t: "Risks and exit", d: "What is not guaranteed, and what selling involves.", href: "/invest/risks-and-exit", cta: "Read" },
          { t: "Compare the options", d: "A hotel apartment beside a plot and a holiday home.", href: "/invest/compare", cta: "Read" },
          { t: "Buying from abroad", d: "Paying and signing from another country.", href: "/overseas", cta: "Read" },
        ],
      },
      {
        id: "facts",
        kind: "facts",
        h: "Key facts",
        d: "Published figures for Nathia Gali unless the row says otherwise. The team confirms the current price.",
        rows: [
          ["Apartment price", "PKR 40,000 per sq ft"],
          ["Smart Property Unit", "50 sq ft for PKR 2,250,000"],
          ["Down payment", "30%"],
          ["Balance", "36 monthly instalments"],
          ["Smart Property Unit instalments", "PKR 675,000 down, then PKR 43,750 a month"],
          ["1 BHK apartments published", "667 sq ft: PKR 26,680,000. 673 sq ft: PKR 26,920,000. 734 sq ft: PKR 29,360,000"],
          ["Owner stays", "28 free nights a year, as stated by the developer"],
          ["Income", "Quarterly distribution planned once the hotel is operating. Not guaranteed"],
          ["Lahore entry", "Smart property from PKR 2 million"],
        ],
        links: [{ label: "See the full payment plan", href: "/nathiagali/payment-plan" }],
      },
      {
        id: "check",
        kind: "cards",
        h: "What you can check",
        cards: [
          { t: "Construction", d: "Dated site films from December 2021 to April 2026.", href: "/nathiagali/progress", cta: "See progress" },
          { t: "Documents", d: "The papers to ask for, project by project.", href: "/documents", cta: "See documents" },
          { t: "The developer", d: "What DM Consortium has finished and what it has not.", href: "/about/track-record", cta: "See track record" },
        ],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions buyers ask",
        groups: [
          {
            items: [
              { q: "Is the income guaranteed?", a: "No. Hotel income moves with guests, rates, seasons and running costs. Any return figure from the developer is a projection." },
              { q: "When does income start?", a: "After the building is complete and the hotel is operating. It does not start while you are paying instalments for a building under construction." },
              { q: "Who manages the hotel?", a: "DM Consortium, in-house. It plans to handle guests, housekeeping, maintenance and owner distributions." },
              { q: "Do I pay for upkeep?", a: "The stated terms are no maintenance fees and operating costs covered by the hotel. Check the wording in your agreement." },
              { q: "Can I use my apartment?", a: "The stated benefit is 28 free nights a year for Nathia Gali owners. Ask about dates, notice and family use, and whether it applies to the unit you want." },
              { q: "Can I sell later?", a: "Smart Property Units can be sold or transferred at any time, according to the developer. Finding a buyer can take time and the price is not fixed." },
              { q: "Is it Shariah-compliant?", a: "The developer states that its transactions are Shariah-compliant. Ask for the basis of that statement and show the agreement to a scholar you trust." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "investing with Serene Heights", h: "Get the price list and payment plan", d: "Tell us your budget and whether you prefer a whole apartment or a share." },
    ],
    pending: [
      "Published plans for two- and three-bedroom apartments, and a current availability list",
      "Lahore price list and payment plan",
      "Whether 28 nights apply to Smart Property Units; sources say 'owners' without a distinction",
      "Evidence for the Shariah-compliance statement",
      "Projection conflict: 12% a year in the current calculator, 13 to 15% on the Smart Property Unit page, and far higher figures in an older article; return rates are left out",
    ],
  },
  {
    path: "/invest/how-it-works",
    side: "invest",
    template: "explainer",
    name: "How a hotel apartment investment works",
    title: "How a hotel apartment investment works at Serene Heights",
    description: "You buy an apartment or a 50 sq ft unit, DM Consortium runs the hotel, and owners share the income. Here is each part, plainly.",
    intro: "You own the apartment, or a share of it. One team runs the building as a hotel. When guests pay to stay, owners receive a share of what is left after the hotel's terms are applied.",
    image: { src: "/media/ng/facade-entrance.webp", alt: "Render of the entrance to Serene Heights Nathia Gali" },
    blocks: [
      {
        id: "parts",
        kind: "text",
        h: "The parts",
        parts: [
          {
            h: "1. What you own",
            p: [
              "There are two ways to own in Nathia Gali. You can buy a whole furnished hotel apartment. Or you can buy Smart Property Units of 50 sq ft each, which make you a co-owner of an apartment.",
              "An apartment owner holds one named unit. A Smart Property Unit owner holds a measured share and receives income according to the number of units held.",
            ],
          },
          {
            h: "2. How you pay",
            p: ["The published plans take 30% as a down payment and the rest in 36 monthly instalments. For one Smart Property Unit at PKR 2,250,000 that is PKR 675,000, then PKR 43,750 a month."],
          },
          {
            h: "3. Who runs the hotel",
            p: [
              "DM Consortium manages the building in-house. You do not look for guests, arrange cleaning or call a plumber. The apartments are looked after together, to one standard.",
              "The other side of that convenience is trust. How well the hotel is run will decide much of what owners earn.",
            ],
          },
          {
            h: "4. How income reaches you",
            p: [
              "Guests pay to stay. The hotel meets its costs. The owners' share is then distributed, quarterly under the developer's stated terms.",
              "Ask whether income is pooled across the building or counted for your own apartment, and which costs come off first. The answer should be in your agreement.",
            ],
          },
          {
            h: "5. Your own stays",
            p: ["Nathia Gali owners are offered 28 free nights a year and a discount on longer stays, once the hotel is open. Ask how far ahead you must book, and whether Eid, summer weekends or snow season are limited."],
          },
          {
            h: "6. Leaving",
            p: ["Units can be sold or transferred, under the terms you sign. There is no promise that a buyer will be waiting, or what that buyer will pay."],
          },
        ],
      },
      {
        id: "promise",
        kind: "band",
        h: "What this page does not promise",
        d: "It does not promise income, a completion date, a resale price or a ready buyer. The hotel is still under construction and has no operating results.",
        links: DISCLAIMER,
      },
      {
        id: "next",
        kind: "cards",
        h: "Next",
        cards: [
          { t: "Earnings explained", d: "What moves hotel income up or down.", href: "/invest/earnings", cta: "Read" },
          { t: "Smart Property Unit", d: "The 50 sq ft share in detail.", href: "/nathiagali/co-ownership", cta: "Read" },
          { t: "Apartments", d: "Owning the whole unit.", href: "/nathiagali/apartments", cta: "Read" },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "how ownership works", h: "Ask how ownership works for you" },
    ],
    pending: [
      "Income method: pooled or unit by unit, the owners' share, and deductions or management fee (an older article mentions 15%, which is unconfirmed)",
      "Sample sale and management agreements",
      "How a Smart Property Unit is recorded: title, share certificate or contract",
      "Owner-stay rules",
    ],
  },
  {
    path: "/invest/earnings",
    side: "invest",
    template: "explainer",
    name: "Earnings explained",
    title: "Earnings explained",
    description: "Where hotel apartment income comes from, what reduces it, when it could start, and the questions to ask before relying on a projection.",
    intro: "Hotel income is not rent. It changes with every season and it is not guaranteed. This page shows what goes into it so you can test any figure you are given.",
    image: { src: "/media/ng/rooftop-lounge.webp", alt: "Render of the rooftop lounge at Serene Heights Nathia Gali" },
    blocks: [
      {
        id: "parts",
        kind: "text",
        h: "The parts",
        parts: [
          {
            h: "Where the money comes from",
            p: ["Guests pay a nightly rate. Income is shaped by two things above all: how many nights are sold, and the price of each. Apartment size, view and the hotel's reputation also matter."],
          },
          {
            h: "What comes off first",
            p: ["Running a hotel costs money: staff, housekeeping, power, repairs, marketing. The developer says operating costs are covered by the hotel and that owners pay no maintenance fees. What matters to you is the owners' share after costs. Ask to see a worked example."],
          },
          {
            h: "Seasons",
            p: ["Nathia Gali has summer visitors who come for cool air, and winter visitors who come for snow. The months between are usually quieter. A good year and a poor year can look very different."],
          },
          {
            h: "When it could start",
            p: ["Not while the hotel is being built. Distribution is planned every quarter once it is operating. A new hotel may also need time to fill."],
          },
          {
            h: "The developer's projection",
            p: ["DM Consortium has published projections for the Smart Property Unit. They are estimates and not guaranteed. The published figures are not all the same, so ask for the current sheet with its assumptions about occupancy, rates and costs. Then work it out again with fewer guests."],
          },
          {
            h: "Questions to ask",
            list: [
              "Is income pooled, or counted by apartment?",
              "What percentage comes to owners, and after which deductions?",
              "Is there a minimum before anything is paid?",
              "Who pays for insurance, property tax, utilities and replacing furniture?",
              "Do my own free nights reduce my income?",
              "Can I see a sample statement?",
              "What happens to income if the manager changes?",
            ],
          },
        ],
      },
      { id: "promise", kind: "band", h: "What this page does not promise", d: "No level of income is promised here, and none is guaranteed. You could receive less than projected, or nothing in some periods.", links: DISCLAIMER },
      {
        id: "next",
        kind: "cards",
        h: "Next",
        cards: [
          { t: "Risks and exit", d: "What can go wrong, and how selling works.", href: "/invest/risks-and-exit", cta: "Read" },
          { t: "Payment plan", d: "What you pay, and when.", href: "/nathiagali/payment-plan", cta: "Read" },
          { t: "Compare the options", d: "Hotel apartment, plot or holiday home.", href: "/invest/compare", cta: "Read" },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "earnings and the current projection", h: "Ask how ownership works for you" },
    ],
    pending: [
      "One agreed projection with its assumptions: sources give 12% (calculator), 13 to 15% and PKR 300,000 a year on PKR 2,250,000 (Smart Property Unit page), and 8 to 12% or 75 to 85% (older articles)",
      "Income frequency conflict: monthly on the Nathia Gali home page, quarterly elsewhere",
      "Owners' share, deductions and a sample owner statement",
      "Tax treatment of owner income",
    ],
  },
  {
    path: "/invest/buying-steps",
    side: "invest",
    template: "explainer",
    name: "Steps to buy and what you sign",
    title: "Steps to buy and what you sign",
    description: "The steps from first enquiry to ownership with Serene Heights, the papers to read at each stage and what to check before paying.",
    intro: "Buying follows five stated steps: booking form, payment plan, ownership, management and, if you wish, transfer. We add the checks we think you should make around them.",
    image: { src: "/media/interiors/decor-detail.webp", alt: "Interior detail from a Serene Heights apartment" },
    blocks: [
      {
        id: "parts",
        kind: "text",
        h: "The parts",
        parts: [
          {
            h: "1. Ask, visit and check",
            p: ["Get the current price and payment plan. See the site. Ask for land title, approvals and sample agreements, and give your lawyer time to read them."],
          },
          {
            h: "2. Fill in the booking form",
            p: ["It asks for personal and financial details, so have your identity document ready. Check that the project, tower, unit or number of units, area and price are right."],
          },
          {
            h: "3. Choose a payment plan",
            p: ["The published Nathia Gali plans are 30% down and 36 monthly instalments. Pay to the account named in your official papers. If you are sent different details, call 042-111-111-744 before paying. Get a receipt each time."],
          },
          {
            h: "4. Read what you sign",
            p: ["Ask for the sale agreement and the management agreement. Read them together, because one says what you own and the other says how it earns. Look for these points."],
            list: [
              "The exact unit, or number of 50 sq ft units, and the total price",
              "Anything payable on top of the price",
              "The completion date, and what happens if it moves",
              "What happens if you pay late or cancel",
              "How income is worked out, and when it is paid",
              "Owner stays, and any dates excluded",
              "Furniture and fittings included",
              "How to sell or transfer, and any charge",
              "How the management agreement can end",
            ],
          },
          {
            h: "5. Confirm ownership",
            p: ["The developer says your unit is secured once payments are complete. Ask which paper proves it, in whose name, and where it is recorded."],
          },
          {
            h: "6. After that",
            p: ["DM Consortium manages the hotel apartments. You keep your papers, follow the construction updates and, later, your income statements. Smart Property Units can be sold or transferred under their terms."],
          },
        ],
      },
      { id: "promise", kind: "band", h: "What this page does not promise", d: "It is a guide and not legal advice. The agreement you sign is what counts. Have your own lawyer read it.", links: DISCLAIMER },
      {
        id: "next",
        kind: "cards",
        h: "Next",
        cards: [
          { t: "Documents and approvals", d: "What to ask to see.", href: "/documents", cta: "Read" },
          { t: "Book a site visit", d: "See it before you sign.", href: "/site-visit", cta: "Book" },
          { t: "Steps to buy from abroad", d: "The same journey from another country.", href: "/overseas/steps", cta: "Read" },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "the steps to buy", h: "Ask how ownership works for you" },
    ],
    pending: [
      "Confirmed list of papers issued at each stage (booking form, allotment letter, agreements, transfer deed)",
      "Blank booking form and sample agreements for publication",
      "Official bank account title for payments",
      "Late payment, cancellation and refund terms",
      "Taxes, registration and transfer charges payable by the buyer",
    ],
  },
  {
    path: "/invest/risks-and-exit",
    side: "invest",
    template: "explainer",
    name: "Risks, exit and what is not guaranteed",
    title: "Risks, exit and what is not guaranteed",
    description: "The main risks of buying a hotel apartment under construction, how you might sell, and what Serene Heights does not guarantee.",
    intro: "You could wait longer than expected, earn less than projected, or find it hard to sell. Read this page before the price list.",
    image: { src: "/media/ng/aerial-clouds.webp", alt: "Render of the Nathia Gali towers above cloud" },
    blocks: [
      {
        id: "parts",
        kind: "text",
        h: "The parts",
        parts: [
          {
            h: "The building is not finished",
            p: ["Construction in Nathia Gali began in December 2021 and continues. Schedules can move. Until the hotel operates there is no rental income. Compare the site films with the schedule you are given in writing."],
          },
          {
            h: "Income may be low",
            p: ["Fewer guests, lower rates, higher costs or a poor season would all reduce it. So could road closures, new competition or a fall in travel. The hotel has no past results to rely on."],
          },
          {
            h: "You depend on the manager",
            p: ["Owners rely on DM Consortium to run the hotel, keep the accounts and distribute income. Ask about its experience, what reports you will receive, and what owners can do if it performs badly."],
          },
          {
            h: "Selling takes time",
            p: [
              "The developer says Smart Property Units can be sold or transferred at any time. That means you are allowed to sell. It does not mean a buyer is ready, or that you will get back what you paid.",
              "A hotel apartment appeals to a narrower group of buyers than an ordinary home. If you may need the money within two or three years, think carefully. Ask about transfer steps, charges and any approval needed.",
            ],
          },
          {
            h: "Rules, taxes and your own position",
            p: ["Property and income taxes can change. Missed instalments may have consequences under your agreement. If you earn in another currency, the exchange rate can change what you pay and what you receive."],
          },
          {
            h: "What is not guaranteed",
            list: ["Any rate of return or rental income", "A rise in value", "A completion or opening date", "A resale buyer, price or time", "That renders will match every finished detail"],
          },
        ],
      },
      { id: "promise", kind: "band", h: "What this page does not promise", d: "It cannot list every risk. It is not financial, legal or tax advice. Take your own before you commit.", links: DISCLAIMER },
      {
        id: "next",
        kind: "cards",
        h: "Next",
        cards: [
          { t: "Documents and approvals", d: "Check the papers.", href: "/documents", cta: "Read" },
          { t: "Construction progress", d: "Check the building.", href: "/nathiagali/progress", cta: "See" },
          { t: "Steps to buy", d: "Know what you sign.", href: "/invest/buying-steps", cta: "Read" },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "risks and resale", h: "Ask how ownership works for you" },
    ],
    pending: [
      "Completion schedule and what buyers receive if it is late",
      "Resale procedure, transfer charges, any lock-in and any developer buy-back",
      "Cancellation, refund and default terms",
      "How owners can replace the manager or end the management agreement",
      "Insurance arrangements",
    ],
  },
  {
    path: "/invest/compare",
    side: "invest",
    template: "explainer",
    name: "Hotel apartment, plot or holiday home",
    title: "Hotel apartment, plot or holiday home",
    description: "A fair comparison of a managed hotel apartment, a plot and a holiday home in Pakistan: income, control, work, costs and selling.",
    intro: "A hotel apartment suits people who want someone else to run it. A plot suits people who can wait. A holiday home suits people who want the keys. None is best for everyone.",
    image: { src: "/media/interiors/living-room-wide.webp", alt: "Living room of a furnished Serene Heights apartment" },
    blocks: [
      {
        id: "compare",
        kind: "table",
        h: "Side by side",
        head: ["", "Hotel apartment", "Plot", "Holiday home"],
        rows: [
          ["How it may earn", "A share of guest income", "Only if it sells for more", "Rent, if you let it"],
          ["Who does the work", "The hotel manager", "Little to do", "You or a caretaker"],
          ["Your own use", "Set nights under the agreement", "None until you build", "When you like"],
          ["Control", "Shared with the manager", "Yours, within the scheme's rules", "Yours"],
          ["Running costs", "Depends on the agreement", "Tax and any society dues", "Yours to pay"],
          ["Who might buy it later", "Mostly investors", "Builders and investors", "Families and investors"],
          ["Main worry", "Guests and management", "Title, development and waiting", "Upkeep from a distance"],
        ],
      },
      {
        id: "parts",
        kind: "text",
        h: "The parts",
        parts: [
          {
            h: "A hotel apartment",
            p: ["It fits if you want a property that is looked after, a few planned breaks a year and a share of hotel income. It fits less well if you want to choose every guest, every price and every date. You depend on the manager."],
          },
          {
            h: "A share of one",
            p: ["A 50 sq ft Smart Property Unit lowers the entry price to PKR 2,250,000. You hold a share and not a room of your own. The income and the exit follow the same hotel."],
          },
          {
            h: "A plot",
            p: ["It is simple to understand and pays nothing while you hold it. The result depends on title, location and how fast the area develops. You can choose when to build, if the rules allow."],
          },
          {
            h: "A holiday home",
            p: ["You can go whenever you like. You also fix the geyser, pay the caretaker and find the guests. If you live far away, that work is harder."],
          },
          {
            h: "Four questions to decide",
            list: ["How soon might you need the money?", "How many nights a year will you really stay?", "Do you want to manage it?", "Could you cope with no income for a while?"],
          },
        ],
      },
      { id: "promise", kind: "band", h: "What this page does not promise", d: "We sell hotel apartments, so weigh this comparison with that in mind. It is general and does not say which will earn more.", links: DISCLAIMER },
      {
        id: "next",
        kind: "cards",
        h: "Next",
        cards: [
          { t: "How it works", d: "The hotel apartment model, part by part.", href: "/invest/how-it-works", cta: "Read" },
          { t: "Risks and exit", d: "The drawbacks in full.", href: "/invest/risks-and-exit", cta: "Read" },
          { t: "Investing guides", d: "Longer articles on owning property.", href: "/insights/investing", cta: "Read" },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "which way to own suits me", h: "Ask how ownership works for you" },
    ],
    pending: ["Tax comparison needs a tax adviser's review; older articles give rates and holding periods that are left out"],
  },
  {
    path: "/site-visit",
    side: "invest",
    template: "action",
    name: "Book a site visit",
    title: "Book a site visit",
    description: "See Serene Heights Nathia Gali or Lahore before you buy. Request a visit, plan the drive and bring the right questions.",
    intro: "Choose a project and a day that suits you. The team will call to agree a time. Seeing the site does not commit you to buy.",
    image: { src: "/media/ng/tower-sky.webp", alt: "Render of the Nathia Gali tower. The building is under construction" },
    actions: [WHATSAPP, CALL],
    blocks: [
      { id: "form", kind: "form", form: "visit", about: "a site visit", h: "Book a site visit", d: "Give a preferred date and how many people are coming. The visit is confirmed when the team calls you." },
      {
        id: "prepare",
        kind: "text",
        h: "Make the most of the visit",
        parts: [
          {
            h: "Before you go",
            list: ["Watch the newest site film and note its date.", "Check the weather and the road, above all in winter and on long weekends.", "Wear shoes for a building site.", "If you have booked, bring your booking form and payment schedule."],
          },
          {
            h: "Ask on site",
            list: ["What stage has each tower reached?", "What is due in the next three to six months, and is anything late?", "Where would my unit be?", "Which approvals are in place, and may I see them?", "When will the hotel take guests?", "How will owners be paid, and when can they stay?"],
          },
          {
            h: "Remember",
            p: ["A visit shows you the building and the road. It cannot tell you what the contract says or what the hotel will earn. Check those separately."],
          },
        ],
      },
      {
        id: "where",
        kind: "facts",
        h: "Where we are",
        rows: [
          ["Nathia Gali", "1.5 km, Kala Bagh Air Base Road, Nathia Gali, Khyber Pakhtunkhwa"],
          ["From Islamabad", "80 km, about two hours"],
          ["From Abbottabad city centre", "35 km, about 50 minutes"],
          ["From Nathia Gali main bazaar", "5 km, about 10 minutes"],
          ["Lahore site", "Gulberg Main Boulevard, Lahore"],
          ["Lahore office", "H. No. 71 C3, Gulberg III, Park View Lane"],
        ],
        links: [
          { label: "Directions to Nathia Gali", href: NG_MAP },
          { label: "Construction progress", href: "/nathiagali/progress" },
        ],
      },
    ],
    pending: ["Visiting days and hours, and who meets visitors", "Site safety rules", "Whether transport can be arranged", "Whether the Lahore site can be visited now"],
  },
];
