"use client";

import { useEffect } from "react";
import ReviewsSection from "@/components/ReviewsSection";
import runConfetti from "@/components/runConfetti";

export default function Page() {
  useEffect(() => {
    runConfetti();
  }, []);

  return (
    <main className="min-h-screen h-auto px-4">
      <section className="min-h-screen h-auto flex flex-col items-center justify-center">
        <header className="w-full h-full text-center py-12">
          <h2 className="italic">Merci pour cette soirée incroyable 🔥</h2>

          {/* centré + largeur max */}
          <div className="flex flex-col w-full max-w-[720px] mx-auto">
            <h1 className="text-[#6f00ff] text-3xl md:text-4xl font-bold text-center mt-4">
              Réservez votre session offerte avec moi maintenant. <br />
              <br />
              Mais dépêchez-vous...Les places sont limitées et beaucoup sont
              déjà parties !
              <br />
            </h1>
            <a
              href="https://calendly.com/contact-yannickgautier/nouvelle-reunion"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center my-12 px-7 py-4 rounded-2xl font-semibold text-white
             bg-linear-to-r from-[#6f00ff] to-fuchsia-500 shadow-lg shadow-fuchsia-500/25
             hover:shadow-xl hover:shadow-fuchsia-500/35 transition-all duration-300
             ring-1 ring-white/10 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-400"
            >
              <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-10 transition-opacity" />
              <span>Réserver ma session offerte maintenant</span>
              <span className="ml-2 inline-block translate-y-px transition-transform group-hover:-translate-y-0.5">
                →
              </span>
            </a>
          </div>

          <div className="mx-auto mt-8 w-full lg:w-[640px] aspect-video">
            <video
              className="w-full h-full"
              src="/session.mp4"
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              webkit-playsinline=""
            />
          </div>
          <div className="w-full flex flex-col items-center gap-3"></div>
        </header>
        <ReviewsSection />
      </section>
    </main>
  );
}
