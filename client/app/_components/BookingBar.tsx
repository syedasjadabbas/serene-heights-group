"use client";

import { useState } from "react";

/** Dates and guests → the Reservations page with them filled in. */
export function BookingBar() {
  const [error, setError] = useState("");
  return (
    <form
      className="bookbar"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const a = String(d.get("checkIn"));
        const b = String(d.get("checkOut"));
        if (!a || !b || b <= a) return setError("Choose an arrival and a later departure.");
        location.assign(`/hotels/nathia-gali/book?checkIn=${a}&checkOut=${b}&guests=${d.get("guests")}`);
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
      {error && <em role="alert">{error}</em>}
    </form>
  );
}
