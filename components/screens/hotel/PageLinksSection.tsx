import Link from "next/link";

type link = {
  link: string;
  name: string;
};

export default function PageLinksSection() {
  const cityLinks: link[] = [
    { link: "/hotels-in-agra", name: "Hotels In Agra" },
    { link: "/hotels-in-ajmer", name: "Hotels In Ajmer" },
    { link: "/hotels-in-alwar", name: "Hotels In Alwar" },
    { link: "/hotels-in-amritsar", name: "Hotels In Amritsar" },
    { link: "/hotels-in-biswanath", name: "Hotels In Biswanath" },
    { link: "/hotels-in-chandigarh", name: "Hotels In Chandigarh" },
    { link: "/hotels-in-dalhousie", name: "Hotels In Dalhousie" },
    { link: "/hotels-in-dehradun", name: "Hotels In Dehradun" },
    { link: "/hotels-in-dharamshala", name: "Hotels In Dharamshala" },
    {
      link: "/hotels-in-gautam-budh-nagar(noida)",
      name: "Hotels In Gautam Budh Nagar - Noida",
    },
    { link: "/hotels-in-ghaziabad", name: "Hotels In Ghaziabad" },
    { link: "/hotels-in-goa", name: "Hotels In Goa" },
    { link: "/hotels-in-gurugram", name: "Hotels In Gurugram" },
    { link: "/hotels-in-haridwar", name: "Hotels In Haridwar" },
    { link: "/hotels-in-jaipur", name: "Hotels In Jaipur" },
    { link: "/hotels-in-jim-corbett", name: "Hotels In Jim Corbett" },
    { link: "/hotels-in-jodhpur", name: "Hotels In Jodhpur" },
    { link: "/hotels-in-kasauni", name: "Hotels In Kasauni" },
    { link: "/hotels-in-lucknow", name: "Hotels In Lucknow" },
    { link: "/hotels-in-ludhiana", name: "Hotels In Ludhiana" },
    { link: "/hotels-in-manali", name: "Hotels In Manali" },
    { link: "/hotels-in-mathura", name: "Hotels In Mathura" },
    { link: "/hotels-in-manali", name: "Hotels In Manali" },
    { link: "/hotels-in-mussoorie", name: "Hotels In Mussoorie" },
    { link: "/hotels-in-nainital", name: "Hotels In Nainital" },
    { link: "/hotels-in-new-delhi", name: "Hotels In New Delhi" },
    { link: "/hotels-in-pushkar", name: "Hotels In Pushkar" },
    { link: "/hotels-in-rishikesh", name: "Hotels In Rishikesh" },
    { link: "/hotels-in-shimla", name: "Hotels In Shimla" },
    {
      link: "/hotels-in-srinagar-district",
      name: "Hotels In Srinagar District",
    },
    { link: "/hotels-in-udaipur", name: "Hotels In Udaipur" },
    { link: "/hotels-in-varanasi", name: "Hotels In Varanasi" },
    { link: "/hotels-in-vrindavan", name: "Hotels In Vrindavan" },
    { link: "/hotels-in-zirakpur", name: "Hotels In Zirakpur" },
  ];

  return (
    <div className="wrapper h-full py-5">
      <span className="whitespace-nowrap font-bold text-secondary">
        Search Your City :{" "}
      </span>
      {cityLinks.map((link: any, index: number) => (
        <span key={index} className="text-sm text-gray-700">
          <Link
            title={link.name}
            href={link.link}
            className="font-medium hover:text-secondary"
          >
            {link.name}
          </Link>
          {index < cityLinks.length - 1 && " | "}
        </span>
      ))}
    </div>
  );
}
