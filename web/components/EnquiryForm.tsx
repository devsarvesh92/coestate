"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions/leads";

const initial: LeadState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-sm border border-hairline px-3 py-3.5 text-base outline-none focus:border-ink";

export function EnquiryForm({ property }: { property?: string }) {
  const [state, action, pending] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div className="rounded-md border border-hairline p-8 text-center shadow-card">
        <CheckCircle2 className="mx-auto mb-3 text-[#1aa971]" size={40} />
        <h3 className="text-xl font-semibold">Enquiry received</h3>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-md border border-hairline p-6 shadow-card">
      <input type="hidden" name="type" value={property ? "reservation" : "enquiry"} />
      {property && <input type="hidden" name="property" value={property} />}

      <Field label="Full name" error={state.errors?.name}>
        <input name="name" placeholder="Enter your full name" className={fieldClass} />
      </Field>
      <Field label="Email" error={state.errors?.email}>
        <input name="email" type="email" placeholder="Enter your email address" className={fieldClass} />
      </Field>
      <Field label="Phone" error={state.errors?.phone}>
        <input name="phone" placeholder="Enter your phone number" className={fieldClass} />
      </Field>
      <Field label="I'm interested in">
        <select name="interest" defaultValue="" className={fieldClass}>
          <option value="">Select an option</option>
          <option>Investing in a holiday home</option>
          <option>Booking a stay</option>
          <option>Listing my property</option>
          <option>General enquiry</option>
        </select>
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a bit about what you're looking for..."
          className={`${fieldClass} resize-y`}
        />
      </Field>

      {state.message && !state.ok && (
        <p className="mb-3 text-sm text-[#c13515]">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-rausch px-6 py-3.5 font-medium text-white transition-colors hover:bg-rausch-active disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1 text-[13px] text-[#c13515]">{error}</p>}
    </div>
  );
}
