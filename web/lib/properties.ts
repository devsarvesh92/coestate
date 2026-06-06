export type Property = {
  slug: string;
  name: string;
  location: string;
  pricePerShare: string; // display string, e.g. "6 lacs"
  priceLacs: number; // numeric, for filtering / fee maths
  rating: number;
  reviews: number;
  image: string;
  categories: string[];
  description: string;
  totalShares: number;
  availableShares: number;
};

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

// Mock data for now; will be replaced by a Supabase query in a later phase.
export const properties: Property[] = [
  {
    slug: "villa-azure",
    name: "Villa Azure",
    location: "Alibaug, Maharashtra",
    pricePerShare: "6 lacs",
    priceLacs: 6,
    rating: 4.8,
    reviews: 120,
    image: "/images/villa-azure.jpg",
    categories: ["beachfront", "villas"],
    description:
      "A luxurious 4-bedroom coastal retreat in the serene town of Alibaug. Overlooking the Arabian Sea, with elegant interiors, a private pool and lush gardens.",
    totalShares: 11,
    availableShares: 7,
  },
  {
    slug: "misty-haven",
    name: "The Misty Haven",
    location: "Kasauli, Himachal Pradesh",
    pricePerShare: "5.5 lacs",
    priceLacs: 5.5,
    rating: 4.9,
    reviews: 86,
    image: "/images/misty-haven.jpg",
    categories: ["mountains"],
    description:
      "A cosy mountain home wrapped in pine forest, with panoramic Himalayan views and warm wood interiors — perfect for a quiet escape.",
    totalShares: 11,
    availableShares: 4,
  },
  {
    slug: "lakeview-retreat",
    name: "Lakeview Retreat",
    location: "Naukuchiatal, Uttarakhand",
    pricePerShare: "7 lacs",
    priceLacs: 7,
    rating: 4.8,
    reviews: 64,
    image: "/images/lakeview-retreat.jpg",
    categories: ["lakeside", "mountains"],
    description:
      "A serene lakeside home with floor-to-ceiling windows opening onto the water, modern interiors and a private deck.",
    totalShares: 11,
    availableShares: 9,
  },
  {
    slug: "casa-solana",
    name: "Casa Solana",
    location: "Anjuna, Goa",
    pricePerShare: "9 lacs",
    priceLacs: 9,
    rating: 4.7,
    reviews: 152,
    image: "/images/casa-solana.jpg",
    categories: ["beachfront", "villas"],
    description:
      "A sun-drenched Goan villa minutes from the beach, with a sparkling pool, alfresco dining and breezy open-plan living.",
    totalShares: 11,
    availableShares: 3,
  },
  {
    slug: "pine-peaks",
    name: "Pine & Peaks",
    location: "Manali, Himachal Pradesh",
    pricePerShare: "4.5 lacs",
    priceLacs: 4.5,
    rating: 4.8,
    reviews: 73,
    image: "/images/pine-peaks.jpg",
    categories: ["mountains", "cabins"],
    description:
      "A handcrafted cabin in the heart of Manali with a fireplace, mountain-facing balconies and easy access to the slopes.",
    totalShares: 11,
    availableShares: 6,
  },
  {
    slug: "saffron-shores",
    name: "Saffron Shores",
    location: "Varkala, Kerala",
    pricePerShare: "7.5 lacs",
    priceLacs: 7.5,
    rating: 4.9,
    reviews: 98,
    image: "/images/saffron-shores.jpg",
    categories: ["beachfront"],
    description:
      "A cliffside Kerala home overlooking the Arabian Sea, blending traditional architecture with contemporary comfort.",
    totalShares: 11,
    availableShares: 5,
  },
  {
    slug: "kumaon-cottage",
    name: "The Kumaon Cottage",
    location: "Mukteshwar, Uttarakhand",
    pricePerShare: "5 lacs",
    priceLacs: 5,
    rating: 4.8,
    reviews: 57,
    image: "/images/kumaon-cottage.jpg",
    categories: ["cabins", "mountains"],
    description:
      "A charming stone cottage amid orchards and deodar forests, with sweeping valley views and a sunlit reading nook.",
    totalShares: 11,
    availableShares: 8,
  },
  {
    slug: "marina-bay",
    name: "Marina Bay House",
    location: "Pondicherry",
    pricePerShare: "6.5 lacs",
    priceLacs: 6.5,
    rating: 4.7,
    reviews: 41,
    image: "/images/marina-bay.jpg",
    categories: ["beachfront", "villas"],
    description:
      "A breezy French-quarter home near the promenade, with high ceilings, a courtyard and elegant colonial-era charm.",
    totalShares: 11,
    availableShares: 7,
  },
];
