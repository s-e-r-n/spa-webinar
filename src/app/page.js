"use client";

import { useEffect } from "react";
import WebinarJamRegistrationBar from "@/components/WbinarJamRegistrationBar";
import WebinarJamForm from "@/components/WebinarJamForm";
import ReviewsSection from "@/components/ReviewsSection";

export default function Page() {
  useEffect(() => {
    const key = "meta:vc:sent";
    if (sessionStorage.getItem(key)) return;

    const url = new URL(window.location.href);
    const p = url.searchParams;

    const payload = {
      eventName: "ViewContent",
      event_source_url: url.toString(),
      fbp: document.cookie.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1],
      fbc: document.cookie.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1],
      fbclid: p.get("fbclid") || undefined,
    };

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
    <main className="min-h-screen h-auto mb-[200px] px-4">
      <div className="fixed inset-x-0 top-0 z-50 bg-[#6f00ff] px-2 ">
        <div className="flex items-center justify-center gap-3 py-2 text-white text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-black leading-none">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inset-0 rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-red-600"></span>
            </span>
            Annonce
          </span>

          <span>
            <span className="font-medium"></span> LIVE le mardi 11 novembre à
            20h précises :{" "}
            <a className="font-extralight" href="#form">
              Je participe moi aussi →
            </a>
          </span>
        </div>
      </div>

      <section className="min-h-screen h-auto flex flex-col items-center justify-center mt-8">
        <header className="bg-neutral-100 w-full h-full text-center py-12">
          <h2 className="italic text-sm lg:text-lg py-2">
            <img src="/ch.svg" className="w-6 h-6 inline mb-0.5  mr-2" />
            Coach, Thérapeutes, Professionnels de l'Accompagnement, Acteurs de
            la Santé en Suisse Romande...
          </h2>

          <h1 className="text-gray-800 text-xl md:text-4xl font-bold leading-tight text-center mt-8">
            Prêt à faire passer votre accompagnement au <br />
            <span className="text-[#6F00FF]">niveau supérieur</span> ?
            <br />
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold my-4">
            Alors regardez <span className="text-[#6f00ff]">cette vidéo</span>{" "}
            maintenant.
          </h1>

          <div className="mx-auto w-full max-w-[640px] aspect-video overflow-hidden bg-black mt-2">
            <video
              className="w-full h-full"
              src="/VSL.mp4"
              poster="/thumbnail.png"
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              webkit-playsinline=""
            />
          </div>
          <p className="mt-4 text-md md:text-lg text-black text-center">
            Webinaire <span className="text-[#6F00FF] underline">Gratuit</span>,{" "}
            présenté par Yannick Gautier <br />
            (+12 ans d'expérience, créateur de la méthode reconnue à
            l'international)
          </p>
        </header>

        <div className="border-b border-neutral-300 h-auto py-8 w-auto lg:w-3xl my-2">
          <p className="mt-4 text-lg md:text-xl text-gray-800 font-bold">
            MASTERCLASS <span className="text-[#6F00FF]">GRATUITE</span>
          </p>
          <ul className="mt-4 mb-4 list-disc pl-6 text-md text-gray-500 space-y-1">
            <li>Protocoles TRTD</li>
            <li>Posture du praticien</li>
            <li>Corrections d’erreurs fréquentes</li>
            <li>Outils pratiques</li>
            <li>Et bien + pour améliorer votre accompagnement ...</li>
          </ul>
          <a
            href="#form"
            className="bg-[#6f00ff] text-white font-bold py-4 px-8 rounded-full uppercase block w-fit mx-auto mt-6"
          >
            Je participe à la masterclass
          </a>
        </div>

        <WebinarJamForm />

        <div className="max-w-[500px] w-full text-left">
          <div className="flex items-center gap-4">
            <img
              src="/pp-yannick.jpg"
              alt="Portrait de Yannick Gautier"
              className="shrink-0 rounded-full w-24 h-24 object-cover"
            />
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-900">
                Yannick Gautier
              </p>
              <p className="text-sm text-gray-500">Votre formateur</p>
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            « Pour moi, il n'y a pas de bonnes ou de mauvaises techniques,
            chacun(e) doit trouver celle qui lui correspond. Le patient doit
            avoir confiance en son thérapeute car le meilleur médicament qui
            soit est l'auto-guérison. Dans ma manière de travailler, je ne vais
            jamais vous « guérir » par contre je vous aiderai à vous guérir.
            Avec la TRTD, notre travail sera de rééquilibrer les déséquilibres
            qui peuvent causer certains maux. »
          </p>
        </div>
        <ReviewsSection />

        <WebinarJamRegistrationBar />
      </section>
    </main>
  );
}
