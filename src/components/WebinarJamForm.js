"use client";
import Script from "next/script";

export default function WebinarJamForm() {
  return (
    <div
      id="form"
      className="wj-embed-wrapper"
      data-webinar-hash="q55pvc7"
      suppressHydrationWarning
      style={{ minHeight: 220 }}
    >
      <Script
        src="https://event.webinarjam.com/register/q55pvc7/embed-form?formButtonText=OUI%2C%20JE%20PARTICIPE%20MOI%20AUSSI&formAccentColor=%236f00ff&formAccentOpacity=1&formBgColor=%23ffffff&formBgOpacity=0"
        strategy="afterInteractive"
      />
    </div>
  );
}
