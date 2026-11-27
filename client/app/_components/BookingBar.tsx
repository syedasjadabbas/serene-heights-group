"use client";

import { useRef, useState } from "react";

/**
 * Dates and guests, then either the Reservations request form (the plan's page) or Serene Booking's results
 * with live availability for the same dates.
 */
export function BookingBar() {
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const go = (online: boolean) => {
    const d = new FormData(form.current!);
    const a = String(d.get("checkIn"));
    const b = String(d.get("checkOut"));
    if (!a || !b || b <= a) return setError("Choose an arrival and a later departure.");
    const guests = d.get("guests");
    location.assign(
      online
        ? `/hotels/nathia-gali/rooms?checkIn=${a}&checkOut=${b}&adults=${guests}`
        : `/hotels/nathia-gali/book?checkIn=${a}&checkOut=${b}&guests=${guests}`,
    );
  };

  return (
    <form
      ref={form}
      className="bookbar"
      onSubmit={(e) => {
        e.preventDefault();
        go(false);
      }}
    >
      <label>
        Check in
        <input type="date" name="checkIn" />
      </label>
      <label>
        Check out
        <input type="date" name="checkOut" />
      </label>
      <label>
        Guests
        <input type="number" name="guests" min={1} max={20} defaultValue={2} />
      </label>
      <button className="btn btn--main">Request your dates</button>
      <button type="button" className="btn btn--ghost" onClick={() => go(true)}>
        Book online
      </button>
      {error && <em role="alert">{error}</em>}
    </form>
  );
}
