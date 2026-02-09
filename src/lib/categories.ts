import { ShoppingCart, Sparkles, Car, Pill, ShoppingBag } from "lucide-react";
import type { Category } from "@/contexts/CategoryContext";

export interface MockResult {
  platform: string;
  price: string;
  originalPrice?: string;
  rating: number;
  delivery: string;
  badge?: string;
}

export const categoryConfig: Record<Category, {
  label: string;
  emoji: string;
  icon: typeof ShoppingCart;
  description: string;
  heroText: string;
  searchPlaceholder: string;
  bgClass: string;
  iconColorClass: string;
  mockResults: MockResult[];
  mockQuery: string;
}> = {
  groceries: {
    label: "Groceries — Fresh & Trustworthy",
    emoji: "🛒",
    icon: ShoppingCart,
    description: "Compare grocery prices across platforms with Fresh Mint Market theme",
    heroText: "Find the best deals on everyday essentials with the fresh mint green theme - because saving money shouldn't compromise freshness.",
    searchPlaceholder: "Search for groceries or paste a link...",
    bgClass: "bg-[hsl(var(--cat-groceries-light))] theme-groceries",
    iconColorClass: "text-[hsl(var(--cat-groceries))]",
    mockQuery: "Organic Basmati Rice 5kg",
    mockResults: [
      { platform: "BigBasket", price: "₹425", originalPrice: "₹520", rating: 4.5, delivery: "Today, 6 PM", badge: "Best Price" },
      { platform: "Blinkit", price: "₹449", rating: 4.3, delivery: "10 mins" },
      { platform: "Zepto", price: "₹459", originalPrice: "₹500", rating: 4.2, delivery: "8 mins", badge: "Fastest" },
      { platform: "JioMart", price: "₹470", rating: 4.0, delivery: "Tomorrow" },
    ],
  },
  cosmetics: {
    label: "Cosmetics — Premium & Elegant",
    emoji: "💄",
    icon: Sparkles,
    description: "Compare premium cosmetic prices from verified sources",
    heroText: "Discover premium beauty products with elegant blush and lavender colors - your one-stop for Nykaa-level product trust.",
    searchPlaceholder: "Search for makeup, skincare or brand...",
    bgClass: "bg-[hsl(var(--cat-cosmetics-light))] theme-cosmetics",
    iconColorClass: "text-[hsl(var(--cat-cosmetics))]",
    mockQuery: "Maybelline Fit Me Foundation",
    mockResults: [
      { platform: "Nykaa", price: "₹399", originalPrice: "₹550", rating: 4.6, delivery: "2-3 days", badge: "Best Price" },
      { platform: "Amazon", price: "₹425", rating: 4.4, delivery: "Tomorrow" },
      { platform: "Flipkart", price: "₹449", originalPrice: "₹550", rating: 4.3, delivery: "2 days" },
      { platform: "Myntra", price: "₹475", rating: 4.5, delivery: "3-4 days" },
    ],
  },
  transport: {
    label: "Transport — Smart & Reliable",
    emoji: "🚕",
    icon: Car,
    description: "Compare smart transport fares with reliable blue theme",
    heroText: "Make smart transportation decisions with our reliable sky blue theme - perfect for comparing fares and routes.",
    searchPlaceholder: "Enter pickup and destination...",
    bgClass: "bg-[hsl(var(--cat-transport-light))] theme-transport",
    iconColorClass: "text-[hsl(var(--cat-transport))]",
    mockQuery: "Connaught Place → IGI Airport",
    mockResults: [
      { platform: "Ola", price: "₹320", rating: 4.2, delivery: "4 min away", badge: "Cheapest" },
      { platform: "Uber", price: "₹345", rating: 4.5, delivery: "2 min away", badge: "Nearest" },
      { platform: "Rapido", price: "₹280", rating: 4.0, delivery: "6 min away" },
      { platform: "InDrive", price: "₹310", rating: 3.9, delivery: "5 min away" },
    ],
  },
  medicines: {
    label: "Medicines — Calm & Safe",
    emoji: "💊",
    icon: Pill,
    description: "Compare medicine prices from verified pharmacies",
    heroText: "Find affordable medicines with our calming teal theme - because health decisions deserve trust and peace of mind.",
    searchPlaceholder: "Search for medicines or health products...",
    bgClass: "bg-[hsl(var(--cat-medicines-light))] theme-medicines",
    iconColorClass: "text-[hsl(var(--cat-medicines))]",
    mockQuery: "Dolo 650mg (Strip of 15)",
    mockResults: [
      { platform: "PharmEasy", price: "₹28", originalPrice: "₹35", rating: 4.4, delivery: "Tomorrow", badge: "Best Price" },
      { platform: "1mg", price: "₹30", rating: 4.5, delivery: "Same Day" },
      { platform: "Netmeds", price: "₹31", originalPrice: "₹35", rating: 4.2, delivery: "2 days" },
      { platform: "Apollo 24|7", price: "₹33", rating: 4.6, delivery: "Today", badge: "Trusted" },
    ],
  },
  shopping: {
    label: "Shopping — Warm & Versatile",
    emoji: "🛍",
    icon: ShoppingBag,
    description: "Compare shopping prices across platforms with warm peach theme",
    heroText: "Shop smarter with our warm peach commerce theme - perfect for finding the best deals across all categories.",
    searchPlaceholder: "Search for products or paste links...",
    bgClass: "bg-[hsl(var(--cat-shopping-light))] theme-shopping",
    iconColorClass: "text-[hsl(var(--cat-shopping))]",
    mockQuery: "Sony WH-1000XM5 Headphones",
    mockResults: [
      { platform: "Amazon", price: "₹22,990", originalPrice: "₹29,990", rating: 4.7, delivery: "Tomorrow", badge: "Best Price" },
      { platform: "Flipkart", price: "₹23,499", rating: 4.6, delivery: "2 days" },
      { platform: "Croma", price: "₹24,990", originalPrice: "₹29,990", rating: 4.5, delivery: "3-5 days" },
      { platform: "Reliance Digital", price: "₹25,490", rating: 4.4, delivery: "4-6 days" },
    ],
  },
};
