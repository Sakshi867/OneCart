import {
  ShoppingCart, Sparkles, Car, Pill, ShoppingBag, Apple, Milk, Sprout,
  Droplets, Coffee, Eraser, Heart, Scissors, User, Wind, Pencil,
  Shirt, Smartphone, Home, Footprints, Trophy, Book, Palette,
  Briefcase, HelpCircle, Bike, Zap, Users, Map, Clock,
  RefreshCw, HeartPulse, Activity, PlusSquare, ShieldCheck,
  Leaf, Carrot, Wheat, Package, Brush, Navigation, Share2,
  Calendar, CreditCard, Syringe, Stethoscope, Thermometer,
  Bandage, Gamepad, PenTool, Bus, Train, Plane,
  UtensilsCrossed, Fish, Egg, Cookie, Candy, IceCream,
  Soup, Beer, Wine, GlassWater, Sandwich, Pizza, Salad,
  SprayCan, Bath, Wand2, Gem, Flower2, Citrus,
  Banana, Cherry, Grape, Drumstick, Beef, Croissant, Cake,
  Train as TrainIcon, Bus as BusIcon, Car as CarIcon, Bike as BikeIcon,
  Snowflake, Crown, Tag, DollarSign, Star, Bolt, Armchair,
  Lock, Coins, Percent, Flame, Award, Clock as ClockIcon,
  FileText, Siren, Baby, Wind as WindIcon
} from "lucide-react";
import type { Category } from "@/contexts/CategoryContext";

export interface SubCategory {
  id: string;
  label: string;
  icon: typeof ShoppingCart;
  emoji?: string; // Emoji symbol for display
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
  link?: string;
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
      { platform: "BigBasket", price: "₹425", originalPrice: "₹520", rating: 4.5, delivery: "Today, 6 PM", badge: "Best Price", link: "https://www.bigbasket.com/ps/?q=Organic%20Basmati%20Rice" },
      { platform: "Blinkit", price: "₹449", rating: 4.3, delivery: "10 mins", link: "https://blinkit.com/s/?q=Basmati%20Rice" },
      { platform: "Zepto", price: "₹459", originalPrice: "₹500", rating: 4.2, delivery: "8 mins", badge: "Fastest", link: "https://www.zeptonow.com/search?q=Basmati%20Rice" },
      { platform: "JioMart", price: "₹470", rating: 4.0, delivery: "Tomorrow", link: "https://www.jiomart.com/search/Organic%20Basmati%20Rice" },
    ],
    subcategories: [
      { 
        id: "fruits-veggies", 
        label: "Fruits & Vegetables", 
        emoji: "🥗",
        icon: Apple, 
        items: ["Onion", "Potato", "Tomato", "Apple", "Banana"],
        itemIcons: {
          "Onion": Sprout,
          "Potato": Sprout,
          "Tomato": Citrus,
          "Apple": Apple,
          "Banana": Banana
        },
        options: ["Organic", "Fresh", "Frozen", "Budget", "Premium", "Bulk"],
        optionIcons: {
          "Organic": Leaf,
          "Fresh": Star,
          "Frozen": Snowflake,
          "Budget": DollarSign,
          "Premium": Crown,
          "Bulk": Package
        }
      },
      { 
        id: "dairy-eggs", 
        label: "Dairy & Eggs", 
        emoji: "🥛",
        icon: Milk, 
        items: ["Milk", "Curd", "Butter", "Cheese", "Paneer", "Eggs"],
        itemIcons: {
          "Milk": Milk,
          "Curd": Package,
          "Butter": Package,
          "Cheese": Package,
          "Paneer": Package,
          "Eggs": Egg
        },
        options: ["Organic", "Fresh", "Premium", "Budget"],
        optionIcons: {
          "Organic": Leaf,
          "Fresh": Star,
          "Premium": Crown,
          "Budget": DollarSign
        }
      },
      { 
        id: "staples-grains", 
        label: "Staples & Grains", 
        emoji: "🌾",
        icon: Sprout, 
        items: ["Rice", "Wheat", "Dal", "Flour"],
        itemIcons: {
          "Rice": Wheat,
          "Wheat": Wheat,
          "Dal": Sprout,
          "Flour": Wheat
        },
        options: ["Organic", "Premium", "Bulk", "Budget"],
        optionIcons: {
          "Organic": Leaf,
          "Premium": Crown,
          "Bulk": Package,
          "Budget": DollarSign
        }
      },
      { 
        id: "cooking-essentials", 
        label: "Cooking Essentials", 
        emoji: "🍳",
        icon: UtensilsCrossed, 
        items: ["Oil", "Ghee", "Spices", "Salt", "Sugar"],
        itemIcons: {
          "Oil": Droplets,
          "Ghee": Package,
          "Spices": Package,
          "Salt": Package,
          "Sugar": Candy
        },
        options: ["Premium", "Organic", "Bulk", "Budget"],
        optionIcons: {
          "Premium": Crown,
          "Organic": Leaf,
          "Bulk": Package,
          "Budget": DollarSign
        }
      },
      { 
        id: "snacks-beverages", 
        label: "Snacks & Beverages", 
        emoji: "🥤",
        icon: Coffee, 
        items: ["Chips", "Biscuits", "Juice", "Soft Drinks"],
        itemIcons: {
          "Chips": Cookie,
          "Biscuits": Cookie,
          "Juice": GlassWater,
          "Soft Drinks": GlassWater
        },
        options: ["Fresh", "Premium", "Budget", "Bulk"],
        optionIcons: {
          "Fresh": Star,
          "Premium": Crown,
          "Budget": DollarSign,
          "Bulk": Package
        }
      },
      { 
        id: "household-cleaning", 
        label: "Household & Cleaning", 
        emoji: "🧽",
        icon: SprayCan, 
        items: ["Detergent", "Soap", "Floor Cleaner"],
        itemIcons: {
          "Detergent": SprayCan,
          "Soap": Bath,
          "Floor Cleaner": SprayCan
        },
        options: ["Organic", "Premium", "Budget", "Bulk"],
        optionIcons: {
          "Organic": Leaf,
          "Premium": Crown,
          "Budget": DollarSign,
          "Bulk": Package
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
      { platform: "Nykaa", price: "₹399", originalPrice: "₹550", rating: 4.6, delivery: "2-3 days", badge: "Best Price", link: "https://www.nykaa.com/search/result/?q=Maybelline%20Fit%20Me%20Foundation" },
      { platform: "Amazon", price: "₹425", rating: 4.4, delivery: "Tomorrow", link: "https://www.amazon.in/s?k=Maybelline+Fit+Me+Foundation" },
      { platform: "Flipkart", price: "₹449", originalPrice: "₹550", rating: 4.3, delivery: "2 days", link: "https://www.flipkart.com/search?q=Maybelline%20Fit%20Me%20Foundation" },
      { platform: "Myntra", price: "₹475", rating: 4.5, delivery: "3-4 days", link: "https://www.myntra.com/maybelline-fit-me-foundation" },
    ],
    subcategories: [
      { 
        id: "skincare", 
        label: "Skincare", 
        emoji: "🧴",
        icon: Heart, 
        items: ["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Face Mask"],
        itemIcons: {
          "Face Wash": Droplets,
          "Moisturizer": Droplets,
          "Sunscreen": ShieldCheck,
          "Serum": Droplets,
          "Face Mask": Package
        },
        options: ["Natural", "Luxury", "Sensitive", "Vegan", "Dermatology"],
        optionIcons: {
          "Natural": Leaf,
          "Luxury": Gem,
          "Sensitive": ShieldCheck,
          "Vegan": Leaf,
          "Dermatology": PlusSquare
        }
      },
      { 
        id: "makeup", 
        label: "Makeup", 
        emoji: "💄",
        icon: Palette, 
        items: ["Foundation", "Lipstick", "Mascara", "Eyeliner", "Compact"],
        itemIcons: {
          "Foundation": Package,
          "Lipstick": Wand2,
          "Mascara": Wand2,
          "Eyeliner": Pencil,
          "Compact": Package
        },
        options: ["Trending", "New", "Best Sellers", "Luxury"],
        optionIcons: {
          "Trending": Flame,
          "New": Star,
          "Best Sellers": Award,
          "Luxury": Gem
        }
      },
      { 
        id: "haircare", 
        label: "Haircare", 
        emoji: "💇‍♀️",
        icon: Scissors, 
        items: ["Shampoo", "Conditioner", "Hair Oil", "Hair Serum", "Hair Mask"],
        itemIcons: {
          "Shampoo": Droplets,
          "Conditioner": Droplets,
          "Hair Oil": Droplets,
          "Hair Serum": Droplets,
          "Hair Mask": Droplets
        },
        options: ["Natural", "Premium", "Sensitive", "Vegan"],
        optionIcons: {
          "Natural": Leaf,
          "Premium": Crown,
          "Sensitive": ShieldCheck,
          "Vegan": Leaf
        }
      },
      { 
        id: "personal-care", 
        label: "Personal Care", 
        emoji: "🧼",
        icon: User, 
        items: ["Body Lotion", "Deodorant", "Body Wash", "Hand Cream"],
        itemIcons: {
          "Body Lotion": Droplets,
          "Deodorant": SprayCan,
          "Body Wash": Droplets,
          "Hand Cream": Droplets
        },
        options: ["Natural", "Luxury", "Sensitive", "Vegan"],
        optionIcons: {
          "Natural": Leaf,
          "Luxury": Gem,
          "Sensitive": ShieldCheck,
          "Vegan": Leaf
        }
      },
      { 
        id: "fragrances", 
        label: "Fragrances", 
        emoji: "🌸",
        icon: Wind, 
        items: ["Perfume", "Body Mist", "Eau de Toilette", "Cologne"],
        itemIcons: {
          "Perfume": SprayCan,
          "Body Mist": SprayCan,
          "Eau de Toilette": SprayCan,
          "Cologne": SprayCan
        },
        options: ["Luxury", "Natural", "Long-lasting"],
        optionIcons: {
          "Luxury": Gem,
          "Natural": Leaf,
          "Long-lasting": ClockIcon
        }
      },
      { 
        id: "beauty-tools", 
        label: "Beauty Tools & Accessories", 
        emoji: "🪮",
        icon: Pencil, 
        items: ["Makeup Brushes", "Sponges", "Tweezers", "Eyelash Curler"],
        itemIcons: {
          "Makeup Brushes": Brush,
          "Sponges": Package,
          "Tweezers": Package,
          "Eyelash Curler": Package
        },
        options: ["Premium", "Natural", "Sensitive"],
        optionIcons: {
          "Premium": Crown,
          "Natural": Leaf,
          "Sensitive": ShieldCheck
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
      { platform: "Ola", price: "₹320", rating: 4.2, delivery: "4 min away", badge: "Cheapest", link: "https://book.olacabs.com/" },
      { platform: "Uber", price: "₹345", rating: 4.5, delivery: "2 min away", badge: "Nearest", link: "https://m.uber.com/looking" },
      { platform: "Rapido", price: "₹280", rating: 4.0, delivery: "6 min away", link: "https://www.rapido.bike/" },
      { platform: "InDrive", price: "₹310", rating: 3.9, delivery: "5 min away", link: "https://indrive.com/" },
    ],
    subcategories: [
      { 
        id: "bike", 
        label: "Bike Rides", 
        emoji: "🏍️",
        icon: BikeIcon, 
        tag: "Fastest",
        options: ["Fast", "Cheap", "Shared", "Private"],
        optionIcons: {
          "Fast": Bolt,
          "Cheap": Coins,
          "Shared": Users,
          "Private": Lock
        }
      },
      { 
        id: "auto", 
        label: "Auto Rickshaw", 
        emoji: "🛺",
        icon: Zap, 
        tag: "Cheapest",
        options: ["Cheap", "Fast", "Comfort"],
        optionIcons: {
          "Cheap": Coins,
          "Fast": Bolt,
          "Comfort": Armchair
        }
      },
      { 
        id: "cab", 
        label: "Cab", 
        emoji: "🚖",
        icon: CarIcon, 
        options: ["Cheap", "Fast", "Comfort", "Private"],
        optionIcons: {
          "Cheap": Coins,
          "Fast": Bolt,
          "Comfort": Armchair,
          "Private": Lock
        }
      },
      { 
        id: "shared", 
        label: "Shared Rides", 
        emoji: "👥",
        icon: Users, 
        tag: "Eco",
        options: ["Shared", "Cheap", "Comfort"],
        optionIcons: {
          "Shared": Users,
          "Cheap": Coins,
          "Comfort": Armchair
        }
      },
      { 
        id: "eco", 
        label: "Eco", 
        emoji: "🚗",
        icon: Leaf,
        tag: "Eco-Friendly",
        options: ["Electric", "Hybrid", "CNG"],
        optionIcons: {
          "Electric": Zap,
          "Hybrid": Leaf,
          "CNG": WindIcon
        }
      },
      { 
        id: "intercity", 
        label: "Intercity Travel", 
        emoji: "🚌",
        icon: Map, 
        options: ["Bus", "Train", "Flight"],
        optionIcons: {
          "Bus": BusIcon,
          "Train": TrainIcon,
          "Flight": Plane
        }
      },
      { 
        id: "rentals", 
        label: "Rentals", 
        emoji: "🚘",
        icon: ClockIcon, 
        options: ["Fast", "Comfort", "Private"],
        optionIcons: {
          "Fast": Bolt,
          "Comfort": Armchair,
          "Private": Lock
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
      { platform: "PharmEasy", price: "₹28", originalPrice: "₹35", rating: 4.4, delivery: "Tomorrow", badge: "Best Price", link: "https://pharmeasy.in/search/all?name=Dolo%20650" },
      { platform: "1mg", price: "₹30", rating: 4.5, delivery: "Same Day", link: "https://www.1mg.com/search/all?name=Dolo%20650" },
      { platform: "Netmeds", price: "₹31", originalPrice: "₹35", rating: 4.2, delivery: "2 days", link: "https://www.netmeds.com/catalogsearch/result/Dolo%20650" },
      { platform: "Apollo 24|7", price: "₹33", rating: 4.6, delivery: "Today", badge: "Trusted", link: "https://www.apollo247.com/search?q=Dolo%20650" },
    ],
    subcategories: [
      { 
        id: "prescription", 
        label: "Prescription Medicines", 
        emoji: "💊",
        icon: Pill, 
        badgeText: "Prescription Required", 
        items: ["Antibiotics", "Pain Relief", "Fever Medicine", "Cough Syrup"],
        itemIcons: {
          "Antibiotics": Pill,
          "Pain Relief": Pill,
          "Fever Medicine": Thermometer,
          "Cough Syrup": Droplets
        },
        options: ["Prescription", "OTC", "Emergency", "Daily"],
        optionIcons: {
          "Prescription": FileText,
          "OTC": Pill,
          "Emergency": Siren,
          "Daily": Calendar
        }
      },
      { 
        id: "generic", 
        label: "Generic Alternatives", 
        emoji: "🔁",
        icon: RefreshCw,
        badgeText: "Save up to 70%",
        highlight: true, 
        items: ["Generic Paracetamol", "Generic Ibuprofen", "Generic Metformin"],
        itemIcons: {
          "Generic Paracetamol": Pill,
          "Generic Ibuprofen": Pill,
          "Generic Metformin": Pill
        },
        options: ["Budget", "Premium", "OTC", "Daily"],
        optionIcons: {
          "Budget": DollarSign,
          "Premium": Crown,
          "OTC": Pill,
          "Daily": Calendar
        }
      },
      { 
        id: "chronic", 
        label: "Chronic Care", 
        emoji: "♾️",
        icon: HeartPulse, 
        options: ["Daily", "Prescription", "Emergency"],
        optionIcons: {
          "Daily": Calendar,
          "Prescription": FileText,
          "Emergency": Siren
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
        emoji: "🛡️",
        icon: Activity, 
        items: ["Multivitamins", "Vitamin C", "Vitamin D", "Omega-3", "Immunity Boosters"],
        itemIcons: {
          "Multivitamins": Pill,
          "Vitamin C": Citrus,
          "Vitamin D": Droplets,
          "Omega-3": Fish,
          "Immunity Boosters": Heart
        },
        options: ["Daily", "Natural", "Premium", "Pediatric"],
        optionIcons: {
          "Daily": Calendar,
          "Natural": Leaf,
          "Premium": Crown,
          "Pediatric": Baby
        }
      },
      { 
        id: "first-aid", 
        label: "First Aid & Medical Devices", 
        emoji: "🩹",
        icon: PlusSquare, 
        items: ["Bandages", "Thermometer", "BP Monitor", "Glucometer", "Antiseptic"],
        itemIcons: {
          "Bandages": Bandage,
          "Thermometer": Thermometer,
          "BP Monitor": HeartPulse,
          "Glucometer": Syringe,
          "Antiseptic": SprayCan
        },
        options: ["Emergency", "Daily", "Prescription"],
        optionIcons: {
          "Emergency": Siren,
          "Daily": Calendar,
          "Prescription": FileText
        }
      },
      { 
        id: "baby-women", 
        label: "Baby, Women & Senior Care", 
        emoji: "👨‍👩‍👧",
        icon: Baby, 
        items: ["Baby Care", "Women's Health", "Senior Care", "Maternity Products"],
        itemIcons: {
          "Baby Care": Baby,
          "Women's Health": Heart,
          "Senior Care": User,
          "Maternity Products": Heart
        },
        options: ["Pediatric", "Daily", "Natural"],
        optionIcons: {
          "Pediatric": Baby,
          "Daily": Calendar,
          "Natural": Leaf
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
      { platform: "Amazon", price: "₹22,990", originalPrice: "₹29,990", rating: 4.7, delivery: "Tomorrow", badge: "Best Price", link: "https://www.amazon.in/s?k=Sony+WH-1000XM5" },
      { platform: "Flipkart", price: "₹23,499", rating: 4.6, delivery: "2 days", link: "https://www.flipkart.com/search?q=Sony%20WH-1000XM5" },
      { platform: "Croma", price: "₹24,990", originalPrice: "₹29,990", rating: 4.5, delivery: "3-5 days", link: "https://www.croma.com/searchB?q=Sony%20WH-1000XM5" },
      { platform: "Reliance Digital", price: "₹25,490", rating: 4.4, delivery: "4-6 days", link: "https://www.reliancedigital.in/search?q=Sony%20WH-1000XM5" },
    ],
    subcategories: [
      { 
        id: "fashion", 
        label: "Fashion & Apparel", 
        emoji: "👕",
        icon: Shirt, 
        items: ["T-Shirts", "Jeans", "Dresses", "Jackets", "Ethnic Wear"],
        itemIcons: {
          "T-Shirts": Shirt,
          "Jeans": Shirt,
          "Dresses": Shirt,
          "Jackets": Shirt,
          "Ethnic Wear": Shirt
        },
        options: ["Trending", "New", "Discount", "Best Sellers"],
        optionIcons: {
          "Trending": Flame,
          "New": Star,
          "Discount": Percent,
          "Best Sellers": Award
        }
      },
      { 
        id: "electronics", 
        label: "Electronics & Gadgets", 
        emoji: "📱",
        icon: Smartphone, 
        items: ["Mobile Phones", "Earphones", "Smart Watches", "Laptops", "Tablets"],
        itemIcons: {
          "Mobile Phones": Smartphone,
          "Earphones": Package,
          "Smart Watches": Clock,
          "Laptops": Package,
          "Tablets": Package
        },
        options: ["Discount", "New", "Best Sellers", "Premium"],
        optionIcons: {
          "Discount": Percent,
          "New": Star,
          "Best Sellers": Award,
          "Premium": Crown
        }
      },
      { 
        id: "home-kitchen", 
        label: "Home & Kitchen", 
        emoji: "🏠",
        icon: Home, 
        items: ["Cookware", "Appliances", "Bedding", "Furniture", "Decor"],
        itemIcons: {
          "Cookware": UtensilsCrossed,
          "Appliances": Package,
          "Bedding": Home,
          "Furniture": Home,
          "Decor": Palette
        },
        options: ["New", "Discount", "Premium", "Trending"],
        optionIcons: {
          "New": Star,
          "Discount": Percent,
          "Premium": Crown,
          "Trending": Flame
        }
      },
      { 
        id: "footwear", 
        label: "Footwear & Accessories", 
        emoji: "👟",
        icon: Footprints, 
        items: ["Sneakers", "Formal Shoes", "Sandals", "Bags", "Belts"],
        itemIcons: {
          "Sneakers": Footprints,
          "Formal Shoes": Footprints,
          "Sandals": Footprints,
          "Bags": Package,
          "Belts": Package
        },
        options: ["Trending", "New", "Discount", "Premium"],
        optionIcons: {
          "Trending": Flame,
          "New": Star,
          "Discount": Percent,
          "Premium": Crown
        }
      },
      { 
        id: "beauty-personal", 
        label: "Beauty & Personal Care", 
        emoji: "🧴",
        icon: Sparkles, 
        items: ["Skincare", "Haircare", "Fragrances", "Grooming"],
        itemIcons: {
          "Skincare": Droplets,
          "Haircare": Scissors,
          "Fragrances": SprayCan,
          "Grooming": User
        },
        options: ["Natural", "Luxury", "Sensitive", "New"],
        optionIcons: {
          "Natural": Leaf,
          "Luxury": Gem,
          "Sensitive": ShieldCheck,
          "New": Star
        }
      },
      { 
        id: "sports", 
        label: "Sports", 
        emoji: "⚽",
        icon: Trophy, 
        items: ["Fitness Equipment", "Sports Shoes", "Yoga Mats", "Sportswear"],
        itemIcons: {
          "Fitness Equipment": Activity,
          "Sports Shoes": Footprints,
          "Yoga Mats": Package,
          "Sportswear": Shirt
        },
        options: ["Trending", "Best Sellers", "New", "Premium"],
        optionIcons: {
          "Trending": Flame,
          "Best Sellers": Award,
          "New": Star,
          "Premium": Crown
        }
      },
      { 
        id: "books", 
        label: "Books & More", 
        emoji: "📚",
        icon: Book, 
        items: ["Fiction", "Non-Fiction", "Stationery", "Toys", "Games"],
        itemIcons: {
          "Fiction": Book,
          "Non-Fiction": Book,
          "Stationery": Pencil,
          "Toys": Gamepad,
          "Games": Gamepad
        },
        options: ["Best Sellers", "New", "Discount", "Trending"],
        optionIcons: {
          "Best Sellers": Award,
          "New": Star,
          "Discount": Percent,
          "Trending": Flame
        }
      },
    ],
  },
};
;
