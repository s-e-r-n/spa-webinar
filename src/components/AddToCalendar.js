"use client";

import dynamic from "next/dynamic";
import { AddToCalendarButton } from "add-to-calendar-button-react";

const ATCB = dynamic(
  () =>
    import("add-to-calendar-button-react").then((m) => m.AddToCalendarButton),
  { ssr: false }
);

export default function AddToCalendar() {
  return (
    <ATCB
      name="Webinaire exclusif TRTD"
      description="Weinaire Live "
      startDate="2025-11-11"
      startTime="20:00"
      endTime="21:30"
      timeZone="Europe/Zurich"
      location="En ligne (lien envoyé par email)"
      options={[
        "Apple",
        "Google",
        "Outlook.com",
        "Microsoft365",
        "Yahoo",
        "MicrosoftTeams",
      ]}
      buttonsList={true}
      listStyle="modal"
      hideTextLabelButton
      trigger="click"
      lightMode="light"
      iCalFileName="webinaire-TRTD"
    />
  );
}
