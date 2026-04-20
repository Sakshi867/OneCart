
import { Milk, Pill, Smartphone, Shirt, Zap } from "lucide-react";
import { Brand } from "@/components/BrandSelector";

// Helper to get brand list by category ID
export const getBrandsByCategory = (categoryId: string): Brand[] => {
    const category = BRAND_CATEGORIES.find(c => c.id === categoryId);
    if (!category) return [];
    // Return flattened list of brands from all subcategories provided
    return category.subcategories.flatMap(s => s.brands).slice(0, 15); // Limit for general view
};

export const BRAND_CATEGORIES = [
    {
        id: "groceries",
        title: "Groceries",
        icon: Milk,
        theme: "groceries" as const,
        subcategories: [
            {
                id: "milk",
                name: "Dairy > Fresh Milk",
                brands: [
                    { id: "amul", name: "Amul", logo: "A", availablePlatforms: 4 },
                    { id: "nandini", name: "Nandini", logo: "N", availablePlatforms: 3 },
                    { id: "mahanand", name: "Mahanand", logo: "M", availablePlatforms: 2 },
                    { id: "motherdairy", name: "Mother Dairy", logo: "MD", availablePlatforms: 5 },
                    { id: "govind", name: "Govind", logo: "G", availablePlatforms: 2 },
                    { id: "nestle", name: "Nestle", logo: "N", availablePlatforms: 6 },
                    { id: "britannia", name: "Britannia", logo: "B", availablePlatforms: 4 },
                    { id: "gowardhan", name: "Gowardhan", logo: "Go", availablePlatforms: 3 },
                    { id: "prabhat", name: "Prabhat", logo: "P", availablePlatforms: 2 },
                    { id: "heritage", name: "Heritage", logo: "H", availablePlatforms: 3 },
                ]
            },
            {
                id: "oil",
                name: "Pantry > Cooking Oil",
                brands: [
                    { id: "fortune", name: "Fortune", logo: "F", availablePlatforms: 6 },
                    { id: "saffola", name: "Saffola", logo: "S", availablePlatforms: 5 },
                    { id: "dhara", name: "Dhara", logo: "D", availablePlatforms: 4 },
                    { id: "gemini", name: "Gemini", logo: "G", availablePlatforms: 4 },
                    { id: "sundrop", name: "Sundrop", logo: "Sun", availablePlatforms: 3 },
                    { id: "dalda", name: "Dalda", logo: "D", availablePlatforms: 3 },
                    { id: "patanjali", name: "Patanjali", logo: "P", availablePlatforms: 5 },
                ]
            },
            {
                id: "atta",
                name: "Pantry > Atta & Flours",
                brands: [
                    { id: "aashirvaad", name: "Aashirvaad", logo: "AA", availablePlatforms: 8 },
                    { id: "pillsbury", name: "Pillsbury", logo: "Pb", availablePlatforms: 5 },
                    { id: "annapurna", name: "Annapurna", logo: "An", availablePlatforms: 3 },
                    { id: "shakti-bhog", name: "Shakti Bhog", logo: "SB", availablePlatforms: 2 },
                    { id: "nature-fresh", name: "Nature Fresh", logo: "NF", availablePlatforms: 4 },
                    { id: "organic-tattva", name: "Organic Tattva", logo: "OT", availablePlatforms: 3 },
                ]
            }
        ]
    },
    {
        id: "medicines",
        title: "Medicines",
        icon: Pill,
        theme: "medicines" as const,
        subcategories: [
            {
                id: "pain-relief",
                name: "Pain Relief > Paracetamol",
                brands: [
                    { id: "cipla", name: "Cipla", logo: "C", availablePlatforms: 8 },
                    { id: "sunpharma", name: "Sun Pharma", logo: "SP", availablePlatforms: 6 },
                    { id: "drreddys", name: "Dr. Reddy's", logo: "DR", availablePlatforms: 5 },
                    { id: "mankind", name: "Mankind", logo: "M", availablePlatforms: 7 },
                    { id: "lupin", name: "Lupin", logo: "L", availablePlatforms: 4 },
                    { id: "gsk", name: "GSK", logo: "GSK", availablePlatforms: 6 },
                    { id: "abbott", name: "Abbott", logo: "Ab", availablePlatforms: 5 },
                ]
            },
            {
                id: "supplements",
                name: "Wellness > Mulitvitamins",
                brands: [
                    { id: "hk-vitals", name: "HK Vitals", logo: "HK", availablePlatforms: 4 },
                    { id: "revital", name: "Revital", logo: "R", availablePlatforms: 6 },
                    { id: "becosules", name: "Becosules", logo: "B", availablePlatforms: 5 },
                    { id: "supradyn", name: "Supradyn", logo: "S", availablePlatforms: 5 },
                    { id: "neurobion", name: "Neurobion", logo: "N", availablePlatforms: 4 },
                    { id: "zincovit", name: "Zincovit", logo: "Z", availablePlatforms: 6 },
                ]
            }
        ]
    },
    {
        id: "electronics",
        title: "Electronics",
        icon: Smartphone,
        theme: "electronics" as const,
        subcategories: [
            {
                id: "smartphones",
                name: "Mobiles > Premium Smartphones",
                brands: [
                    { id: "apple", name: "Apple", logo: "Ap", availablePlatforms: 8 },
                    { id: "samsung", name: "Samsung", logo: "Sam", availablePlatforms: 10 },
                    { id: "google", name: "Google", logo: "G", availablePlatforms: 6 },
                    { id: "oneplus", name: "OnePlus", logo: "1+", availablePlatforms: 7 },
                    { id: "xiaomi", name: "Xiaomi", logo: "mi", availablePlatforms: 8 },
                    { id: "nothing", name: "Nothing", logo: "N", availablePlatforms: 5 },
                    { id: "motorola", name: "Motorola", logo: "M", availablePlatforms: 6 },
                ]
            },
            {
                id: "laptops",
                name: "Computers > Laptops",
                brands: [
                    { id: "dell", name: "Dell", logo: "D", availablePlatforms: 9 },
                    { id: "hp", name: "HP", logo: "HP", availablePlatforms: 10 },
                    { id: "lenovo", name: "Lenovo", logo: "L", availablePlatforms: 8 },
                    { id: "asus", name: "Asus", logo: "A", availablePlatforms: 7 },
                    { id: "acer", name: "Acer", logo: "Ac", availablePlatforms: 6 },
                    { id: "msi", name: "MSI", logo: "MSI", availablePlatforms: 4 },
                    { id: "razer", name: "Razer", logo: "R", availablePlatforms: 3 },
                ]
            }
        ]
    },
    {
        id: "shopping",
        title: "Fashion",
        icon: Shirt,
        theme: "cosmetics" as const, // Using cosmetics theme for fashion/shopping
        subcategories: [
            {
                id: "sportswear",
                name: "Men > Sportswear",
                brands: [
                    { id: "nike", name: "Nike", logo: "Ni", availablePlatforms: 5 },
                    { id: "adidas", name: "Adidas", logo: "Ad", availablePlatforms: 6 },
                    { id: "puma", name: "Puma", logo: "P", availablePlatforms: 7 },
                    { id: "reebok", name: "Reebok", logo: "R", availablePlatforms: 4 },
                    { id: "underarmour", name: "Under Armour", logo: "UA", availablePlatforms: 3 },
                    { id: "asics", name: "Asics", logo: "As", availablePlatforms: 3 },
                    { id: "hrx", name: "HRX", logo: "H", availablePlatforms: 5 },
                ]
            },
            {
                id: "sneakers",
                name: "Footwear > Sneakers",
                brands: [
                    { id: "nike-shoes", name: "Nike", logo: "Ni", availablePlatforms: 5 },
                    { id: "jordan", name: "Jordan", logo: "J", availablePlatforms: 4 },
                    { id: "adidas-org", name: "Adidas Originals", logo: "AO", availablePlatforms: 5 },
                    { id: "new-balance", name: "New Balance", logo: "NB", availablePlatforms: 3 },
                    { id: "vans", name: "Vans", logo: "V", availablePlatforms: 4 },
                    { id: "converse", name: "Converse", logo: "C", availablePlatforms: 5 },
                ]
            }
        ]
    },
    {
        id: "appliances",
        title: "Appliances",
        icon: Zap,
        theme: "electronics" as const,
        subcategories: [
            {
                id: "ac",
                name: "Home > Air Conditioners",
                brands: [
                    { id: "voltas", name: "Voltas", logo: "V", availablePlatforms: 6 },
                    { id: "lg", name: "LG", logo: "LG", availablePlatforms: 7 },
                    { id: "samsung-ac", name: "Samsung", logo: "S", availablePlatforms: 6 },
                    { id: "daikin", name: "Daikin", logo: "D", availablePlatforms: 5 },
                    { id: "blue-star", name: "Blue Star", logo: "BS", availablePlatforms: 4 },
                    { id: "panasonic", name: "Panasonic", logo: "P", availablePlatforms: 5 },
                    { id: "hitachi", name: "Hitachi", logo: "H", availablePlatforms: 4 },
                ]
            }
        ]
    }
];
