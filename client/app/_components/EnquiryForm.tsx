"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { site } from "@/global/constants/site";
import type { FormKind } from "@/global/site/types";
import { enquiryMessage, enquirySchema, FIELDS, SUBMIT, THANKS, type EnquiryValues } from "../_lib/enquiry";

/** One short form for every ask. It opens WhatsApp with the message filled in; nothing is stored on the site. */
export function EnquiryForm({ kind, about }: { kind: FormKind; about: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema(kind)), defaultValues: {} });

  // Dates chosen in the booking bar arrive in the address.
  useEffect(() => {
    if (kind !== "stay") return;
    const q = new URLSearchParams(location.search);
    const get = (k: string) => q.get(k) ?? "";
    if (q.has("checkIn")) reset({ checkIn: get("checkIn"), checkOut: get("checkOut"), guests: get("guests") });
  }, [kind, reset]);

  const onSubmit = (v: EnquiryValues) => {
    window.open(`${site.contact.whatsappHref}?text=${encodeURIComponent(enquiryMessage(kind, about, v))}`, "_blank", "noopener");
    router.push(THANKS[kind]);
  };

  return (
    <form className="ask__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {FIELDS[kind].map((f) => (
        <label key={f.name}>
          {f.label}
          {f.type === "textarea" ? (
            <textarea rows={3} aria-invalid={!!errors[f.name]} {...register(f.name)} />
          ) : (
            <input type={f.type ?? "text"} autoComplete={f.auto} aria-invalid={!!errors[f.name]} {...register(f.name)} />
          )}
          {errors[f.name] && <em role="alert">{errors[f.name]!.message}</em>}
        </label>
      ))}
      <button type="submit" className="btn btn--main">
        {SUBMIT[kind]}
      </button>
      <small>Opens WhatsApp with your message ready to send.</small>
    </form>
  );
}
