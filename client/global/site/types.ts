// The client's site plan (Figma "Site Plan v1"): every page is data, rendered from one of 19 templates.
export type Side = "invest" | "hotel" | "both";

export type Template =
  | "home" | "hub" | "project" | "product" | "payment" | "proof" | "explainer" | "action" | "hotel-home"
  | "accommodation" | "room" | "hotel-content" | "location" | "gallery" | "questions" | "about"
  | "listing" | "article" | "plain";

export type LinkTo = { label: string; href: string };
export type Img = { src: string; alt: string };
export type Card = { t: string; d: string; href?: string; cta?: string; image?: Img; meta?: string };
export type FaqItem = { q: string; a: string };
/** A run of text: optional sub-heading, paragraphs, optional bullet list. */
export type Part = { h?: string; p?: string[]; list?: string[] };
export type FormKind = "enquiry" | "visit" | "stay" | "document" | "question" | "partner";

type Base = {
  /** Which part of the template this is — see TEMPLATE_PARTS for what each template needs, in order. */
  id: string;
  /** Section heading. */
  h: string;
  /** Short text under the heading. */
  d?: string;
  /** Buttons at the end of the section. */
  links?: LinkTo[];
};

export type Block =
  | (Base & { kind: "cards"; cards: Card[] })
  | (Base & { kind: "facts"; rows: [string, string][] })
  | (Base & { kind: "table"; head: string[]; rows: string[][] })
  | (Base & { kind: "text"; parts: Part[] })
  | (Base & { kind: "band" })
  | (Base & { kind: "faq"; groups: { subject?: string; items: FaqItem[] }[] })
  | (Base & { kind: "panels"; items: { t: string; d: string; image: Img; href?: string; cta?: string }[] })
  | (Base & { kind: "media"; image: Img; t: string; text: string })
  | (Base & { kind: "timeline"; items: { when: string; t: string; d?: string; image?: Img }[] })
  | (Base & { kind: "pictures"; images: Img[] })
  | (Base & { kind: "gallery"; images: (Img & { subject: string })[] })
  | (Base & { kind: "map"; href: string; image?: Img })
  | (Base & { kind: "calculator" })
  | (Base & { kind: "booking" })
  | (Base & { kind: "listing"; category?: "investing" | "nathia-gali" | "updates"; author?: string; empty?: string })
  | (Base & { kind: "form"; form: FormKind; about: string });

export type Page = {
  path: string;
  side: Side;
  template: Template;
  /** Name in breadcrumbs and the site map: the client's page-list name. */
  name: string;
  /** Page heading (H1). */
  title: string;
  /** Search and share description, 160 characters at most. */
  description: string;
  /** Opening paragraph under the heading. */
  intro: string;
  eyebrow?: string;
  image?: Img;
  /** Buttons in the opening. */
  actions?: LinkTo[];
  blocks: Block[];
  /** Facts or files the client still has to supply; `npm run check` lists them. */
  pending?: string[];
  /** Articles only. */
  article?: { date: string; author: string; authorSlug: string; category: "investing" | "nathia-gali" | "updates" };
};

/** Block ids each template must contain, in this order (extra blocks may sit between them). */
export const TEMPLATE_PARTS: Record<Template, string[]> = {
  home: ["doors", "projects", "check", "how", "abroad", "latest", "guides", "ask"],
  hub: ["start", "facts", "check", "questions", "ask"],
  project: ["buy", "stands", "documents", "earns", "place", "stay", "questions", "ask"],
  product: ["get", "payment", "how", "papers", "compare", "questions", "ask"],
  payment: ["plan", "calculator", "else", "dates", "questions", "take"],
  proof: ["status", "documents", "timeline", "who", "ask"],
  explainer: ["parts", "promise", "next", "ask"],
  action: ["form", "where"],
  "hotel-home": ["intro", "accommodation", "experience", "place", "destinations", "direct", "own", "questions"],
  accommodation: ["compare", "apartments", "every", "booking", "questions"],
  room: ["pictures", "apartment", "layout", "know", "others"],
  "hotel-content": ["panels", "know", "booking"],
  location: ["facts", "map", "there", "seasons", "guides", "ask"],
  gallery: ["gallery"],
  questions: ["questions", "ask"],
  about: ["story", "people", "group", "documents"],
  listing: ["items"],
  article: ["body", "onward", "more"],
  plain: ["text", "next"],
};
