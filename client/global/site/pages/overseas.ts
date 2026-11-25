import type { Block, Card, Page, Part } from "../types";

const DISCLAIMER = [{ label: "Investment disclaimer", href: "/disclaimer" }];

const PAY: Card = { t: "Paying from abroad", d: "Bank routes, records and how to avoid fraud.", href: "/overseas/paying-from-abroad", cta: "Read" };
const SIGN: Card = { t: "Documents and signing from abroad", d: "Identity papers and power of attorney.", href: "/overseas/documents", cta: "Read" };
const STEPS: Card = { t: "Steps to buy from abroad", d: "The whole journey in order.", href: "/overseas/steps", cta: "Read" };
const RISKS: Card = { t: "Risks and exit", d: "What is not guaranteed.", href: "/invest/risks-and-exit", cta: "Read" };

/** The blocks every explainer shares, so each page only writes its own parts. */
function explainer(parts: Part[], promise: string, next: Card[], about: string): Block[] {
  return [
    { id: "parts", kind: "text", h: "The parts", parts },
    { id: "promise", kind: "band", h: "What this page does not promise", d: promise, links: DISCLAIMER },
    { id: "next", kind: "cards", h: "Next", cards: next },
    { id: "ask", kind: "form", form: "enquiry", about, h: "Ask how ownership works for you", d: "Say which country you are in and the best time to reach you. WhatsApp works well across time zones." },
  ];
}

const COUNTRY_PENDING = (place: string) => [
  `Contact person and calling hours for buyers in ${place}`,
  `Any office, agent or event in ${place}; none is recorded`,
  "Accepted payment routes and the official account title, and whether Roshan Digital Account payments are accepted",
  "Legal and tax review of this page",
];

export const overseasPages: Page[] = [
  {
    path: "/overseas",
    side: "invest",
    template: "hub",
    name: "Overseas Pakistanis",
    title: "Overseas Pakistanis",
    description: "Buying with Serene Heights from abroad: the steps, payments, documents and signing, with notes for the Gulf, UK, North America and Australasia.",
    intro: "You can choose, check and pay for a Serene Heights property from another country. This guide shows what to do from home and where you may need someone in Pakistan.",
    image: { src: "/media/ng/sunset-rooftop.webp", alt: "Render of the rooftop at Serene Heights Nathia Gali at sunset" },
    actions: [
      { label: "Steps to buy from abroad", href: "/overseas/steps" },
      { label: "WhatsApp +92 300 8497999", href: "https://wa.me/923008497999" },
    ],
    blocks: [
      {
        id: "start",
        kind: "cards",
        h: "Start here",
        cards: [
          STEPS,
          PAY,
          SIGN,
          { t: "The Gulf", d: "The UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman.", href: "/overseas/gulf", cta: "Read" },
          { t: "The UK", d: "Notes for buyers in the United Kingdom.", href: "/overseas/uk", cta: "Read" },
          { t: "The US and Canada", d: "Notes for buyers in North America.", href: "/overseas/usa-canada", cta: "Read" },
          { t: "Australia and New Zealand", d: "Notes for buyers in Australasia.", href: "/overseas/australia-new-zealand", cta: "Read" },
        ],
      },
      {
        id: "facts",
        kind: "facts",
        h: "Key facts",
        rows: [
          ["What you can buy", "Apartments or 50 sq ft units in Nathia Gali, and space in the Lahore tower"],
          ["Smallest Nathia Gali share", "PKR 2,250,000 for 50 sq ft"],
          ["Nathia Gali payments", "30% down, then 36 monthly instalments in rupees"],
          ["Who manages it", "DM Consortium, once the building is complete"],
          ["Where it stands", "Nathia Gali is under construction. No opening date is published here"],
          ["How to reach us", "WhatsApp +92 300 8497999. The office is in Lahore"],
          ["Local time", "Pakistan is five hours ahead of UTC all year"],
        ],
      },
      {
        id: "check",
        kind: "cards",
        h: "What you can check",
        d: "Much of this can be done before you travel.",
        cards: [
          { t: "The building", d: "Dated site films from December 2021 to April 2026.", href: "/nathiagali/progress", cta: "See progress" },
          { t: "The papers", d: "Ask for copies and have a lawyer in Pakistan check them at source.", href: "/documents", cta: "See documents" },
          { t: "The place", d: "Visit on your next trip, or ask a relative you trust to go.", href: "/site-visit", cta: "Book a site visit" },
        ],
      },
      {
        id: "questions",
        kind: "faq",
        h: "Questions buyers ask",
        groups: [
          {
            items: [
              { q: "Can overseas Pakistanis buy property in Pakistan?", a: "Yes, subject to the usual legal documents. If you no longer hold Pakistani nationality, ask a Pakistani lawyer about your position before you book." },
              { q: "Must I come to Pakistan?", a: "Not for the first conversations or the reading. Some signing may need you, or someone holding your power of attorney. Ask us for the current list of steps." },
              { q: "Which identity document do I need?", a: "Overseas Pakistanis commonly use a NICOP, and people of Pakistani origin may hold a POC. Ask us what the booking form and your lawyer require." },
              { q: "Can I pay through a Roshan Digital Account?", a: "It is a State Bank of Pakistan initiative that lets eligible non-resident Pakistanis bank with participating banks. Ask your bank whether it supports this purchase, and ask us whether our account can receive it." },
              { q: "Are payments in rupees or dollars?", a: "The published prices are in Pakistani rupees. Your cost in your own currency will change with the exchange rate." },
              { q: "Can I send income abroad?", a: "This depends on your account, your tax position and the rules at the time. Ask your bank before you buy, because the way you paid can matter later." },
              { q: "What if I have a problem from abroad?", a: "Keep your papers and speak to us in writing. Pakistan has laws and bodies for overseas Pakistanis' property complaints. A lawyer can tell you which apply to your property." },
              { q: "Are returns guaranteed?", a: "No. Any projection is the developer's and is not guaranteed." },
            ],
          },
        ],
      },
      { id: "ask", kind: "form", form: "enquiry", about: "buying from abroad", h: "Get the price list and payment plan", d: "Tell us your country and the time you prefer to talk." },
    ],
    pending: [
      "Overseas sales contact and hours",
      "Payment routes accepted from abroad and official account title; whether Roshan Digital Account payments are accepted",
      "Which steps can be completed remotely, and eligibility for buyers without Pakistani nationality",
      "Legal review of the overseas pages by a Pakistani lawyer",
    ],
  },
  {
    path: "/overseas/steps",
    side: "invest",
    template: "explainer",
    name: "Steps to buy from abroad",
    title: "Steps to buy from abroad",
    description: "Seven steps to buy with Serene Heights from another country, from the first video call to ownership papers, with checks at each stage.",
    intro: "Choose, check, appoint help, book, pay, sign and keep the papers. Go in that order, and do not let a discount hurry you.",
    image: { src: "/media/ng/rooftop-view.webp", alt: "Render of the mountain view from the Nathia Gali rooftop" },
    blocks: explainer(
      [
        { h: "1. Choose", p: ["Decide between a whole apartment and a 50 sq ft Smart Property Unit. Message us for the current price list and availability. Ask for everything in writing."] },
        { h: "2. Check", p: ["Watch the dated site films. Ask for land title, approvals and sample agreements. Have an independent lawyer in Pakistan check them with the issuing offices. If you can, visit, or send someone you trust."] },
        { h: "3. Appoint help, if you need it", p: ["If someone will sign for you, prepare a power of attorney that covers only what they need to do. Have it attested as required before your booking depends on it."] },
        { h: "4. Book", p: ["Complete the booking form with your identity details exactly as they appear on your document. Check the project, the unit, the area and the price before you send it."] },
        { h: "5. Pay", p: ["Pay through a bank to the account in your official papers. Confirm the details by calling the UAN on this site. Published Nathia Gali plans are 30% down and 36 monthly instalments."] },
        { h: "6. Sign", p: ["Read the sale agreement and management agreement together. Ask which papers must be signed in person, and which may be signed by post or by your attorney."] },
        { h: "7. Keep records", p: ["Keep receipts, bank advice, signed copies and messages. When payments are complete, ask for the paper that proves ownership. Tell a family member where the file is."] },
      ],
      "It is general guidance and not legal advice. The order or papers may differ in your case. Confirm with your lawyer and with us.",
      [PAY, SIGN, RISKS],
      "steps to buy from abroad",
    ),
    pending: ["Confirmed remote buying procedure, including whether signed papers can be sent by courier or e-signed", "Video call or video site tour availability", "Papers issued at each stage"],
  },
  {
    path: "/overseas/paying-from-abroad",
    side: "invest",
    template: "explainer",
    name: "Paying from abroad",
    title: "Paying from abroad",
    description: "Bank transfers, Roshan Digital Accounts, records and fraud checks for overseas buyers paying for property in Pakistan.",
    intro: "Use a bank, keep proof of every transfer, and confirm the account by phone before you send money. Your bank can tell you which route suits you.",
    image: { src: "/media/lhr/aerial.jpg", alt: "Render of Serene Heights Lahore and Gulberg from the air" },
    blocks: explainer(
      [
        { h: "What you will pay", p: ["Published Nathia Gali plans are in rupees: 30% down, then 36 equal monthly instalments. For one Smart Property Unit that is PKR 675,000 and then PKR 43,750 a month. Ask what else may be payable, such as taxes or registration."] },
        { h: "A bank transfer", p: ["You can ask your bank to send money to a bank account in Pakistan. Ask about its charges, exchange rate and delivery time. Put your name and booking reference on the payment, and keep the transfer advice."] },
        {
          h: "A Roshan Digital Account",
          p: [
            "This is a State Bank of Pakistan initiative with participating banks. Eligible non-resident Pakistanis can open an account from abroad. Property is among the uses banks may support.",
            "Ask the bank whether you are eligible, whether this project can be paid for from the account, and how sale money or income would be treated later. Ask us whether our account can receive it.",
          ],
        },
        { h: "Through family", p: ["A relative may pay for you, but make sure the receipt names you and your booking. Do not use informal money transfer. It leaves a poor record and may break the law."] },
        {
          h: "Protect yourself",
          list: ["Pay only to the account named in your official papers.", "Check that the account name matches the company in your agreement.", "Confirm on 042-111-111-744. Do not rely on a number in the message.", "Treat a last-minute change of account as a warning.", "Get a receipt, and match it to your statement."],
        },
        { h: "Tax and exchange rates", p: ["Rules can differ for residents and non-residents, and for people on and off Pakistan's active taxpayer list. Your country of residence may also want to know. Ask a tax adviser in each place. Leave room for exchange rates to move over three years."] },
      ],
      "It does not say your bank will accept a payment, or that a route will remain open. Confirm with your bank, a tax adviser and our office.",
      [SIGN, { t: "Payment plan", d: "The published Nathia Gali figures.", href: "/nathiagali/payment-plan", cta: "Read" }, RISKS],
      "paying from abroad",
    ),
    pending: ["Official bank account title and bank", "Whether Roshan Digital Account and foreign currency payments are accepted", "Buyer's taxes and registration charges", "How income and resale proceeds are paid to overseas owners", "Review by a bank and a tax adviser"],
  },
  {
    path: "/overseas/documents",
    side: "invest",
    template: "explainer",
    name: "Documents and signing from abroad",
    title: "Documents and signing from abroad",
    description: "Identity papers, power of attorney, attestation and safe signing for overseas Pakistanis buying property in Pakistan.",
    intro: "You will need proof of who you are, papers you have read, and a way to sign. If someone signs for you, the power of attorney needs the most care.",
    image: { src: "/media/interiors/lounge-art.webp", alt: "Lounge interior in the Serene Heights design" },
    blocks: explainer(
      [
        { h: "Your identity", p: ["Have a current CNIC, NICOP or POC, as applies to you, and your passport. Check that your name is spelt the same way on each. Ask us exactly which copies the booking form needs."] },
        { h: "What to ask us for", list: ["Land title and building approvals for the project", "The booking form and payment schedule", "Sample sale and management agreements", "A receipt format, and the name on the receiving account"] },
        {
          h: "A power of attorney",
          p: [
            "This lets someone in Pakistan act for you. It can be limited to one task. A special power of attorney for one purchase is usually safer than a broad one.",
            "It is normally signed or executed through a Pakistani embassy or consulate, or otherwise attested for use in Pakistan. Pakistani missions also offer an online power of attorney service in many places. Further attestation or registration may be needed in Pakistan.",
            "The rules depend on the country and the document. Confirm with the mission that serves you, and with a lawyer, before you draft it.",
          ],
        },
        {
          h: "Make it narrow",
          list: ["Name the project and unit.", "List what your attorney may do.", "Say whether they may receive money or sell. Leave this out if they do not need it.", "Set an end date if your lawyer agrees.", "Know how to cancel it, and whom to tell."],
        },
        { h: "Signing at home or on a visit", p: ["Do not sign blank pages. Initial changes, and keep a complete copy. If a paper can be signed only in Pakistan, try to combine it with a site visit."] },
        { h: "If there is a dispute", p: ["A federal law of 2024 provides for special courts for overseas Pakistanis' property cases. Provinces may have their own arrangements. The law that covers you depends on where the property is, so ask a lawyer. Nathia Gali is in Khyber Pakhtunkhwa and Lahore is in Punjab."] },
      ],
      "It is general information and not legal advice. Requirements change. Confirm them with your embassy or consulate and a Pakistani lawyer.",
      [STEPS, PAY, { t: "Documents and approvals", d: "What to ask to see for each project.", href: "/documents", cta: "Read" }],
      "documents and signing from abroad",
    ),
    pending: ["Exact identity documents and copies required at booking", "Whether the company accepts a power of attorney, and its preferred wording", "Papers that need a signature in person", "Review by a Pakistani property lawyer"],
  },
  {
    path: "/overseas/gulf",
    side: "invest",
    template: "explainer",
    name: "Buying from the Gulf",
    title: "Buying from the Gulf",
    description: "Notes for Pakistanis in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman on calls, payments, signing and visits.",
    intro: "From the Gulf you share most of the Pakistani working day, so calls are easy. The points to plan are the bank route, your papers and a visit.",
    image: { src: "/media/ng/snow-valley.webp", alt: "Render of the Nathia Gali resort in a snowy valley" },
    blocks: explainer(
      [
        { h: "When to call", p: ["Pakistan is one hour ahead of the UAE and Oman, and two hours ahead of Saudi Arabia, Qatar, Kuwait and Bahrain. If your working week is different, send a WhatsApp message and choose a time."] },
        { h: "Paying", p: ["Ask your bank or a licensed exchange company what it needs for a property payment to Pakistan, and what record you will receive. Compare the full cost, including the exchange rate. Eligible non-resident Pakistanis can also ask about a Roshan Digital Account."] },
        { h: "Signing", p: ["Pakistan has embassies or consulates across the Gulf. In the UAE there are missions in Abu Dhabi and Dubai, and in Saudi Arabia in Riyadh and Jeddah. Use the official website of the mission that serves your area to check power of attorney services and appointments."] },
        { h: "Work and income", p: ["Gulf jobs and residence visas can change. Ask yourself whether you could keep paying for 36 months if yours did. Ask about late payment before you book."] },
        { h: "Tax", p: ["Tax in Pakistan on property and rental income is separate from tax where you live. Ask a tax adviser in Pakistan how your residence status and filing affect you."] },
        { h: "Visiting", p: ["If you have family leave, plan time for both the Lahore office and the site. Nathia Gali is about two hours by road from Islamabad in good conditions. Allow longer around Eid, in summer and after snow."] },
      ],
      "It does not promise bank acceptance, consular service or income. Confirm current rules with your bank, the mission and your lawyer.",
      [STEPS, PAY, SIGN],
      "buying from the Gulf",
    ),
    pending: COUNTRY_PENDING("the Gulf"),
  },
  {
    path: "/overseas/uk",
    side: "invest",
    template: "explainer",
    name: "Buying from the UK",
    title: "Buying from the UK",
    description: "Notes for buyers in the United Kingdom: calling Lahore, paying from a UK bank, signing at a Pakistani mission and UK tax questions.",
    intro: "From the UK, speak to us in your morning, pay through your bank, and check the Pakistani mission's rules before you appoint someone to sign.",
    image: { src: "/media/ng/night-facade.webp", alt: "Render of Serene Heights Nathia Gali lit on a snowy evening" },
    blocks: explainer(
      [
        { h: "When to call", p: ["Pakistan is five hours ahead in winter and four during British Summer Time. UK mornings work best. If you work in the day, send us a message and we can agree a time."] },
        { h: "Paying", p: ["Your bank may ask about the purpose of a large transfer, so have your booking papers ready. Compare its charge and rate with other regulated providers, and check they will send to a company account. If you are eligible, ask a participating Pakistani bank about a Roshan Digital Account."] },
        { h: "Signing", p: ["The Pakistan High Commission is in London. There are consulates in Birmingham, Bradford, Glasgow and Manchester. Check the official website for the one that serves you, and for power of attorney rules. A solicitor here cannot replace a Pakistani lawyer on title and approvals."] },
        { h: "UK tax", p: ["If you are a UK tax resident you may have to report property income and gains from abroad. The UK and Pakistan have a tax treaty. Ask a UK accountant and a Pakistani adviser how it would apply to you."] },
        { h: "Protection", p: ["Buying property in Pakistan is not the same as buying a regulated UK investment. Do not assume UK compensation schemes cover it. Take independent advice."] },
        { h: "Visiting", p: ["Try to see the site on your next trip, and allow time with your lawyer. Nathia Gali is about two hours by road from Islamabad in good conditions."] },
      ],
      "It is not UK or Pakistani tax, legal or financial advice. Confirm your position with qualified advisers.",
      [STEPS, PAY, SIGN],
      "buying from the UK",
    ),
    pending: [...COUNTRY_PENDING("the UK"), "Advice on UK financial promotion rules before this page is advertised in the UK"],
  },
  {
    path: "/overseas/usa-canada",
    side: "invest",
    template: "explainer",
    name: "Buying from the US and Canada",
    title: "Buying from the US and Canada",
    description: "Notes for buyers in the United States and Canada: time zones, transfers, Pakistani missions, reporting duties and site visits.",
    intro: "The time difference is large and the reporting rules matter. Use WhatsApp to agree calls, and speak to a tax adviser before your first payment.",
    image: { src: "/media/ng/rooftop-terrace.webp", alt: "Render of a rooftop terrace at Serene Heights Nathia Gali" },
    blocks: explainer(
      [
        { h: "When to call", p: ["Pakistan is nine or ten hours ahead of the US and Canadian east coast, and twelve or thirteen ahead of the west coast. Your evening is our morning. Send a message and we can fix a time that suits both sides."] },
        { h: "Paying", p: ["Ask your bank for the cost of an international wire, what the receiving bank may charge, and what proof you will get. Tell it the purpose of the payment. If you are eligible, ask a participating Pakistani bank about a Roshan Digital Account, and whether it accepts customers living in your country."] },
        { h: "Signing", p: ["In the United States, Pakistan has an embassy in Washington, DC, and consulates in New York, Chicago, Houston and Los Angeles. In Canada there is a High Commission in Ottawa, with consulates in Toronto, Montreal and Vancouver. Check which serves your state or province, and its current power of attorney steps."] },
        { h: "Tax and reporting", p: ["US citizens and residents are generally taxed on worldwide income, and may need to report foreign accounts. Canadian residents are generally taxed on worldwide income and may need to report foreign property. Ask an adviser what applies to you, including any treaty with Pakistan."] },
        { h: "Dual nationals", p: ["Tell your lawyer about every nationality you hold, and which Pakistani identity document you have. Use the same name across your papers."] },
        { h: "Visiting", p: ["Plan one trip that covers the site, the papers and your lawyer. If you cannot travel, send someone you trust who will ask hard questions."] },
      ],
      "It is not an offer where one would be unlawful, and it is not legal, tax or securities advice. Take advice where you live.",
      [STEPS, PAY, SIGN],
      "buying from the US and Canada",
    ),
    pending: [...COUNTRY_PENDING("the US and Canada"), "Advice on securities law for offering income-sharing units to buyers in the US and Canada"],
  },
  {
    path: "/overseas/australia-new-zealand",
    side: "invest",
    template: "explainer",
    name: "Buying from Australia and New Zealand",
    title: "Buying from Australia and New Zealand",
    description: "Notes for buyers in Australia and New Zealand: time zones, transfers, Pakistani missions, tax questions and planning a visit.",
    intro: "You are ahead of Pakistan, so your afternoon is our morning. Plan your payments and papers early, because posted documents can take time.",
    image: { src: "/media/ng/snow-facade.webp", alt: "Render of the Nathia Gali facade in snow" },
    blocks: explainer(
      [
        { h: "When to call", p: ["Sydney and Melbourne are five or six hours ahead of Pakistan, and Perth is three. New Zealand is seven or eight hours ahead. Late afternoon for you usually works for our Lahore office."] },
        { h: "Paying", p: ["Compare your bank with other licensed transfer providers. Ask about the full cost, whether they pay company accounts in Pakistan, and what proof you will get. If you are eligible, ask a participating Pakistani bank about a Roshan Digital Account."] },
        { h: "Signing", p: ["Pakistan has a High Commission in Canberra with consulates in Sydney and Melbourne, and a High Commission in Wellington. Check the official website for power of attorney rules, and whether you must attend in person. Allow time for couriers."] },
        { h: "Tax", p: ["Residents of Australia and New Zealand are generally taxed on worldwide income. Rent, gains and foreign exchange can all matter. Ask an accountant at home and an adviser in Pakistan before you buy."] },
        { h: "Who helps locally", p: ["It is a long way if something needs attention. Choose an independent lawyer in Pakistan, and consider a narrow power of attorney for a person you trust. They should not work for the seller."] },
        { h: "Visiting", p: ["Your summer is Nathia Gali's winter, so a December or January trip may bring snow and slow roads. It will show you the place in the cold. Check conditions first."] },
      ],
      "It is not legal, tax or financial advice in Australia, New Zealand or Pakistan. Confirm your position with qualified advisers.",
      [STEPS, PAY, SIGN],
      "buying from Australia and New Zealand",
    ),
    pending: [...COUNTRY_PENDING("Australia and New Zealand"), "Advice on financial promotion rules in Australia and New Zealand"],
  },
];
