import { properties } from "./properties";

export interface Deal {
  propertyId: string;
  label: string;
  originalPrice: number;
  discountedPrice: number;
  badge: string;
}

export const deals: Deal[] = [
  {
    propertyId: "kaghan-lodge",
    label: "Weekend Deal in Murree",
    originalPrice: 18500,
    discountedPrice: 13500,
    badge: "27% OFF",
  },
  {
    propertyId: "hunza-scenic",
    label: "Family Discount in Hunza",
    originalPrice: 15000,
    discountedPrice: 11000,
    badge: "27% OFF",
  },
  {
    propertyId: "dha-lahore-apartment",
    label: "Special Price – DHA Lahore",
    originalPrice: 12000,
    discountedPrice: 8500,
    badge: "29% OFF",
  },
  {
    propertyId: "bahria-lahore-farmhouse",
    label: "Farmhouse Deal – Bahria Town",
    originalPrice: 25000,
    discountedPrice: 18000,
    badge: "28% OFF",
  },
];

export const getDealsWithProperties = () =>
  deals.map((deal) => ({
    ...deal,
    property: properties.find((p) => p.id === deal.propertyId)!,
  })).filter((d) => d.property);
