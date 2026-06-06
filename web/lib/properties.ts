export type Property = {
  slug: string;
  name: string;
  location: string;
  pricePerShare: string; // display string, e.g. "6 lacs"
  rating: number;
  image: string;
  categories: string[];
};

// Mock data for now; will be replaced by a Supabase query in a later phase.
export const properties: Property[] = [
  {
    slug: "villa-azure",
    name: "Villa Azure",
    location: "Alibaug, Maharashtra",
    pricePerShare: "6 lacs",
    rating: 4.8,
    image: "/images/villa-azure.jpg",
    categories: ["beachfront", "villas"],
  },
  {
    slug: "misty-haven",
    name: "The Misty Haven",
    location: "Kasauli, Himachal Pradesh",
    pricePerShare: "5.5 lacs",
    rating: 4.9,
    image: "/images/misty-haven.jpg",
    categories: ["mountains"],
  },
  {
    slug: "lakeview-retreat",
    name: "Lakeview Retreat",
    location: "Naukuchiatal, Uttarakhand",
    pricePerShare: "7 lacs",
    rating: 4.8,
    image: "/images/lakeview-retreat.jpg",
    categories: ["lakeside", "mountains"],
  },
  {
    slug: "casa-solana",
    name: "Casa Solana",
    location: "Anjuna, Goa",
    pricePerShare: "9 lacs",
    rating: 4.7,
    image: "/images/casa-solana.jpg",
    categories: ["beachfront", "villas"],
  },
  {
    slug: "pine-peaks",
    name: "Pine & Peaks",
    location: "Manali, Himachal Pradesh",
    pricePerShare: "4.5 lacs",
    rating: 4.8,
    image: "/images/pine-peaks.jpg",
    categories: ["mountains", "cabins"],
  },
  {
    slug: "saffron-shores",
    name: "Saffron Shores",
    location: "Varkala, Kerala",
    pricePerShare: "7.5 lacs",
    rating: 4.9,
    image: "/images/saffron-shores.jpg",
    categories: ["beachfront"],
  },
  {
    slug: "kumaon-cottage",
    name: "The Kumaon Cottage",
    location: "Mukteshwar, Uttarakhand",
    pricePerShare: "5 lacs",
    rating: 4.8,
    image: "/images/kumaon-cottage.jpg",
    categories: ["cabins", "mountains"],
  },
  {
    slug: "marina-bay",
    name: "Marina Bay House",
    location: "Pondicherry",
    pricePerShare: "6.5 lacs",
    rating: 4.7,
    image: "/images/marina-bay.jpg",
    categories: ["beachfront", "villas"],
  },
];
