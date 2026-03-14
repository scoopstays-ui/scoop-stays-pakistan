import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";
import property9 from "@/assets/property-9.jpg";
import property10 from "@/assets/property-10.jpg";
import moneyHeist1 from "@/assets/money-heist-1.jpg";
import moneyHeist2 from "@/assets/money-heist-2.jpg";
import moneyHeist3 from "@/assets/money-heist-3.jpg";
import moneyHeist4 from "@/assets/money-heist-4.jpg";
import moneyHeist5 from "@/assets/money-heist-5.jpg";
import moneyHeist6 from "@/assets/money-heist-6.jpg";
import moneyHeist7 from "@/assets/money-heist-7.jpg";
import moneyHeist8 from "@/assets/money-heist-8.jpg";
import moneyHeist9 from "@/assets/money-heist-9.jpg";
import batman1 from "@/assets/batman-1.jpg";
import batman2 from "@/assets/batman-2.jpg";
import batman3 from "@/assets/batman-3.jpg";
import batman4 from "@/assets/batman-4.jpg";
import batman5 from "@/assets/batman-5.jpg";
import batman6 from "@/assets/batman-6.jpg";
import batman7 from "@/assets/batman-7.jpg";
import batman8 from "@/assets/batman-8.jpg";
import batman9 from "@/assets/batman-9.jpg";
import batman10 from "@/assets/batman-10.jpg";

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
  googleMapsEmbed?: string;
}

export const WHATSAPP_URL = "https://wa.me/923165648659";
export const WHATSAPP_BOOKING_URL = "https://wa.me/923165648659?text=Hello%2C%20I%20want%20to%20book%20a%20property%20from%20ScoopStays.";
export const whatsappPropertyUrl = (name: string) =>
  `https://wa.me/923165648659?text=${encodeURIComponent(`Hello, I want to book ${name} from ScoopStays.`)}`;

export const properties: Property[] = [
  {
    id: "kaghan-lodge",
    name: "Kaghan Lodge",
    city: "Murree",
    province: "Punjab",
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
    description: "A stunning mountain lodge nestled in the hills of Murree. Wake up to breathtaking views of pine forests and misty peaks. This handcrafted stone cottage blends traditional architecture with modern luxury.",
    airbnbUrl: "https://airbnb.com/rooms/example1",
    lat: 33.91,
    lng: 73.39,
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
    id: "dha-lahore-apartment",
    name: "Modern 1BR Apartment in DHA Lahore",
    city: "DHA Lahore",
    province: "Punjab",
    price: 12000,
    rating: 4.7,
    reviews: 63,
    guests: 4,
    bedrooms: 1,
    bathrooms: 1,
    image: property2,
    images: [property2, property3, property6],
    type: "Apartment",
    amenities: ["Wi-Fi", "AC", "Kitchen", "Parking", "Gym Access", "Security"],
    description: "A stylish, fully furnished 1-bedroom apartment in DHA Lahore. Modern interiors, secure gated community, and walking distance to restaurants and shopping.",
    lat: 31.47,
    lng: 74.37,
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
    id: "karachi-airport-luxury",
    name: "Luxury Apartment Near Airport Karachi",
    city: "DHA Karachi",
    province: "Sindh",
    price: 28000,
    rating: 4.6,
    reviews: 31,
    guests: 8,
    bedrooms: 3,
    bathrooms: 3,
    image: property5,
    images: [property5, property1, property3],
    type: "Apartment",
    amenities: ["Pool", "Wi-Fi", "AC", "Gym", "Parking", "Sea View", "Security"],
    description: "A luxury apartment in DHA Karachi, minutes from the airport. Premium finishes, sea-facing views, and all modern amenities for business or leisure travelers.",
    lat: 24.85,
    lng: 67.08,
  },
  {
    id: "hunza-scenic",
    name: "Scenic Retreat in Hunza",
    city: "Hunza",
    province: "Gilgit-Baltistan",
    price: 15000,
    rating: 4.9,
    reviews: 76,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: property6,
    images: [property6, property2, property3],
    type: "Guesthouse",
    amenities: ["Mountain View", "Wi-Fi", "Kitchen", "Meals Available", "Guide Service", "Heating"],
    description: "A breathtaking retreat in Hunza Valley with views of Rakaposhi and surrounding peaks. Traditional Hunza architecture with modern comforts for an unforgettable mountain experience.",
    airbnbUrl: "https://airbnb.com/rooms/example6",
    lat: 36.31,
    lng: 74.65,
  },
  {
    id: "bahria-lahore-farmhouse",
    name: "Luxury 2BR Farmhouse in Bahria Town Lahore",
    city: "Bahria Town Lahore",
    province: "Punjab",
    price: 25000,
    rating: 4.8,
    reviews: 44,
    guests: 10,
    bedrooms: 2,
    bathrooms: 2,
    image: property1,
    images: [property1, property4, property2],
    type: "Farmhouse",
    amenities: ["Pool", "BBQ", "Garden", "Wi-Fi", "AC", "Parking", "Security"],
    description: "A luxurious farmhouse in Bahria Town Lahore with private pool, lush green gardens, and spacious interiors. Ideal for family weekends and celebrations.",
    lat: 31.37,
    lng: 74.18,
  },
  {
    id: "bahria-islamabad-stay",
    name: "Comfortable Stay in Bahria Town Islamabad",
    city: "Bahria Town Islamabad",
    province: "Punjab",
    price: 14000,
    rating: 4.7,
    reviews: 38,
    guests: 6,
    bedrooms: 2,
    bathrooms: 2,
    image: property4,
    images: [property4, property5, property6],
    type: "Apartment",
    amenities: ["Wi-Fi", "AC", "Kitchen", "Parking", "Gym", "Security"],
    description: "A well-furnished apartment in Bahria Town Islamabad. Gated community with world-class amenities, perfect for families and business travelers.",
    lat: 33.52,
    lng: 73.09,
  },
  {
    id: "khara-gali-scenic",
    name: "Scenic Stay in Khara Gali",
    city: "Khara Gali",
    province: "KPK",
    price: 10000,
    rating: 4.8,
    reviews: 52,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: property3,
    images: [property3, property6, property2],
    type: "Cabin",
    amenities: ["Mountain View", "Fireplace", "Kitchen", "Heating", "Hiking Trails"],
    description: "A charming cabin in the misty hills of Khara Gali with panoramic mountain views. Perfect for a quiet escape surrounded by lush pine forests.",
    lat: 34.09,
    lng: 73.38,
  },
  {
    id: "abbottabad-comfort",
    name: "Comfortable Stay in Abbottabad",
    city: "Abbottabad",
    province: "KPK",
    price: 11000,
    rating: 4.6,
    reviews: 29,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: property2,
    images: [property2, property5, property1],
    type: "House",
    amenities: ["Wi-Fi", "AC", "Kitchen", "Garden", "Parking"],
    description: "A comfortable and spacious house in Abbottabad's serene neighborhoods. Close to Ilyasi Mosque and Shimla Hill, great for families visiting the region.",
    lat: 34.15,
    lng: 73.22,
  },
  {
    id: "rawalpindi-executive",
    name: "Executive Suite Rawalpindi",
    city: "Rawalpindi",
    province: "Punjab",
    price: 16000,
    rating: 4.5,
    reviews: 34,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: property5,
    images: [property5, property4, property1],
    type: "Apartment",
    amenities: ["Wi-Fi", "AC", "Room Service", "Parking", "Laundry"],
    description: "A premium executive suite in Rawalpindi, close to the airport and major business centers. Fully serviced with daily housekeeping and modern amenities.",
    lat: 33.6,
    lng: 73.05,
  },
  {
    id: "karachi-beach-villa",
    name: "Coastal Villa in Karachi",
    city: "Karachi",
    province: "Sindh",
    price: 32000,
    rating: 4.7,
    reviews: 41,
    guests: 10,
    bedrooms: 4,
    bathrooms: 3,
    image: property6,
    images: [property6, property5, property1],
    type: "Villa",
    amenities: ["Pool", "Beach Access", "Wi-Fi", "AC", "BBQ", "Sea View", "Security"],
    description: "A stunning beachfront villa in Karachi overlooking the Arabian Sea. Perfect for celebrations, retreats, and weekend getaways with family.",
    lat: 24.86,
    lng: 67.0,
  },
  {
    id: "money-heist-theme-apartment-bahria-town-lahore",
    name: "Money Heist Theme 1 Bedroom Apartment | Premium Stay in Bahria Town Lahore",
    city: "Bahria Town Lahore",
    province: "Punjab",
    price: 9000,
    rating: 4.9,
    reviews: 12,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: moneyHeist1,
    images: [moneyHeist1, moneyHeist2, moneyHeist3, moneyHeist4, moneyHeist5, moneyHeist6, moneyHeist7, moneyHeist8, moneyHeist9],
    type: "Apartment",
    amenities: ["High-speed WiFi", "Hot & Cold Water", "Air Conditioning", "Smart TV", "Comfortable Bed", "Fully Furnished", "Kitchen Essentials", "Clean Bathroom", "Secure Building", "Free Parking"],
    description: "Experience a unique stay in our Money Heist themed 1-bedroom apartment located in the prime area of Bahria Town Lahore. This stylish and comfortable apartment is perfect for couples, small families, or business travelers looking for a premium short-term stay. The apartment features modern interiors inspired by the popular Money Heist theme, creating a fun and memorable stay experience. Guests can enjoy a peaceful and secure environment with easy access to restaurants, shopping areas, and major attractions in Bahria Town.",
    lat: 31.37,
    lng: 74.18,
  },
  {
    id: "batman-theme-apartment-bahria-town-lahore",
    name: "Luxury Batman Theme 1BHR Stay (Batman Suite) | Premium Apartment in Bahria Town Lahore",
    city: "Bahria Town Lahore",
    province: "Punjab",
    price: 9000,
    rating: 4.9,
    reviews: 8,
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    image: batman1,
    images: [batman1, batman2, batman3, batman4, batman5, batman6, batman7, batman8, batman9, batman10],
    type: "Apartment",
    amenities: ["High-speed WiFi", "Hot & Cold Water", "Air Conditioning", "Smart TV", "Comfortable Bed", "Fully Furnished", "Kitchen Essentials", "Clean Bathroom", "Secure Building", "Free Parking"],
    description: "Experience a unique stay in our Luxury Batman Theme 1BHR Stay (Batman Suite) located in the prime area of Bahria Town Lahore. This stylish themed apartment is perfect for couples, travelers, or small families looking for a premium short-term stay experience. The suite features a Batman inspired interior design, creating a fun and memorable atmosphere for guests who love unique themed accommodations. Located in Nishtar Commercial, Bahria Town Lahore, the apartment offers easy access to restaurants, cafes, shopping areas, and popular attractions in Bahria Town. Enjoy comfort, privacy, and modern facilities during your stay with ScoopStays.",
    lat: 31.37,
    lng: 74.18,
  },
  {
    id: "pine-tree-house-khara-gali-farmhouse",
    name: "Pine Tree House | 2 Bedroom Farmhouse in 1 Kanal",
    city: "Khara Gali",
    province: "KPK",
    price: 0,
    rating: 4.9,
    reviews: 5,
    guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    image: property1,
    images: [property1, property2, property3, property4, property5, property6, property7, property8, property9, property10],
    type: "Farmhouse",
    amenities: ["High-speed WiFi", "Hot & Cold Water", "Comfortable Bedrooms", "Spacious Living Area", "Kitchen Facilities", "Beautiful Outdoor Space", "Parking Space", "Peaceful Surroundings"],
    description: "Escape to nature and enjoy a peaceful stay at Pine Tree House, a beautiful 2-bedroom farmhouse built on a spacious 1 kanal property surrounded by lush greenery and scenic views. This farmhouse is perfect for families, small groups, or couples looking for a relaxing getaway near Murree and Khara Gali. Guests can enjoy fresh mountain air, privacy, and a comfortable stay away from city noise while still being close to nearby tourist attractions. The farmhouse provides a cozy environment with modern facilities, making it ideal for weekend trips, family vacations, and peaceful retreats.",
    lat: 33.7549479,
    lng: 73.4191821,
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.5!2d73.4189635!3d33.7549479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfdfad7d0a3463%3A0x325b4d3585f47741!2sPine%20Tree%20House!5e0!3m2!1sen!2s!4v1700000000000",
  },
];

export const cities = [...new Set(properties.map((p) => p.city))];
export const propertyTypes = [...new Set(properties.map((p) => p.type))];

export const locations = [
  "Murree",
  "Hunza",
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Bahria Town Lahore",
  "Bahria Town Islamabad",
  "DHA Lahore",
  "DHA Karachi",
  "Abbottabad",
  "Khara Gali",
];
