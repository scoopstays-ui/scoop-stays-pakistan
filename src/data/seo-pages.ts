// SEO landing page data: locations, property types, attractions, and auto-generated page combinations

export interface SeoLocation {
  slug: string;
  name: string;
  province: string;
  description: string;
  attractions: string[];
  subLocations?: string[];
}

export interface SeoPropertyType {
  slug: string;
  name: string;
  plural: string;
  keywords: string[];
}

export interface SeoPage {
  slug: string;
  location: SeoLocation;
  propertyType: SeoPropertyType;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const seoLocations: SeoLocation[] = [
  {
    slug: "murree",
    name: "Murree",
    province: "Punjab",
    description: "Murree is one of Pakistan's most popular hill stations, known for its lush green hills, cool weather, and scenic beauty. Located in the Pir Panjal range, it has been a favorite summer retreat for families, couples, and tourists for decades. The town offers stunning views of snow-capped mountains, dense pine forests, and charming colonial-era architecture.",
    attractions: ["Mall Road", "Patriata Chair Lift", "Pindi Point", "Kashmir Point", "Ayubia National Park", "Bhurban"],
    subLocations: ["Murree Mall Road", "Murree Patriata", "Murree Bhurban"],
  },
  {
    slug: "khara-gali",
    name: "Khara Gali",
    province: "KPK",
    description: "Khara Gali is a serene hill station nestled in the Galyat region, offering breathtaking panoramic views of the surrounding valleys and mountains. Known for its peaceful atmosphere and lush pine forests, it's a perfect escape from the hustle of city life. The area is ideal for nature lovers, hikers, and families seeking a quiet mountain retreat.",
    attractions: ["Mushkpuri Top", "Miranjani Trek", "Pipeline Track", "Nathia Gali", "Dunga Gali"],
    subLocations: [],
  },
  {
    slug: "abbottabad",
    name: "Abbottabad",
    province: "KPK",
    description: "Abbottabad is a picturesque city in the Hazara region known for its pleasant climate, educational institutions, and proximity to popular hill stations. The city serves as a gateway to the northern areas of Pakistan and offers comfortable accommodation options for travelers heading to Naran, Kaghan, or the Galyat region.",
    attractions: ["Ilyasi Mosque", "Shimla Hill", "Harnoi Lake", "Sajikot Waterfall", "Thandiani"],
    subLocations: [],
  },
  {
    slug: "hunza",
    name: "Hunza",
    province: "Gilgit-Baltistan",
    description: "Hunza Valley is a breathtaking destination in northern Pakistan, surrounded by towering peaks including Rakaposhi and Ultar Sar. Known for its dramatic landscapes, crystal-clear rivers, and warm hospitality, Hunza attracts adventure seekers and culture enthusiasts from around the world. The valley offers a unique blend of ancient forts, traditional villages, and spectacular natural beauty.",
    attractions: ["Attabad Lake", "Eagle's Nest Viewpoint", "Baltit Fort", "Altit Fort", "Passu Cones", "Borith Lake"],
    subLocations: ["Hunza Karimabad", "Hunza Eagle Nest"],
  },
  {
    slug: "lahore",
    name: "Lahore",
    province: "Punjab",
    description: "Lahore, the cultural capital of Pakistan, is a vibrant city rich in history, art, and culinary traditions. From the majestic Badshahi Mosque to the bustling Food Street, Lahore offers an unforgettable experience for visitors. The city is known for its warm hospitality, stunning Mughal-era architecture, and a thriving arts and entertainment scene.",
    attractions: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens", "Food Street", "Anarkali Bazaar", "Minar-e-Pakistan"],
    subLocations: [],
  },
  {
    slug: "karachi",
    name: "Karachi",
    province: "Sindh",
    description: "Karachi is Pakistan's largest city and economic hub, offering a unique blend of urban energy and coastal beauty. From the beaches of Clifton to the bustling markets of Saddar, Karachi is a city that never sleeps. It's an important destination for business travelers and tourists alike, with diverse dining options, shopping malls, and cultural landmarks.",
    attractions: ["Clifton Beach", "Port Grand", "Mohatta Palace", "Pakistan Monument", "Sea View", "Dolmen Mall"],
    subLocations: [],
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    province: "ICT",
    description: "Islamabad, the capital city of Pakistan, is known for its modern infrastructure, lush green Margalla Hills, and serene environment. The city offers a perfect blend of nature and urban living, with well-planned sectors, beautiful parks, and a growing food and entertainment scene. It's an ideal base for business travelers and those exploring northern Pakistan.",
    attractions: ["Faisal Mosque", "Margalla Hills", "Daman-e-Koh", "Pakistan Monument", "Lok Virsa Museum", "Trail 5"],
    subLocations: [],
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    description: "Rawalpindi, the twin city of Islamabad, is a historic garrison city with vibrant bazaars, colonial-era architecture, and proximity to the capital. The city serves as a major transit point for travelers heading to northern areas and offers affordable accommodation options with easy access to both Islamabad and the motorway network.",
    attractions: ["Raja Bazaar", "Ayub National Park", "Army Museum", "Rawalpindi Cricket Stadium", "Kartarpura Road"],
    subLocations: [],
  },
  {
    slug: "bahria-town-lahore",
    name: "Bahria Town Lahore",
    province: "Punjab",
    description: "Bahria Town Lahore is a premium gated community offering world-class amenities, luxurious properties, and a secure environment. Known for its grand mosque, theme park, and well-maintained infrastructure, it's become a top choice for short-term stays in Lahore. The community offers farmhouses, apartments, and villas suitable for families, events, and corporate retreats.",
    attractions: ["Grand Jamia Mosque", "Bahria Town Theme Park", "Eiffel Tower Replica", "Dancing Fountain", "Cinema"],
    subLocations: ["Bahria Town Sector C", "Bahria Town Sector F"],
  },
  {
    slug: "bahria-town-islamabad",
    name: "Bahria Town Islamabad",
    province: "Punjab",
    description: "Bahria Town Islamabad is one of Pakistan's largest and most well-planned private housing communities. With beautiful parks, commercial areas, and premium residential properties, it offers comfortable short-term stays for families and business travelers. The community is located near the new Islamabad International Airport, making it convenient for transit stays.",
    attractions: ["Bahria Mosque", "Spring Arch Commercial", "Bahria Enclave", "Safari Villas", "The Arena"],
    subLocations: [],
  },
  {
    slug: "dha-lahore",
    name: "DHA Lahore",
    province: "Punjab",
    description: "DHA Lahore is an upscale residential area known for its modern infrastructure, premium restaurants, and secure environment. It's one of the most sought-after locations for short-term stays in Lahore, offering stylish apartments and houses close to shopping centers, hospitals, and entertainment venues.",
    attractions: ["Packages Mall", "DHA Y Block Market", "Syed Maratib Ali Road", "Fortress Stadium", "Liberty Market"],
    subLocations: ["DHA Phase 5 Lahore", "DHA Phase 6 Lahore"],
  },
  {
    slug: "dha-karachi",
    name: "DHA Karachi",
    province: "Sindh",
    description: "DHA Karachi is a premier residential area offering luxurious living with proximity to the Arabian Sea. Known for its wide boulevards, upscale dining, and premium properties, DHA Karachi is ideal for business travelers and tourists looking for comfortable short-term stays near the beach and major commercial areas.",
    attractions: ["Creek Club", "Ocean Mall", "Sea View Beach", "DO Darya", "Karsaz Road"],
    subLocations: [],
  },
];

export const seoPropertyTypes: SeoPropertyType[] = [
  { slug: "farmhouses", name: "Farmhouse", plural: "Farmhouses", keywords: ["farmhouse", "farm house", "farmhouse rental"] },
  { slug: "luxury-stays", name: "Luxury Stay", plural: "Luxury Stays", keywords: ["luxury stay", "luxury rental", "premium accommodation"] },
  { slug: "airbnb-apartments", name: "Airbnb Apartment", plural: "Airbnb Apartments", keywords: ["airbnb", "airbnb apartment", "airbnb alternative"] },
  { slug: "vacation-homes", name: "Vacation Home", plural: "Vacation Homes", keywords: ["vacation home", "holiday home", "vacation rental"] },
  { slug: "short-term-apartments", name: "Short Term Apartment", plural: "Short Term Apartments", keywords: ["short term apartment", "short stay", "temporary apartment"] },
  { slug: "family-apartments", name: "Family Apartment", plural: "Family Apartments", keywords: ["family apartment", "family stay", "family accommodation"] },
  { slug: "1-bedroom-apartments", name: "1 Bedroom Apartment", plural: "1 Bedroom Apartments", keywords: ["1 bedroom", "1br apartment", "one bedroom"] },
  { slug: "2-bedroom-apartments", name: "2 Bedroom Apartment", plural: "2 Bedroom Apartments", keywords: ["2 bedroom", "2br apartment", "two bedroom"] },
  { slug: "luxury-villas", name: "Luxury Villa", plural: "Luxury Villas", keywords: ["luxury villa", "villa rental", "private villa"] },
  { slug: "budget-apartments", name: "Budget Apartment", plural: "Budget Apartments", keywords: ["budget apartment", "affordable stay", "cheap rental"] },
  { slug: "mountain-view-stays", name: "Mountain View Stay", plural: "Mountain View Stays", keywords: ["mountain view", "scenic stay", "hilltop accommodation"] },
  { slug: "vacation-rentals", name: "Vacation Rental", plural: "Vacation Rentals", keywords: ["vacation rental", "holiday rental", "short term rental"] },
];

// Generate all SEO page combinations
export function generateSeoPages(): SeoPage[] {
  const pages: SeoPage[] = [];

  for (const location of seoLocations) {
    for (const propertyType of seoPropertyTypes) {
      const slug = `${location.slug}-${propertyType.slug}`;
      const title = `${propertyType.plural} in ${location.name}`;
      
      pages.push({
        slug,
        location,
        propertyType,
        title,
        metaTitle: `${propertyType.plural} in ${location.name} | ${location.name} Stays | ScoopStays`,
        metaDescription: `Looking for ${propertyType.plural.toLowerCase()} in ${location.name}? ScoopStays offers premium ${propertyType.plural.toLowerCase()}, vacation homes, and apartments in ${location.name}. Book your stay easily through WhatsApp.`,
        h1: `Best ${propertyType.plural} in ${location.name}`,
      });
    }
  }

  return pages;
}

export const allSeoPages = generateSeoPages();

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return allSeoPages.find((p) => p.slug === slug);
}
