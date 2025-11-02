"use client";
import { useEffect } from "react";

export default function ConfirmationPage() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const p = url.searchParams;
    const email = p.get("wj_lead_email") || undefined;
    const firstName = p.get("wj_lead_first_name") || undefined;
    const lastName = p.get("wj_lead_last_name") || undefined;
    const cc = (p.get("wj_lead_phone_country_code") || "").trim();
    const num = (p.get("wj_lead_phone_number") || "").trim();
    const phoneNumber =
      cc || num ? `${cc}${num}`.replace(/\s+/g, "") : undefined;

    const payload = {
      eventName: "CompleteRegistration",
      event_source_url: url.toString(),
      fbp: document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1],
      fbc: document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1],
      fbclid: p.get("fbclid") || undefined,
      email,
      firstName,
      lastName,
      phoneNumber,
    };

    const key = "meta:cr:sent";
    if (sessionStorage.getItem(key)) return;

    const send = async (attempt = 0) => {
      try {
        const r = await fetch("/api/umai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        if (!r.ok) throw new Error("bad_status_" + r.status);
        sessionStorage.setItem(key, "1");
      } catch (e) {
        if (attempt >= 25) return;
        setTimeout(() => send(attempt + 1), attempt === 0 ? 1000 : 3000);
      }
    };

    send();
  }, []);

  return <main>Merci !</main>;
}
