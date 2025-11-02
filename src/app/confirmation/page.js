import AddToCalendar from "@/components/AddToCalendar";
import ReviewsSection from "@/components/ReviewsSection";

export default function Page() {
  return (
    <main className="min-h-screen h-auto">
      <section className="min-h-screen h-auto flex flex-col items-center justify-center">
        <header className="w-full h-full text-center py-12">
          <h2 className="italic">Félicitations pour votre engagement 🔥</h2>

          <div className="flex flex-col items-center w-full">
            <h1 className="text-gray-800 text-6xl font-bold leading-tight text-center">
              Vous avez presque terminé...
              <br />
              <span className="text-[#6F00FF]">
                Encore 3 étapes{" "}
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
                Ajouter la date à{" "}
                <span className="text-[#6F00FF] underline">
                  {" "}
                  votre calendrier
                </span>
                <AddToCalendar />
              </li>
              <li className="text-md md:text-lg text-black">
                <span className="font-medium text-2xl text-bold">
                  ÉTAPE 3 :
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
