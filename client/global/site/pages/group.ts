import type { Page } from "../types";

const WHATSAPP = { label: "WhatsApp +92 300 8497999", href: "https://wa.me/923008497999" };
const CALL = { label: "Call 042-111-111-744", href: "tel:+9242111111744" };
const OFFICE = "H. No. 71 C3, Gulberg III, Park View Lane, Lahore";
const OFFICE_MAP = "https://www.google.com/maps/search/?api=1&query=71+C3+Park+View+Lane+Gulberg+III+Lahore";
const NG_MAP = "https://www.google.com/maps/search/?api=1&query=34.0745,73.379";
const LHR_MAP = "https://www.google.com/maps/search/?api=1&query=Main+Boulevard+Gulberg+Lahore";

const mistTower = { src: "/media/ng/tower-forest-mist.webp", alt: "Render of the Serene Heights Nathia Gali tower above the pine forest in mist" };
const lahoreTower = { src: "/media/lhr/tower.jpg", alt: "Render of the Serene Heights Lahore tower beside Gulberg Main Boulevard" };

export const groupPages: Page[] = [
  {
    path: "/",
    side: "both",
    template: "home",
    name: "Group home",
    title: "Serene Heights Group",
    description: "Own a hotel apartment or a share of one with Serene Heights, in Nathia Gali and Lahore, or ask about a stay at the Nathia Gali hotel.",
    intro:
      "We build hotel apartments in Nathia Gali and a mixed-use tower in Lahore, and DM Consortium manages them. You can own with us, or ask to stay with us.",
    image: { src: "/media/ng/tower-forest-mist-xl.webp", alt: "Render of the Serene Heights Nathia Gali tower rising out of pine forest and mist" },
    actions: [
      { label: "Own with us", href: "/invest" },
      { label: "Stay at the hotel", href: "/hotels/nathia-gali" },
    ],
    blocks: [
      {
        id: "doors",
        kind: "cards",
        h: "Own or stay",
        cards: [
          {
            t: "Own with us",
            d: "Buy a whole hotel apartment, or a 50 sq ft share of one. See the prices, the payment plan and the risks before you decide.",
            href: "/invest",
            cta: "Own with us",
            image: { src: "/media/ng/tower-closeup.webp", alt: "Render of the upper floors and balconies of the Nathia Gali tower" },
          },
          {
            t: "Stay at the hotel",
            d: "Furnished apartments among the pines at 7,906 ft. The hotel is under construction. Send the dates you want and the team will tell you what is possible.",
            href: "/hotels/nathia-gali",
            cta: "Stay at the hotel",
            image: { src: "/media/ng/rooftop-dining.webp", alt: "Render of the rooftop restaurant at Serene Heights Nathia Gali" },
          },
        ],
      },
      {
        id: "projects",
        kind: "cards",
        h: "The projects",
        cards: [
          {
            t: "Nathia Gali",
            d: "Three towers of fully furnished hotel apartments on more than 30 kanals, two hours from Islamabad.",
            meta: "Under construction since 2021",
            href: "/nathiagali",
            cta: "See Nathia Gali",
            image: mistTower,
          },
          {
            t: "Lahore",
            d: "A 21-storey tower on Gulberg Main Boulevard with shops, offices, co-working, parking and hotel apartments.",
            meta: "Now selling, with a stated 2-year delivery timeline",
            href: "/lahore",
            cta: "See Lahore",
            image: lahoreTower,
          },
        ],
      },
      {
        id: "check",
        kind: "cards",
        h: "What you can check",
        d: "Please look before you decide. These are the places to start.",
        cards: [
          { t: "The building work", d: "Dated films from the Nathia Gali site run from December 2021 to April 2026.", href: "/nathiagali/progress", cta: "Construction progress" },
          { t: "The papers", d: "See which documents exist for each project and ask us for current copies.", href: "/documents", cta: "Documents and approvals" },
          { t: "The site itself", d: "Come and see where the towers are rising. Bring your questions, and your own engineer or lawyer if you like.", href: "/site-visit", cta: "Book a site visit" },
        ],
      },
      {
        id: "how",
        kind: "cards",
        h: "How owning works",
        cards: [
          { t: "You buy", d: "Choose an apartment or a 50 sq ft Smart Property Unit. The published Nathia Gali plans are 30% down, then 36 monthly instalments." },
          { t: "The hotel is run for you", d: "Once the building is complete, DM Consortium handles guests, housekeeping, upkeep and bookings as one hotel." },
          { t: "Owners share the income", d: "Rental income is shared with owners every quarter. It depends on how the hotel does and is not guaranteed." },
        ],
        links: [{ label: "How a hotel apartment investment works", href: "/invest/how-it-works" }],
      },
      {
        id: "abroad",
        kind: "band",
        h: "Buying from abroad",
        d: "You can begin from where you live. Read how to pay, sign and check a purchase if you are in the Gulf, the UK, North America, Australia or New Zealand.",
        links: [{ label: "Overseas Pakistanis", href: "/overseas" }],
      },
      {
        id: "latest",
        kind: "media",
        h: "Latest from the site",
        t: "April 2026: the newest site film",
        text: "Our most recent film from the Nathia Gali site is dated April 2026. Every film since December 2021 is listed with its month, so you can compare one visit with the next. The picture here is a render of the finished design.",
        image: { src: "/media/ng/tower-sky.webp", alt: "Render of the Serene Heights Nathia Gali tower against the sky" },
        links: [{ label: "All construction updates", href: "/nathiagali/progress" }],
      },
      {
        id: "guides",
        kind: "listing",
        h: "Guides",
        links: [{ label: "All insights", href: "/insights" }],
      },
      {
        id: "ask",
        kind: "form",
        form: "enquiry",
        about: "the price list and payment plan",
        h: "Get the price list and payment plan",
        d: "Tell us which project interests you. The team will confirm today's prices and what is available.",
      },
    ],
    pending: [
      "Construction photographs for the 'Latest from the site' block (a render is used)",
      "Income wording differs between sources: the current Nathia Gali home page says monthly rental income, its payment plan page says quarterly profit distribution; quarterly is used, as in the group constants",
      "Opening date of the Nathia Gali hotel",
    ],
  },
  {
    path: "/about",
    side: "both",
    template: "about",
    name: "About Serene Heights Group",
    title: "About Serene Heights Group",
    description: "Who we are: Serene Heights is developed and managed by DM Consortium, with projects in Nathia Gali and Lahore and a head office in Gulberg III, Lahore.",
    intro:
      "Serene Heights is a family of places to own and stay, developed by DM Consortium. The group's office is in Lahore. Its first hotel is being built in Nathia Gali.",
    image: { src: "/media/ng/aerial-clouds.webp", alt: "Render of Serene Heights Nathia Gali from the air, above low cloud" },
    actions: [
      { label: "See the projects", href: "/projects" },
      { label: "Talk to us", href: "/contact" },
    ],
    blocks: [
      {
        id: "story",
        kind: "text",
        h: "The story",
        parts: [
          {
            p: [
              "DM Consortium dates from 2017. Before building upwards it completed Serene Farms, a horizontal development on Barki Road in Lahore.",
              "Construction of Serene Heights Nathia Gali began in December 2021. The plan is a resort of three towers and more than 150 furnished apartments at 7,906 ft, run as one hotel.",
              "Serene Heights Lahore followed: a 21-storey mixed-use tower on Gulberg Main Boulevard, developed as a joint venture.",
            ],
          },
          {
            h: "What we are trying to do",
            p: [
              "We want property in Pakistan to be easier to own. An owner can hold a whole hotel apartment, or a share measured in 50 sq ft units, while one team looks after the building and its guests.",
              "The promise behind it is simple to say: no maintenance charges and no hidden costs for owners. Ask to see it in the agreement before you sign, as you should with any promise.",
            ],
          },
        ],
      },
      {
        id: "people",
        kind: "cards",
        h: "The people",
        cards: [
          { t: "Fahad Masud Lone", d: "Chief Executive, Serene Heights and DM Consortium. He sets the group's direction and its approach to ownership.", href: "/about/leadership", cta: "Leadership" },
          { t: "The team you will speak to", d: "Sales and site-visit questions are answered from the Lahore office, by phone, WhatsApp or in person.", href: "/contact", cta: "Contact us" },
        ],
      },
      {
        id: "group",
        kind: "cards",
        h: "The group",
        cards: [
          { t: "DM Consortium", d: "Developer of Serene Heights, and manager of the hotel apartments: bookings, housekeeping, maintenance and owner returns." },
          { t: "Serene Heights Nathia Gali", d: "Hotel and resort on Kala Bagh Air Base Road. Under construction.", href: "/nathiagali", cta: "See Nathia Gali", image: mistTower },
          { t: "Serene Heights Lahore", d: "A joint venture of Fatir Developers (Pvt) Ltd, Falah Developers and DM Consortium. Now selling.", href: "/lahore", cta: "See Lahore", image: lahoreTower },
          { t: "Serene Heights Hotels and Resorts", d: "The hotel side of the group, for guests.", href: "/hotels", cta: "See the hotels" },
        ],
      },
      {
        id: "documents",
        kind: "band",
        h: "Documents and approvals",
        d: "Check the company and the projects for yourself. Ask us for the current copy of any document.",
        links: [
          { label: "Documents and approvals", href: "/documents" },
          { label: "Track record", href: "/about/track-record" },
        ],
      },
    ],
    pending: [
      "Company registration details for DM Consortium and the legal relationship between DM Consortium and Serene Heights Group",
      "Photograph of the office or the team",
      "Number of staff and any department heads the client wants named",
    ],
  },
  {
    path: "/about/leadership",
    side: "invest",
    template: "about",
    name: "Leadership",
    title: "Leadership",
    description: "Fahad Masud Lone is Chief Executive of Serene Heights and DM Consortium. Read his approach to building, ownership and leadership.",
    intro: "Serene Heights is led by Fahad Masud Lone, Chief Executive of Serene Heights and DM Consortium.",
    image: { src: "/media/ng/facade-entrance.webp", alt: "Render of the entrance and facade of Serene Heights Nathia Gali" },
    blocks: [
      {
        id: "story",
        kind: "text",
        h: "The story",
        parts: [
          { h: "Purpose-driven business", p: ["Fahad has been an entrepreneur for more than eight years. He has focused on building businesses that leave something lasting, and not only short-term returns."] },
          { h: "Transparent ownership", p: ["Serene Heights was planned around one idea for owners: no maintenance charges and no hidden costs. What you own is what you own."] },
          { h: "Leadership and education", p: ["Through “The Art of Being a CEO”, Fahad shares what he has learnt about leading, deciding and growing a business."] },
        ],
      },
      {
        id: "people",
        kind: "cards",
        h: "The people",
        cards: [{ t: "Fahad Masud Lone", d: "Chief Executive, Serene Heights and DM Consortium. The vision behind Serene Heights Nathia Gali." }],
        links: [{ label: "Ask to speak to the team", href: "/contact" }],
      },
      {
        id: "group",
        kind: "text",
        h: "The group",
        parts: [
          {
            p: [
              "DM Consortium develops Serene Heights Nathia Gali and will manage it as one hotel. In Lahore it works with Fatir Developers (Pvt) Ltd and Falah Developers.",
              "If you want to know who is responsible for a particular project, document or payment, ask us to put the name in writing.",
            ],
          },
        ],
        links: [{ label: "About the group", href: "/about" }],
      },
      {
        id: "documents",
        kind: "band",
        h: "Documents and approvals",
        d: "Look at the papers and at what has been built so far.",
        links: [
          { label: "Documents and approvals", href: "/documents" },
          { label: "Track record", href: "/about/track-record" },
        ],
      },
    ],
    pending: [
      "Portrait of Fahad Masud Lone",
      "Full biography: education, earlier companies, dates",
      "Names, roles and portraits of directors and the management team",
      "Details of The Art of Being a CEO (book, course or series)",
    ],
  },
  {
    path: "/about/track-record",
    side: "invest",
    template: "proof",
    name: "Track record",
    title: "Track record",
    description: "What DM Consortium has completed and what it is building now: Serene Farms, Serene Heights Nathia Gali and Serene Heights Lahore.",
    intro: "One development is complete and two are in hand. The Nathia Gali hotel is still under construction, so it has no operating results to show yet.",
    image: { src: "/media/ng/tower-sky.webp", alt: "Render of the Serene Heights Nathia Gali tower against open sky" },
    blocks: [
      {
        id: "status",
        kind: "table",
        h: "Status",
        head: ["Project", "Where", "What it is", "Status"],
        rows: [
          ["Serene Farms", "Barki Road, Lahore", "Horizontal development", "Completed"],
          ["Serene Heights Nathia Gali", "Kala Bagh Air Base Road, Nathia Gali", "Hotel apartments and resort, three towers", "Under construction since 2021"],
          ["Serene Heights Lahore", "Gulberg Main Boulevard, Lahore", "21-storey mixed-use tower, joint venture", "Now selling, stated 2-year delivery timeline"],
        ],
      },
      {
        id: "documents",
        kind: "cards",
        h: "Documents",
        cards: [
          { t: "Nathia Gali site films", d: "Ten dated films, from December 2021 to April 2026.", href: "/nathiagali/progress", cta: "Construction progress" },
          { t: "Nathia Gali papers", d: "What you can ask to see for the hotel project.", href: "/nathiagali/documents", cta: "Documents for Nathia Gali" },
          { t: "Lahore progress", d: "What is published so far, and how to ask for more.", href: "/lahore/progress", cta: "Lahore progress" },
          { t: "Serene Farms", d: "Ask us for completion details and how to visit.", href: "/contact", cta: "Ask about Serene Farms" },
        ],
      },
      {
        id: "timeline",
        kind: "timeline",
        h: "Timeline",
        items: [
          { when: "2017", t: "DM Consortium begins" },
          { when: "Before the towers", t: "Serene Farms completed", d: "A horizontal development on Barki Road, Lahore, completed before DM Consortium started vertical construction." },
          { when: "December 2021", t: "Groundbreaking in Nathia Gali", d: "The first site film was made the same month." },
          { when: "October 2022 to July 2024", t: "Five site films", d: "October 2022, July 2023, November 2023, February 2024 and July 2024." },
          { when: "April to December 2025", t: "Three site films", d: "April, September and December 2025." },
          { when: "April 2026", t: "Newest site film", d: "The most recent update published from Nathia Gali." },
        ],
        links: [{ label: "See the construction updates", href: "/nathiagali/progress" }],
      },
      {
        id: "who",
        kind: "text",
        h: "Who to ask",
        parts: [
          {
            p: [
              "Ask the Lahore office on 042-111-111-744 or on WhatsApp at +92 300 8497999.",
              "Good questions to ask: what stage each tower has reached, what is due next, whether anything is behind schedule, and which completed work you can go and see.",
            ],
          },
        ],
        links: [WHATSAPP, { label: "Book a site visit", href: "/site-visit" }],
      },
      { id: "ask", kind: "form", form: "document", about: "the group's track record", h: "Ask for a document", d: "Tell us which project and what you would like to see." },
    ],
    pending: [
      "Serene Farms: completion date, size, photographs and references (the only image held is a mood picture)",
      "Nathia Gali: current stage of each tower, percentage complete and planned completion date",
      "Lahore: construction start date, the date the 2-year timeline runs from, and construction photographs",
      "Any other completed DM Consortium work",
    ],
  },
  {
    path: "/documents",
    side: "invest",
    template: "proof",
    name: "Documents and approvals",
    title: "Documents and approvals",
    description: "Which documents to ask for before you buy with Serene Heights in Nathia Gali or Lahore, and how to get the current copies.",
    intro: "Read the papers before you pay. Here is what to ask for on each project. We have not put copies online, so ask us for the current one.",
    image: { src: "/media/lhr/facade.jpg", alt: "Render of the facade of Serene Heights Lahore" },
    blocks: [
      {
        id: "status",
        kind: "table",
        h: "Status",
        head: ["Document", "Nathia Gali", "Lahore"],
        rows: [
          ["Land title", "Ask us for the current copy", "Ask us for the current copy"],
          ["Building approvals", "Ask us for the current copy", "LDA approved, as stated by the developer. Ask us for the approval letter"],
          ["Floor plans", "Published on this site", "Ask us for the current plans"],
          ["Price and payment plan", "Published on this site", "Ask us for the current plan"],
          ["Booking form", "Ask us for the form", "Ask us for the form"],
          ["Sale and management agreements", "Ask us for a sample to read", "Ask us for a sample to read"],
        ],
      },
      {
        id: "documents",
        kind: "cards",
        h: "Documents",
        cards: [
          { t: "Documents for Nathia Gali", d: "The list for the hotel project, with how to ask for each.", href: "/nathiagali/documents", cta: "See the list" },
          { t: "Floor plans", d: "Indicative plans for the ground floor and seven upper floors. No 4th-floor plan is published.", href: "/nathiagali/floor-plans", cta: "See floor plans" },
          { t: "Payment plan", d: "The four published Nathia Gali plans, with totals, down payments and instalments.", href: "/nathiagali/payment-plan", cta: "See the plan" },
          { t: "Lahore", d: "The tower, its status and who to ask.", href: "/lahore", cta: "See Lahore" },
          { t: "Investment disclaimer", d: "What this site does and does not promise.", href: "/disclaimer", cta: "Read it" },
        ],
      },
      {
        id: "timeline",
        kind: "timeline",
        h: "Timeline",
        items: [
          { when: "Before you book", t: "See title and approvals", d: "Ask for copies and check them with the authority that issued them, or have your lawyer do it." },
          { when: "Before you sign", t: "Read the agreements", d: "Read the sale agreement and the hotel management agreement together." },
          { when: "While you pay", t: "Keep every receipt", d: "Match receipts to your payment schedule and keep your booking papers safe." },
          { when: "When payments are complete", t: "Confirm ownership", d: "Ask for your ownership papers, and which office records the transfer." },
        ],
      },
      {
        id: "who",
        kind: "text",
        h: "Who to ask",
        parts: [
          {
            p: [
              "Call 042-111-111-744, message +92 300 8497999 on WhatsApp, or visit the office at H. No. 71 C3, Gulberg III, Park View Lane, Lahore.",
              "A copy is a starting point. For anything that matters to your decision, ask to see the original and check it with the authority named on it.",
            ],
          },
        ],
        links: [WHATSAPP, CALL],
      },
      { id: "ask", kind: "form", form: "document", about: "project documents and approvals", h: "Ask for a document", d: "Name the project and the papers you want to see." },
    ],
    pending: [
      "Nathia Gali: land title, building approvals and NOCs, with issuing authority, number and date",
      "Lahore: LDA approval letter, number and date (sources say only 'LDA approved')",
      "Sample sale agreement, management agreement and booking form cleared for publication",
      "Company registration and tax registration of DM Consortium",
      "Evidence behind the statement that transactions are Shariah-compliant",
    ],
  },
  {
    path: "/projects",
    side: "both",
    template: "hub",
    name: "Projects",
    title: "Projects",
    description: "Serene Heights Nathia Gali, Serene Heights Lahore and the completed Serene Farms: what each is, where it stands and what you can buy.",
    intro: "Two projects are for sale today: a mountain hotel in Nathia Gali and a city tower in Lahore. One earlier development is complete.",
    image: { src: "/media/ng/snow-aerial-sunset.webp", alt: "Render of Serene Heights Nathia Gali in snow at sunset, seen from the air" },
    blocks: [
      {
        id: "start",
        kind: "cards",
        h: "Start here",
        cards: [
          { t: "Serene Heights Nathia Gali", d: "Fully furnished hotel apartments and 50 sq ft shares, in a resort at 7,906 ft.", meta: "Under construction", href: "/nathiagali", cta: "See Nathia Gali", image: mistTower },
          { t: "Serene Heights Lahore", d: "Retail, offices, co-working and hotel apartments in a 21-storey tower on Gulberg Main Boulevard.", meta: "Now selling", href: "/lahore", cta: "See Lahore", image: lahoreTower },
          { t: "Serene Farms", d: "A completed horizontal development by DM Consortium on Barki Road, Lahore.", meta: "Completed", href: "/about/track-record", cta: "Track record" },
        ],
      },
      {
        id: "facts",
        kind: "table",
        h: "Key facts",
        head: ["", "Nathia Gali", "Lahore"],
        rows: [
          ["What it is", "Hotel and resort", "Mixed-use tower"],
          ["Size", "Three towers, 150+ apartments, 30+ kanals", "21 storeys"],
          ["Status", "Under construction since 2021", "Now selling, stated 2-year delivery timeline"],
          ["Developer", "DM Consortium", "Joint venture: Fatir Developers, Falah Developers and DM Consortium"],
          ["What you can buy", "Apartments and Smart Property Units", "Commercial, office, co-working, hotel apartments and smart property"],
          ["Entry price", "PKR 2,250,000 for a 50 sq ft unit", "From PKR 2 million for smart property"],
          ["Payment", "30% down and 36 monthly instalments", "Flexible plans. Ask for the current one"],
        ],
      },
      {
        id: "check",
        kind: "band",
        h: "What you can check",
        d: "Dated films from the Nathia Gali site, and what to ask for on each project.",
        links: [
          { label: "Documents and approvals", href: "/documents" },
          { label: "Construction progress", href: "/nathiagali/progress" },
        ],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions buyers ask",
        links: [{ label: "All questions", href: "/faq" }],
        groups: [
          {
            items: [
              { q: "Which project is for me?", a: "Nathia Gali is a mountain hotel, so income will follow tourism and the seasons. Lahore is a city commercial tower, so it depends on demand for shops, offices and business stays. Neither income is guaranteed." },
              { q: "Are the projects finished?", a: "No. Nathia Gali is under construction and Lahore is now selling with a stated 2-year delivery timeline. Serene Farms is complete." },
              { q: "When will Nathia Gali be finished?", a: "We do not publish a completion date on this site. Ask for the current schedule in writing, and compare it with the site films and your own visit." },
              { q: "What is the smallest amount I can buy?", a: "In Nathia Gali it is one 50 sq ft Smart Property Unit at PKR 2,250,000. In Lahore smart property starts from PKR 2 million. Please confirm both with the team." },
              { q: "Can I visit before I buy?", a: "Yes, please do. Book a site visit and tell us which project you want to see." },
              { q: "Are more projects planned?", a: "We have nothing to announce here at the moment. New projects will be listed on this page." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "Serene Heights projects", h: "Get the price list and payment plan", d: "Tell us whether you are interested in Nathia Gali or Lahore." },
    ],
    pending: [
      "Lahore payment plan and price list",
      "Planned completion date for Nathia Gali",
      "Lahore floor counts add up to more than 21 (LG + 6, 5, 7, 2 and 2); the 21-storey figure needs an explanation from the client",
      "Smart Property Unit price differs: PKR 2,250,000 on the current Nathia Gali site, PKR 2,000,000 in older articles and 'from PKR 2 million' in group copy",
    ],
  },
  {
    path: "/contact",
    side: "both",
    template: "action",
    name: "Contact",
    title: "Contact Serene Heights",
    description: "Call 042-111-111-744, WhatsApp +92 300 8497999, or visit the Serene Heights office in Gulberg III, Lahore.",
    intro: "Ask about a project, a price, a document or a visit. WhatsApp is usually the simplest way to start, from anywhere in the world.",
    image: { src: "/media/lhr/dusk.jpg", alt: "Render of Serene Heights Lahore at dusk" },
    actions: [WHATSAPP, CALL],
    blocks: [
      { id: "form", kind: "form", form: "enquiry", about: "Serene Heights", h: "Contact", d: "Leave your name and number and say what you would like to know." },
      {
        id: "where",
        kind: "facts",
        h: "Where we are",
        rows: [
          ["Head office", `DM Consortium, ${OFFICE}`],
          ["UAN", "042-111-111-744"],
          ["WhatsApp and phone", "+92 300 8497999"],
          ["Nathia Gali site", "1.5 km, Kala Bagh Air Base Road, Nathia Gali, Khyber Pakhtunkhwa"],
          ["Nathia Gali email", "info@sereneheightsnathiagali.com"],
          ["Lahore site", "Gulberg Main Boulevard, Lahore"],
          ["Lahore: offices and commercial", "0304-1111106"],
          ["Lahore: co-working and hotel apartments", "0321-4979446 or 0300-8497999"],
          ["Lahore email", "info@sereneheightslahore.com"],
        ],
        links: [
          { label: "Directions to the office", href: OFFICE_MAP },
          { label: "Directions to Nathia Gali", href: NG_MAP },
          { label: "Directions to the Lahore site", href: LHR_MAP },
        ],
      },
    ],
    pending: [
      "Office opening hours",
      "One confirmed group email address; sources list info@sereneheightsnathiagali.com, info@sereneheightslahore.com and an older Gmail address",
      "WhatsApp conflict: the Nathia Gali sites print +92 321 4979447; the group line +92 300 8497999 is used",
      "Exact map pins for the head office and the Lahore site",
    ],
  },
  {
    path: "/faq",
    side: "both",
    template: "questions",
    name: "Questions",
    title: "Questions about Serene Heights",
    description: "Plain answers about Serene Heights: the projects, prices, income, risks, buying from abroad, site visits and staying at the hotel.",
    intro: "Short answers to the questions we hear most. If yours is not here, ask us at the end of the page.",
    image: { src: "/media/ng/rooftop-view.webp", alt: "Render of the view from the rooftop at Serene Heights Nathia Gali" },
    blocks: [
      {
        id: "questions",
        kind: "faq",
        h: "Questions by subject",
        groups: [
          {
            subject: "The group",
            items: [
              { q: "Who is behind Serene Heights?", a: "DM Consortium, led by Chief Executive Fahad Masud Lone. Its head office is in Gulberg III, Lahore. Serene Heights Lahore is a joint venture with Fatir Developers (Pvt) Ltd and Falah Developers." },
              { q: "What have you completed?", a: "DM Consortium completed Serene Farms, a horizontal development on Barki Road in Lahore. Serene Heights Nathia Gali is still being built." },
            ],
          },
          {
            subject: "Buying",
            items: [
              { q: "What can I buy?", a: "In Nathia Gali, furnished hotel apartments or 50 sq ft Smart Property Units. In Lahore, commercial, office, co-working and hotel apartment space, and smart property." },
              { q: "How much does it cost?", a: "The published base price for Nathia Gali apartments is PKR 40,000 per sq ft. One 50 sq ft Smart Property Unit is PKR 2,250,000. Ask for the current price list before you book." },
              { q: "How do I pay?", a: "The published Nathia Gali plans are 30% down and 36 monthly instalments. Ask for the current Lahore plan." },
              { q: "Can I see the agreements first?", a: "Ask for samples and read them before you pay anything. We suggest you show them to your own lawyer." },
            ],
          },
          {
            subject: "Income and risk",
            items: [
              { q: "How will owners earn?", a: "When the hotel opens, DM Consortium will let the apartments and share rental income with owners quarterly. Smart Property Unit owners share according to the units they hold." },
              { q: "Are returns guaranteed?", a: "No. Any return you see is the developer's projection. Actual income depends on guests, rates, seasons and costs, and it can be lower than projected." },
              { q: "Can I sell?", a: "The developer says Smart Property Units can be sold or transferred at any time. You still need a buyer, and your agreement sets the steps and any charges. Read it first." },
              { q: "Do owners pay for maintenance?", a: "The developer's stated terms for Nathia Gali are no maintenance fees for owners. Confirm this, and anything it leaves out, in your agreement." },
            ],
          },
          {
            subject: "From abroad and on site",
            items: [
              { q: "Can I buy from outside Pakistan?", a: "Yes, overseas Pakistanis can buy property in Pakistan, subject to the usual documents. Our pages for overseas buyers explain payments and signing." },
              { q: "Can I visit the site?", a: "Yes. Book a visit and we will arrange a time." },
            ],
          },
          {
            subject: "Staying",
            items: [{ q: "Is the hotel open?", a: "It is under construction. You can request dates and the team will confirm what is possible." }],
          },
        ],
        links: [
          { label: "Questions about Nathia Gali", href: "/nathiagali/faq" },
          { label: "Guest questions", href: "/hotels/nathia-gali/faq" },
        ],
      },
      { id: "ask", kind: "form", form: "question", about: "Serene Heights Group", h: "Ask your question", d: "We will answer by phone or WhatsApp." },
    ],
    pending: [
      "Resale and transfer conditions and fees",
      "What the 'no maintenance fees' term covers and excludes",
      "Rental income: pooled or unit by unit, and the deductions before the owner's share",
      "Hotel opening date",
    ],
  },
  {
    path: "/owners",
    side: "invest",
    template: "plain",
    name: "For owners",
    title: "For owners",
    description: "Already own with Serene Heights? How to reach us about payments, documents, transfers and the stay benefits for owners.",
    intro: "If you have already bought with us, this page tells you who to contact and what to have ready.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "Help for owners",
        parts: [
          { h: "How to reach us", p: ["Call 042-111-111-744 or message +92 300 8497999 on WhatsApp. You can also visit the office at H. No. 71 C3, Gulberg III, Park View Lane, Lahore. Have your name, project and unit or booking reference ready."] },
          { h: "Payments and receipts", p: ["Ask us for a statement of what you have paid and what remains. Keep your own copy of every receipt. If anyone gives you new bank details, call the UAN on this site to confirm them before you pay."] },
          { h: "Your unit and the building work", p: ["Site films are published on the construction progress page. You may also visit. Bring your booking form and payment schedule so the team can show you the right tower and floor."] },
          { h: "Owner stays", p: ["The stated owner benefit in Nathia Gali is 28 free nights a year, with a discount on longer stays for owners and family. The nights will depend on the hotel opening. Ask us when they start, how to book and whether any dates are excluded."] },
          { h: "Income", p: ["Rental income starts after the hotel is complete and operating. The developer plans to distribute it every quarter. It is not guaranteed."] },
          { h: "Selling or transferring", p: ["Tell us before you agree anything with a buyer. We will explain the steps and papers under your agreement."] },
        ],
        links: [WHATSAPP, { label: "Write to us", href: "/contact" }, { label: "Sign in to your investor account", href: "/serene-investors/login" }],
      },
      {
        id: "next",
        kind: "band",
        h: "Where next",
        links: [
          { label: "Construction progress", href: "/nathiagali/progress" },
          { label: "Documents for Nathia Gali", href: "/nathiagali/documents" },
          { label: "Book a site visit", href: "/site-visit" },
        ],
      },
    ],
    pending: [
      "A dedicated owner contact, and whether there will be an owner portal",
      "Owner-stay rules: start date, booking notice, peak dates, family use, and whether they apply to Smart Property Units",
      "Transfer procedure and fees",
      "Sample owner statement and distribution dates",
    ],
  },
  {
    path: "/press",
    side: "both",
    template: "listing",
    name: "Press",
    title: "Press",
    description: "Project updates and a contact for journalists writing about Serene Heights Group, Nathia Gali or Lahore.",
    intro: "Writing about Serene Heights? Start with our project updates, and ask us to check any fact before you publish.",
    image: { src: "/media/ng/snow-tower.webp", alt: "Render of the Serene Heights Nathia Gali tower among snowy pines" },
    blocks: [
      {
        id: "items",
        kind: "listing",
        category: "updates",
        h: "Newest first",
        d: "Updates published by Serene Heights.",
        empty: "There are no updates to show at the moment. Contact us for the latest on either project.",
      },
      {
        id: "facts",
        kind: "facts",
        h: "Facts for journalists",
        rows: [
          ["Group", "Serene Heights Group"],
          ["Developer", "DM Consortium, founded 2017"],
          ["Chief Executive", "Fahad Masud Lone"],
          ["Under construction", "Serene Heights Nathia Gali: three towers and 150+ hotel apartments planned at 7,906 ft"],
          ["Now selling", "Serene Heights Lahore: a 21-storey mixed-use tower on Gulberg Main Boulevard"],
          ["Completed", "Serene Farms, Barki Road, Lahore"],
        ],
      },
    ],
    pending: [
      "Press coverage: publications, dates and links",
      "Press releases",
      "A named press contact and email",
      "Downloadable logos and images with usage terms",
    ],
  },
  {
    path: "/partners",
    side: "invest",
    template: "action",
    name: "Partners and brokers",
    title: "Partners and brokers",
    description: "Estate agents, brokers and business partners: how to talk to Serene Heights about Nathia Gali and Lahore.",
    intro: "If you advise property buyers, or have a business that could work with ours, tell us who you are and where you work.",
    image: { src: "/media/lhr/street.jpg", alt: "Render of Serene Heights Lahore from street level" },
    blocks: [
      {
        id: "form",
        kind: "form",
        form: "partner",
        about: "partnering with Serene Heights",
        h: "Partners and brokers",
        d: "Give your company, city and the project you are interested in. The team will explain the current terms.",
      },
      {
        id: "expect",
        kind: "text",
        h: "What we ask of partners",
        parts: [
          {
            list: [
              "Use current prices and plans, and confirm them with us before you quote them.",
              "Never promise a return. Describe any figure as the developer's projection and not guaranteed.",
              "Call renders what they are.",
              "Send buyers to the documents and the site before they pay.",
              "Ask us for written terms before you act for us.",
            ],
          },
        ],
      },
      {
        id: "where",
        kind: "facts",
        h: "Where we are",
        rows: [
          ["Head office", `DM Consortium, ${OFFICE}`],
          ["UAN", "042-111-111-744"],
          ["WhatsApp", "+92 300 8497999"],
        ],
        links: [{ label: "Directions to the office", href: OFFICE_MAP }, WHATSAPP],
      },
    ],
    pending: ["Broker terms, commission and registration process", "List of authorised dealers, if any", "A named partnerships contact"],
  },
];
