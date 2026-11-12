import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date");
const today = () => new Date().toISOString().slice(0, 10);

/** Availability search form — same shape as the Serene Booking /rooms query. */
export const bookingSchema = z
  .object({
    checkIn: isoDate.refine((d) => d >= today(), "Check-in can't be in the past"),
    checkOut: isoDate,
    adults: z.coerce.number().int().min(1).max(4),
  })
  .refine((v) => v.checkOut > v.checkIn, { path: ["checkOut"], message: "Check-out must be after check-in" });

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingValues = z.output<typeof bookingSchema>;
