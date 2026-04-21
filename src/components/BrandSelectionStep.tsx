import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Grid2X2 } from "lucide-react";
import { BrandOption } from "@/lib/brandData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandSelectionStepProps {
  itemLabel: string;
  brands: BrandOption[];
  onSelect: (brand: string) => void;
  onBack: () => void;
}

export const BrandSelectionStep: React.FC<BrandSelectionStepProps> = ({
  itemLabel,
  brands,
  onSelect,
  onBack,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full hover:bg-accent/50 transition-all duration-300 shadow-sm"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Select Brand for {itemLabel}</h2>
          <p className="text-sm text-muted-foreground">Filter your search for more accurate comparisons</p>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {brands.map((brand, index) => {
          return (
            <motion.div
              key={brand.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 10 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(brand.name)}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-5 flex flex-col items-center justify-center gap-3",
                "bg-card border-2 border-border/50 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center border border-primary/20 shadow-inner text-xl font-black text-primary">
                {brand.logo ? (
                  <span className="text-2xl">{brand.logo}</span>
                ) : (
                  brand.name.substring(0, 2).toUpperCase()
                )}
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{brand.name}</h3>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {brand.availablePlatforms} Platforms
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Any Brand Option */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 10 },
            show: { opacity: 1, scale: 1, y: 0 }
          }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect("")}
          className={cn(
            "group relative overflow-hidden rounded-2xl p-5 flex flex-col items-center justify-center gap-3",
            "bg-gradient-to-br from-card to-accent/30 border-2 border-dashed border-border shadow-sm hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="w-14 h-14 rounded-full bg-card group-hover:bg-primary/10 transition-colors flex items-center justify-center border border-border shadow-sm text-foreground group-hover:text-primary">
            <Grid2X2 className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">Any Brand</h3>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Best Overall
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrandSelectionStep;
