import type { Block, Page } from "../types";

const H = "/hotels/nathia-gali";
const AUTHOR = { author: "Serene Heights", authorSlug: "serene-heights" };

const hotelBand: Block = {
  id: "onward",
  kind: "band",
  h: "Stay at the hotel at Nathia Gali",
  d: "Serene Heights Nathia Gali is under construction. See the planned apartments and facilities, and ask the team when stays can be requested.",
  links: [{ label: "See the hotel", href: H }],
};

const investBand: Block = {
  id: "onward",
  kind: "band",
  h: "Own with us",
  d: "Read how ownership works, what it costs and what is not guaranteed before you decide.",
  links: [{ label: "Investing with Serene Heights", href: "/invest" }],
};

const moreGuides = (category: "investing" | "nathia-gali" | "updates"): Block => ({ id: "more", kind: "listing", h: "More guides", category });

export const insightPages: Page[] = [
  {
    path: "/insights",
    side: "both",
    template: "listing",
    name: "Insights",
    title: "Insights from Serene Heights",
    description: "Plain guides to buying a hotel apartment, travelling to Nathia Gali and following progress at Serene Heights.",
    intro: "Guides for buyers, guides for travellers and news from our projects. Each one starts with the answer and says what you should still check for yourself.",
    blocks: [
      { id: "items", kind: "listing", h: "Newest first" },
    ],
  },
  {
    path: "/insights/investing",
    side: "invest",
    template: "listing",
    name: "Investing guides",
    title: "Investing guides",
    description: "How to read a payment plan, check a furnishing list, plan a site visit and ask the right questions about a hotel apartment.",
    intro: "Practical guides for anyone thinking of buying a hotel apartment. They explain what to ask and what to get in writing. They are general information, not financial or legal advice.",
    blocks: [{ id: "items", kind: "listing", h: "Newest first", category: "investing" }],
  },
  {
    path: "/insights/nathia-gali",
    side: "hotel",
    template: "listing",
    name: "Nathia Gali travel guides",
    title: "Nathia Gali travel guides",
    description: "Guides to the drive from Islamabad, snowfall, the Pipeline Track, Ayubia and a weekend in Nathia Gali.",
    intro: "How to get to Nathia Gali, when to come and what to do once you are there. Roads, fees and opening times in the hills change, so check on the day.",
    blocks: [{ id: "items", kind: "listing", h: "Newest first", category: "nathia-gali" }],
  },
  {
    path: "/insights/updates",
    side: "both",
    template: "listing",
    name: "Project updates",
    title: "Project updates",
    description: "Published news from Serene Heights projects, including the construction videos from the Nathia Gali site.",
    intro: "What we have published about work on our projects. For the full record, see the construction progress pages.",
    blocks: [
      {
        id: "items",
        kind: "listing",
        h: "Newest first",
        category: "updates",
        links: [
          { label: "Nathia Gali progress", href: "/nathiagali/progress" },
          { label: "Lahore progress", href: "/lahore/progress" },
        ],
      },
    ],
  },
  {
    path: "/insights/authors/serene-heights",
    side: "both",
    template: "listing",
    name: "Author",
    title: "Serene Heights",
    description: "Guides and updates written by the Serene Heights team.",
    intro: "Articles by the Serene Heights team. We are the developer's own team, so our investing guides are written by a seller. Please check what matters to you with your own lawyer or adviser.",
    blocks: [{ id: "items", kind: "listing", h: "Newest first", author: "serene-heights" }],
    pending: ["Names, roles and photographs of individual article authors, if the client wants bylines"],
  },

  // Investing articles
  {
    path: "/insights/site-visit-checklist",
    side: "invest",
    template: "article",
    name: "What to check during a site visit",
    title: "What to check during a Serene Heights site visit",
    description: "What to prepare, what to look at on site, what to ask and which documents to request when you visit Serene Heights Nathia Gali.",
    intro: "A site visit lets you compare what you have been told with what is there. Read the latest progress update first, take your questions, and ask for documents before you leave.",
    image: { src: "/media/ng/facade-entrance.webp", alt: "Render of the planned Serene Heights Nathia Gali entrance and facade" },
    article: { date: "2026-10-11", category: "investing", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "What to check, from arrival to follow-up",
        parts: [
          {
            h: "Before you go",
            p: [
              "Look at the newest construction video so that you know what to expect. If you have already booked, bring your booking form, allotment letter and payment schedule.",
              "Arrange the visit with the team. It is an active construction site, so please do not arrive unannounced. Wear closed shoes. The site is about 80 km and two hours by road from Islamabad, and weekends can be slower.",
            ],
          },
          {
            h: "What to look at",
            list: [
              "Structure: how far the columns and slabs have reached on each tower.",
              "Walls and outside: whether blockwork, windows or facing have begun.",
              "Inside: pipes, wiring and any finished samples.",
              "Shared areas: the state of the lobby, pool and other facilities.",
              "People: how much work is going on while you are there.",
              "Surroundings: the road, the neighbouring land and the view from the likely position of your unit.",
            ],
            p: ["You do not need to be an engineer. You are checking whether what you see fits what has been reported. For a technical opinion, bring an independent engineer."],
          },
          {
            h: "What to ask",
            list: [
              "What stage is each tower at today, and what comes next?",
              "Is anything behind schedule, and what is the plan?",
              "Who will run the hotel, and when is it expected to take guests?",
              "How will owners' income be worked out and reported?",
              "How will owners reserve their own stays?",
              "Which completed work by DM Consortium can I see?",
              "Who do I contact with a concern before possession?",
            ],
          },
          {
            h: "Documents to request",
            list: ["Approvals and permits now in place", "The current timeline and possession estimate", "The written specification for your unit type", "The draft agreements", "Written confirmation of your unit, floor and tower"],
          },
          {
            h: "What a visit cannot tell you",
            p: [
              "Seeing a building does not confirm the contract, the developer's finances or any income projection. Those are checked on paper. Ask a lawyer to read the agreements before you sign.",
              "If something did not match, or a question went unanswered, put it to the team in writing and wait for the reply before you pay more.",
            ],
          },
        ],
        links: [
          { label: "Book a site visit", href: "/site-visit" },
          { label: "Construction progress", href: "/nathiagali/progress" },
        ],
      },
      investBand,
      moreGuides("investing"),
    ],
  },
  {
    path: "/insights/what-a-furnished-hotel-apartment-includes",
    side: "invest",
    template: "article",
    name: "What a furnished hotel apartment includes",
    title: "What is included in a furnished hotel apartment?",
    description: "What \"fully furnished\" can mean in a hotel apartment, why the written specification matters more than images, and what to inspect.",
    intro: "Only what is written in your agreement is included. Serene Heights Nathia Gali offers fully furnished one-, two- and three-bedroom apartments, so ask for the specification of your type before you book.",
    image: { src: "/media/interiors/living-room-wide.webp", alt: "Living room with an orange curved sofa, green rug and dining table" },
    article: { date: "2026-10-09", category: "investing", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "What to ask, room by room",
        parts: [
          {
            h: "Why a hotel apartment is different",
            p: ["A holiday home is furnished to its owner's taste. A hotel apartment is furnished so that guests find the same standard in every unit. That can limit how far you may change it, so ask about changes before you book if they matter to you."],
          },
          {
            h: "Five things to check",
            list: [
              "Finishes: floors, walls, ceilings, windows and doors. Ask whether the glazing is single or double.",
              "Bathroom and kitchen: sanitaryware, taps, cabinets, worktops and hob.",
              "Furniture: beds, mattresses, wardrobes, sofa, table and any balcony furniture.",
              "Appliances and climate: fridge, oven, television, heating and cooling. Nathia Gali falls below freezing in winter, so ask how the apartment is heated.",
              "Linen and small items: towels, bedding and kitchenware. In many hotels these belong to the operator. Ask who owns and replaces them here.",
            ],
          },
          {
            h: "Images are not the specification",
            p: [
              "Renders and styled pictures show the intended design. They are not a list of what you will receive. The specification should name each item, its brand or grade, and whether you own it or the operator supplies it.",
              "Ask what happens if an item is replaced with an equivalent during construction. A change should be notified to you in writing, and the agreement should say so.",
            ],
          },
          {
            h: "Inspect before you accept the keys",
            p: ["Ask for the right to inspect the finished apartment, often called snagging. Walk through it with the specification in your hand."],
            list: [
              "Test every appliance, tap, shower, socket and light.",
              "Open and lock every door and window.",
              "Run the heating and cooling.",
              "Look for cracked tiles, uneven plaster and scratches.",
              "Check the balcony and its railing.",
              "Photograph what you find, and have the list signed and dated with a time for repair.",
            ],
          },
          {
            h: "If you buy a Smart Property Unit",
            p: ["A Smart Property Unit is a 50 sq ft share of an apartment rather than a whole one. Ask how the furniture is owned, and how any inspection works for people who own a share."],
          },
        ],
        links: [
          { label: "See the apartments", href: "/nathiagali/apartments" },
          { label: "Floor plans", href: "/nathiagali/floor-plans" },
        ],
      },
      investBand,
      moreGuides("investing"),
    ],
    pending: ["Written finish and furniture specification for each apartment type, including who owns linen and loose furniture"],
  },
  {
    path: "/insights/how-to-compare-payment-plans",
    side: "invest",
    template: "article",
    name: "How to compare payment plans",
    title: "How to compare two hotel apartment payment plans",
    description: "Compare total cost, dates, extra charges, missed payments and what you own at each stage, not just the monthly instalment.",
    intro: "Compare the total you will pay and the terms if something goes wrong. The monthly amount alone tells you very little.",
    image: { src: "/media/ng/tower-closeup.webp", alt: "Render of the upper floors and balconies at Serene Heights Nathia Gali" },
    article: { date: "2026-10-06", category: "investing", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "Five steps",
        parts: [
          {
            h: "1. Add up everything",
            p: ["Add the booking payment, every instalment, any payment at possession, and every separate charge. Use the same list for both plans. Ask whether the booking payment counts towards the price."],
          },
          {
            h: "2. Put the dates on a calendar",
            p: ["Two plans with the same total can ask for money at different times. Some are equal monthly payments. Some hold back a large amount for possession. Others follow stages of construction. Write down each date and check that you can meet the largest one."],
          },
          {
            h: "3. Look for charges that change the price",
            list: ["Can the price rise during construction, and by how much?", "Are development, utility, tax or registration costs extra?", "What does a late payment cost?", "What is the fee for transferring a booking?", "Is there a charge if you take possession late?"],
          },
          {
            h: "4. Read the difficult clauses",
            p: ["How many days do you have to put right a missed payment? How much is kept if the booking is cancelled? What is refunded if you choose to leave? Ask yourself what would happen if your income stopped for three months."],
          },
          {
            h: "5. Ask what you hold at each stage",
            p: ["A booking form, an allotment letter, an agreement and a registered title are different things. Ask which you receive, and when. Have a lawyer check the answer against the papers."],
          },
          {
            h: "The published Serene Heights figures",
            p: [
              "For Nathia Gali, the published base price for apartments is PKR 40,000 per sq ft, from 30% at booking with the rest over 36 monthly instalments. A 50 sq ft Smart Property Unit is published at PKR 2,250,000: PKR 675,000 down and 36 instalments of PKR 43,750. Confirm the current price before you pay anything.",
              "Those figures are the starting point. Ask for the complete schedule with its dates, every other charge, and the late payment, cancellation and transfer terms in writing.",
            ],
          },
          {
            h: "If the totals are equal",
            p: ["Give weight to the terms, the timing and the developer's completed work. A shorter plan is not always better, and a lower instalment is not always cheaper."],
          },
        ],
        links: [
          { label: "See the payment plan", href: "/nathiagali/payment-plan" },
          { label: "Risks and exit", href: "/invest/risks-and-exit" },
        ],
      },
      investBand,
      moreGuides("investing"),
    ],
    pending: [
      "Full term sheet for Nathia Gali: instalment dates, other charges, late payment, cancellation, refund and transfer terms",
      "Price check: the 50 sq ft Smart Property Unit works out at PKR 45,000 per sq ft against the PKR 40,000 base price; confirm both. site.ts also says \"from PKR 2 million\" for the same unit",
    ],
  },
  {
    path: "/insights/how-hotel-apartment-ownership-works",
    side: "invest",
    template: "article",
    name: "How hotel apartment ownership works",
    title: "Hotel apartment ownership: owner stays, income and management",
    description: "How a managed hotel apartment differs from a rented flat, what income depends on, and the questions to ask before you buy.",
    intro: "You own an apartment or a share of one, and a hotel operator lets it to guests. Your income depends on those guests, so it can rise, fall or stop. It is not a fixed rent.",
    image: { src: "/media/ng/aerial-clouds.webp", alt: "Render of the Serene Heights Nathia Gali towers above pine forest, seen from the air" },
    article: { date: "2026-09-14", category: "investing", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "How it works, and what to ask",
        parts: [
          {
            h: "Who does what",
            p: ["In a managed hotel, the operator takes bookings, looks after guests, cleans and maintains the rooms, and reports the results. At Serene Heights Nathia Gali, DM Consortium is to manage the hotel apartments as one hotel once the building is ready. It is still under construction."],
          },
          {
            h: "What income depends on",
            list: [
              "How many nights are sold",
              "The price of each night, which changes with the season",
              "How well the hotel is run and how guests rate it",
              "The costs taken off before anything is shared",
              "The method of sharing set out in your agreement",
            ],
            p: ["The published Nathia Gali model is a share of hotel profit, distributed quarterly. A share of profit is not a promise of profit. Any return figure you are shown is the developer's projection and is not guaranteed."],
          },
          {
            h: "Your unit, or a pool?",
            p: ["Some hotels pay each owner for their own unit's bookings. Others put all the income together and divide it by area or by unit. Pooling evens out the differences between units. Ask which one applies to you, and ask to see a sample statement with each deduction."],
          },
          {
            h: "Staying in it yourself",
            p: ["The published benefits for Nathia Gali apartment owners include 28 free nights a year. Ask for the conditions in writing."],
            list: ["Are there dates you cannot use, such as Eid or the snow season?", "How early must you ask?", "Can family stay without you?", "Does your stay reduce your income?", "When does the benefit begin?"],
          },
          {
            h: "Costs",
            p: ["Serene Heights says Nathia Gali owners pay no maintenance fee. Ask which costs are taken from hotel revenue before profit is shared, who pays for replacing furniture as it ages, and who pays taxes and insurance."],
          },
          {
            h: "Is it right for you?",
            p: ["It may suit you if you would like a place run by others and can leave the money in for years. It may not suit you if you need a fixed income, may need to sell quickly, or want full control of how the place is used."],
          },
        ],
        links: [
          { label: "How it works at Serene Heights", href: "/invest/how-it-works" },
          { label: "Earnings explained", href: "/invest/earnings" },
        ],
      },
      investBand,
      moreGuides("investing"),
    ],
    pending: [
      "Management agreement: pooled or per-unit income, deductions and a sample owner statement",
      "Written rules for the 28 owner nights (an older page lists them; the current Nathia Gali site says only \"exclusive stay benefits\")",
    ],
  },

  // Travel articles
  {
    path: "/insights/ayubia-and-the-pipeline-track",
    side: "hotel",
    template: "article",
    name: "Ayubia and the Pipeline Track",
    title: "Ayubia National Park from Nathia Gali",
    description: "How to reach Ayubia, walk the Pipeline Track from Dunga Gali and plan for a chairlift that may not be running.",
    intro: "Ayubia is about 8 km from Nathia Gali by road. The best way to see it is to walk the 4 km Pipeline Track from Dunga Gali and take a taxi back.",
    image: { src: "/media/farms/mist-valley.webp", alt: "Illustrative image of mist over a forested valley in the hills" },
    article: { date: "2026-09-09", category: "nathia-gali", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "A half day in Ayubia",
        parts: [
          {
            h: "The park",
            p: ["Ayubia National Park was established in 1984. It protects pine and oak forest in the Galiyat. Leopards, black bears, macaques and martens live here, along with more than 200 kinds of bird. Most visitors will hear far more birds than they see animals."],
          },
          {
            h: "Getting there",
            p: ["By car, drive south through Dunga Gali, about 4 km from Nathia Gali, and go on to the Ayubia junction. Allow 12 to 15 minutes in light traffic. On foot, start the Pipeline Track in Dunga Gali and allow 45 to 90 minutes one way."],
          },
          {
            h: "The Pipeline Track",
            p: [
              "The path follows a water pipeline from the British period that carried spring water towards Murree. It is nearly level and clearly marked, so it suits most walkers.",
              "The first two kilometres are deep in the trees. After that the forest opens on one side and you can see across the valley. Near the end there is a short stone tunnel. Early morning is quietest and best for birds.",
            ],
          },
          {
            h: "The chairlift",
            p: ["Do not plan the day around it. The chairlift often stops for maintenance or weather, and queues on summer weekends can be long. Ask locally that morning. If it is closed, the walk is the better part of the day anyway."],
          },
          {
            h: "Other walks",
            p: ["A short marked nature trail of about 1.5 km starts near the Ghora Dhaka visitor area and suits younger children. Trails around Khaira Gali see fewer people. Ask about conditions before you set out."],
          },
          {
            h: "What to bring",
            list: [
              "Water: do not rely on finding any along the track.",
              "Shoes with grip and a light rain jacket.",
              "A warm layer, even in summer.",
              "Cash for the small entry fees, which change.",
              "A charged phone. Signal drops inside the forest.",
            ],
          },
          {
            h: "With children or older relatives",
            p: ["Drive to the main visitor area, or walk the first part of the Pipeline Track and turn back. The forest is dense from the start, so even a short walk is worth it."],
          },
        ],
        links: [{ label: "Things to do in Nathia Gali", href: `${H}/things-to-do` }],
      },
      hotelBand,
      moreGuides("nathia-gali"),
    ],
    pending: ["Current Ayubia entry fees, hours and chairlift status, if the client wants them stated"],
  },
  {
    path: "/insights/48-hours-in-nathia-gali",
    side: "hotel",
    template: "article",
    name: "48 hours in Nathia Gali",
    title: "How to spend 48 hours in Nathia Gali",
    description: "A realistic weekend: an easy first afternoon, Mukshpuri in the morning, the Pipeline Track and a plan for rain.",
    intro: "Do the gentle things on the first day and one real hike on the second. Two days is enough for the bazaar, the Pipeline Track and Mukshpuri, and not much more.",
    image: { src: "/media/ng/tower-forest-mist.webp", alt: "Render of Serene Heights Nathia Gali rising from misty pine forest" },
    article: { date: "2026-08-31", category: "nathia-gali", ...AUTHOR },
    blocks: [
      {
        id: "body",
        kind: "text",
        h: "Two days, at an easy pace",
        parts: [
          {
            h: "Day one, morning: arrive",
            p: ["Leave Islamabad by 7 am on a Saturday. The 80 km drive takes about two hours in normal traffic. Rest for an hour when you arrive. Nathia Gali is close to 8,000 ft and some people feel the height, so drink water and keep the first hours slow."],
          },
          {
            h: "Day one, midday: the bazaar",
            p: ["The bazaar is small and easy to walk. Have lunch at a local restaurant, try roasted corn from a stall and look for local honey."],
          },
          {
            h: "Day one, afternoon: into the forest",
            p: ["Drive to Dunga Gali, about 4 km away, and walk the first 1.5 km of the Pipeline Track. Turn back before you are tired. In the evening, find a safe place to watch the light over the valley. Eat early and, on a clear night, look up."],
          },
          {
            h: "Day two, morning: Mukshpuri",
            p: ["Mukshpuri Top is about 9,200 ft. The trail is around 4 km each way with roughly 400 m of climbing. Start by 7.30 am and allow three to three and a half hours with time at the top. Ask where the trail starts now, because access has changed. On a clear day you can see far across the Galiyat."],
          },
          {
            h: "Day two, afternoon: one more walk, then home",
            p: ["If you still have energy, walk the full 4 km Pipeline Track to Ayubia and take a local van or taxi back to your car. If not, rest. Try to leave before 4 pm on a Sunday, since traffic grows through the afternoon."],
          },
          {
            h: "If it rains",
            p: ["Afternoon rain is common in July and August. Do not push on with Mukshpuri on a wet trail. Visit St Matthew's Church, walk the older lanes near Governor House and wait. Mornings are often clearer, so make the decision early."],
          },
          {
            h: "What to leave for next time",
            p: ["Miranjani takes five to seven hours and needs a day to itself. It suits a visit of three or four days. If you can, travel on a Friday: the trails and roads are quieter."],
          },
        ],
        links: [
          { label: "Things to do in Nathia Gali", href: `${H}/things-to-do` },
          { label: "Getting here", href: `${H}/location` },
        ],
      },
      hotelBand,
      moreGuides("nathia-gali"),
    ],
  },
  {
    path: "/insights/snowfall-in-nathia-gali",
    side: "hotel",
    template: "article",
    name: "Snowfall in Nathia Gali",
    title: "When does it snow in Nathia Gali?",
    description: "The months most likely to bring snow to Nathia Gali, what the road can be like and what to pack for a winter trip.",
    intro: "Snow is most likely from mid-December to mid-February, and January is usually the deepest month. No date is certain, so check the forecast in the week before you travel.",
    image: { src: "/media/ng/snow-street.webp", alt: "Render of Serene Heights Nathia Gali beside a snowy road" },
    article: { date: "2026-08-18", category: "nathia-gali", ...AUTHOR },
    blocks: [
      {
        id: "months",
        kind: "table",
        h: "Month by month",
        d: "A typical pattern. Every winter is different.",
        head: ["Month", "What to expect"],
        rows: [
          ["November", "Cold. Light snow is possible late in the month and may not settle."],
          ["December", "Snow becomes more likely from the middle of the month."],
          ["January", "Usually the coldest month, with the most snow on the ground."],
          ["February", "Snow still likely, easing towards the end."],
          ["March", "Mixed. A little snow early on, then thaw."],
        ],
      },
      {
        id: "body",
        kind: "text",
        h: "Planning a winter trip",
        parts: [
          {
            h: "Fresh snow does not last long",
            p: ["The best hours are while snow is falling and the morning after. Roads and the bazaar turn to packed snow and slush within about a day. The forest keeps its white for longer. Your best chance is to be there already when it snows, so stay more than one night if you can."],
          },
          {
            h: "The road",
            p: ["The main expressways are usually cleared first. The hill section between Murree and Nathia Gali can stay difficult for a day or two after heavy snow, and it closes at times."],
            list: [
              "Check official road news just before you leave.",
              "Carry snow chains and know how to fit them.",
              "Fill the tank before the hills.",
              "Travel in daylight and never during heavy snowfall.",
              "Download maps before you set out.",
              "Leave a spare day so that you never have to rush home.",
            ],
          },
          {
            h: "What to pack",
            list: ["Thermal layers, not cotton", "A fleece or down layer and a waterproof jacket", "Waterproof boots with grip", "Gloves, hat and warm socks", "A power bank, as cold drains phones", "Any medicine you need for an extra day or two"],
          },
          {
            h: "What you can do",
            p: ["Short walks on lower forest paths and playing in the snow are the simple pleasures. Leave Miranjani for another season. Mukshpuri in snow is only for experienced, equipped walkers. Expect the Ayubia chairlift and some small shops to be closed."],
          },
          {
            h: "Before you book any room",
            p: ["Ask how the room is heated, what happens when the electricity goes, whether meals are served on site and whether the parking can be reached after snow. Ask the same of us. Serene Heights Nathia Gali is planned as a winter resort and is still under construction."],
          },
        ],
        links: [{ label: "Location and getting here", href: `${H}/location` }],
      },
      hotelBand,
      moreGuides("nathia-gali"),
    ],
  },
  {
    path: "/insights/drive-from-islamabad-to-nathia-gali",
    side: "hotel",
    template: "article",
    name: "How long is the drive from Islamabad to Nathia Gali?",
    title: "How long is the drive from Islamabad to Nathia Gali?",
    description: "About two hours for roughly 80 km. Routes by Murree and Abbottabad, when to leave and how to prepare for snow.",
    intro: "About two hours for roughly 80 km, in normal traffic and clear weather. Summer weekends and snow can make it much longer, so leave early and allow extra time.",
    image: { src: "/media/ng/aerial-clouds.webp", alt: "Render of the Serene Heights Nathia Gali towers in the pines, with a hill road behind" },
    article: { date: "2026-08-08", category: "nathia-gali", ...AUTHOR },
    blocks: [
      {
        id: "distances",
        kind: "facts",
        h: "Distances from Serene Heights",
        rows: [
          ["Islamabad", "80 km, about 2 hours"],
          ["Abbottabad city centre", "35 km, about 50 minutes"],
          ["Main bazaar, Nathia Gali", "5 km, about 10 minutes"],
          ["Main Nathia Gali road", "1.5 km, about 3 minutes"],
          ["PAF Airbase Nathia Gali", "50 m"],
        ],
      },
      {
        id: "body",
        kind: "text",
        h: "Planning the drive",
        parts: [
          {
            h: "By Murree",
            p: [
              "This is the direct and scenic way. Take the Islamabad-Murree Expressway to Murree, then the hill road through the Galiyat to Nathia Gali. Murree to Nathia Gali is about 39 km and can take around an hour and twenty minutes, because the road narrows and bends.",
              "Changla Gali is a popular stop for tea.",
            ],
          },
          {
            h: "By Abbottabad",
            p: ["Take the Hazara Expressway to the Havelian interchange, go on to Abbottabad and climb east to Nathia Gali. The last part from Abbottabad is 35 km, about 50 minutes. This way is longer overall but can be easier when the road to Murree is full."],
          },
          {
            h: "When to leave",
            p: ["Weekdays are easiest. On summer weekends, set off before 7 am. Traffic on the Murree side can add hours on Friday and Saturday. Going home, leave before Sunday afternoon gets busy."],
          },
          {
            h: "From Lahore",
            p: ["Plan for six to seven hours: the motorway to Islamabad, a rest, then the hills. Leave at 5 or 6 am so that you finish the mountain road in daylight."],
          },
          {
            h: "Before the hills",
            list: ["Fill up in Islamabad, Murree or Abbottabad.", "Check brakes, tyres, lights and wipers.", "Download maps, as signal comes and goes.", "Carry water, a warm layer and some cash."],
          },
          {
            h: "In the rains and in winter",
            p: [
              "From July to September, afternoon showers make the road slippery and cloud can hide the bends. Slow down and travel in the morning. Landslides can follow heavy rain.",
              "In winter, carry snow chains and check the road just before you leave. After heavy snow the hill section may close for a day or two. Wait until it has been cleared.",
            ],
          },
          {
            h: "Day trip or overnight?",
            p: ["A day trip is possible, but much of the best light is spent on the road. One night gives you an unhurried morning in the pines, and two nights give you time for a proper walk."],
          },
        ],
        links: [{ label: "Location and getting here", href: `${H}/location` }],
      },
      hotelBand,
      moreGuides("nathia-gali"),
    ],
    pending: ["Older travel guides give 80 to 90 km and 1.5 to 2.5 hours, and place the site 1.5 km from the bazaar; the current sites' figures are used (80 km, 2 hours, bazaar 5 km)"],
  },

  // Project update
  {
    path: "/insights/nathia-gali-construction-on-video",
    side: "both",
    template: "article",
    name: "Nathia Gali construction on video",
    title: "Nathia Gali construction on video: December 2021 to April 2026",
    description: "Ten published videos record work at the Serene Heights Nathia Gali site, from December 2021 to April 2026.",
    intro: "Ten videos published on our YouTube channel record work at Serene Heights Nathia Gali. The first is from December 2021 and the latest listed is from April 2026.",
    image: { src: "/media/ng/tower-sky.webp", alt: "Render of the planned Serene Heights Nathia Gali tower against the sky" },
    article: { date: "2026-11-25", category: "updates", ...AUTHOR },
    blocks: [
      {
        id: "record",
        kind: "table",
        h: "The record so far",
        head: ["When", "What was published"],
        rows: [
          ["April 2026", "Site video, the latest listed"],
          ["December 2025", "Site video"],
          ["September 2025", "Site video"],
          ["April 2025", "Site video"],
          ["July 2024", "Site video"],
          ["February 2024", "Site video"],
          ["November 2023", "Site video"],
          ["July 2023", "Site video"],
          ["October 2022", "Site video"],
          ["December 2021", "Groundbreaking"],
        ],
      },
      {
        id: "body",
        kind: "text",
        h: "How to use the videos",
        parts: [
          {
            h: "Start with the newest",
            p: ["The April 2026 video shows the site as it was then. It is not a picture of today. If you are making a decision, ask the team what has been done since, and visit if you can."],
          },
          {
            h: "Then go back",
            p: ["Watch an older one beside it. The distance between two dates tells you more than any single film. Keep a note of which tower and which side you are looking at, since views change from one video to the next."],
          },
          {
            h: "What the videos do not tell you",
            p: [
              "A video does not confirm a finishing date, an approval or the quality of work you cannot see. The gaps between videos are not all the same length either. Ask for the current timeline in writing, with the documents you want to check.",
              "The project is planned as three towers with more than 150 apartments. Ask which tower your unit is in, and what stage that tower has reached.",
            ],
          },
          {
            h: "Three questions for the team",
            list: ["What is the stage of each tower today?", "What is planned for the next six months?", "When can I come and see it?"],
          },
          {
            h: "Renders and site films",
            p: ["Most pictures of Serene Heights Nathia Gali on this site are renders. They show the planned building, not finished work. To judge progress, use the site videos and your own visit."],
          },
          {
            h: "See it in person",
            p: ["Site visits are arranged with the team, for buyers who have booked and for people who are still deciding. Tell us your preferred date and what you want to look at. Ask also about the road and the weather before you set out."],
          },
        ],
        links: [
          { label: "Construction progress", href: "/nathiagali/progress" },
          { label: "Watch on YouTube", href: "https://www.youtube.com/@sereneheightsnathiagali5573" },
          { label: "Book a site visit", href: "/site-visit" },
        ],
      },
      investBand,
      { id: "more", kind: "listing", h: "More guides" },
    ],
    pending: [
      "A written site report since April 2026, with photographs and the stage of each tower",
      "Exact video dates (sources give month and year only); the article date is the date this page was written",
    ],
  },
];
