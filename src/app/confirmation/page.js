"use client";

import { useEffect } from "react";
import AddToCalendar from "@/components/AddToCalendar";
import ReviewsSection from "@/components/ReviewsSection";

export default function Page() {
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

  return (
    <main className="min-h-screen h-auto px-4">
      <section className="min-h-screen h-auto flex flex-col items-center justify-center">
        <header className="w-full h-full text-center py-12">
          <h2 className="italic">Félicitations pour votre engagement 🔥</h2>

          <div className="flex flex-col items-center w-full">
            <h1 className="text-gray-800 text-3xl md:text-4xl font-bold text-center mt-4">
              Vous êtes presque inscrits...
              <br />
            </h1>

            <h1 className="text-6xl font-bold my-4">
              <span className="text-[#6F00FF]">
                Encore 4 étapes{" "}
                <span className="italic">simples & rapides</span>
              </span>
            </h1>
            <ul className="mt-4 mb-4 disc pl-6 text-md text-gray-500 text-left space-y-8">
              <li className="text-md md:text-lg text-black">
                <span className="font-medium text-2xl text-bold">
                  ÉTAPE 1 :
                </span>{" "}
                <span className="text-[#6F00FF] underline">Vérifier</span> votre
                boîte Mail et récupérez{" "}
                <span className="text-[#6F00FF] underline">vos accès</span>{" "}
                <span className="italic"> (regardez dans vos "spam")</span>
              </li>
              <li className="text-md md:text-lg text-black">
                <span className="font-medium text-2xl text-bold">
                  ÉTAPE 2 :
                </span>{" "}
                Rejoignez{" "}
                <span className="text-[#6F00FF] underline">
                  notre groupe TRTD privé
                </span>{" "}
                pour ne pas rater d'informations captiales{" "}
                <span className="italic">
                  (lien dans le mail de confirmation)
                </span>
              </li>
              <li className="text-md md:text-lg text-black">
                <span className="font-medium text-2xl text-bold">
                  ÉTAPE 3 :
                </span>{" "}
                Ajouter la date à{" "}
                <span className="text-[#6F00FF] underline">
                  {" "}
                  votre calendrier
                </span>
                <AddToCalendar />
              </li>
              <li className="text-md md:text-lg text-black">
                <span className="font-medium text-2xl text-bold">
                  ÉTAPE 4 :
                </span>{" "}
                <span className="text-[#6F00FF] underline"> Regardez</span>{" "}
                cette vidéo de 60 secondes pour confirmer votre participation ↴
              </li>
            </ul>
          </div>

          <div className="mx-auto mt-8 w-full lg:w-[640px] aspect-video">
            <video
              className="w-full h-full"
              src="/VSL-Confirmation.mp4"
              poster="/thumbnail-confirmation.png"
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              webkit-playsinline=""
            />
          </div>
        </header>
        <ReviewsSection />
      </section>
    </main>
  );
}
