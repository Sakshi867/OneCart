import {
  ShoppingCart, Sparkles, Car, Pill, ShoppingBag, Apple, Milk, Sprout,
  Droplets, Coffee, Eraser, Heart, Scissors, User, Wind, Pencil,
  Shirt, Smartphone, Home, Footprints, Trophy, Book, Palette,
  Briefcase, HelpCircle, Bike, Zap, Users, Map, Clock,
  RefreshCw, HeartPulse, Activity, PlusSquare, Baby, ShieldCheck
} from "lucide-react";
import type { Category } from "@/contexts/CategoryContext";

export interface SubCategory {
  id: string;
  label: string;
  icon: typeof ShoppingCart;
  tag?: string; // e.g., "Cheapest", "Fastest", "Eco"
  badgeText?: string; // e.g., "Prescription Required"
  options?: string[]; // For bottom sheet / modal options
  items?: string[]; // For item list navigation (e.g., ["Onion", "Potato"])
  highlight?: boolean;
}

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
  subcategories?: SubCategory[];
}> = {
  groceries: {
    label: "Groceries — Fresh & Trustworthy",
    emoji: "🥦",
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
    subcategories: [
      { id: "fruits-veggies", label: "Fruits & Vegetables", icon: Apple, items: ["Onion", "Potato", "Tomato", "Apple", "Banana"] },
      { id: "dairy-eggs", label: "Dairy & Eggs", icon: Milk, items: ["Milk", "Curd", "Butter", "Cheese", "Paneer", "Eggs"] },
      { id: "staples-grains", label: "Staples & Grains", icon: Sprout, items: ["Rice", "Wheat", "Dal", "Flour"] },
      { id: "cooking-essentials", label: "Cooking Essentials", icon: Droplets, items: ["Oil", "Ghee", "Spices", "Salt", "Sugar"] },
      { id: "snacks-beverages", label: "Snacks & Beverages", icon: Coffee, items: ["Chips", "Biscuits", "Juice", "Soft Drinks"] },
      { id: "household-cleaning", label: "Household & Cleaning", icon: Eraser, items: ["Detergent", "Soap", "Floor Cleaner"] },
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
    subcategories: [
      { id: "skincare", label: "Skincare", icon: Heart, items: ["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Face Mask"] },
      { id: "makeup", label: "Makeup", icon: Palette, items: ["Foundation", "Lipstick", "Mascara", "Eyeliner", "Compact"] },
      { id: "haircare", label: "Haircare", icon: Scissors, items: ["Shampoo", "Conditioner", "Hair Oil", "Hair Serum", "Hair Mask"] },
      { id: "personal-care", label: "Personal Care", icon: User, items: ["Body Lotion", "Deodorant", "Body Wash", "Hand Cream"] },
      { id: "fragrances", label: "Fragrances", icon: Wind, items: ["Perfume", "Body Mist", "Eau de Toilette", "Cologne"] },
      { id: "beauty-tools", label: "Beauty Tools & Accessories", icon: Pencil, items: ["Makeup Brushes", "Sponges", "Tweezers", "Eyelash Curler"] },
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
    subcategories: [
      { id: "bike", label: "Bike Rides", icon: Bike, tag: "Fastest" },
      { id: "auto", label: "Auto Rickshaw", icon: Zap, tag: "Cheapest" },
      { id: "cab", label: "Cab", icon: Car, options: ["Mini", "Sedan", "SUV"] },
      { id: "pool", label: "Shared Rides / Pool", icon: Users, tag: "Eco" },
      { id: "intercity", label: "Intercity Travel", icon: Map },
      { id: "rentals", label: "Rentals", icon: Clock, options: ["Hourly", "Daily"] },
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
    subcategories: [
      { id: "prescription", label: "Prescription Medicines", icon: Pill, badgeText: "Prescription Required", items: ["Antibiotics", "Pain Relief", "Fever Medicine", "Cough Syrup"] },
      { id: "generic", label: "Generic Alternatives", icon: RefreshCw, badgeText: "Save up to 70%", highlight: true, items: ["Generic Paracetamol", "Generic Ibuprofen", "Generic Metformin"] },
      { id: "chronic", label: "Chronic Care", icon: HeartPulse, options: ["Diabetes", "BP", "Thyroid"], items: ["Diabetes", "BP", "Thyroid", "Cholesterol"] },
      { id: "wellness", label: "Wellness & Immunity", icon: Activity, items: ["Multivitamins", "Vitamin C", "Vitamin D", "Omega-3", "Immunity Boosters"] },
      { id: "first-aid", label: "First Aid & Medical Devices", icon: PlusSquare, items: ["Bandages", "Thermometer", "BP Monitor", "Glucometer", "Antiseptic"] },
      { id: "baby-women", label: "Baby, Women & Senior Care", icon: Baby, items: ["Baby Care", "Women's Health", "Senior Care", "Maternity Products"] },
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
    subcategories: [
      { id: "fashion", label: "Fashion & Apparel", icon: Shirt, items: ["T-Shirts", "Jeans", "Dresses", "Jackets", "Ethnic Wear"] },
      { id: "electronics", label: "Electronics & Gadgets", icon: Smartphone, items: ["Mobile Phones", "Earphones", "Smart Watches", "Laptops", "Tablets"] },
      { id: "home-kitchen", label: "Home & Kitchen", icon: Home, items: ["Cookware", "Appliances", "Bedding", "Furniture", "Decor"] },
      { id: "footwear", label: "Footwear & Accessories", icon: Footprints, items: ["Sneakers", "Formal Shoes", "Sandals", "Bags", "Belts"] },
      { id: "beauty-personal", label: "Beauty & Personal Care", icon: Sparkles, items: ["Skincare", "Haircare", "Fragrances", "Grooming"] },
      { id: "sports", label: "Sports", icon: Trophy, items: ["Fitness Equipment", "Sports Shoes", "Yoga Mats", "Sportswear"] },
      { id: "books", label: "Books & More", icon: Book, items: ["Fiction", "Non-Fiction", "Stationery", "Toys", "Games"] },
    ],
  },
};
;
