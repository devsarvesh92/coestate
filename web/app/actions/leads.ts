"use server";

import { insertLead, isSupabaseConfigured } from "@/lib/supabase";

export type LeadState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "interest", string>>;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const data = {
    type: String(formData.get("type") || "enquiry"),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    interest: String(formData.get("interest") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    property_slug: String(formData.get("property") || "").trim() || null,
  };

  const errors: LeadState["errors"] = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!emailRe.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.phone) errors.phone = "Please enter your phone number.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: "Lead capture isn't connected yet (Supabase keys missing).",
    };
  }

  try {
    await insertLead({
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.interest || null,
      message: data.message || null,
      property_slug: data.property_slug,
    });
  } catch (e) {
    console.error("Lead insert failed:", e);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }

  const first = data.name.split(/\s+/)[0];
  return { ok: true, message: `Thanks, ${first}! Our team will reach out shortly.` };
}
