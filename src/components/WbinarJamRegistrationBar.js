"use client";
import Script from "next/script";

export default function WebinarJamRegistrationBar() {
  return (
    <div suppressHydrationWarning>
      <Script
        src="https://event.webinarjam.com/register/q55pvc7/embed-bar?buttonText=Register&buttonBgColor=%23ffffff&buttonBgOpacity=1&barBgColor=%236f00ff&barBgOpacity=0.7&formTemplate=2&formColor=1"
        strategy="afterInteractive"
      />
    </div>
  );
}
