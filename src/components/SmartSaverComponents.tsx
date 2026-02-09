import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp, Zap, Award, Clock, ArrowRight, Star, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Price Ticker ---
export const PriceTicker = () => {
    return (
        <div className="w-full bg-slate-900 overflow-hidden py-2 border-b border-white/10 relative z-50">
            <motion.div
                className="whitespace-nowrap flex gap-8 text-xs font-medium text-white/90"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
                <span className="flex items-center gap-1 text-green-400"><TrendingDown className="h-3 w-3" /> Onions down 12% on Blinkit</span>
                <span className="flex items-center gap-1 text-red-400"><TrendingUp className="h-3 w-3" /> Tomatoes up 5% on Zepto</span>
                <span className="flex items-center gap-1 text-green-400"><TrendingDown className="h-3 w-3" /> 20% off on Amul Butter on BigBasket</span>
                <span className="flex items-center gap-1 text-yellow-400"><Zap className="h-3 w-3" /> Flash Sale: Coke Zero at ₹30</span>
                <span className="flex items-center gap-1 text-green-400"><TrendingDown className="h-3 w-3" /> Potatoes lowest price in 3 days</span>
                {/* Repeat for seamless loop */}
                <span className="flex items-center gap-1 text-green-400"><TrendingDown className="h-3 w-3" /> Onions down 12% on Blinkit</span>
                <span className="flex items-center gap-1 text-red-400"><TrendingUp className="h-3 w-3" /> Tomatoes up 5% on Zepto</span>
            </motion.div>
        </div>
    );
};

// --- 3D Category Card ---
interface Category3DCardProps {
    label: string;
    icon: any;
    items?: string[];
    onClick: () => void;
    index: number;
}

export const Category3DCard = ({ label, icon: Icon, items, onClick, index }: Category3DCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

    const handlePointerDown = () => {
        const timer = setTimeout(() => setShowPreview(true), 500);
        setLongPressTimer(timer);
    };

    const handlePointerUp = () => {
        if (longPressTimer) clearTimeout(longPressTimer);
        if (!showPreview) onClick();
        setShowPreview(false);
    };

    const handlePointerLeave = () => {
        if (longPressTimer) clearTimeout(longPressTimer);
        setShowPreview(false);
    };

    return (
        <motion.div
            className="relative group perspective-1000"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
        >
            <div
                className={`
          relative h-32 w-full rounded-2xl p-4 
          bg-gradient-to-br from-white to-slate-50
          backdrop-blur-md border border-slate-200 shadow-md 
          flex flex-col items-center justify-center gap-3
          transition-all duration-300 ease-out
          ${isHovered ? 'scale-105 shadow-xl border-slate-300' : ''}
        `}
                style={{
                    transformStyle: "preserve-3d",
                    transform: isHovered ? "rotateX(5deg) rotateY(5deg)" : "none"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <motion.div
                    animate={isHovered ? { y: -5, rotateZ: [0, -5, 5, 0] } : { y: 0 }}
                    className="p-3 bg-white rounded-full shadow-sm ring-1 ring-slate-200"
                >
                    <Icon className="h-8 w-8 text-slate-800" />
                </motion.div>

                <span className="text-sm font-bold text-slate-900 tracking-wide text-center leading-tight">
                    {label}
                </span>

                {/* Long Press Preview Pop-up */}
                <AnimatePresence>
                    {showPreview && items && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-2xl border border-white/50 z-50 pointer-events-none"
                        >
                            <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Trending</p>
                            <div className="flex flex-col gap-1">
                                {items.slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                                        <div className="w-1 h-1 rounded-full bg-green-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/90" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div >
    );
};

// --- Speedometer ---
export const Speedometer = ({ minutes }: { minutes: number }) => {
    // 10 mins = green, 30 = yellow, 60 = red
    // We map 0-60 to a percentage for the bar
    const percentage = Math.min((minutes / 60) * 100, 100);
    let color = "bg-green-500";
    if (minutes > 20) color = "bg-yellow-500";
    if (minutes > 45) color = "bg-red-500";

    return (
        <div className="flex flex-col gap-1 w-full max-w-[80px]">
            <div className="text-[10px] font-bold text-gray-500 flex justify-between">
                <span>Fast</span>
                <span>{minutes}m</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

// --- Comparison Hero (Battle Mode) ---
interface ComparisonHeroProps {
    winner: {
        platform: string;
        price: string;
        rating: number;
        delivery: string;
        deliveryTime: number; // in minutes
    };
    onCompare: () => void;
}

export const ComparisonHero = ({ winner, onCompare }: ComparisonHeroProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full p-1 max-w-sm mx-auto my-6"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-[2rem] blur-lg opacity-40 animate-pulse" />
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.8rem] shadow-2xl overflow-hidden">

                {/* Spotlight Effect */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/40 blur-3xl rounded-full pointer-events-none" />

                <div className="p-6 flex flex-col items-center text-center gap-4">
                    <Badge className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-none shadow-sm px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> Best Overall
                    </Badge>

                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">{winner.platform}</h2>
                        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {winner.rating} Rating
                        </div>
                    </div>

                    <div className="flex items-end gap-2 my-2">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 tracking-tighter">
                            {winner.price}
                        </span>
                        <span className="text-sm font-bold text-gray-400 mb-1.5 line-through decoration-red-400 decoration-2">
                            {/* Calculated fake original price for demo */}
                            ₹{parseInt(winner.price.replace(/\D/g, '')) + 20}
                        </span>
                    </div>

                    <div className="w-full flex items-center justify-between gap-4 bg-white/50 p-3 rounded-2xl border border-white/40">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 text-green-700 rounded-full">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Delivery</p>
                                <p className="text-sm font-bold text-gray-700">{winner.delivery}</p>
                            </div>
                        </div>
                        <Speedometer minutes={winner.deliveryTime} />
                    </div>

                    <Button
                        className="w-full bg-gray-900 hover:bg-black text-white rounded-xl h-12 font-bold text-base shadow-lg shadow-gray-900/20 active:scale-95 transition-all"
                        onClick={onCompare}
                    >
                        Go to App <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};
