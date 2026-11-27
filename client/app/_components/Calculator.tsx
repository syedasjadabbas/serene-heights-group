"use client";

import { useState } from "react";
import { plans, site } from "@/global/constants/site";
import { pkr, spoken } from "@/global/lib/format";

/** Published Nathia Gali payment plans, worked out for the unit the visitor picks. */
export function Calculator() {
  const [id, setId] = useState(plans[0].id);
  const [units, setUnits] = useState(1);
  const plan = plans.find((p) => p.id === id)!;
  const isSpu = plan.id === "spu";
  const qty = isSpu ? units : 1;
  const msg = encodeURIComponent(
    `Hello Serene Heights, I'm interested in ${qty > 1 ? `${qty} × ` : ""}the ${plan.area} sq ft ${plan.kind} at ${plan.project}. Please share the payment plan.`,
  );

  return (
    <div className="calc">
      <h3>Payment plan</h3>
      <p>Published plans for Serene Heights Nathia Gali — 30% down, then 36 monthly instalments.</p>
      <div className="calc__plans" role="group" aria-label="Choose a unit">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            className="calc__plan"
            aria-pressed={p.id === id}
            onClick={() => {
              setId(p.id);
              setUnits(1);
            }}
          >
            <strong>{p.area} sq ft</strong>
            <small>{p.id === "spu" ? "Smart Property" : p.kind}</small>
          </button>
        ))}
      </div>

      {isSpu && (
        <div className="calc__units">
          <span>Smart Property Units (50 sq ft each)</span>
          <span className="stepper">
            <button type="button" aria-label="Fewer units" disabled={units <= 1} onClick={() => setUnits((u) => u - 1)}>
              −
            </button>
            <output aria-live="polite">{units}</output>
            <button type="button" aria-label="More units" disabled={units >= 20} onClick={() => setUnits((u) => u + 1)}>
              +
            </button>
          </span>
        </div>
      )}

      <dl className="calc__out">
        <div>
          <dt>Total price</dt>
          <dd>
            {spoken(plan.total * qty)}
            <small>{pkr(plan.total * qty)}</small>
          </dd>
        </div>
        <div>
          <dt>Down payment (30%)</dt>
          <dd>
            {spoken(plan.down * qty)}
            <small>{pkr(plan.down * qty)}</small>
          </dd>
        </div>
        <div>
          <dt>Monthly × 36</dt>
          <dd>
            {spoken(plan.monthly * qty)}
            <small>{pkr(plan.monthly * qty)}</small>
          </dd>
        </div>
      </dl>

      <a className="btn btn--white" href={`${site.contact.whatsappHref}?text=${msg}`} target="_blank" rel="noopener">
        Get this plan on WhatsApp <span className="arr">→</span>
      </a>
      <p className="calc__note">
        Figures as published by the sales team. The team confirms current prices before you book.
      </p>
    </div>
  );
}
