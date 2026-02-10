import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, Truck, Badge, ArrowRight, TrendingDown } from "lucide-react";
import type { MockResult } from "@/lib/categories";

interface ComparisonResultsProps {
  results: MockResult[];
  query: string;
  isTransport?: boolean;
}

const ComparisonResults = ({ results, query, isTransport = false }: ComparisonResultsProps) => {
  const [sort, setSort] = useState<"price" | "time" | "rating">("price");

  // Mock sorting logic
  const sortedResults = [...results].sort((a, b) => {
    if (sort === "price") {
      return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
    }
    if (sort === "time") {
      // Mock parsing "4 min", "Today", etc. - simplified for demo
      const getMins = (s: string) => s.includes('min') ? parseInt(s) : 999;
      return getMins(a.delivery) - getMins(b.delivery);
    }
    if (sort === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">
          {isTransport ? "Fare Comparison" : "Price Comparison"} — <span className="text-primary">{query}</span>
        </h3>
        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          {results.length} results
        </span>
      </div>

      <div className="space-y-3">
        {sortedResults.map((r, i) => (
          <motion.div
            key={r.platform}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 ${i === 0 ? "ring-2 ring-primary/20 shadow-sm" : ""}`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center font-bold text-primary text-sm shrink-0">
                {r.platform.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{r.platform}</span>
                  {r.badge && (
                    <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Badge className="h-3 w-3" /> {r.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-[hsl(40,90%,50%)]" /> {r.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    {isTransport ? <Clock className="h-3 w-3" /> : <Truck className="h-3 w-3" />}
                    {r.delivery}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <span className="text-xl font-extrabold text-foreground">{r.price}</span>
                {r.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through decoration-red-400">{r.originalPrice}</span>
                )}
              </div>
              <button className="relative overflow-hidden group px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  {isTransport ? "Book Ride" : "Buy Now"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tactile Segmented Control (Fixed Bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-full p-1.5 flex gap-1 items-center ring-1 ring-black/5">
        <button
          onClick={() => setSort("price")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${sort === "price" ? "bg-green-100 text-green-700 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Price
        </button>
        <button
          onClick={() => setSort("time")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${sort === "time" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Time
        </button>
        <button
          onClick={() => setSort("rating")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${sort === "rating" ? "bg-yellow-100 text-yellow-700 shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
        >
          Rating
        </button>
      </div>
    </div>
  );
};

export default ComparisonResults;
