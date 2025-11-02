import ReviewCardMd from "./ReviewCardMd";

const REVIEWS = [
  {
    name: "Céline",
    photo: "/avis/celine.png",
    rating: "5.0",
    review: `L’institut Gauthier n’est pas un centre comme les autres 🙏♥️
Centré sur l’humain et ses fabuleuses capacités, il vous accompagne pas à pas dans votre épanouissement personnel.
Développer nos capacités et nos ressources internes, prendre conscience de son potentiel et l’exprimer, nous faire grandir……
Une bienveillance admirable et un altruisme hors du commun.
Toutes les formations proposées sont exemplaires, et nous guident à notre rythme vers l’expression de notre plus haut potentiel.
Merci 😍🙏♥️
`,
  },
  {
    name: "Agathe",
    photo: "/avis/agathe.png",
    rating: "5.0",
    review: `Toujours des formations de qualité et une équipe à l’écoute qui nous accompagne avec beaucoup de sérieux 👍 Un peu de théorie et beaucoup de pratique, des formateurs parmi les meilleurs dans leur domaine, nous sommes accompagnés quelque soit notre niveau et une attention particulière est donnée à la qualité de relation dans le groupe.
intenses, utiles et agréables
Je les recommande vivement!
`,
  },
  {
    name: "Florence",
    photo: "/avis/florence.png",
    rating: "5.0",
    review: `Excellente formation tant pour soi-même que pour aider les autres. Merci
`,
  },

  {
    name: "Joye",
    photo: "/avis/joye.png",
    rating: "5.0",
    review: `Ces techniques ont complètement changé ma vie.
`,
  },
  {
    name: "Ze",
    photo: "/avis/ze.png",
    rating: "5.0",
    review: `Enrichissant pour un développement de capacités personnelles`,
  },
  {
    name: "Murielle",
    photo: "/avis/murielle.png",
    rating: "5.0",
    review: `Super formation. Je vous la conseille`,
  },
  {
    name: "Laetitia",
    photo: "/avis/laetitia.png",
    rating: "5.0",
    review: `Accueillants, ils mettent à l'aise et maîtrisent leurs sujets!`,
  },
];

export default function ReviewsSection() {
  return (
    <section className="flex flex-col items-center gap-6 max-w-3xl mx-auto my-22">
      {REVIEWS.map((r, idx) => (
        <ReviewCardMd
          key={idx}
          name={r.name}
          photo={r.photo}
          review={r.review}
          rating={r.rating}
        />
      ))}
    </section>
  );
}
