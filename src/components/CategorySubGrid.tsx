import { useState } from "react";
import { motion } from "framer-motion";
import { type Category } from "@/contexts/CategoryContext";
import { categoryConfig } from "@/lib/categories";
import { BadgeCheck, Sparkles, ChevronRight, Tag } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategorySubGridProps {
    categoryId: Category;
    onSubCategoryClick: (label: string) => void;
}

const CategorySubGrid = ({ categoryId, onSubCategoryClick }: CategorySubGridProps) => {
    const cfg = categoryConfig[categoryId];
    const [selectedSub, setSelectedSub] = useState<{ label: string; options: string[] } | null>(null);
    const [selectedItemSub, setSelectedItemSub] = useState<typeof cfg.subcategories[0] | null>(null);
    const [open, setOpen] = useState(false);

    const handleSubClick = (sub: typeof cfg.subcategories[0]) => {
        if (sub.options) {
            // Transport/Medicines with modal options
            setSelectedSub({ label: sub.label, options: sub.options });
            setOpen(true);
        } else if (sub.items && sub.items.length > 0) {
            // Cosmetics/Shopping/Medicines with item lists
            setSelectedItemSub(sub);
        } else {
            // Direct search
            onSubCategoryClick(sub.label);
        }
    };

    const handleOptionSelect = (option: string) => {
        if (selectedSub) {
            onSubCategoryClick(`${selectedSub.label} - ${option}`);
            setOpen(false);
        }
    };

    if (!cfg || !cfg.subcategories) return null;

    return (
        <div className="w-full space-y-8 py-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary animate-twinkle" />
                    <h3 className="text-xl font-bold text-foreground">Explore Categories</h3>
                    <Sparkles className="h-4 w-4 text-primary animate-twinkle" />
                </div>
                <p className="text-muted-foreground text-sm">
                    Select a category below to quickly compare prices
                </p>

                {categoryId === "cosmetics" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-purple-100/80 text-purple-700 rounded-full text-xs font-bold border border-purple-200 backdrop-blur-sm"
                    >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Brands Only
                    </motion.div>
                )}

                {categoryId === "medicines" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-teal-100/80 text-teal-700 rounded-full text-xs font-bold border border-teal-200 backdrop-blur-sm"
                    >
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Pharmacies
                    </motion.div>
                )}
            </motion.div>

            {/* Item List View */}
            {selectedItemSub && selectedItemSub.items ? (
                <div className="space-y-4">
                    <Button
                        variant="ghost"
                        onClick={() => setSelectedItemSub(null)}
                        className="mb-4"
                    >
                        ← Back to {cfg.label}
                    </Button>
                    <h3 className="text-2xl font-bold text-foreground mb-6">{selectedItemSub.label}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedItemSub.items.map((item, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => {
                                    onSubCategoryClick(item);
                                    setSelectedItemSub(null);
                                }}
                                className="group relative bg-white rounded-xl p-4 border border-slate-200 hover:border-primary hover:shadow-md transition-all text-left"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-slate-900">{item}</span>
                                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {cfg.subcategories.map((sub, i) => {
                        const Icon = sub.icon;
                        return (
                            <motion.button
                                key={sub.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSubClick(sub)}
                                className={`group relative bg-white rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 ${sub.highlight ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Icon className={`h-6 w-6 ${cfg.iconColorClass} opacity-100 font-bold`} strokeWidth={2.5} />
                                </div>

                                <span className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                    {sub.label}
                                </span>

                                {sub.tag && (
                                    <Badge variant="secondary" className="absolute top-2 right-2 text-[10px] px-1.5 h-5 bg-background/80 backdrop-blur-sm">
                                        {sub.tag}
                                    </Badge>
                                )}

                                {sub.badgeText && (
                                    <span className={`text-[10px] grid place-items-center w-full font-medium ${sub.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {sub.badgeText}
                                    </span>
                                )}

                                {/* Interaction indicator */}
                                <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        );
                    })}
                </div>
            )}

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-xl font-bold">
                            Select {selectedSub?.label} Type
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-8 max-w-md mx-auto w-full grid grid-cols-2 gap-4">
                        {selectedSub?.options.map((opt) => (
                            <Button
                                key={opt}
                                variant="outline"
                                className="h-16 text-lg font-medium border-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                                onClick={() => handleOptionSelect(opt)}
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default CategorySubGrid;
