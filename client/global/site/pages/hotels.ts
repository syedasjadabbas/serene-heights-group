// Hotels pages. Facts come from the Nathia Gali site, the Serene Booking inventory (official floor plans) and the
// client's own travel guides. Check-in times, rates and house rules in Serene Booking are placeholders: not used here.
import type { Img, LinkTo, Page } from "../types";

const H = "/hotels/nathia-gali";
const WHATSAPP: LinkTo = { label: "WhatsApp us", href: "https://wa.me/923008497999" };
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=34.0745,73.379";
const REQUEST: LinkTo = { label: "Request your dates", href: `${H}/book` };
const POLICIES: LinkTo = { label: "Read the policies", href: `${H}/policies` };
const ADDRESS = "1.5 km, Kala Bagh Air Base Road, Nathia Gali, Khyber Pakhtunkhwa";

const NOT_OPEN = "The hotel is under construction and has not published an opening date. Send the dates you have in mind and the team will tell you plainly whether they can be hosted.";
const NO_SECOND_PLAN = "Two- and three-bedroom apartments are named on the Nathia Gali site, but every unit on the published floor plans and in the Serene Booking inventory (130 units) is a one-bedroom: confirm they exist, how many, areas, layouts and beds";
const OPENING = "Opening date of the hotel";
const RATES = "Approved nightly rates and seasons (the figures in Serene Booking are placeholders)";
const SHOOT = "Which apartment the interior pictures show, and whether they match the final specification";

const ng = (file: string, alt: string): Img => ({ src: `/media/ng/${file}.webp`, alt });
const stay = (file: string, alt: string): Img => ({ src: `/media/stay/${file}.jpg`, alt });
const room = (file: string, alt: string): Img => ({ src: `/media/interiors/${file}.webp`, alt });

const oneBed: LinkTo = { label: "One-bedroom apartment", href: `${H}/accommodation/one-bedroom` };
const twoBed: LinkTo = { label: "Two-bedroom apartment", href: `${H}/accommodation/two-bedroom` };
const threeBed: LinkTo = { label: "Three-bedroom apartment", href: `${H}/accommodation/three-bedroom` };

const oneCard = {
  t: oneBed.label,
  d: "A bedroom, a sitting room with kitchenette, a bathroom and a balcony or terrace. Printed areas run from 480 to 993 sq ft.",
  href: oneBed.href,
  cta: "See the one-bedroom",
  image: room("bedroom-arch-window", "Guest opening the curtains beside an arched window in an apartment bedroom"),
};
const twoCard = {
  t: twoBed.label,
  d: "Fully furnished, with a second bedroom for family or friends. Ask the team for the layout and area.",
  href: twoBed.href,
  cta: "See the two-bedroom",
  image: room("living-room-wide", "Apartment living room with a curved orange sofa, armchair and green rug"),
};
const threeCard = {
  t: threeBed.label,
  d: "Fully furnished, with three bedrooms for a larger family or group. Ask the team for the layout and area.",
  href: threeBed.href,
  cta: "See the three-bedroom",
  image: room("guests-lounge", "Guests playing cards at a table in an apartment"),
};

const sharedPictures: Img[] = [
  room("living-room-wide", "Living room with a curved orange sofa, armchair and green rug"),
  room("bedroom", "Bed with gold headboard cushions below a lit wall panel"),
  room("kitchenette", "Kitchenette with dark marble splashback and lit shelves"),
  room("dining-nook-arch", "Round dining table by an arched window"),
  room("lounge-art", "Orange sofa beneath two framed artworks"),
  room("sunrise-balcony", "Guest stretching beside the balcony doors at sunrise"),
];

export const hotelPages: Page[] = [
  // ------------------------------------------------------------------ Hub
  {
    path: "/hotels",
    side: "hotel",
    template: "hub",
    name: "Serene Heights Hotels and Resorts",
    title: "Serene Heights Hotels and Resorts",
    description: "Serene Heights hotels: furnished apartments in the pines at Nathia Gali, 7,906 ft up and about two hours from Islamabad. Request your dates.",
    intro: "Our first hotel is at Nathia Gali: furnished apartments in the pines, about two hours' drive from Islamabad. It is being built now. Here is what guests will find, and how to ask about a stay.",
    eyebrow: "Destinations",
    image: ng("tower-forest-mist-xl", "Render of the Serene Heights tower above the pine forest in mist"),
    actions: [{ label: "Get the price list and payment plan", href: "#ask" }],
    blocks: [
      {
        id: "start",
        kind: "cards",
        h: "Start here",
        cards: [
          { t: "The hotel at Nathia Gali", d: "The place, the apartments and the days you can spend there.", href: H, cta: "See the hotel", image: ng("snow-valley", "Render of the tower above a snowy valley") },
          { t: "Accommodation", d: "Furnished apartments with a sitting room and kitchenette.", href: `${H}/accommodation`, cta: "See all apartments", image: room("living-room-sofa", "Living and dining area with a curved orange sofa") },
          { t: "Location and getting here", d: "Roads, drive times and the seasons.", href: `${H}/location`, cta: "Plan the drive", image: ng("snow-street", "Render of the hotel beside the road in snow") },
          { t: "Reservations", d: "Send your dates. A person replies.", href: `${H}/book`, cta: "Request your dates", image: stay("sunset-terrace", "Render of the covered rooftop terrace with dining tables") },
        ],
      },
      {
        id: "facts",
        kind: "facts",
        h: "Key facts",
        rows: [
          ["First destination", "Nathia Gali, Khyber Pakhtunkhwa"],
          ["Height", "7,906 ft above sea level"],
          ["From Islamabad", "80 km, about two hours by road"],
          ["Project size", "Three towers and 150+ apartments on 30+ kanals"],
          ["Status", "Under construction"],
          ["Developed and managed by", "DM Consortium"],
        ],
      },
      {
        id: "check",
        kind: "band",
        h: "What you can check",
        d: "The hotel is not finished, so you should be able to see where it stands.",
        links: [
          { label: "Documents and approvals", href: "/documents" },
          { label: "Construction progress", href: "/nathiagali/progress" },
        ],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions buyers ask",
        links: [{ label: "All questions", href: "/hotels/nathia-gali/faq" }],
        groups: [
          {
            items: [
              { q: "Is the hotel open?", a: "Not yet. The Nathia Gali project is under construction, and no opening date is published on this site." },
              { q: "Can I request dates now?", a: "Yes. A request is not a booking. The team will reply and tell you whether your dates can be hosted." },
              { q: "Who runs the hotel?", a: "DM Consortium, the developer, will manage it as one hotel, including bookings, housekeeping and maintenance." },
              { q: "Can I stay at Serene Heights Lahore?", a: "The Lahore tower is planned to include hotel apartments. It is a separate project, so see the Lahore pages or ask the team for its current position." },
              { q: "Can I own an apartment at the hotel?", a: "Yes. Apartments and 50 sq ft shares are offered for sale. The investing pages explain the payments, the documents and the risks." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "Serene Heights hotels", h: "Get the price list and payment plan", d: "Interested in owning at the hotel? Ask here for the current sheet. For a stay, use Reservations.", links: [REQUEST] },
    ],
    pending: [OPENING, "Confirmed list of hotel destinations and whether Lahore will take guests"],
  },

  // ------------------------------------------------------------------ Hotel home
  {
    path: H,
    side: "hotel",
    template: "hotel-home",
    name: "The hotel at Nathia Gali",
    title: "Serene Heights Nathia Gali",
    description: "Furnished hotel apartments in the pines at 7,906 ft, two hours from Islamabad, with rooftop dining and a heated pool planned. Request your dates.",
    intro: "Furnished apartments in the pines at 7,906 ft, with the valley in front and Islamabad two hours behind you.",
    eyebrow: "Nathia Gali, Khyber Pakhtunkhwa",
    image: ng("tower-forest-mist-xl", "Render of the Serene Heights tower above the pine forest in mist"),
    actions: [REQUEST, { label: "See all apartments", href: `${H}/accommodation` }],
    blocks: [
      {
        id: "intro",
        kind: "text",
        h: "A hotel in the highlands",
        parts: [
          {
            p: [
              "Serene Heights is designed as a winter resort that also works in summer. The building steps down the hillside so that apartments look out over the valley. Windows are double-glazed, floors are heated, and the pool is planned to be heated all year.",
              "You will stay in an apartment rather than a single room: a bedroom, somewhere to sit, a kitchenette, and hotel staff to look after the rest.",
              "The hotel is still being built. The outside and rooftop pictures here are renders of the design.",
            ],
          },
        ],
        links: [{ label: "See construction progress", href: "/nathiagali/progress" }],
      },
      {
        id: "accommodation",
        kind: "cards",
        h: "Apartments with one, two and three bedrooms",
        d: "Every apartment is planned to come fully furnished.",
        cards: [oneCard, twoCard, threeCard],
        links: [{ label: "See all apartments", href: `${H}/accommodation` }],
      },
      {
        id: "experience",
        kind: "panels",
        h: "Time at the hotel",
        items: [
          { t: "Eat on the roof", d: "Breakfast, lunch and dinner are planned at the Coffee, Tea & Company rooftop restaurant.", image: ng("rooftop-dining", "Render of the glass-walled rooftop restaurant"), href: `${H}/dining`, cta: "Dining" },
          { t: "Swim above the forest", d: "A heated infinity pool, with sauna, jacuzzi, steam and massage rooms.", image: stay("aerial-pool-portrait", "Aerial render of the rooftop pool above the trees"), href: `${H}/experiences`, cta: "Experiences" },
          { t: "Play outdoors", d: "Zipline, climbing, archery and an 18-hole mini golf course in the grounds.", image: stay("mini-golf", "Render of the mini golf course beside the pines"), href: `${H}/experiences`, cta: "Experiences" },
          { t: "Walk the Galiyat", d: "Forest paths and summit hikes begin nearby.", image: stay("winter-trails", "Aerial render of a snow trail through the trees"), href: `${H}/things-to-do`, cta: "Things to do" },
        ],
      },
      {
        id: "place",
        kind: "media",
        h: "Nathia Gali",
        t: "Cool in summer, white in winter",
        text: "Nathia Gali is a small hill town in the Galiyat, with pine forest, old churches and a busy bazaar. The hotel is on Kala Bagh Air Base Road, 50 m from PAF Airbase Nathia Gali and 5 km from the main bazaar. Islamabad is 80 km away.",
        image: ng("aerial-clouds", "Aerial render of the hotel among pines and low cloud"),
        links: [{ label: "Getting here", href: `${H}/location` }, { label: "Things to do", href: `${H}/things-to-do` }],
      },
      {
        id: "destinations",
        kind: "band",
        h: "Where Serene Heights takes guests",
        d: "Nathia Gali is our first hotel destination. Others will be listed on the destinations page when they are ready to take requests.",
        links: [{ label: "All destinations", href: "/hotels" }],
      },
      {
        id: "direct",
        kind: "cards",
        h: "Why book with the hotel directly",
        cards: [
          { t: "You talk to us", d: "Your request goes to the Serene Heights team by form, phone or WhatsApp." },
          { t: "A straight answer", d: "We confirm whether your dates, apartment and rate are available before you commit." },
          { t: "Everything in one message", d: "Ask about the apartment, meals, parking or a family need at the same time." },
        ],
        links: [REQUEST, WHATSAPP],
      },
      {
        id: "own",
        kind: "band",
        h: "Own a unit on the same site",
        d: "Some apartments, and 50 sq ft shares of them, are offered for sale. Owners leave the running of the hotel to DM Consortium.",
        links: [{ label: "See how owning works", href: "/invest" }],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Guest questions",
        groups: [
          {
            items: [
              { q: "Is the hotel open?", a: "Not yet. It is under construction and no opening date has been published here." },
              { q: "How far is it from Islamabad?", a: "80 km, about two hours by road in normal conditions. Allow longer on summer weekends and after snow." },
              { q: "Will there be heating?", a: "Yes. The design has central heating, heated floors and backup power." },
              { q: "What does a night cost?", a: "Rates are confirmed when you request your dates." },
            ],
          },
        ],
        links: [{ label: "All guest questions", href: `${H}/faq` }],
      },
    ],
    pending: [OPENING, RATES, "Any direct-booking benefit the hotel will honour (best rate, flexible changes, extras)", NO_SECOND_PLAN],
  },

  // ------------------------------------------------------------------ Accommodation
  {
    path: `${H}/accommodation`,
    side: "hotel",
    template: "accommodation",
    name: "Accommodation",
    title: "Accommodation",
    description: "Compare one-, two- and three-bedroom furnished apartments at Serene Heights Nathia Gali: layouts, sizes and what each apartment includes.",
    intro: "You will stay in a furnished apartment with a place to sleep, sit and make a simple meal. Compare the three types, then ask for your dates.",
    image: room("living-room-wide", "Apartment living room with a curved orange sofa, armchair and green rug"),
    actions: [REQUEST],
    blocks: [
      {
        id: "compare",
        kind: "table",
        h: "The three types side by side",
        d: "The published floor plans show one-bedroom apartments only. The team will send details of the larger types when you ask.",
        head: ["", "One bedroom", "Two bedrooms", "Three bedrooms"],
        rows: [
          ["Bedrooms", "1", "2", "3"],
          ["Furnished", "Fully", "Fully", "Fully"],
          ["Area", "480 to 993 sq ft, as printed on the plans", "Ask us", "Ask us"],
          ["Sitting room", "Yes, with kitchenette", "Ask for the layout", "Ask for the layout"],
          ["Outdoor space", "Balcony, or a terrace on the 8th floor", "Ask for the layout", "Ask for the layout"],
          ["Heated floors", "Yes", "Yes", "Yes"],
          ["Good for", "Couples and small families", "Families and two couples", "Larger families and groups"],
        ],
      },
      { id: "apartments", kind: "cards", h: "Choose an apartment", cards: [oneCard, twoCard, threeCard] },
      {
        id: "every",
        kind: "cards",
        h: "In every apartment",
        d: "Planned for all three types.",
        cards: [
          { t: "Fully furnished", d: "Furniture and fixtures in place, ready for guests." },
          { t: "Warm underfoot", d: "Central heating and heated floors." },
          { t: "Quiet windows", d: "Double-glazed UPVC windows, on a site chosen for its valley views." },
          { t: "Daily housekeeping", d: "With laundry services available." },
          { t: "Room service", d: "From the kitchen of the rooftop restaurant." },
          { t: "Power when you need it", d: "Backup generators, around the clock." },
        ],
      },
      { id: "booking", kind: "booking", h: "Send your dates", d: NOT_OPEN },
      {
        id: "questions",
        kind: "faq",
        h: "Questions about the apartments",
        groups: [
          {
            items: [
              { q: "Is there a kitchen?", a: "The one-bedroom plans show a kitchenette in the sitting room. Ask which appliances and cookware will be provided." },
              { q: "Does every apartment have a balcony?", a: "One-bedroom apartments on the published plans have a balcony. Those on the 8th floor have a private terrace instead." },
              { q: "How many people can stay?", a: "Guest limits and extra beds are confirmed when you send your request. Tell us the number of adults and the ages of any children." },
              { q: "Can I choose my floor or view?", a: "Tell us your preference in the request. The team will say what can be arranged." },
              { q: "Can two apartments be booked side by side?", a: "Ask when you send your dates. Adjoining apartments depend on availability." },
              { q: "Are the pictures of my apartment?", a: "They show the furnishing style. Your apartment may differ in layout, size and detail." },
            ],
          },
        ],
        links: [{ label: "All guest questions", href: `${H}/faq` }],
      },
    ],
    pending: [NO_SECOND_PLAN, RATES, SHOOT, "Guest limits, bed types and extra-bed rules per type (placeholders in Serene Booking)"],
  },

  // ------------------------------------------------------------------ Rooms
  {
    path: `${H}/accommodation/one-bedroom`,
    side: "hotel",
    template: "room",
    name: "One-bedroom apartment",
    title: "One-bedroom apartment",
    description: "A furnished one-bedroom apartment at Serene Heights Nathia Gali: bedroom, sitting room with kitchenette, bathroom and balcony or terrace.",
    intro: "A bedroom, a separate sitting room with a kitchenette, a bathroom and your own balcony. On the 8th floor, the balcony becomes a terrace.",
    image: room("bedroom-arch-window", "Guest opening the curtains beside an arched window in an apartment bedroom"),
    actions: [REQUEST],
    blocks: [
      {
        id: "pictures",
        kind: "pictures",
        h: "Pictures",
        d: "These show the furnishing style. Layouts and details vary between apartments.",
        images: [
          room("bedroom-arch-window", "Bedroom with an arched window and balcony doors"),
          room("living-room-sofa", "Sitting area with a curved orange sofa and dining table"),
          room("kitchenette-evening", "Kitchenette with marble splashback in evening light"),
          room("dining-daylight", "Dining table and cane-back chairs in daylight"),
          room("window-view", "Guest holding a cup at the window"),
          room("sunrise-balcony", "Guest stretching beside the balcony doors at sunrise"),
        ],
      },
      {
        id: "apartment",
        kind: "cards",
        h: "In the apartment",
        cards: [
          { t: "Sleep", d: "A separate bedroom with a double bed on the plan, and a wardrobe. One bathroom." },
          { t: "Sit and eat", d: "A sitting room with a sofa, and a kitchenette for tea, breakfast or a simple supper." },
          { t: "Step outside", d: "A private balcony. Apartments 801 to 820 have a private terrace." },
        ],
      },
      {
        id: "layout",
        kind: "media",
        h: "Layout",
        t: "From 480 to 993 sq ft",
        text: "Published plans show 130 one-bedroom apartments over eight floors. Smaller ones place the sitting room beside the bedroom. On the long sides of the building, the sitting room is by the door and the bedroom opens to the balcony. The plan here is the 3rd floor, which includes the two largest, 315 and 316. Areas are as printed on the plans.",
        image: { src: "/media/floors/3rd.webp", alt: "Third-floor plan showing 22 one-bedroom apartments with their numbers and areas" },
        links: [{ label: "See every floor", href: "/nathiagali/floor-plans" }],
      },
      {
        id: "know",
        kind: "text",
        h: "Good to know",
        parts: [
          {
            p: [NOT_OPEN],
            list: [
              "Central heating, heated floors and double-glazed windows are part of the design.",
              "Daily housekeeping and room service are planned.",
              "Guest limits, bed arrangements and rates are confirmed when you request your dates.",
            ],
          },
        ],
        links: [POLICIES, REQUEST],
      },
      { id: "others", kind: "cards", h: "Other apartments", cards: [twoCard, threeCard] },
    ],
    pending: [RATES, SHOOT, "Guest limit, bed type and sofa bed (placeholders in Serene Booking)", "Areas of 5th-floor apartments 501 to 504; the 4th-floor plan is not published", "Kitchenette appliance list"],
  },
  {
    path: `${H}/accommodation/two-bedroom`,
    side: "hotel",
    template: "room",
    name: "Two-bedroom apartment",
    title: "Two-bedroom apartment",
    description: "A furnished two-bedroom apartment at Serene Heights Nathia Gali for families or friends. Ask for the layout, area and available dates.",
    intro: "Two bedrooms in one furnished apartment, so a family or two couples can share the evening and still close a door at night.",
    image: room("living-room-wide", "Apartment living room with a curved orange sofa, armchair and green rug"),
    actions: [REQUEST],
    blocks: [
      { id: "pictures", kind: "pictures", h: "Pictures", d: "These show the furnishing style at Serene Heights, not a particular two-bedroom apartment.", images: sharedPictures },
      {
        id: "apartment",
        kind: "cards",
        h: "In the apartment",
        cards: [
          { t: "Sleep", d: "Two bedrooms. Ask which beds each one will have." },
          { t: "Live", d: "Fully furnished, so it is ready when you arrive. Ask us for the room-by-room layout." },
          { t: "Keep warm", d: "Central heating, heated floors and double-glazed windows, with backup power." },
        ],
      },
      {
        id: "layout",
        kind: "media",
        h: "Layout",
        t: "Ask us for the plan",
        text: "The floor plans published so far show one-bedroom apartments. Tell us how many of you will travel and we will send what is available for two bedrooms, or suggest neighbouring one-bedroom apartments if that suits you better.",
        image: room("dining-nook-arch", "Round dining table by an arched window"),
        links: [WHATSAPP, { label: "See published floor plans", href: "/nathiagali/floor-plans" }],
      },
      {
        id: "know",
        kind: "text",
        h: "Good to know",
        parts: [{ p: [NOT_OPEN], list: ["Tell us the number of adults and the ages of children.", "Guest limits, extra beds and rates are confirmed when you request your dates.", "If you need step-free access or a quiet position, say so in your request."] }],
        links: [POLICIES, REQUEST],
      },
      { id: "others", kind: "cards", h: "Other apartments", cards: [oneCard, threeCard] },
    ],
    pending: [NO_SECOND_PLAN, RATES, "Pictures and floor plan of a two-bedroom apartment"],
  },
  {
    path: `${H}/accommodation/three-bedroom`,
    side: "hotel",
    template: "room",
    name: "Three-bedroom apartment",
    title: "Three-bedroom apartment",
    description: "A furnished three-bedroom apartment at Serene Heights Nathia Gali for larger families and groups. Ask for the layout, area and available dates.",
    intro: "Three bedrooms in one furnished apartment, for grandparents, children and everyone in between.",
    image: room("guests-lounge", "Guests playing cards at a table in an apartment"),
    actions: [REQUEST],
    blocks: [
      {
        id: "pictures",
        kind: "pictures",
        h: "Pictures",
        d: "These show the furnishing style at Serene Heights, not a particular three-bedroom apartment.",
        images: [
          room("guests-lounge", "Guests playing cards at a table in an apartment"),
          room("living-kitchen-evening", "Living room and kitchenette in evening light"),
          room("bedroom", "Bed with gold headboard cushions below a lit wall panel"),
          room("dining-daylight", "Dining table and cane-back chairs in daylight"),
          room("sofa-detail", "Orange velvet sofa and cushions"),
          room("window-view", "Guest holding a cup at the window"),
        ],
      },
      {
        id: "apartment",
        kind: "cards",
        h: "In the apartment",
        cards: [
          { t: "Sleep", d: "Three bedrooms. Ask which beds each one will have." },
          { t: "Live", d: "Fully furnished, so it is ready when you arrive. Ask us for the room-by-room layout." },
          { t: "Keep warm", d: "Central heating, heated floors and double-glazed windows, with backup power." },
        ],
      },
      {
        id: "layout",
        kind: "media",
        h: "Layout",
        t: "Ask us for the plan",
        text: "The floor plans published so far show one-bedroom apartments. Tell us about your group and we will send what is available for three bedrooms, or suggest a set of apartments close together.",
        image: room("living-kitchen-evening", "Living room and kitchenette in evening light"),
        links: [WHATSAPP, { label: "See published floor plans", href: "/nathiagali/floor-plans" }],
      },
      {
        id: "know",
        kind: "text",
        h: "Good to know",
        parts: [{ p: [NOT_OPEN], list: ["Tell us the number of adults, the ages of children and how many cars you will bring.", "Guest limits, extra beds and rates are confirmed when you request your dates.", "For a larger party, the groups and events page may suit you better."] }],
        links: [POLICIES, { label: "Groups and events", href: `${H}/events` }],
      },
      { id: "others", kind: "cards", h: "Other apartments", cards: [oneCard, twoCard] },
    ],
    pending: [NO_SECOND_PLAN, RATES, "Pictures and floor plan of a three-bedroom apartment"],
  },

  // ------------------------------------------------------------------ Dining
  {
    path: `${H}/dining`,
    side: "hotel",
    template: "hotel-content",
    name: "Dining",
    title: "Dining",
    description: "Rooftop dining at 7,906 ft, a restaurant by the lobby and room service: the dining planned at Serene Heights Nathia Gali.",
    intro: "Meals are planned on the roof, beside the lobby and in your own apartment. Here is what the design includes.",
    image: ng("rooftop-dining", "Render of the glass-walled rooftop restaurant"),
    actions: [REQUEST],
    blocks: [
      {
        id: "panels",
        kind: "panels",
        h: "Eating at the hotel",
        items: [
          { t: "The rooftop restaurant", d: "By Coffee, Tea & Company. Breakfast, lunch and dinner behind glass at 7,906 ft.", image: stay("rooftop-restaurant", "Render of tables in the glass-walled rooftop restaurant") },
          { t: "The terraces", d: "Open and covered seating on the roof, with the forest around it.", image: ng("rooftop-terrace", "Render of planted rooftop terrace with tables and chairs") },
          { t: "The lobby floor", d: "The 5th-floor plan shows a large restaurant next to the hotel lobby.", image: ng("rooftop-lounge", "Render of lounge seating and tables on the roof") },
          { t: "In your apartment", d: "Room service from the rooftop kitchen, or something simple from your kitchenette.", image: room("dining-nook-arch", "Round dining table by an arched window") },
        ],
      },
      {
        id: "know",
        kind: "facts",
        h: "Good to know",
        rows: [
          ["Meals planned", "Breakfast, lunch and dinner"],
          ["Room service", "Yes, from the restaurant kitchen"],
          ["Event catering", "By the rooftop restaurant"],
          ["Menus and hours", "Shared by the hotel before your stay"],
          ["Dietary needs", "Tell us when you send your request"],
          ["Nearby", "Dhabas in the main bazaar, 5 km away, for karahi, chai and roasted corn"],
        ],
        links: [{ label: "Ask a question", href: `${H}/contact` }],
      },
      { id: "booking", kind: "booking", h: "Request your dates", d: NOT_OPEN },
    ],
    pending: ["Menus, opening hours, seating and prices", "Confirm the Coffee, Tea & Company arrangement may be named for guests", "Name and concept of the 5th-floor restaurant", "Halal and dietary statement, breakfast inclusion and price", OPENING],
  },

  // ------------------------------------------------------------------ Experiences
  {
    path: `${H}/experiences`,
    side: "hotel",
    template: "hotel-content",
    name: "Experiences",
    title: "Experiences at the hotel",
    description: "Heated pool, spa, zipline, climbing, archery, mini golf, snow and stargazing: the experiences planned at Serene Heights Nathia Gali.",
    intro: "More than 50 amenities and 15 activities are planned at the resort. These are the ones that will shape your day.",
    image: stay("aerial-rooftop-pool", "Aerial render of the hotel and its rooftop among the trees"),
    actions: [REQUEST, { label: "Things to do in Nathia Gali", href: `${H}/things-to-do` }],
    blocks: [
      {
        id: "panels",
        kind: "panels",
        h: "At the resort",
        items: [
          { t: "The pool", d: "A heated infinity pool with valley views, planned for all year, with lifeguard, loungers and towels.", image: stay("glass-roof-pool", "Aerial render of the rooftop pool and its glass roof") },
          { t: "Spa and gym", d: "Sauna, steam room, jacuzzi, massage rooms and a fully equipped gym.", image: stay("aerial-pool-portrait", "Aerial render of the rooftop pool above the trees") },
          { t: "Snow", d: "A ski slope and winter trails are part of the design.", image: stay("ski-slope", "Render of people on the ski slope beside the tower") },
          { t: "Adventure", d: "A supervised zipline and an outdoor climbing wall, with safety equipment.", image: stay("adventure-park", "Render of the adventure park in the grounds") },
          { t: "Archery and air-gun range", d: "Trained staff and equipment, for one person or a group.", image: stay("archery", "Render of the archery range with three targets") },
          { t: "Mini golf", d: "Eighteen holes set into the landscaping.", image: stay("mini-golf", "Render of the mini golf course beside the pines") },
          { t: "Stargazing", d: "A refractor telescope, for the clear nights of autumn and winter.", image: ng("night-facade", "Render of the hotel front lit at night") },
          { t: "Indoors", d: "A sports room with table tennis, snooker and video games for wet days.", image: room("guests-lounge", "Guests playing cards at a table in an apartment") },
        ],
      },
      {
        id: "know",
        kind: "text",
        h: "Good to know",
        parts: [
          {
            p: ["These are planned facilities. Pictures of them are renders."],
            list: [
              "Age, height and health limits for activities will be given by the hotel.",
              "Opening hours and any charges are confirmed before your stay.",
              "Snow activities depend on snowfall and conditions on the day.",
              "A mosque is planned on site.",
            ],
          },
        ],
        links: [{ label: "Full amenities list", href: "/nathiagali/amenities" }],
      },
      { id: "booking", kind: "booking", h: "Request your dates", d: NOT_OPEN },
    ],
    pending: ["Which experiences will be ready on opening day", "Activity charges, hours, and age and safety limits", "Whether ski equipment or lessons will be offered", OPENING],
  },

  // ------------------------------------------------------------------ Offers
  {
    path: `${H}/offers`,
    side: "hotel",
    template: "hotel-content",
    name: "Rates and offers",
    title: "Rates and offers",
    description: "How rates work at Serene Heights Nathia Gali. Rates are confirmed when you request your dates; ask the team about seasons and longer stays.",
    intro: "Rates are confirmed when you request your dates. We do not publish a price until the hotel has set it.",
    image: stay("tower-sunset-forest", "Render of the tower at sunset above a frosted forest"),
    actions: [REQUEST, WHATSAPP],
    blocks: [
      {
        id: "panels",
        kind: "panels",
        h: "What to tell us",
        items: [
          { t: "Your season", d: "Summer and snow season are the busiest times in Nathia Gali. Spring and autumn are usually quieter.", image: ng("snow-tower", "Render of the tower after snowfall"), href: `${H}/location`, cta: "See the seasons" },
          { t: "Your apartment", d: "Choose one, two or three bedrooms, and tell us how many guests.", image: room("living-room-sofa", "Living and dining area with a curved orange sofa"), href: `${H}/accommodation`, cta: "Compare apartments" },
          { t: "Your reason", d: "A family week, a company retreat or a wedding. We will quote for what you need.", image: ng("sunset-rooftop", "Render of the rooftop terraces at sunset"), href: `${H}/events`, cta: "Groups and events" },
        ],
      },
      {
        id: "know",
        kind: "facts",
        h: "Good to know",
        rows: [
          ["Current offers", "None published. Ask us what applies to your dates"],
          ["Rates", "Confirmed in reply to your request"],
          ["Taxes and breakfast", "Ask us to state whether they are included"],
          ["Payment and cancellation", "Ask for the terms before you confirm"],
          ["Owners and family", "An extended-stay discount is among the owner benefits"],
        ],
        links: [POLICIES, { label: "For owners", href: "/owners" }],
      },
      { id: "booking", kind: "booking", h: "Request your dates", d: NOT_OPEN },
    ],
    pending: [RATES, "Any current offers and their terms", "Tax treatment and what the rate includes", "Approved rate plans (flexible, breakfast, saver are placeholders in Serene Booking)"],
  },

  // ------------------------------------------------------------------ Gallery
  {
    path: `${H}/gallery`,
    side: "hotel",
    template: "gallery",
    name: "Gallery",
    title: "Gallery",
    description: "Pictures of Serene Heights Nathia Gali: renders of the hotel, rooftop, pool and activities, and the furnishing style of the apartments.",
    intro: "Renders show the hotel as designed. The interior pictures show the furnishing style of the apartments.",
    image: ng("snow-aerial-sunset", "Aerial render of the hotel above a frosted forest at sunset"),
    actions: [REQUEST],
    blocks: [
      {
        id: "gallery",
        kind: "gallery",
        h: "Photos by subject",
        images: [
          { ...ng("tower-forest-mist", "Render of the tower above the forest in mist"), subject: "The hotel (renders)" },
          { ...ng("facade-entrance", "Render of the hotel entrance and facade"), subject: "The hotel (renders)" },
          { ...ng("tower-sky", "Render of the tower against a blue sky"), subject: "The hotel (renders)" },
          { ...ng("tower-closeup", "Render of balconies and arched windows on the two wings"), subject: "The hotel (renders)" },
          { ...ng("night-facade", "Render of the hotel front lit at night"), subject: "The hotel (renders)" },
          { ...ng("aerial-clouds", "Aerial render of the hotel among pines and low cloud"), subject: "The hotel (renders)" },
          { ...ng("snow-facade", "Render of the facade with snow on the trees"), subject: "Winter (renders)" },
          { ...ng("snow-street", "Render of the hotel beside the road in snow"), subject: "Winter (renders)" },
          { ...ng("snow-valley", "Render of the tower above a snowy valley"), subject: "Winter (renders)" },
          { ...stay("tower-snow-night", "Render of the tower on a snowy evening"), subject: "Winter (renders)" },
          { ...stay("aerial-snow-resort", "Aerial render of the resort under snow"), subject: "Winter (renders)" },
          { ...ng("rooftop-dining", "Render of the glass-walled rooftop restaurant"), subject: "Rooftop and dining (renders)" },
          { ...ng("rooftop-lounge", "Render of lounge seating and tables on the roof"), subject: "Rooftop and dining (renders)" },
          { ...ng("rooftop-terrace", "Render of the planted rooftop terrace"), subject: "Rooftop and dining (renders)" },
          { ...ng("rooftop-view", "Render of the covered roof terrace and its view"), subject: "Rooftop and dining (renders)" },
          { ...ng("sunset-rooftop", "Render of the rooftop terraces at sunset"), subject: "Rooftop and dining (renders)" },
          { ...stay("glass-roof-pool", "Aerial render of the rooftop pool and its glass roof"), subject: "Pool and activities (renders)" },
          { ...stay("aerial-pool-portrait", "Aerial render of the rooftop pool above the trees"), subject: "Pool and activities (renders)" },
          { ...stay("ski-slope", "Render of people on the ski slope beside the tower"), subject: "Pool and activities (renders)" },
          { ...stay("archery", "Render of the archery range with three targets"), subject: "Pool and activities (renders)" },
          { ...stay("mini-golf", "Render of the mini golf course beside the pines"), subject: "Pool and activities (renders)" },
          { ...stay("adventure-park", "Render of the adventure park in the grounds"), subject: "Pool and activities (renders)" },
          { ...room("living-room-wide", "Living room with a curved orange sofa, armchair and green rug"), subject: "Apartment style" },
          { ...room("bedroom-arch-window", "Bedroom with an arched window and balcony doors"), subject: "Apartment style" },
          { ...room("kitchenette", "Kitchenette with dark marble splashback and lit shelves"), subject: "Apartment style" },
          { ...room("dining-daylight", "Dining table and cane-back chairs in daylight"), subject: "Apartment style" },
          { ...room("lounge-art", "Orange sofa beneath two framed artworks"), subject: "Apartment style" },
          { ...room("sunrise-balcony", "Guest stretching beside the balcony doors at sunrise"), subject: "Apartment style" },
          { ...room("housekeeping", "Uniformed housekeeping team preparing a bedroom"), subject: "Apartment style" },
        ],
      },
    ],
    pending: [SHOOT, "Photographs of the real site and surroundings for guests"],
  },

  // ------------------------------------------------------------------ Location
  {
    path: `${H}/location`,
    side: "hotel",
    template: "location",
    name: "Location and getting here",
    title: "Location and getting here",
    description: "How to reach Serene Heights Nathia Gali: 80 km from Islamabad, 35 km from Abbottabad. Routes, drive times, seasons and winter driving advice.",
    intro: "The hotel is on Kala Bagh Air Base Road in Nathia Gali, 80 km and about two hours by road from Islamabad.",
    image: ng("snow-street", "Render of the hotel beside the road in snow"),
    actions: [{ label: "Open directions", href: DIRECTIONS }, REQUEST],
    blocks: [
      {
        id: "facts",
        kind: "facts",
        h: "Distances and height",
        d: "By road from the hotel. Times are for normal conditions.",
        rows: [
          ["Height", "7,906 ft above sea level"],
          ["PAF Airbase Nathia Gali", "50 m"],
          ["Main Nathia Gali Road", "1.5 km, 3 minutes"],
          ["Hotel Elites Nathia Gali", "3 km, 6 minutes"],
          ["Main bazaar", "5 km, 10 minutes"],
          ["Abbottabad city centre", "35 km, 50 minutes"],
          ["Islamabad", "80 km, 2 hours"],
        ],
      },
      { id: "map", kind: "map", h: "On the map", d: ADDRESS, href: DIRECTIONS, links: [{ label: "Open directions", href: DIRECTIONS }] },
      {
        id: "there",
        kind: "text",
        h: "Getting there",
        parts: [
          { h: "Through Murree", p: ["Take the Islamabad-Murree Expressway, then the hill road past Bhurban and Changla Gali. It is the usual route from Islamabad, and the last stretch is narrow and winding. Fill up with petrol by Murree."] },
          { h: "Through Abbottabad", p: ["Take the Hazara Expressway to Havelian and Abbottabad, then climb to Nathia Gali. It is longer from Islamabad, at around 105 to 115 km, but can be easier when the Murree road is busy."] },
          { h: "When to set off", p: ["On summer weekends the drive can take three hours or more. Leave early in the morning, or travel on a weekday. In winter, drive in daylight and check the road before you go."] },
          { h: "What to carry", list: ["A warm layer in every season", "Cash, as there are few ATMs", "Offline maps, as signal varies", "Snow chains in winter, which are sometimes required"] },
          { h: "Parking", p: ["The design includes a covered parking floor for the hotel."] },
        ],
      },
      {
        id: "seasons",
        kind: "cards",
        h: "The seasons",
        cards: [
          { t: "Spring", meta: "March to May", d: "March can still bring snow or rain. By May the days are mild and the wildflowers are out.", image: ng("rooftop-terrace", "Render of the planted rooftop terrace in sun") },
          { t: "Summer", meta: "June to August", d: "Days of around 20 to 25°C and cool evenings. July and August bring afternoon rain.", image: ng("aerial-pool", "Aerial render of the rooftop pool above green forest") },
          { t: "Autumn", meta: "September to November", d: "Clear skies, colour in the trees and good walking, with October often the best.", image: ng("sunset-rooftop", "Render of the rooftop terraces at sunset") },
          { t: "Winter", meta: "December to February", d: "Snow, quiet paths and nights below freezing. Roads can close or slow after a fall.", image: ng("snow-valley", "Render of the tower above a snowy valley") },
        ],
      },
      {
        id: "guides",
        kind: "cards",
        h: "More guides",
        cards: [
          { t: "Things to do in Nathia Gali", d: "Walks, views and the bazaar.", href: `${H}/things-to-do`, cta: "Read" },
          { t: "Nathia Gali travel guides", d: "Longer reading for your trip.", href: "/insights/nathia-gali", cta: "Read" },
          { t: "Experiences at the hotel", d: "What to do without leaving the resort.", href: `${H}/experiences`, cta: "See" },
        ],
      },
      { id: "ask", kind: "form", form: "visit", about: "getting to the hotel at Nathia Gali", h: "Book a site visit or ask a question" },
    ],
    pending: ["Exact map pin (34.0745, 73.379 is from the older Nathia Gali site)", "Conflict: one travel guide puts the hotel 1.5 km from the main bazaar; the Nathia Gali site says 1.5 km from the main road and 5 km from the bazaar (used here)", "Transfers or airport pick-up, if the hotel will offer them"],
  },
  {
    path: `${H}/things-to-do`,
    side: "hotel",
    template: "location",
    name: "Things to do in Nathia Gali",
    title: "Things to do in Nathia Gali",
    description: "The Pipeline Track, Mukshpuri, Miranjani, Ayubia National Park, the old church and the bazaar: what to do in and around Nathia Gali.",
    intro: "Walk a level forest path, climb a summit, visit the old church or eat roasted corn in the bazaar. Two nights is enough to start; three lets you slow down.",
    image: stay("winter-trails", "Aerial render of a snow trail through the trees"),
    actions: [{ label: "See the hotel", href: H }, REQUEST],
    blocks: [
      {
        id: "best",
        kind: "cards",
        h: "Five places to start",
        cards: [
          { t: "The Pipeline Track", meta: "Easy", d: "A shaded, almost level path of about 4 km from Dunga Gali to Ayubia. Good for children and older walkers. Allow 45 to 90 minutes one way." },
          { t: "Mukshpuri Top", meta: "Moderate", d: "A climb of two to two and a half hours from Dunga Gali to an open meadow with views all round." },
          { t: "Miranjani", meta: "Moderate to hard", d: "Two to three hours up through pine and fir. Start before 9 am, wear boots and ask locally whether a forest permit is needed." },
          { t: "Ayubia National Park", meta: "Half a day", d: "About 8 km from Nathia Gali. Forest, birdlife and a chairlift that runs seasonally. Check that it is working first." },
          { t: "St Matthew's Church", meta: "Half an hour", d: "A late 19th-century church, still in use, and lovely after snow." },
        ],
      },
      {
        id: "facts",
        kind: "facts",
        h: "Distances and height",
        rows: [
          ["The hotel's height", "7,906 ft above sea level"],
          ["Hotel to the main bazaar", "5 km, 10 minutes by car"],
          ["Nathia Gali to Ayubia", "About 8 km, 12 to 15 minutes by car"],
          ["Pipeline Track", "About 4 km one way"],
          ["Hotel to Abbottabad", "35 km, 50 minutes by car"],
        ],
      },
      { id: "map", kind: "map", h: "On the map", d: "Start from the hotel on Kala Bagh Air Base Road.", href: DIRECTIONS, links: [{ label: "Open directions", href: DIRECTIONS }] },
      {
        id: "there",
        kind: "text",
        h: "Getting there",
        parts: [
          { h: "Reaching the walks", p: ["Dunga Gali is a short drive south of Nathia Gali, and is the start for the Pipeline Track and Mukshpuri. The Miranjani path starts near the Governor's House."] },
          { h: "The bazaar", p: ["Shops sell local honey, dried fruit and handicrafts. Dhabas cook fresh karahi. Places close earlier than in the city, often by 9 or 10 pm."] },
          { h: "Before you walk", list: ["Wear ankle-supporting boots on the summits", "Carry at least 1.5 litres of water each", "From July to September, walk in the morning before the rain", "Bring a layer and sun cream"] },
          { h: "On a wet or snowy day", p: ["The resort is planned with a sports room, spa, heated pool and rooftop restaurant, so a bad-weather day need not be wasted."] },
        ],
        links: [{ label: "Experiences at the hotel", href: `${H}/experiences` }],
      },
      {
        id: "seasons",
        kind: "cards",
        h: "The seasons",
        cards: [
          { t: "Spring", meta: "March to May", d: "Trails open again and flowers return. May is the steadiest month.", image: ng("aerial-clouds", "Aerial render of the hotel among pines and low cloud") },
          { t: "Summer", meta: "June to August", d: "Cool mornings for walking, then rain in the afternoon from July.", image: stay("mini-golf", "Render of the mini golf course beside the pines") },
          { t: "Autumn", meta: "September to November", d: "The clearest views from Mukshpuri, and good stargazing from October.", image: stay("rooftop-sunset", "Render of the rooftop terraces at sunset") },
          { t: "Winter", meta: "December to February", d: "Snow walks and clear nights. High trails need care and local advice.", image: ng("snow-facade", "Render of the facade with snow on the trees") },
        ],
      },
      {
        id: "guides",
        kind: "cards",
        h: "More guides",
        cards: [
          { t: "Location and getting here", d: "Routes, drive times and winter roads.", href: `${H}/location`, cta: "Read" },
          { t: "Nathia Gali travel guides", d: "Longer reading for your trip.", href: "/insights/nathia-gali", cta: "Read" },
          { t: "Accommodation", d: "Compare the apartments.", href: `${H}/accommodation`, cta: "See" },
        ],
      },
      { id: "ask", kind: "form", form: "visit", about: "things to do in Nathia Gali", h: "Book a site visit or ask a question" },
    ],
    pending: ["Photographs of the walks and landmarks (only project renders are available)", "The travel guides call Miranjani the highest point of the Galiyat at 9,160 ft but give Mukshpuri 9,232 ft, so no heights are stated", "Dunga Gali is given as both 4 km and 5 km from Nathia Gali, so no figure is stated"],
  },

  // ------------------------------------------------------------------ Events
  {
    path: `${H}/events`,
    side: "hotel",
    template: "hotel-content",
    name: "Groups and events",
    title: "Groups and events",
    description: "A banquet hall, two conference rooms, a lawn and a rooftop: spaces planned for weddings, retreats and meetings at Serene Heights Nathia Gali.",
    intro: "Weddings, company retreats and family gatherings, with the guests' apartments upstairs. These are the spaces in the design.",
    image: ng("sunset-rooftop", "Render of the rooftop terraces at sunset"),
    actions: [{ label: "Ask about an event", href: `${H}/contact` }, WHATSAPP],
    blocks: [
      {
        id: "panels",
        kind: "panels",
        h: "The spaces",
        items: [
          { t: "Banquet hall", d: "A large ground-floor hall for celebrations and company functions, catered by the rooftop restaurant.", image: { src: "/media/floors/ground.webp", alt: "Ground-floor plan showing the banquet hall and two conference rooms" } },
          { t: "Conference rooms", d: "Two ground-floor rooms, each drawn around a long table, with climate control.", image: { src: "/media/floors/ground.webp", alt: "Ground-floor plan with two conference rooms beside the lift lobby" } },
          { t: "The lawn", d: "Outdoor space for ceremonies and gatherings.", image: stay("adventure-park", "Render of the landscaped grounds") },
          { t: "The rooftop", d: "Restaurant and terraces above the forest.", image: ng("rooftop-view", "Render of the covered roof terrace and its view") },
          { t: "Business centre", d: "Wi-Fi, printing and workspace for meetings.", image: ng("facade-entrance", "Render of the hotel entrance and facade") },
        ],
      },
      {
        id: "know",
        kind: "facts",
        h: "Good to know",
        rows: [
          ["Guest numbers", "Tell us yours. Room capacities are confirmed with your quote"],
          ["Staying over", "Ask for a group of apartments on the same dates"],
          ["Catering", "By the rooftop restaurant"],
          ["Team activities", "Archery, zipline, climbing and mini golf are planned on site"],
          ["Parking", "A dedicated parking floor is planned"],
          ["Prices", "Quoted for your date and numbers"],
        ],
      },
      { id: "booking", kind: "booking", h: "Request your dates", d: NOT_OPEN },
    ],
    pending: ["Capacities and areas of the banquet hall, conference rooms, lawn and rooftop", "Event packages, prices and music or timing rules", "Conflict: the Nathia Gali site lists one conference room; the ground-floor plan and Serene Booking show two (two used here)", OPENING],
  },

  // ------------------------------------------------------------------ Policies
  {
    path: `${H}/policies`,
    side: "hotel",
    template: "plain",
    name: "Policies",
    title: "Hotel policies",
    description: "What to check before you stay at Serene Heights Nathia Gali: arrival, payment, cancellation, children, pets, smoking and identification.",
    intro: "The hotel has not published its final house rules. Until it does, the terms that apply to you are the ones in your written confirmation.",
    blocks: [
      {
        id: "text",
        kind: "text",
        h: "Before you confirm",
        d: "Ask the team to put these points in writing. This page will carry the hotel's rules once they are approved.",
        parts: [
          { h: "A request is not a booking", p: ["Sending dates does not reserve an apartment. A stay is agreed only when the team confirms it."] },
          { h: "Arrival and departure", p: ["Check-in and check-out times will be in your confirmation. The front desk is planned to be staffed around the clock, with luggage storage."] },
          { h: "Rates and payment", p: ["Ask what the rate includes, whether taxes are added, and how and when you pay."] },
          { h: "Changes and cancellation", p: ["Ask for the last date you can cancel or change without a charge, and how any refund is made."] },
          { h: "Guests and identification", p: ["Ask which identification each guest must bring, how many people may stay, and the rules for children and extra beds."] },
          { h: "Smoking, pets and visitors", p: ["Check with the team before you travel. Do not assume that any of these is allowed."] },
          { h: "Snow and road closures", p: ["Mountain roads can slow or close. Ask what happens to your stay if you cannot reach the hotel."] },
          { h: "Your information", p: ["Details you send with a request are covered by our privacy policy."] },
        ],
        links: [{ label: "Privacy policy", href: "/privacy-policy" }],
      },
      { id: "next", kind: "band", h: "Where next", links: [REQUEST, { label: "Guest questions", href: `${H}/faq` }, { label: "Contact the hotel", href: `${H}/contact` }] },
    ],
    pending: ["Approved house rules: check-in and check-out, payment, deposit, cancellation and no-show, children, extra beds, pets, smoking, identification, visitors, damage and weather closures (those in Serene Booking are marked placeholders)"],
  },

  // ------------------------------------------------------------------ FAQ
  {
    path: `${H}/faq`,
    side: "hotel",
    template: "questions",
    name: "Guest questions",
    title: "Guest questions",
    description: "Answers for guests of Serene Heights Nathia Gali: opening, bookings, apartments, food, heating, parking, the drive and snow.",
    intro: "Short answers to what guests ask us most. If yours is missing, send it and a person will reply.",
    actions: [REQUEST, WHATSAPP],
    blocks: [
      {
        id: "questions",
        kind: "faq",
        h: "Questions by subject",
        groups: [
          {
            subject: "Booking",
            items: [
              { q: "Is the hotel open?", a: "Not yet. It is under construction. No opening date is published here." },
              { q: "How do I request a stay?", a: "Send your dates and number of guests on the reservations page, or message +92 300 8497999 on WhatsApp. The team confirms what is possible." },
              { q: "How much is a night?", a: "Rates are confirmed when you request your dates. They depend on the apartment and the season." },
              { q: "What are the cancellation terms?", a: "They will be in your confirmation. Ask for them before you agree to a stay." },
            ],
          },
          {
            subject: "The apartments",
            items: [
              { q: "What will my apartment have?", a: "It is planned to be fully furnished. One-bedroom apartments have a separate sitting room with a kitchenette, a bathroom and a balcony or terrace." },
              { q: "Will it be warm in winter?", a: "The design has central heating, heated floors, double-glazed windows and backup power." },
              { q: "Will there be Wi-Fi?", a: "High-speed Wi-Fi is planned." },
            ],
          },
          {
            subject: "At the hotel",
            items: [
              { q: "Can I eat at the hotel?", a: "Yes, as planned. The rooftop restaurant is to serve breakfast, lunch and dinner, with room service." },
              { q: "Is the pool heated?", a: "The infinity pool is designed to be heated and used all year." },
              { q: "Is it good for children?", a: "Mini golf, a sports room and outdoor activities are planned. Ask about rules for children's stays and activity age limits." },
              { q: "Is there a mosque?", a: "Yes, a prayer facility is planned on site." },
              { q: "Is there parking?", a: "A dedicated, climate-controlled parking floor is planned." },
            ],
          },
          {
            subject: "Getting here",
            items: [
              { q: "How long is the drive from Islamabad?", a: "80 km and about two hours in normal conditions. Allow longer on summer weekends and after snow." },
              { q: "When does it snow?", a: "Snow is most likely from December to February, and can fall in November or March." },
              { q: "Do I need snow chains?", a: "Carry them in winter. They are sometimes required on the Galiyat roads after heavy snow." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", form: "question", about: "a stay at Nathia Gali", h: "Ask your question" },
    ],
    pending: [OPENING, RATES, "Approved policies, accessibility details, and children and activity rules"],
  },

  // ------------------------------------------------------------------ Contact and booking
  {
    path: `${H}/contact`,
    side: "hotel",
    template: "action",
    name: "Contact the hotel",
    title: "Contact the hotel",
    description: "Contact Serene Heights Nathia Gali: call 042-111-111-744, WhatsApp +92 300 8497999, or send a message about a stay, a group or an event.",
    intro: "Ask about a stay, a group or an event. Call, send a WhatsApp message or write here.",
    actions: [WHATSAPP, { label: "Call 042-111-111-744", href: "tel:+9242111111744" }],
    blocks: [
      { id: "form", kind: "form", form: "question", about: "the hotel at Nathia Gali", h: "Contact the hotel" },
      {
        id: "where",
        kind: "facts",
        h: "Where the hotel is",
        rows: [
          ["Hotel", ADDRESS],
          ["Phone", "042-111-111-744"],
          ["WhatsApp", "+92 300 8497999"],
          ["Email", "info@sereneheightsnathiagali.com"],
          ["Head office", "DM Consortium, H. No. 71 C3, Gulberg III, Park View Lane, Lahore"],
        ],
        links: [{ label: "Open directions", href: DIRECTIONS }, { label: "Location and getting here", href: `${H}/location` }],
      },
    ],
    pending: ["A direct hotel reception number and email", "Conflict: the Nathia Gali site shows sereneheightsnathiagali@gmail.com and WhatsApp +92 321 4979447; the group's confirmed WhatsApp and info@ address are used here", "Hours when calls and messages are answered"],
  },
  {
    path: `${H}/book`,
    side: "hotel",
    template: "action",
    name: "Reservations",
    title: "Reservations",
    description: "Request dates at Serene Heights Nathia Gali. Tell us when, how many guests and which apartment; the team replies to confirm what is possible.",
    intro: "Tell us when you would like to come and who is travelling. This is a request: the team replies to confirm what is possible.",
    image: ng("snow-tower", "Render of the tower after snowfall"),
    actions: [WHATSAPP],
    blocks: [
      { id: "form", kind: "form", form: "stay", about: "a stay at Nathia Gali", h: "Reservations", d: NOT_OPEN },
      {
        id: "after",
        kind: "text",
        h: "What happens next",
        parts: [{ list: ["The team reads your request and replies.", "They tell you whether the dates and apartment are available, and the rate.", "Nothing is reserved until you have a written confirmation.", "Read the policies and terms in it before you agree."] }],
        links: [POLICIES],
      },
      {
        id: "where",
        kind: "facts",
        h: "Where the hotel is",
        rows: [
          ["Address", ADDRESS],
          ["From Islamabad", "80 km, about two hours by road"],
          ["Phone", "042-111-111-744"],
          ["WhatsApp", "+92 300 8497999"],
        ],
        links: [{ label: "Open directions", href: DIRECTIONS }],
      },
    ],
    pending: [OPENING, RATES, "Live booking address (NEXT_PUBLIC_BOOKING_URL) once Serene Booking is ready", "Reply time the team can commit to"],
  },
];
