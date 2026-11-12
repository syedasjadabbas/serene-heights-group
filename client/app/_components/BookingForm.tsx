"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput, type BookingValues } from "../_lib/bookingSchema";
import { HAS_BOOKING } from "@/global/constants/site";
import { openBooking, searchUrl } from "@/global/lib/booking";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

/** Dates + guests → Serene Booking availability, or a pre-filled WhatsApp enquiry until booking is live. */
export function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput, unknown, BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { checkIn: "", checkOut: "", adults: 2 },
  });

  // Default dates are set on the client so server and client markup match.
  useEffect(() => {
    const now = new Date();
    reset({ checkIn: iso(addDays(now, 14)), checkOut: iso(addDays(now, 16)), adults: 2 });
  }, [reset]);

  const onSubmit = (v: BookingValues) => {
    openBooking(searchUrl(v));
  };

  const err = errors.checkIn?.message || errors.checkOut?.message || errors.adults?.message;
  const min = iso(new Date());

  return (
    <form className="booker" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label>
        Check in
        <input type="date" min={min} aria-invalid={!!errors.checkIn} {...register("checkIn")} />
      </label>
      <label>
        Check out
        <input type="date" min={min} aria-invalid={!!errors.checkOut} {...register("checkOut")} />
      </label>
      <label>
        Guests
        <select {...register("adults")}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} adult{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn--white">
        {HAS_BOOKING ? "Check availability" : "Enquire on WhatsApp"} <span className="arr">→</span>
      </button>
      {err && (
        <p className="booker__error" role="alert">
          {err}
        </p>
      )}
    </form>
  );
}
