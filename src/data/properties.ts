import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface Property {
  id: string;
  name: string;
  city: string;
  province: string;
  price: number;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  images: string[];
  type: string;
  amenities: string[];
  description: string;
  airbnbUrl?: string;
  lat: number;
  lng: number;
}

export const properties: Property[] = [
  {
    id: "kaghan-lodge",
    name: "Kaghan Lodge",
    city: "Kaghan Valley",
    province: "KPK",
    price: 18500,
    rating: 4.9,
    reviews: 47,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image: property3,
    images: [property3, property2, property4],
    type: "Lodge",
    amenities: ["Wi-Fi", "Fireplace", "Mountain View", "Kitchen", "Parking", "Heating"],
    description: "A stunning lakeside lodge nestled in the heart of Kaghan Valley. Wake up to breathtaking views of turquoise waters and snow-capped peaks. This handcrafted stone cottage blends traditional architecture with modern luxury.",
    airbnbUrl: "https://airbnb.com/rooms/example1",
    lat: 34.9,
    lng: 73.5,
  },
  {
    id: "islamabad-villa",
    name: "Royal Islamabad Villa",
    city: "Islamabad",
    province: "ICT",
    price: 35000,
    rating: 4.8,
    reviews: 92,
    guests: 12,
    bedrooms: 5,
    bathrooms: 4,
    image: property1,
    images: [property1, property4, property5],
    type: "Villa",
    amenities: ["Pool", "Wi-Fi", "Garden", "BBQ", "Parking", "AC", "Security"],
    description: "An ultra-modern villa in the heart of Islamabad featuring a stunning infinity pool, lush gardens, and contemporary interiors. Perfect for family gatherings or corporate retreats.",
    lat: 33.7,
    lng: 73.0,
  },
  {
    id: "nathia-cabin",
    name: "Pine Forest Cabin",
    city: "Nathia Gali",
    province: "KPK",
    price: 12000,
    rating: 4.7,
    reviews: 63,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: property2,
    images: [property2, property3, property6],
    type: "Cabin",
    amenities: ["Fireplace", "Mountain View", "Kitchen", "Hiking Trails", "Heating"],
    description: "A cozy wooden cabin surrounded by towering pine trees in the misty hills of Nathia Gali. The perfect romantic getaway with warm interiors and panoramic mountain views.",
    airbnbUrl: "https://airbnb.com/rooms/example3",
    lat: 34.07,
    lng: 73.38,
  },
  {
    id: "lahore-haveli",
    name: "Heritage Haveli Suite",
    city: "Lahore",
    province: "Punjab",
    price: 22000,
    rating: 4.9,
    reviews: 118,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: property4,
    images: [property4, property1, property6],
    type: "Heritage",
    amenities: ["Wi-Fi", "AC", "Room Service", "Cultural Tours", "Restaurant", "Parking"],
    description: "Experience the grandeur of Mughal-era architecture in this lovingly restored haveli in old Lahore. Rich textiles, ornate woodwork, and world-class hospitality await.",
    airbnbUrl: "https://airbnb.com/rooms/example4",
    lat: 31.58,
    lng: 74.35,
  },
  {
    id: "gwadar-beach",
    name: "Coastal Retreat",
    city: "Gwadar",
    province: "Balochistan",
    price: 28000,
    rating: 4.6,
    reviews: 31,
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image: property5,
    images: [property5, property1, property3],
    type: "Villa",
    amenities: ["Pool", "Beach Access", "Wi-Fi", "AC", "BBQ", "Sea View"],
    description: "A stunning beachfront villa overlooking the Arabian Sea. Watch spectacular sunsets from the infinity pool while enjoying the serene beauty of Pakistan's coastline.",
    lat: 25.12,
    lng: 62.32,
  },
  {
    id: "kalash-guesthouse",
    name: "Kalash Cultural Stay",
    city: "Chitral",
    province: "KPK",
    price: 8500,
    rating: 4.8,
    reviews: 56,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: property6,
    images: [property6, property2, property3],
    type: "Guesthouse",
    amenities: ["Cultural Experience", "Mountain View", "Meals Included", "Guide Service"],
    description: "Immerse yourself in the vibrant Kalash culture with this unique guesthouse. Colorful traditional architecture meets mountain hospitality in one of Pakistan's most fascinating valleys.",
    airbnbUrl: "https://airbnb.com/rooms/example6",
    lat: 35.7,
    lng: 71.78,
  },
];

export const cities = [...new Set(properties.map((p) => p.city))];
export const propertyTypes = [...new Set(properties.map((p) => p.type))];
