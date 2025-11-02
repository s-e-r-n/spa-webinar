import Image from "next/image";

export default function ReviewCardMd({
  name,
  photo,
  review,
  rating = "5.0",
  className,
}) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? "text-[#d2ba86]" : "text-gray-400"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 260 245"
        className="w-4.5 h-auto"
        fill="#FBBC05"
      >
        <path d="m56,237 74-228 74,228L10,96h240" />
      </svg>
    </span>
  ));

  return (
    <div className={`w-full md:w-2/3 py-6 ${className}`}>
      <div className="flex items-center space-x-4">
        <Image
          src={photo}
          alt={`Photo de ${name}`}
          loading="lazy"
          width={36}
          height={36}
          className="rounded-full w-10 h-10 object-cover"
        />

        <div>
          <p className="font-medium text-gray-600">{name}</p>
          <div className="flex flex-row items-center">
            <p className="mr-1 mt-px text-gray-600 font-medium">{rating}</p>
            {stars}
          </div>
        </div>
      </div>
      <p className="text-sm mr-1 mt-1 text-gray-600 leading-tight">{review}</p>
    </div>
  );
}
