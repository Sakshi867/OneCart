import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCategory, type Category } from "@/contexts/CategoryContext";
import { categoryConfig } from "@/lib/categories";
import { ArrowRight, Sparkles } from "lucide-react";

const categories: Category[] = ["groceries", "cosmetics", "transport", "medicines", "shopping"];

const Dashboard = () => {
    const navigate = useNavigate();
    const { setCategory } = useCategory();

    const handleSelect = (cat: Category) => {
        setCategory(cat);
        navigate(`/category/${cat}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <motion.header
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center px-6 py-5 max-w-5xl mx-auto"
            >
                <h1
                    className="text-2xl font-extrabold font-heading cursor-pointer text-foreground"
                    onClick={() => navigate("/")}
                >
                    OneCart<span className="text-primary">+</span>
                </h1>
            </motion.header>

            <main className="max-w-5xl mx-auto px-6 pt-8 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6 text-primary animate-twinkle" />
                        <span className="text-primary font-semibold text-sm uppercase tracking-widest bg-accent px-4 py-1 rounded-full">
                            Welcome Back
                        </span>
                        <Sparkles className="h-6 w-6 text-primary animate-twinkle" style={{ animationDelay: '1s' }} />
                    </div>
                    <motion.h2
                        className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-foreground via-pink-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        What would you like to compare today?
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Pick a category to get started on your smart shopping journey
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((cat, i) => {
                        const cfg = categoryConfig[cat];
                        const Icon = cfg.icon;
                        return (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.8, duration: 0.5, type: "spring", stiffness: 300 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect(cat)}
                                className={`group relative ${cfg.bgClass} rounded-2xl p-7 text-left cursor-pointer border-2 border-transparent hover:border-pink-300/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                            >
                                {/* Decorative hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <motion.div
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm"
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Icon className={`h-8 w-8 ${cfg.iconColorClass}`} />
                                    </motion.div>
                                    <motion.span
                                        className="text-4xl"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                    >
                                        {cfg.emoji}
                                    </motion.span>
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-2 relative z-10 group-hover:text-primary transition-colors">
                                    {cfg.label}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 relative z-10 leading-relaxed">
                                    {cfg.description}
                                </p>

                                <motion.div
                                    className="inline-flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 gap-1"
                                    whileHover={{ x: 5 }}
                                >
                                    <span>Explore</span>
                                    <ArrowRight className="h-4 w-4" />
                                </motion.div>

                                {/* Decorative corner element */}
                                <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft" />
                            </motion.button>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
