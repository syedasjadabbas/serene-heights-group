// Enquiry forms: fields, validation, the WhatsApp message and the thank-you page for each kind.
import { z } from "zod";
import type { FormKind } from "../../global/site/types";

type Field = { name: keyof EnquiryValues; label: string; type?: string; auto?: string };
export type EnquiryValues = {
  name?: string;
  phone?: string;
  message?: string;
  date?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  company?: string;
};

const name: Field = { name: "name", label: "Your name", auto: "name" };
const phone: Field = { name: "phone", label: "Phone or WhatsApp", type: "tel", auto: "tel" };

export const FIELDS: Record<FormKind, Field[]> = {
  enquiry: [name, phone, { name: "message", label: "What would you like to know?" }],
  visit: [name, phone, { name: "date", label: "Preferred day", type: "date" }, { name: "message", label: "Anything we should know? (optional)" }],
  stay: [
    name,
    phone,
    { name: "checkIn", label: "Check in", type: "date" },
    { name: "checkOut", label: "Check out", type: "date" },
    { name: "guests", label: "Guests", type: "number" },
  ],
  document: [name, { name: "message", label: "Which document do you need?" }],
  question: [{ name: "message", label: "Your question", type: "textarea" }],
  partner: [name, { name: "company", label: "Company", auto: "organization" }, phone, { name: "message", label: "How would you like to work with us?", type: "textarea" }],
};

export const SUBMIT: Record<FormKind, string> = {
  enquiry: "Send",
  visit: "Book a site visit",
  stay: "Request your dates",
  document: "Send",
  question: "Send",
  partner: "Send",
};

export const THANKS: Record<FormKind, string> = {
  enquiry: "/thank-you/enquiry",
  visit: "/thank-you/site-visit",
  stay: "/thank-you/stay",
  document: "/thank-you/enquiry",
  question: "/thank-you/enquiry",
  partner: "/thank-you/enquiry",
};

const need = (what: string) => z.string({ error: what }).trim().min(1, what);
const tel = z.string({ error: "Enter a phone number" }).trim().regex(/^[+()\d\s-]{7,20}$/, "Enter a phone number");

export function enquirySchema(kind: FormKind) {
  const has = (f: keyof EnquiryValues) => FIELDS[kind].some((x) => x.name === f);
  return z
    .object({
      name: has("name") ? need("Enter your name") : z.string().optional(),
      phone: has("phone") ? tel : z.string().optional(),
      message: has("message") && kind !== "visit" ? need("Tell us in a few words") : z.string().optional(),
      date: has("date") ? need("Choose a day") : z.string().optional(),
      checkIn: has("checkIn") ? need("Choose your arrival") : z.string().optional(),
      checkOut: has("checkOut") ? need("Choose your departure") : z.string().optional(),
      guests: has("guests") ? z.string().regex(/^([1-9]|1\d|20)$/, "Enter 1 to 20 guests") : z.string().optional(),
      company: z.string().optional(),
    })
    .refine((v) => !v.checkIn || !v.checkOut || v.checkOut > v.checkIn, {
      path: ["checkOut"],
      message: "Departure must be after arrival",
    }) as unknown as z.ZodType<EnquiryValues, EnquiryValues>;
}

export function enquiryMessage(kind: FormKind, about: string, v: EnquiryValues) {
  const lines = [`Hello Serene Heights, I am writing about ${about}.`];
  for (const f of FIELDS[kind]) {
    const value = v[f.name]?.trim();
    if (value) lines.push(`${f.label.replace(/ \(optional\)|\?/g, "")}: ${value}`);
  }
  return lines.join("\n");
}
