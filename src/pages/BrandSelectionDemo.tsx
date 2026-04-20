import React, { useState } from "react";
import { BrandSelector, Brand } from "../components/BrandSelector";
import { ArrowLeft, ShoppingCart, Pill, Milk, Smartphone, Shirt, Home, Zap, Coffee, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// --- Extended Mock Data ---

const CATEGORIES = [
    {
        id: "groceries",
        title: "Groceries",
        icon: Milk,
        theme: "groceries" as const,
        subcategories: [
            {
                id: "milk",
                name: "Dairy > Fresh Milk",
                description: "Fresh milk from top local and national dairies.",
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
                description: "Healthy cooking oils for your daily needs.",
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
                description: "Whole wheat atta and multi-grain flours.",
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
                description: "Fast relief from body pain and fever.",
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
                description: "Daily supplements for immunity and energy.",
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
                description: "Latest flagship phones with top-tier specs.",
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
                description: "Powerful laptops for work and gaming.",
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
        id: "fashion",
        title: "Fashion",
        icon: Shirt,
        theme: "cosmetics" as const, // Using cosmetics theme for fashion
        subcategories: [
            {
                id: "sportswear",
                name: "Men > Sportswear",
                description: "Comfortable and stylish activewear.",
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
                description: "Trendy sneakers for casual wear.",
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
                description: "Cool your home with efficient ACs.",
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

const BrandSelectionDemo = () => {
    // Store selected brands for each subcategory
    const [selectedBrands, setSelectedBrands] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

    const handleSelect = (subcategoryId: string, brandId: string) => {
        setSelectedBrands(prev => ({
            ...prev,
            [subcategoryId]: brandId
        }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-20">

                {/* Header */}
                <div className="space-y-4">
                    <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Brand Selection Interface
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Explore our contextual brand filtering across differing categories.
                        </p>
                    </div>
                </div>

                {/* Tabs Interface */}
                <Tabs defaultValue="groceries" className="w-full" onValueChange={setActiveTab}>
                    <div className="overflow-x-auto pb-2 scrollbar-none">
                        <TabsList className="bg-muted/50 p-1 h-auto inline-flex w-auto min-w-full md:min-w-0 justify-start">
                            {CATEGORIES.map((cat) => (
                                <TabsTrigger
                                    key={cat.id}
                                    value={cat.id}
                                    className="rounded-lg px-4 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all gap-2"
                                >
                                    <cat.icon className="w-4 h-4" />
                                    {cat.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="mt-6">
                        {CATEGORIES.map((cat) => (
                            <TabsContent key={cat.id} value={cat.id} className="space-y-6 focus-visible:outline-none">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {cat.subcategories.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="
                          group relative overflow-hidden
                          p-6 rounded-2xl border border-border/50
                          bg-card/40 hover:bg-card/60
                          shadow-sm hover:shadow-md
                          backdrop-blur-sm transition-all duration-300
                        "
                                        >
                                            <div className="mb-5 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold tracking-tight">{sub.name}</h3>
                                                    {selectedBrands[sub.id] && selectedBrands[sub.id] !== "all" && (
                                                        <span className={cn(
                                                            "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                                                            cat.theme === "groceries" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                                                            cat.theme === "medicines" && "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
                                                            cat.theme === "electronics" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                                            cat.theme === "cosmetics" && "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
                                                        )}>
                                                            Active
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground/80">{sub.description}</p>
                                            </div>

                                            <BrandSelector
                                                brands={sub.brands}
                                                selectedBrand={selectedBrands[sub.id] || "all"}
                                                onSelect={(id) => handleSelect(sub.id, id)}
                                                categoryTheme={cat.theme}
                                            />

                                            {/* Decorative gradient blob */}
                                            <div
                                                className={cn(
                                                    "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-500",
                                                    cat.theme === "groceries" && "bg-emerald-500",
                                                    cat.theme === "medicines" && "bg-teal-500",
                                                    cat.theme === "electronics" && "bg-blue-500",
                                                    cat.theme === "cosmetics" && "bg-pink-500",
                                                )}
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>

            </div>
        </div>
    );
};

export default BrandSelectionDemo;
