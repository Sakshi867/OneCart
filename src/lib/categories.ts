import {
  ShoppingCart, Sparkles, Car, Pill, ShoppingBag, Apple, Milk, Sprout,
  Droplets, Coffee, Eraser, Heart, Scissors, User, Wind, Pencil,
  Shirt, Smartphone, Home, Footprints, Trophy, Book, Palette,
  Briefcase, HelpCircle, Bike, Zap, Users, Map, Clock,
  RefreshCw, HeartPulse, Activity, PlusSquare, Baby, ShieldCheck,
  Leaf, Carrot, Wheat, Package, Brush, Navigation, Share2, 
  Calendar, CreditCard, Syringe, Stethoscope, Thermometer, 
  Bandage, Gamepad, PenTool
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
  itemIcons?: Record<string, typeof ShoppingCart>; // Icons for individual items
  optionIcons?: Record<string, typeof ShoppingCart>; // Icons for options
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
      { 
        id: "fruits-veggies", 
        label: "Fruits & Vegetables", 
        icon: Apple, 
        items: ["Onion", "Potato", "Tomato", "Apple", "Banana"],
        itemIcons: {
          "Onion": Package,
          "Potato": Package,
          "Tomato": Package,
          "Apple": Apple,
          "Banana": Leaf
        },
        options: ["Organic", "Local Farms", "Seasonal", "Bulk Discounts"],
        optionIcons: {
          "Organic": Leaf,
          "Local Farms": Home,
          "Seasonal": Calendar,
          "Bulk Discounts": ShoppingCart
        }
      },
      { 
        id: "dairy-eggs", 
        label: "Dairy & Eggs", 
        icon: Milk, 
        items: ["Milk", "Curd", "Butter", "Cheese", "Paneer", "Eggs"],
        itemIcons: {
          "Milk": Droplets,
          "Curd": Package,
          "Butter": Package,
          "Cheese": Package,
          "Paneer": Package,
          "Eggs": Package
        },
        options: ["Organic Dairy", "Gluten-Free", "Artisanal", "Same-Day Delivery"],
        optionIcons: {
          "Organic Dairy": Leaf,
          "Gluten-Free": Eraser,
          "Artisanal": Brush,
          "Same-Day Delivery": Clock
        }
      },
      { 
        id: "staples-grains", 
        label: "Staples & Grains", 
        icon: Sprout, 
        items: ["Rice", "Wheat", "Dal", "Flour"],
        itemIcons: {
          "Rice": Wheat,
          "Wheat": Wheat,
          "Dal": Package,
          "Flour": Wheat
        },
        options: ["Organic", "Fortified", "Premium Quality", "Value Packs"],
        optionIcons: {
          "Organic": Leaf,
          "Fortified": ShieldCheck,
          "Premium Quality": Trophy,
          "Value Packs": ShoppingCart
        }
      },
      { 
        id: "cooking-essentials", 
        label: "Cooking Essentials", 
        icon: Droplets, 
        items: ["Oil", "Ghee", "Spices", "Salt", "Sugar"],
        itemIcons: {
          "Oil": Droplets,
          "Ghee": Package,
          "Spices": Package,
          "Salt": Package,
          "Sugar": Package
        },
        options: ["Cold Pressed", "Natural", "Premium Blends", "Bulk"],
        optionIcons: {
          "Cold Pressed": Droplets,
          "Natural": Leaf,
          "Premium Blends": Trophy,
          "Bulk": ShoppingCart
        }
      },
      { 
        id: "snacks-beverages", 
        label: "Snacks & Beverages", 
        icon: Coffee, 
        items: ["Chips", "Biscuits", "Juice", "Soft Drinks"],
        itemIcons: {
          "Chips": Package,
          "Biscuits": Package,
          "Juice": Droplets,
          "Soft Drinks": Droplets
        },
        options: ["Healthy", "Gourmet", "International", "Bulk Packs"],
        optionIcons: {
          "Healthy": Heart,
          "Gourmet": Trophy,
          "International": Map,
          "Bulk Packs": ShoppingCart
        }
      },
      { 
        id: "household-cleaning", 
        label: "Household & Cleaning", 
        icon: Eraser, 
        items: ["Detergent", "Soap", "Floor Cleaner"],
        itemIcons: {
          "Detergent": Package,
          "Soap": Package,
          "Floor Cleaner": Package
        },
        options: ["Eco-Friendly", "Antibacterial", "Fragrance-Free", "Concentrated"],
        optionIcons: {
          "Eco-Friendly": Leaf,
          "Antibacterial": ShieldCheck,
          "Fragrance-Free": Eraser,
          "Concentrated": Droplets
        }
      },
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
      { 
        id: "skincare", 
        label: "Skincare", 
        icon: Heart, 
        items: ["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Face Mask"],
        itemIcons: {
          "Face Wash": Droplets,
          "Moisturizer": Package,
          "Sunscreen": ShieldCheck,
          "Serum": Package,
          "Face Mask": Package
        },
        options: ["Organic", "Dermatologist Tested", "Vegan", "Hypoallergenic"],
        optionIcons: {
          "Organic": Leaf,
          "Dermatologist Tested": ShieldCheck,
          "Vegan": Leaf,
          "Hypoallergenic": Heart
        }
      },
      { 
        id: "makeup", 
        label: "Makeup", 
        icon: Palette, 
        items: ["Foundation", "Lipstick", "Mascara", "Eyeliner", "Compact"],
        itemIcons: {
          "Foundation": Package,
          "Lipstick": Package,
          "Mascara": Package,
          "Eyeliner": Package,
          "Compact": Package
        },
        options: ["Long-wear", "Waterproof", "Matte Finish", "Buildable Coverage"],
        optionIcons: {
          "Long-wear": Clock,
          "Waterproof": Droplets,
          "Matte Finish": Package,
          "Buildable Coverage": PlusSquare
        }
      },
      { 
        id: "haircare", 
        label: "Haircare", 
        icon: Scissors, 
        items: ["Shampoo", "Conditioner", "Hair Oil", "Hair Serum", "Hair Mask"],
        itemIcons: {
          "Shampoo": Droplets,
          "Conditioner": Package,
          "Hair Oil": Droplets,
          "Hair Serum": Package,
          "Hair Mask": Package
        },
        options: ["Sulfate-Free", "Paraben-Free", "Color Safe", "For All Hair Types"],
        optionIcons: {
          "Sulfate-Free": Eraser,
          "Paraben-Free": Eraser,
          "Color Safe": Palette,
          "For All Hair Types": Users
        }
      },
      { 
        id: "personal-care", 
        label: "Personal Care", 
        icon: User, 
        items: ["Body Lotion", "Deodorant", "Body Wash", "Hand Cream"],
        itemIcons: {
          "Body Lotion": Package,
          "Deodorant": Package,
          "Body Wash": Droplets,
          "Hand Cream": Package
        },
        options: ["Natural Ingredients", "Fragrance-Free", "Sensitive Skin", "Luxury"],
        optionIcons: {
          "Natural Ingredients": Leaf,
          "Fragrance-Free": Eraser,
          "Sensitive Skin": Heart,
          "Luxury": Trophy
        }
      },
      { 
        id: "fragrances", 
        label: "Fragrances", 
        icon: Wind, 
        items: ["Perfume", "Body Mist", "Eau de Toilette", "Cologne"],
        itemIcons: {
          "Perfume": Package,
          "Body Mist": Droplets,
          "Eau de Toilette": Package,
          "Cologne": Package
        },
        options: ["Long-lasting", "Unisex", "Natural Ingredients", "Luxury"],
        optionIcons: {
          "Long-lasting": Clock,
          "Unisex": Users,
          "Natural Ingredients": Leaf,
          "Luxury": Trophy
        }
      },
      { 
        id: "beauty-tools", 
        label: "Beauty Tools & Accessories", 
        icon: Pencil, 
        items: ["Makeup Brushes", "Sponges", "Tweezers", "Eyelash Curler"],
        itemIcons: {
          "Makeup Brushes": Brush,
          "Sponges": Package,
          "Tweezers": Package,
          "Eyelash Curler": Package
        },
        options: ["Professional Grade", "Synthetic", "Cruelty-Free", "Travel Size"],
        optionIcons: {
          "Professional Grade": Trophy,
          "Synthetic": Package,
          "Cruelty-Free": Heart,
          "Travel Size": Package
        }
      },
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
      { 
        id: "bike", 
        label: "Bike Rides", 
        icon: Bike, 
        tag: "Fastest",
        options: ["Quick Ride", "Delivery", "Inter-city"],
        optionIcons: {
          "Quick Ride": Clock,
          "Delivery": Package,
          "Inter-city": Map
        }
      },
      { 
        id: "auto", 
        label: "Auto Rickshaw", 
        icon: Zap, 
        tag: "Cheapest",
        options: ["Standard", "Premium", "Air-Conditioned"],
        optionIcons: {
          "Standard": Package,
          "Premium": Trophy,
          "Air-Conditioned": Wind
        }
      },
      { 
        id: "cab", 
        label: "Cab", 
        icon: Car, 
        options: ["Mini", "Sedan", "SUV", "Luxury"],
        optionIcons: {
          "Mini": Car,
          "Sedan": Car,
          "SUV": Car,
          "Luxury": Trophy
        }
      },
      { 
        id: "pool", 
        label: "Shared Rides / Pool", 
        icon: Users, 
        tag: "Eco",
        options: ["Pool with Others", "Same Gender", "Women Only"],
        optionIcons: {
          "Pool with Others": Users,
          "Same Gender": User,
          "Women Only": Heart
        }
      },
      { 
        id: "intercity", 
        label: "Intercity Travel", 
        icon: Map, 
        options: ["Bus", "Train", "Flight", "Taxi"],
        optionIcons: {
          "Bus": Package,
          "Train": Activity,
          "Flight": Navigation,
          "Taxi": Car
        }
      },
      { 
        id: "rentals", 
        label: "Rentals", 
        icon: Clock, 
        options: ["Hourly", "Daily", "Weekly", "Monthly"],
        optionIcons: {
          "Hourly": Clock,
          "Daily": Calendar,
          "Weekly": Calendar,
          "Monthly": Calendar
        }
      },
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
      { 
        id: "prescription", 
        label: "Prescription Medicines", 
        icon: Pill, 
        badgeText: "Prescription Required", 
        items: ["Antibiotics", "Pain Relief", "Fever Medicine", "Cough Syrup"],
        itemIcons: {
          "Antibiotics": Pill,
          "Pain Relief": Pill,
          "Fever Medicine": Pill,
          "Cough Syrup": Droplets
        },
        options: ["Same Day Delivery", "Doctor Consultation", "Refill Reminders", "Insurance Claims"],
        optionIcons: {
          "Same Day Delivery": Clock,
          "Doctor Consultation": Stethoscope,
          "Refill Reminders": Calendar,
          "Insurance Claims": ShieldCheck
        }
      },
      { 
        id: "generic", 
        label: "Generic Alternatives", 
        icon: RefreshCw, 
        badgeText: "Save up to 70%", 
        highlight: true, 
        items: ["Generic Paracetamol", "Generic Ibuprofen", "Generic Metformin"],
        itemIcons: {
          "Generic Paracetamol": Pill,
          "Generic Ibuprofen": Pill,
          "Generic Metformin": Pill
        },
        options: ["Brand Comparison", "Price Tracking", "Side Effect Info", "Usage Guidelines"],
        optionIcons: {
          "Brand Comparison": Package,
          "Price Tracking": Activity,
          "Side Effect Info": ShieldCheck,
          "Usage Guidelines": HelpCircle
        }
      },
      { 
        id: "chronic", 
        label: "Chronic Care", 
        icon: HeartPulse, 
        options: ["Diabetes", "BP", "Thyroid", "Cholesterol"],
        optionIcons: {
          "Diabetes": HeartPulse,
          "BP": HeartPulse,
          "Thyroid": HeartPulse,
          "Cholesterol": HeartPulse
        },
        items: ["Diabetes", "BP", "Thyroid", "Cholesterol"],
        itemIcons: {
          "Diabetes": HeartPulse,
          "BP": HeartPulse,
          "Thyroid": HeartPulse,
          "Cholesterol": HeartPulse
        }
      },
      { 
        id: "wellness", 
        label: "Wellness & Immunity", 
        icon: Activity, 
        items: ["Multivitamins", "Vitamin C", "Vitamin D", "Omega-3", "Immunity Boosters"],
        itemIcons: {
          "Multivitamins": Package,
          "Vitamin C": Package,
          "Vitamin D": Package,
          "Omega-3": Package,
          "Immunity Boosters": Heart
        },
        options: ["Subscription", "Lab Tests", "Nutritionist", "Health Tracking"],
        optionIcons: {
          "Subscription": RefreshCw,
          "Lab Tests": Syringe,
          "Nutritionist": User,
          "Health Tracking": Activity
        }
      },
      { 
        id: "first-aid", 
        label: "First Aid & Medical Devices", 
        icon: PlusSquare, 
        items: ["Bandages", "Thermometer", "BP Monitor", "Glucometer", "Antiseptic"],
        itemIcons: {
          "Bandages": Bandage,
          "Thermometer": Thermometer,
          "BP Monitor": HeartPulse,
          "Glucometer": Syringe,
          "Antiseptic": ShieldCheck
        },
        options: ["Emergency Kit", "Home Delivery", "Healthcare Support", "Medical Supplies"],
        optionIcons: {
          "Emergency Kit": Package,
          "Home Delivery": Package,
          "Healthcare Support": User,
          "Medical Supplies": Package
        }
      },
      { 
        id: "baby-women", 
        label: "Baby, Women & Senior Care", 
        icon: Baby, 
        items: ["Baby Care", "Women's Health", "Senior Care", "Maternity Products"],
        itemIcons: {
          "Baby Care": Baby,
          "Women's Health": Heart,
          "Senior Care": User,
          "Maternity Products": Heart
        },
        options: ["Pediatric Care", "Women's Wellness", "Senior Care", "Maternity Support"],
        optionIcons: {
          "Pediatric Care": Baby,
          "Women's Wellness": Heart,
          "Senior Care": User,
          "Maternity Support": Heart
        }
      },
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
      { 
        id: "fashion", 
        label: "Fashion & Apparel", 
        icon: Shirt, 
        items: ["T-Shirts", "Jeans", "Dresses", "Jackets", "Ethnic Wear"],
        itemIcons: {
          "T-Shirts": Shirt,
          "Jeans": Shirt,
          "Dresses": Shirt,
          "Jackets": Shirt,
          "Ethnic Wear": Shirt
        },
        options: ["Size Guide", "Material Info", "Care Instructions", "Style Tips"],
        optionIcons: {
          "Size Guide": Package,
          "Material Info": Package,
          "Care Instructions": HelpCircle,
          "Style Tips": Palette
        }
      },
      { 
        id: "electronics", 
        label: "Electronics & Gadgets", 
        icon: Smartphone, 
        items: ["Mobile Phones", "Earphones", "Smart Watches", "Laptops", "Tablets"],
        itemIcons: {
          "Mobile Phones": Smartphone,
          "Earphones": Package,
          "Smart Watches": Package,
          "Laptops": Package,
          "Tablets": Package
        },
        options: ["Warranty", "Exchange Offers", "EMI Plans", "Extended Warranty"],
        optionIcons: {
          "Warranty": ShieldCheck,
          "Exchange Offers": RefreshCw,
          "EMI Plans": CreditCard,
          "Extended Warranty": ShieldCheck
        }
      },
      { 
        id: "home-kitchen", 
        label: "Home & Kitchen", 
        icon: Home, 
        items: ["Cookware", "Appliances", "Bedding", "Furniture", "Decor"],
        itemIcons: {
          "Cookware": Package,
          "Appliances": Package,
          "Bedding": Package,
          "Furniture": Package,
          "Decor": Palette
        },
        options: ["Assembly", "Installation", "Maintenance", "Customization"],
        optionIcons: {
          "Assembly": Package,
          "Installation": Package,
          "Maintenance": RefreshCw,
          "Customization": PenTool
        }
      },
      { 
        id: "footwear", 
        label: "Footwear & Accessories", 
        icon: Footprints, 
        items: ["Sneakers", "Formal Shoes", "Sandals", "Bags", "Belts"],
        itemIcons: {
          "Sneakers": Package,
          "Formal Shoes": Package,
          "Sandals": Package,
          "Bags": Package,
          "Belts": Package
        },
        options: ["Size Chart", "Material Type", "Comfort Rating", "Durability"],
        optionIcons: {
          "Size Chart": Package,
          "Material Type": Package,
          "Comfort Rating": Heart,
          "Durability": ShieldCheck
        }
      },
      { 
        id: "beauty-personal", 
        label: "Beauty & Personal Care", 
        icon: Sparkles, 
        items: ["Skincare", "Haircare", "Fragrances", "Grooming"],
        itemIcons: {
          "Skincare": Package,
          "Haircare": Package,
          "Fragrances": Package,
          "Grooming": Package
        },
        options: ["Skin Type", "Hair Type", "Sensitivity", "Ingredients"],
        optionIcons: {
          "Skin Type": User,
          "Hair Type": Scissors,
          "Sensitivity": Heart,
          "Ingredients": Leaf
        }
      },
      { 
        id: "sports", 
        label: "Sports", 
        icon: Trophy, 
        items: ["Fitness Equipment", "Sports Shoes", "Yoga Mats", "Sportswear"],
        itemIcons: {
          "Fitness Equipment": Activity,
          "Sports Shoes": Package,
          "Yoga Mats": Package,
          "Sportswear": Shirt
        },
        options: ["Performance", "Durability", "Comfort", "Breathability"],
        optionIcons: {
          "Performance": Trophy,
          "Durability": ShieldCheck,
          "Comfort": Heart,
          "Breathability": Wind
        }
      },
      { 
        id: "books", 
        label: "Books & More", 
        icon: Book, 
        items: ["Fiction", "Non-Fiction", "Stationery", "Toys", "Games"],
        itemIcons: {
          "Fiction": Book,
          "Non-Fiction": Book,
          "Stationery": Package,
          "Toys": Gamepad,
          "Games": Gamepad
        },
        options: ["Reviews", "Author Info", "Reading Level", "Age Group"],
        optionIcons: {
          "Reviews": Users,
          "Author Info": User,
          "Reading Level": Book,
          "Age Group": Users
        }
      },
    ],
  },
};
;
