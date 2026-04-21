import { MockResult } from './categories';
import { getBrandsForItem } from './brandData';

// Helper to generate a consistent pseudo-random price based on query string
const generatePrice = (query: string, base: number) => {
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = query.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variance = (Math.abs(hash) % 40) - 20; // -20 to +20 variance
  return base + variance;
};

const getFallbackProducts = (query: string): MockResult[] => {
  // Approximate base prices for realism based on common items
  let basePrice = 400 + (query.length * 5); 
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("milk")) basePrice = 60;
  else if (lowerQuery.includes("apple") || lowerQuery.includes("phone")) basePrice = 75000;
  else if (lowerQuery.includes("onion") || lowerQuery.includes("potato")) basePrice = 40;
  else if (lowerQuery.includes("rice")) basePrice = 250;
  else if (lowerQuery.includes("shampoo")) basePrice = 350;
  else if (lowerQuery.includes("laptop")) basePrice = 45000;
  else if (lowerQuery.includes("serum")) basePrice = 450;
  else if (lowerQuery.includes("face wash")) basePrice = 250;
  else if (lowerQuery.includes("moisturizer")) basePrice = 400;
  
  // Try to match query with known items to get brands
  let matchedItem: string | null = null;
  const brands = getBrandsForItem(query);
  
  // Check if query matches any known item
  if (brands && brands.length > 0 && brands[0].name !== "Top Rated") {
    // Found specific brands for this item
    matchedItem = query;
  }
  
  // Generate results with or without brand names
  const platforms = [
    { name: "Amazon", link: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` },
    { name: "Flipkart", link: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` },
    { name: "BigBasket", link: `https://www.bigbasket.com/ps/?q=${encodeURIComponent(query)}` },
    { name: "Blinkit", link: `https://blinkit.com/s/?q=${encodeURIComponent(query)}` },
    { name: "JioMart", link: `https://www.jiomart.com/search/${encodeURIComponent(query)}` }
  ];
  
  if (matchedItem && brands.length > 0) {
    // Show brand-specific results
    const results: MockResult[] = [];
    const shuffledBrands = [...brands].sort(() => Math.random() - 0.5).slice(0, 5);
    
    shuffledBrands.forEach((brand, index) => {
      const platform = platforms[index % platforms.length];
      const brandPrice = basePrice + (Math.random() * 100 - 50);
      results.push({
        platform: `${brand.name}`,
        price: `₹${Math.round(brandPrice)}`,
        rating: 4.0 + Math.random() * 0.8,
        delivery: ["Tomorrow", "2 days", "Today", "10 mins", "3 days"][index],
        badge: index === 0 ? "Best Price" : undefined,
        link: platform.link
      });
    });
    
    return results;
  } else {
    // Show platform-based results (no specific brands)
    return [
      { 
        platform: "Amazon", 
        price: `₹${generatePrice(query, basePrice)}`, 
        rating: 4.5, 
        delivery: "Tomorrow", 
        badge: "Best Price", 
        link: `https://www.amazon.in/s?k=${encodeURIComponent(query)}` 
      },
      { 
        platform: "Flipkart", 
        price: `₹${generatePrice(query, basePrice + Math.floor(basePrice*0.05))}`, 
        rating: 4.3, 
        delivery: "2 days", 
        link: `https://www.flipkart.com/search?q=${encodeURIComponent(query)}` 
      },
      { 
        platform: "BigBasket", 
        price: `₹${generatePrice(query, basePrice + Math.floor(basePrice*0.02))}`, 
        rating: 4.4, 
        delivery: "Today, 6 PM", 
        link: `https://www.bigbasket.com/ps/?q=${encodeURIComponent(query)}` 
      },
      { 
        platform: "Blinkit", 
        price: `₹${generatePrice(query, basePrice + Math.floor(basePrice*0.08))}`, 
        rating: 4.2, 
        delivery: "10 mins", 
        badge: "Fastest",
        link: `https://blinkit.com/s/?q=${encodeURIComponent(query)}` 
      },
      { 
        platform: "JioMart", 
        price: `₹${generatePrice(query, basePrice - Math.floor(basePrice*0.03))}`, 
        rating: 4.0, 
        delivery: "Tomorrow", 
        link: `https://www.jiomart.com/search/${encodeURIComponent(query)}` 
      }
    ];
  }
};

const getFallbackTransport = (pickup: string, dropoff: string): MockResult[] => {
  const query = pickup + dropoff;
  const baseFare = 200 + (query.length * 3);
  
  return [
    { platform: "Ola", price: `₹${generatePrice(query, baseFare)}`, rating: 4.2, delivery: "5 mins away", badge: "Cheapest", link: `https://book.olacabs.com/?pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(dropoff)}` },
    { platform: "Uber", price: `₹${generatePrice(query, baseFare + 20)}`, rating: 4.5, delivery: "3 mins away", badge: "Fastest", link: `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff=${encodeURIComponent(dropoff)}` },
    { platform: "Rapido", price: `₹${generatePrice(query, baseFare - 50)}`, rating: 4.0, delivery: "7 mins away", link: `https://www.rapido.bike/` },
    { platform: "InDrive", price: `₹${generatePrice(query, baseFare - 30)}`, rating: 4.1, delivery: "10 mins away", link: `https://indrive.com/` }
  ];
};

export const compareProducts = async (query: string): Promise<MockResult[]> => {
  console.log("compareProducts called with:", query);
  
  // Always use fallback for now to show brand names
  const results = getFallbackProducts(query);
  console.log("Using fallback results with brands:", results);
  return results;
  
  /* Original API call - commented out temporarily
  try {
    const res = await fetch(`/api/compare/product?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return getFallbackProducts(query);
    // If the data is from our unconfigured fallback in the backend, replace it with our dynamic frontend fallback
    if (data[0]?.price === "Demo Mode (Add API Key)") return getFallbackProducts(query);
    return data;
  } catch (error) {
    console.warn("API failed, using dynamic mock data", error);
    return getFallbackProducts(query);
  }
  */
};

export const compareTransport = async (pickup: string, dropoff: string): Promise<MockResult[]> => {
  try {
    const res = await fetch(`/api/compare/transport?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`);
    if (!res.ok) throw new Error('Failed to fetch transport estimates');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return getFallbackTransport(pickup, dropoff);
    if (data[0]?.price === "Demo Mode (Add API Key)") return getFallbackTransport(pickup, dropoff);
    return data;
  } catch (error) {
    console.warn("API failed, using dynamic mock data", error);
    return getFallbackTransport(pickup, dropoff);
  }
};
