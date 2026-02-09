import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight, Search } from "lucide-react";
import { SubCategory } from "@/lib/categories";
import { Button } from "@/components/ui/button";

interface CategoryItemListProps {
    subcategory: SubCategory;
    onItemClick: (item: string) => void;
    onBack: () => void;
}

const CategoryItemList = ({ subcategory, onItemClick, onBack }: CategoryItemListProps) => {
    const items = subcategory.items || [];

    // Mock trend logic for demo purposes
    const getTrend = (index: number) => {
        return index % 3 === 0 ? "up" : index % 2 === 0 ? "down" : "steady";
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="rounded-full hover:bg-slate-100"
                >
                    <ArrowLeft className="w-6 h-6 text-slate-700" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{subcategory.label}</h2>
                    <p className="text-sm text-slate-500">Select an item to compare prices</p>
                </div>
            </div>

            <motion.div
                className="grid gap-3"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05
                        }
                    }
                }}
            >
                {items.map((item, index) => {
                    const trend = getTrend(index);
                    return (
                        <motion.div
                            key={item}
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                show: { opacity: 1, x: 0 }
                            }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onItemClick(item)}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                                    {/* Placeholder emoji logic or generic icon */}
                                    🥗
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors">{item}</h3>
                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                        {trend === "up" && (
                                            <span className="text-red-500 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" /> Trending Up</span>
                                        )}
                                        {trend === "down" && (
                                            <span className="text-green-600 flex items-center gap-0.5"><TrendingDown className="w-3 h-3" /> Price Drop</span>
                                        )}
                                        {trend === "steady" && (
                                            <span className="text-slate-400">Stable Price</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex items-center gap-2 text-slate-400 group-hover:text-green-600 transition-colors">
                                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Compare</span>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default CategoryItemList;
