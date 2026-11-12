"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { investorReasons, plans, site } from "@/global/constants/site";
import { pkr, spoken } from "@/global/lib/format";

gsap.registerPlugin(ScrollTrigger);

function Calculator() {
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
        Figures as published by the sales team. Smart Property returns of 13–15% a year are the developer&apos;s
        projection and are not guaranteed. Serene Heights Lahore smart property starts from PKR 2 million — ask for the
        current plan.
      </p>
    </div>
  );
}

export function Investors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".investors .section-head > *", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".calc, .reason", {
          y: 60,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".inv", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="investors" className="investors light" data-nav="light" aria-labelledby="investors-title">
      <div className="section-head">
        <div>
          <span className="eyebrow">Serene Investors</span>
          <h2 id="investors-title" className="display">
            Own a share
            <br />
            <span className="soft">of the heights.</span>
          </h2>
        </div>
        <p>
          Smart Property Units let you own part of a working hotel — fully managed, with profit shared every quarter.
          Or own a whole apartment, with nights reserved for you each year.
        </p>
      </div>

      <div className="inv">
        <Calculator />
        <div className="reasons">
          {investorReasons.map((r, i) => (
            <div className="reason" key={r.t}>
              <i>0{i + 1}</i>
              <div>
                <b>{r.t}</b>
                <p>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
