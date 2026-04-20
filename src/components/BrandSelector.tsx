
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Plus, ChevronRight, Filter } from "lucide-react";

export interface Brand {
  id: string;
  name: string;
  logo?: string; // URL or component
  availablePlatforms?: number;
  bestPrice?: string;
}

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrand: string; // 'all' or brandId
  onSelect: (brandId: string) => void;
  categoryTheme?: "groceries" | "medicines" | "cosmetics" | "electronics" | "default";
  className?: string;
}

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  selectedBrand,
  onSelect,
  categoryTheme = "default",
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Theme configuration mapping
  const themeColors = {
    groceries: "var(--cat-groceries, #2FBF9B)",
    medicines: "var(--cat-medicines, #14B8A6)",
    cosmetics: "var(--cat-cosmetics, #E86C9A)",
    electronics: "var(--cat-transport, #3B82F6)", // Using transport blue for electronics
    default: "var(--primary, #310)", 
  };

  const activeColor = themeColors[categoryTheme] || themeColors.default;
  const activeLightColor = `${activeColor}20`; // 20% opacity for backgrounds

  // Visible brands logic (First 5 or all if expanded)
  const visibleBrands = isExpanded ? brands : brands.slice(0, 5);
  const remainingCount = Math.max(0, brands.length - 5);

  return (
    <div className={cn("w-full space-y-3 font-sans", className)}>
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
           <Filter className="w-3.5 h-3.5" />
           {selectedBrand === "all" 
             ? "Prefer a brand?" 
             : `Filtered by ${brands.find(b => b.id === selectedBrand)?.name || 'Brand'}`
           }
        </h3>
        
        <AnimatePresence mode="wait">
          {selectedBrand !== "all" && (
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400"
            >
              {brands.find(b => b.id === selectedBrand)?.availablePlatforms || 0} platforms available
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {/* "Any Brand" Option */}
        <BrandChip
          id="all"
          name="Any Brand"
          isActive={selectedBrand === "all"}
          onClick={() => onSelect("all")}
          activeColor={activeColor}
          isSpecial
        />

        {/* Brand Options */}
        <AnimatePresence mode="popLayout">
          {visibleBrands.map((brand) => (
            <BrandChip
              key={brand.id}
              id={brand.id}
              name={brand.name}
              isActive={selectedBrand === brand.id}
              onClick={() => onSelect(brand.id)}
              activeColor={activeColor}
              logo={brand.logo}
            />
          ))}
        </AnimatePresence>

        {/* Expand/Collapse Button */}
        {brands.length > 5 && (
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              relative overflow-hidden
              flex items-center gap-1.5 px-3 py-2 rounded-full
              text-xs font-medium transition-all duration-300
              bg-secondary/50 hover:bg-secondary text-muted-foreground
              border border-transparent hover:border-border
            "
          >
            {isExpanded ? (
              <>Show Less</>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>{remainingCount} More</span>
              </>
            )}
          </motion.button>
        )}
      </div>
      
      {/* Helper text for context */}
      <AnimatePresence mode="wait">
        {selectedBrand === "all" && (
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="text-[10px] text-muted-foreground/60 pl-2"
           >
             Showing best price across all brands
           </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface BrandChipProps {
  id: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
  activeColor: string;
  logo?: string;
  isSpecial?: boolean;
}

const BrandChip: React.FC<BrandChipProps> = ({
  id,
  name,
  isActive,
  onClick,
  activeColor,
  logo,
  isSpecial
}) => {
  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 border",
        // Default state (Glassmorphism)
        !isActive && "bg-background/40 backdrop-blur-sm border-border/40 text-foreground/80 hover:bg-background/60 hover:border-border hover:shadow-sm",
        // Active state
        isActive && "border-transparent text-white shadow-md ring-1 ring-white/20",
        isSpecial && !isActive && "font-semibold text-foreground/90 bg-secondary/30",
      )}
      style={{
        backgroundColor: isActive ? activeColor : undefined,
        boxShadow: isActive ? `0 4px 12px -2px ${activeColor}40` : undefined,
      }}
    >
      {/* Selection Indicator Glow */}
      {isActive && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 rounded-full bg-white/20 blur-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Content */}
      {logo && !isSpecial ? (
        <span className="w-4 h-4 rounded-full bg-white/90 flex items-center justify-center overflow-hidden text-[8px] font-bold text-black border border-black/5">
           {/* Fallback to first letter if mock logo */}
           {logo.startsWith('http') ? <img src={logo} alt={name} className="w-full h-full object-cover" /> : logo}
        </span>
      ) : null}
      
      <span className={cn(isSpecial && "tracking-wide")}>{name}</span>
      
      {/* Checkmark for active state */}
      {isActive && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/20 rounded-full p-0.5"
        >
          <Check className="w-2.5 h-2.5" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default BrandSelector;
