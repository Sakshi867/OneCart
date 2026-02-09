import { motion } from "framer-motion";
import { Star, Clock, Truck, Badge } from "lucide-react";
import type { MockResult } from "@/lib/categories";

interface ComparisonResultsProps {
  results: MockResult[];
  query: string;
  isTransport?: boolean;
}

const ComparisonResults = ({ results, query, isTransport = false }: ComparisonResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">
          {isTransport ? "Fare Comparison" : "Price Comparison"} — <span className="text-primary">{query}</span>
        </h3>
        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
          {results.length} results
        </span>
      </div>

      <div className="space-y-3">
        {results.map((r, i) => (
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

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xl font-extrabold text-foreground">{r.price}</span>
                {r.originalPrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">{r.originalPrice}</span>
                )}
              </div>
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shrink-0">
                {isTransport ? "Book" : "Buy"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonResults;
