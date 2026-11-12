// Booking links. Point at the Serene Booking app when NEXT_PUBLIC_BOOKING_URL is set;
// until then every booking action opens a pre-filled WhatsApp enquiry instead of a dead link.
import { BOOKING_URL, HAS_BOOKING, site } from "@/global/constants/site";

export const whatsapp = (text: string) => `${site.contact.whatsappHref}?text=${encodeURIComponent(text)}`;

export type Stay = { checkIn: string; checkOut: string; adults: number };

const human = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Availability search, optionally for given dates. */
export function searchUrl(stay?: Stay) {
  if (HAS_BOOKING) {
    if (!stay) return `${BOOKING_URL}/rooms`;
    const q = new URLSearchParams({
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      adults: String(stay.adults),
      children: "0",
      rooms: "1",
    });
    return `${BOOKING_URL}/rooms?${q}`;
  }
  return whatsapp(
    stay
      ? `Hello Serene Heights, I'd like to book a hotel apartment in Nathia Gali from ${human(stay.checkIn)} to ${human(stay.checkOut)} for ${stay.adults} adult${stay.adults > 1 ? "s" : ""}. Is it available?`
      : "Hello Serene Heights, I'd like to check availability for a stay in Nathia Gali.",
  );
}

/** A single room type. */
export function roomUrl(room: { slug: string; name: string }) {
  return HAS_BOOKING
    ? `${BOOKING_URL}/rooms/${room.slug}`
    : whatsapp(`Hello Serene Heights, I'm interested in the ${room.name} in Nathia Gali. Could you share availability and rates?`);
}

/** Look up or change an existing booking — only exists once the booking app is live. */
export const manageUrl = HAS_BOOKING ? `${BOOKING_URL}/manage` : null;
