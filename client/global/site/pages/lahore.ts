import type { Page } from "../types";

const WA = { label: "Message us on WhatsApp", href: "https://wa.me/923008497999" };
const MAP = "https://www.google.com/maps?q=Main+Boulevard+Gulberg,+Lahore";
const ENQUIRE = { label: "Enquire about Lahore", href: "/lahore/contact" };

export const lahorePages: Page[] = [
  /* ------------------------------------------------------------ project */
  {
    path: "/lahore",
    side: "invest",
    template: "project",
    name: "Serene Heights Lahore",
    title: "Serene Heights Lahore: shops, offices and hotel apartments on Gulberg Main Boulevard",
    description: "Serene Heights Lahore is a 21-storey mixed-use tower on Gulberg Main Boulevard: shops, offices, co-working, parking and hotel apartments.",
    intro: "A 21-storey tower on Gulberg Main Boulevard with shops, offices, co-working and hotel apartments. It is now selling. Smart property units start from PKR 2 million.",
    eyebrow: "Gulberg Main Boulevard, Lahore",
    image: { src: "/media/lahore/image12.webp", alt: "Render of the tower and Main Boulevard from the air" },
    actions: [ENQUIRE, { label: "The project: floors and units", href: "/lahore/the-project" }],
    blocks: [
      {
        id: "buy",
        kind: "cards",
        h: "What you can buy",
        d: "Sizes and prices are sent on request.",
        cards: [
          { t: "Shops and commercial floors", d: "Lower ground and six commercial floors, with ramps and parking levels close by.", href: "/lahore/the-project", cta: "See the floors", image: { src: "/media/lahore/retail.webp", alt: "Render of the commercial floors and the parking levels" } },
          { t: "Offices", d: "Seven office floors.", href: "/lahore/the-project", cta: "See the floors", image: { src: "/media/lahore/building-7-new.webp", alt: "Render of the tower beside Main Boulevard" } },
          { t: "Co-working", d: "Two floors of shared and private workspaces.", href: "/lahore/the-project", cta: "See the floors", image: { src: "/media/lahore/image7.webp", alt: "Render of the upper floors with a planted terrace" } },
          { t: "Hotel apartments", d: "Two floors of furnished, serviced apartments.", href: "/lahore/the-project", cta: "See the floors", image: { src: "/media/lahore/stay.webp", alt: "Render of a double-height apartment living room" } },
          { t: "Smart property units", d: "Part-ownership from PKR 2 million.", href: "/lahore/invest", cta: "See how to pay", image: { src: "/media/lahore/building-8-new.webp", alt: "Render of the front of the tower" } },
        ],
      },
      {
        id: "stands",
        kind: "facts",
        h: "Where it stands today",
        d: "The tower is for sale and has not been delivered.",
        rows: [
          ["Status", "Now selling"],
          ["Delivery", "The developers state a two-year timeline. Ask for the start date and the current schedule."],
          ["Approval", "Stated as LDA approved. Ask us for the current copy."],
          ["Building", "21 storeys"],
          ["Developers", "Fatir Developers (Pvt) Ltd, Falah Developers and DM Consortium, in a joint venture"],
          ["Management", "In-house"],
        ],
        links: [{ label: "Lahore construction progress", href: "/lahore/progress" }],
      },
      {
        id: "documents",
        kind: "band",
        h: "Approvals and documents",
        d: "The project is presented as LDA approved. Before you pay, ask us for a copy of the approval with its number and date, and check it with the LDA.",
        links: [{ label: "Documents and approvals", href: "/documents" }, { label: "Ask for a copy", href: "/lahore/contact" }],
      },
      {
        id: "earns",
        kind: "text",
        h: "How the hotel earns for owners",
        parts: [
          { h: "Hotel apartments", p: ["The plan is to run the two apartment floors under a hospitality model. Owners may stay and the apartments may be let to guests at other times."] },
          { h: "Shops and offices", p: ["These would earn from rent if a tenant is found. Rent and vacancies follow the market."] },
          { h: "Smart property", p: ["A smaller share of the building, from PKR 2 million. Ask how income and costs are shared."] },
          { h: "What is not promised", p: ["No return or rise in value is guaranteed, and income can only begin after completion."] },
        ],
        links: [{ label: "Earnings explained", href: "/invest/earnings" }, { label: "Risks and exit", href: "/invest/risks-and-exit" }],
      },
      {
        id: "place",
        kind: "media",
        h: "The place",
        t: "Gulberg Main Boulevard",
        text: "The tower is on Main Boulevard, close to Lahore's Central Business District. The project map gives two minutes to MM Alam, five to the CBD, seven to Ferozepur Road and ten to Canal Road.",
        image: { src: "/media/lahore/building-3.webp", alt: "Illustrated aerial map with Main Boulevard, the CBD, Kalma Underpass and Model Town" },
        links: [{ label: "Lahore location", href: "/lahore/location" }, { label: "Lahore amenities", href: "/lahore/amenities" }],
      },
      {
        id: "stay",
        kind: "band",
        h: "Stay first",
        d: "The Lahore apartments are not taking guests. The group's hotel destination is Nathia Gali, which is also being built. You can read about it and ask about dates.",
        links: [{ label: "The hotel at Nathia Gali", href: "/hotels/nathia-gali" }],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Buyers' questions",
        groups: [
          {
            items: [
              { q: "What is the least I can start with?", a: "Smart property units are offered from PKR 2 million. Ask for the size of a unit and the payment dates." },
              { q: "Is it approved?", a: "The project is stated to be LDA approved. Ask us for the current copy and check it with the LDA." },
              { q: "When will it be delivered?", a: "The developers state a two-year timeline. Ask when it began and what the agreement says about delay." },
              { q: "Who is developing it?", a: "Fatir Developers (Pvt) Ltd, Falah Developers and DM Consortium, together." },
              { q: "Who will run the building?", a: "In-house management. The developers state that no unions or third-party operators will run it day to day." },
              { q: "Is there parking?", a: "Five above-ground parking floors are planned, reached by ramps." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", h: "Get the price list and payment plan", d: "Tell us which floor interests you and we will send the current details.", form: "enquiry", about: "the Serene Heights Lahore price list" },
    ],
    pending: [
      "LDA approval number, date and copy",
      "Start date of the two-year delivery timeline and current schedule",
      "Construction status on site",
      "Price list, sizes and payment plan",
      "How hotel apartment owners earn: management terms and owner stays",
      "Source conflict: the floors listed (Lower Ground + 6, 5, 7, 2, 2) add up to 23 levels against 21 storeys",
    ],
  },

  /* -------------------------------------------------------- the project */
  {
    path: "/lahore/the-project",
    side: "invest",
    template: "product",
    name: "The project: floors and units",
    title: "The project: floors and units",
    description: "Floors at Serene Heights Lahore: lower ground and six commercial floors, five of parking, seven of offices, two co-working, two hotel apartment.",
    intro: "The tower has commercial floors at the base, parking above ground, then offices, co-working and hotel apartments. You can ask about any of them.",
    image: { src: "/media/lahore/image-1-new.webp", alt: "Render of the tower facade with the Serene Heights sign" },
    actions: [ENQUIRE, { label: "Investing in Lahore", href: "/lahore/invest" }],
    blocks: [
      {
        id: "get",
        kind: "table",
        h: "What you get, and what you do not",
        d: "The developers' floor mix. You buy a space or a unit in it. You do not buy a guaranteed tenant, income or resale price.",
        head: ["Part", "Floors", "For"],
        rows: [
          ["Commercial", "Lower ground and 6", "Shops and other commercial use"],
          ["Parking", "5", "Above-ground parking with ramps to almost every level"],
          ["Offices", "7", "Corporate offices and professional firms"],
          ["Co-working", "2", "Shared areas and private suites"],
          ["Hotel apartments", "2", "Furnished, serviced apartments"],
        ],
      },
      {
        id: "floors",
        kind: "panels",
        h: "Floor by floor",
        items: [
          { t: "Commercial floors", d: "Parking levels and drive-through ramps are designed to give cars access to almost all floors, which is a common problem in Gulberg.", image: { src: "/media/lahore/image3-v2.webp", alt: "Render of the facade above the parking levels" } },
          { t: "Office floors", d: "Seven floors for businesses that want a Gulberg address near clients and partners.", image: { src: "/media/lahore/building-6-new.webp", alt: "Render of the base and glass entrance of the tower" } },
          { t: "Co-working floors", d: "Workspaces for small teams and freelancers, with shared areas and private suites.", image: { src: "/media/lahore/image7.webp", alt: "Render of the upper floors with a planted terrace" } },
          { t: "Hotel apartments", d: "Furnished, serviced apartments under a hospitality model. Owners may stay and may earn from guests.", image: { src: "/media/lahore/stay.webp", alt: "Render of a double-height apartment living room" } },
          { t: "Parking", d: "Five dedicated floors, reached by ramps.", image: { src: "/media/lahore/image10.webp", alt: "Render of the drive-through entrance and parking levels" } },
        ],
      },
      {
        id: "drawings",
        kind: "pictures",
        h: "Drawings",
        d: "The exploded view of the building and two layout drawings. Ask for a drawing of the floor you want.",
        images: [
          { src: "/media/lahore/image2.webp", alt: "Exploded illustration of the building, floor by floor" },
          { src: "/media/lahore/image6-2.webp", alt: "Layout drawing shown with the office floors" },
          { src: "/media/lahore/image8-2.webp", alt: "Layout drawing shown with the co-working floors" },
        ],
      },
      {
        id: "payment",
        kind: "facts",
        h: "The payment",
        rows: [
          ["Smart property", "From PKR 2 million"],
          ["Shops, offices, co-working, apartments", "Price on request"],
          ["Instalments", "Flexible plans are offered. Ask for the schedule in writing."],
        ],
        links: [{ label: "Investing in Lahore and the payment plan", href: "/lahore/invest" }],
      },
      {
        id: "how",
        kind: "timeline",
        h: "How it works",
        items: [
          { when: "Step 1", t: "Talk to the team", d: "Ask about floors, sizes and prices." },
          { when: "Step 2", t: "Choose your space", d: "A shop, an office, co-working, a hotel apartment or a smart property unit." },
          { when: "Step 3", t: "Check and sign", d: "Read the approval and the agreement, then agree a payment plan." },
        ],
        links: [{ label: "Steps to buy and what you sign", href: "/invest/buying-steps" }],
      },
      {
        id: "papers",
        kind: "text",
        h: "The papers you receive",
        d: "Ask us for these, and read the current copies before you pay.",
        parts: [
          {
            list: [
              "The LDA approval, with its number and date",
              "The floor drawing, with your unit and its area",
              "The booking form and payment schedule",
              "The sale agreement, including delivery and delay",
              "The management terms, for hotel apartments and smart property",
            ],
          },
        ],
        links: [{ label: "Documents and approvals", href: "/documents" }],
      },
      {
        id: "compare",
        kind: "table",
        h: "Compare the ways to own",
        head: ["", "Shop or office", "Hotel apartment", "Smart property"],
        rows: [
          ["What you own", "A commercial unit", "A furnished apartment", "A share of the building"],
          ["Who may use it", "You or a tenant", "You at times, guests at others", "Ask us"],
          ["How it may earn", "Rent", "Guests’ stays", "Ask us"],
          ["Published entry price", "On request", "On request", "From PKR 2 million"],
        ],
        links: [{ label: "Compare with Nathia Gali", href: "/nathiagali" }, { label: "Hotel apartment, plot or holiday home", href: "/invest/compare" }],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions",
        groups: [
          {
            items: [
              { q: "How many floors are there?", a: "The project is described as 21 storeys. The mix is lower ground and 6 commercial floors, 5 parking, 7 office, 2 co-working and 2 hotel apartment floors." },
              { q: "What sizes are the units?", a: "Sizes are not published here. Ask for the floor drawing you are interested in." },
              { q: "Can I drive to my floor?", a: "Ramps are planned to reach almost every level, and private driveway access up to five floors." },
              { q: "Can I buy part of a unit?", a: "Yes, through smart property units from PKR 2 million." },
              { q: "Are these photographs?", a: "No. The pictures of the building are renders." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", h: "Get the Lahore floor and price sheet", d: "Tell us the floor and the size you need.", form: "enquiry", about: "floors and units at Serene Heights Lahore" },
    ],
    pending: [
      "Unit sizes, numbers and prices for every floor type",
      "Labelled floor plans for all levels",
      "Smart property terms in Lahore: unit size, share and income",
      "Source conflict: the floor list adds up to 23 levels against 21 storeys",
    ],
  },

  /* ------------------------------------------------------------- invest */
  {
    path: "/lahore/invest",
    side: "invest",
    template: "payment",
    name: "Investing in Lahore and the payment plan",
    title: "Investing in Lahore and the payment plan",
    description: "Smart property at Serene Heights Lahore starts from PKR 2 million. How to get the current payment plan, and what to check before you pay.",
    intro: "Smart property units start from PKR 2 million. Prices and instalments for shops, offices, co-working and apartments are sent on request.",
    image: { src: "/media/lahore/amenities-1-new.webp", alt: "Render of the tower lit at dusk" },
    actions: [{ label: "Ask for the payment plan", href: "/lahore/contact" }, WA],
    blocks: [
      {
        id: "plan",
        kind: "table",
        h: "The plan",
        d: "Only the smart property entry price is published. Ask the team for the current schedule for anything else.",
        head: ["What you buy", "Published price", "Instalments"],
        rows: [
          ["Smart property unit", "From PKR 2 million", "Ask us"],
          ["Shop or commercial floor", "On request", "Flexible plan, ask us"],
          ["Office", "On request", "Flexible plan, ask us"],
          ["Co-working", "On request", "Flexible plan, ask us"],
          ["Hotel apartment", "On request", "Flexible plan, ask us"],
        ],
      },
      {
        id: "calculator",
        kind: "form",
        form: "enquiry",
        about: "Lahore payments for a floor or unit",
        h: "Work out your payments",
        d: "Tell us the floor or unit you have in mind. We will send the price, the down payment and the instalments.",
      },
      {
        id: "else",
        kind: "text",
        h: "What else you pay",
        parts: [
          { p: ["Taxes, registration, transfer and running charges are not published for Lahore. Ask for each one in writing, with who pays it and when."] },
          { p: ["Management, maintenance and facilities are planned to be run in-house. Ask what owners contribute and what is covered."] },
        ],
        links: [{ label: "Risks, exit and what is not guaranteed", href: "/invest/risks-and-exit" }],
      },
      {
        id: "check",
        kind: "text",
        h: "What to weigh up",
        parts: [
          { h: "Reasons the developers give", list: ["A Main Boulevard address near the CBD", "In-house management", "Five parking floors with ramps", "Part-ownership at a lower entry price", "A stated two-year delivery timeline"] },
          { h: "What could go differently", list: ["Work can be delayed", "Tenants and guests may be fewer than hoped", "Prices can fall as well as rise", "Selling may take time"] },
        ],
      },
      {
        id: "dates",
        kind: "timeline",
        h: "Dates",
        items: [
          { when: "At booking", t: "Booking form and first payment", d: "The amount depends on the space. Ask for the plan first." },
          { when: "During construction", t: "Instalments", d: "Flexible plans are offered. Your schedule gives the due dates." },
          { when: "Delivery", t: "Stated as a two-year timeline", d: "Ask for the start date and the terms for delay in the agreement." },
        ],
        links: [{ label: "Lahore construction progress", href: "/lahore/progress" }],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions about the plan",
        groups: [
          {
            items: [
              { q: "What does PKR 2 million buy?", a: "It is the published entry price for smart property, which makes you a part-owner. Ask for the exact share, its papers and the instalments." },
              { q: "Is there a down payment?", a: "The Lahore plan is sent on request. The 30% and 36 instalments published for Nathia Gali may not apply." },
              { q: "What return should I expect?", a: "We do not publish one for Lahore. Any projection would be the developers' own and not guaranteed." },
              { q: "Who manages the property?", a: "In-house professional management." },
              { q: "Can I pay from abroad?", a: "Read the page on paying from abroad and then ask us for the account details in writing, from an official contact." },
            ],
          },
        ],
      },
      {
        id: "take",
        kind: "band",
        h: "Get this payment plan as a PDF",
        d: "There is no PDF to download from this page. Ask us and the team will send the current Lahore plan.",
        links: [WA, { label: "Contact", href: "/lahore/contact" }],
      },
    ],
    pending: [
      "Lahore payment plan: prices, down payment, instalments and PDF",
      "Smart property terms in Lahore and how income is shared",
      "Taxes, registration, transfer and service charges",
      "Calculator figures for Lahore (the calculator holds Nathia Gali plans only)",
      "Late payment, cancellation and refund terms",
    ],
  },

  /* ---------------------------------------------------------- amenities */
  {
    path: "/lahore/amenities",
    side: "invest",
    template: "hotel-content",
    name: "Lahore amenities",
    title: "Amenities at Serene Heights Lahore",
    description: "Planned facilities at Serene Heights Lahore: security, high-speed lifts, five parking floors, EV charging, meeting halls, gym and a rooftop helipad.",
    intro: "The building is planned with facilities for offices, shops and hotel apartments, managed in-house. The pictures are renders.",
    image: { src: "/media/lahore/amenities-2-new.webp", alt: "Render of the tower facade seen from below" },
    actions: [ENQUIRE],
    blocks: [
      {
        id: "panels",
        kind: "panels",
        h: "What is planned",
        items: [
          { t: "Access and parking", d: "High-speed lifts with destination control, private driveway access up to five floors, five parking floors and wheelchair ramps.", image: { src: "/media/lahore/image5.webp", alt: "Render of the ground level with glass shopfronts and parked cars" } },
          { t: "Safety and security", d: "Security and CCTV round the clock, a staffed reception and lobby concierge, fire detection and marked emergency exits.", image: { src: "/media/lahore/building-6-new.webp", alt: "Render of the base and glass entrance of the tower" } },
          { t: "Power and data", d: "Uninterrupted power, energy-efficient lighting, fibre internet and charging for electric cars.", image: { src: "/media/lahore/image4.webp", alt: "Render of the tower lit at dusk with palm trees" } },
          { t: "Business", d: "A business centre, co-working spaces, meeting and conference halls and a lounge.", image: { src: "/media/lahore/image7.webp", alt: "Render of the upper floors with a planted terrace" } },
          { t: "Daily life", d: "Coffee shops, food courts, a gym and a rooftop helipad.", image: { src: "/media/lahore/image12.webp", alt: "Render of the tower and Main Boulevard from the air" } },
        ],
      },
      {
        id: "know",
        kind: "facts",
        h: "Good to know",
        rows: [
          ["Management", "In-house, with no unions or third-party operators in day-to-day management, as stated by the developers"],
          ["Maintenance", "In-house support and one facility helpdesk"],
          ["Facade", "Vertical elements and large glass panels, designed to bring in daylight"],
          ["Charges", "Ask us which facilities are included and which are charged"],
          ["Status", "Facilities are planned and not yet in use"],
        ],
      },
      {
        id: "booking",
        kind: "band",
        h: "Ask about the building",
        d: "The team can explain what is included for your floor, and arrange a visit.",
        links: [ENQUIRE, { label: "Book a site visit", href: "/site-visit" }],
      },
    ],
    pending: ["Which facilities are confirmed, and their charges", "Number of lifts and parking spaces", "Helipad approval"],
  },

  /* ----------------------------------------------------------- location */
  {
    path: "/lahore/location",
    side: "invest",
    template: "location",
    name: "Lahore location",
    title: "Where Serene Heights Lahore is",
    description: "Serene Heights Lahore is on Gulberg Main Boulevard, near the Central Business District, MM Alam, Ferozepur Road and Canal Road.",
    intro: "The site is on Gulberg Main Boulevard, close to Lahore's Central Business District.",
    image: { src: "/media/lahore/building-7-new.webp", alt: "Render of the tower beside Main Boulevard" },
    actions: [{ label: "Open directions", href: MAP }, { label: "Book a site visit", href: "/site-visit" }],
    blocks: [
      {
        id: "facts",
        kind: "facts",
        h: "Distances and height",
        d: "Minutes are from the project's own map. Traffic will change them.",
        rows: [
          ["MM Alam", "2 minutes"],
          ["Central Business District", "5 minutes"],
          ["Ferozepur Road", "7 minutes"],
          ["Canal Road", "10 minutes"],
          ["Building height", "21 storeys"],
        ],
      },
      {
        id: "map",
        kind: "map",
        h: "On the map",
        d: "Gulberg Main Boulevard, Lahore. The link opens Main Boulevard. Ask us for the exact plot before you travel.",
        href: MAP,
        image: { src: "/media/lahore/building-3.webp", alt: "Illustrated aerial map with Main Boulevard, the CBD, Kalma Underpass and Model Town" },
        links: [{ label: "Open directions", href: MAP }],
      },
      {
        id: "there",
        kind: "text",
        h: "Getting there",
        parts: [
          { p: ["The tower has direct access from Main Boulevard, the main road through Gulberg. The project map also shows Kalma Underpass and Model Town nearby."] },
          { p: ["The building is planned with ramps to five above-ground parking floors. Ask us where to park and whom to meet before a visit."] },
        ],
      },
      {
        id: "seasons",
        kind: "cards",
        h: "The seasons",
        d: "A city site can be visited in any season. Choose the time that suits you.",
        cards: [
          { t: "Spring", d: "A comfortable time to walk round Main Boulevard.", image: { src: "/media/lahore/building-8-new.webp", alt: "Render of the front of the tower in daylight" } },
          { t: "Summer", d: "Lahore is hot. Ask for a visit early in the day.", image: { src: "/media/lahore/building-7-new.webp", alt: "Render of the tower beside Main Boulevard" } },
          { t: "Autumn", d: "Cooler days, good for seeing the area on foot.", image: { src: "/media/lahore/image4.webp", alt: "Render of the tower lit at dusk with palm trees" } },
          { t: "Winter", d: "Fog can slow roads in the morning. Allow time to arrive.", image: { src: "/media/lahore/amenities-1-new.webp", alt: "Render of the tower lit in the evening" } },
        ],
      },
      {
        id: "guides",
        kind: "cards",
        h: "More guides",
        cards: [
          { t: "The project: floors and units", d: "What is planned on each level.", href: "/lahore/the-project", cta: "See the floors" },
          { t: "Lahore amenities", d: "Parking, security, business and daily life.", href: "/lahore/amenities", cta: "See the amenities" },
          { t: "Investing guides", d: "How to weigh up a property before you buy.", href: "/insights/investing", cta: "Read the guides" },
        ],
      },
      { id: "ask", kind: "form", h: "Book a site visit or ask a question", d: "Tell us when you would like to come.", form: "visit", about: "a visit to the Lahore site" },
    ],
    pending: ["Exact plot number and map pin", "Whether the published minutes are on foot or by car (the older site also says walking distance to the CBD)", "Season notes are general knowledge, not from a project source", "Source conflict: road named Ferozpur on the map; spelled Ferozepur here"],
  },

  /* ----------------------------------------------------------- progress */
  {
    path: "/lahore/progress",
    side: "invest",
    template: "proof",
    name: "Lahore construction progress",
    title: "Lahore construction progress",
    description: "What is known about construction at Serene Heights Lahore, the stated two-year delivery timeline, and how to ask for dated site records.",
    intro: "Serene Heights Lahore is selling with a stated two-year delivery timeline. We have no dated site films or photographs to show here, so ask us for the latest record.",
    image: { src: "/media/lahore/image11.webp", alt: "Render of the facade at sunset" },
    actions: [{ label: "Ask for an update", href: "/lahore/contact" }, { label: "Book a site visit", href: "/site-visit" }],
    blocks: [
      {
        id: "status",
        kind: "table",
        h: "Status",
        head: ["Item", "Where it stands"],
        rows: [
          ["Sales", "Now selling"],
          ["Approval", "Stated as LDA approved. Ask us for the current copy."],
          ["Delivery", "Two years, as stated by the developers"],
          ["Start of the two years", "Ask us"],
          ["Work on site", "Ask us for a dated report and photographs"],
        ],
      },
      {
        id: "documents",
        kind: "cards",
        h: "Documents",
        d: "Ask for these, with a date on each.",
        cards: [
          { t: "LDA approval", d: "With number and date. Check it with the LDA.", href: "/lahore/contact", cta: "Ask for a copy" },
          { t: "Construction schedule", d: "The start date, stages and delivery date.", href: "/lahore/contact", cta: "Ask for a copy" },
          { t: "Site photographs", d: "Recent and dated.", href: "/lahore/contact", cta: "Ask for a copy" },
          { t: "All documents", d: "What the group can show you today.", href: "/documents", cta: "See the documents" },
        ],
      },
      {
        id: "timeline",
        kind: "timeline",
        h: "Timeline",
        items: [
          { when: "Now", t: "Selling" },
          { when: "Next", t: "Ask for the start date and stages", d: "The developers describe structured milestones. Ask for them in writing." },
          { when: "Delivery", t: "A stated two-year timeline", d: "The date depends on the start and on the work. Check the terms for delay." },
        ],
      },
      {
        id: "who",
        kind: "text",
        h: "Who to ask",
        parts: [
          { p: ["Corporate offices and commercial: 0304-1111106.", "Co-working and hotel apartments: 0321-4979446 or 0300-8497999.", "Email: info@sereneheightslahore.com."] },
        ],
        links: [WA, ENQUIRE],
      },
      { id: "ask", kind: "form", h: "Ask for a document", d: "Say which record you need.", form: "document", about: "Lahore construction progress" },
    ],
    pending: ["Dated site photographs or films", "Construction schedule with start and delivery dates", "Present stage of work", "LDA approval copy"],
  },

  /* ------------------------------------------------------------ contact */
  {
    path: "/lahore/contact",
    side: "invest",
    template: "action",
    name: "Enquire about Lahore",
    title: "Enquire about Lahore",
    description: "Ask about shops, offices, co-working, hotel apartments or smart property at Serene Heights Lahore. Call, message or send your question.",
    intro: "Tell us which floor interests you. The team will send prices, sizes and the payment plan, or arrange a visit.",
    image: { src: "/media/lahore/building-8-new.webp", alt: "Render of the front of the tower" },
    actions: [WA, { label: "Call 0304-1111106", href: "tel:+923041111106" }],
    blocks: [
      {
        id: "form",
        kind: "form",
        h: "Enquire about Lahore",
        d: "Say whether you want commercial, office, co-working, a hotel apartment, smart property or a site visit.",
        form: "enquiry",
        about: "Serene Heights Lahore",
      },
      {
        id: "where",
        kind: "facts",
        h: "Where we are",
        rows: [
          ["Project site", "Gulberg Main Boulevard, Lahore"],
          ["Corporate offices and commercial", "0304-1111106"],
          ["Co-working and hotel apartments", "0321-4979446 and 0300-8497999"],
          ["Group telephone", "042-111-111-744"],
          ["WhatsApp", "+92 300 8497999"],
          ["Email", "info@sereneheightslahore.com"],
          ["Head office", "DM Consortium, H. No. 71 C3, Gulberg III, Park View Lane, Lahore"],
        ],
        links: [{ label: "Open directions", href: MAP }, { label: "Lahore location", href: "/lahore/location" }],
      },
    ],
    pending: ["Office and site visiting hours", "Exact plot number on Main Boulevard", "Confirm which of the three Lahore numbers are current"],
  },
];
