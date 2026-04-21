import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Grid2X2 } from "lucide-react";
import { BrandOption } from "@/lib/brandData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCategory } from "@/contexts/CategoryContext";

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
  const { category } = useCategory();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  // Category color mappings - primary colors for brand circles
  const categoryColors: Record<string, { 
    primary: string; // Main color for circles
    primaryLight: string; // Lighter tint for backgrounds
    primaryDark: string; // Darker for selected state
    background: string; // Page background
    cardBg: string; // Card background tint
    cardBgSelected: string; // Selected card background
    text: string; // Text color for circle (white)
    border: string; // Border for selected
    glow: string; // Shadow glow
  }> = {
    transport: {
      primary: "#3B82F6",
      primaryLight: "#DBEAFE",
      primaryDark: "#2563EB",
      background: "#EFF6FF",
      cardBg: "#DBEAFE",
      cardBgSelected: "#BFDBFE",
      text: "#FFFFFF",
      border: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.3)"
    },
    groceries: {
      primary: "#10B981",
      primaryLight: "#D1FAE5",
      primaryDark: "#059669",
      background: "#ECFDF5",
      cardBg: "#D1FAE5",
      cardBgSelected: "#A7F3D0",
      text: "#FFFFFF",
      border: "#10B981",
      glow: "rgba(16, 185, 129, 0.3)"
    },
    shopping: {
      primary: "#F97316",
      primaryLight: "#FFEDD5",
      primaryDark: "#EA580C",
      background: "#FFF7ED",
      cardBg: "#FFEDD5",
      cardBgSelected: "#FED7AA",
      text: "#FFFFFF",
      border: "#F97316",
      glow: "rgba(249, 115, 22, 0.3)"
    },
    cosmetics: {
      primary: "#EC4899",
      primaryLight: "#FCE7F3",
      primaryDark: "#DB2777",
      background: "#FDF2F8",
      cardBg: "#FCE7F3",
      cardBgSelected: "#FBCFE8",
      text: "#FFFFFF",
      border: "#EC4899",
      glow: "rgba(236, 72, 153, 0.3)"
    },
    medicines: {
      primary: "#14B8A6",
      primaryLight: "#CCFBF1",
      primaryDark: "#0D9488",
      background: "#F0FDFA",
      cardBg: "#CCFBF1",
      cardBgSelected: "#99F6E4",
      text: "#FFFFFF",
      border: "#14B8A6",
      glow: "rgba(20, 184, 166, 0.3)"
    }
  };

  const currentColor = category ? categoryColors[category] || categoryColors.shopping : categoryColors.shopping;

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const handleProceed = () => {
    if (selectedBrand !== null) {
      onSelect(selectedBrand);
    }
  };
  return (
    <div 
      className="w-full max-w-4xl mx-auto px-6 py-8 space-y-8" 
      style={{ 
        background: currentColor.background
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#111827' }} />
          </button>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight" style={{ color: '#111827' }}>
              Select Brand
            </h2>
            <p className="text-sm font-medium mt-1" style={{ color: '#6B7280' }}>
              {itemLabel} — Choose your preferred brand
            </p>
          </div>
        </div>
      </div>

      {/* Brand Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08
            }
          }
        }}
      >
        {brands.map((brand, index) => {
          const isSelected = selectedBrand === brand.name;
          const isHovered = hoveredBrand === brand.id;
          
          return (
            <motion.div
              key={brand.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 15 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBrandSelect(brand.name)}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
              className={cn(
                "group relative overflow-hidden rounded-[20px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300",
                isSelected ? "scale-105" : "hover:scale-103"
              )}
              style={{
                background: isSelected 
                  ? currentColor.cardBgSelected
                  : isHovered
                    ? currentColor.cardBg
                    : 'rgba(255, 255, 255, 0.6)',
                boxShadow: isSelected 
                  ? `0 8px 24px ${currentColor.glow}, 0 2px 8px rgba(0,0,0,0.06)`
                  : isHovered
                    ? '0 8px 20px rgba(0,0,0,0.08)'
                    : '0 4px 12px rgba(0,0,0,0.04)',
                border: isSelected ? `3px solid ${currentColor.border}` : '2px solid rgba(0,0,0,0.06)'
              }}
            >
              {/* Check badge for selected state */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: currentColor.primary }}
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Brand Circle Badge */}
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md"
                style={{
                  backgroundColor: isSelected ? currentColor.primaryDark : currentColor.primary,
                  color: currentColor.text,
                  border: `2px solid ${isSelected ? currentColor.primaryDark : currentColor.primary}`,
                  boxShadow: isSelected ? `0 4px 12px ${currentColor.glow}` : '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {brand.logo ? (
                  <span className="text-lg">
                    {brand.logo}
                  </span>
                ) : (
                  <span className="tracking-wide">
                    {brand.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </motion.div>
              
              {/* Brand Info */}
              <div className="text-center mt-2">
                <h3 
                  className="font-semibold text-base tracking-tight transition-colors duration-300"
                  style={{ color: isSelected ? '#111827' : '#111827' }}
                >
                  {brand.name}
                </h3>
                <span 
                  className="text-xs font-medium uppercase tracking-wider mt-1 block"
                  style={{ color: '#6B7280' }}
                >
                  {brand.availablePlatforms} Platforms
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Any Brand Option */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 15 },
            show: { opacity: 1, scale: 1, y: 0 }
          }}
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleBrandSelect("")}
          className={cn(
            "group relative overflow-hidden rounded-[20px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300",
            selectedBrand === "" ? "ring-2" : "hover:shadow-lg"
          )}
          style={{
            background: selectedBrand === "" 
              ? currentColor.cardBgSelected
              : 'rgba(255, 255, 255, 0.6)',
            boxShadow: selectedBrand === ""
              ? `0 8px 24px ${currentColor.glow}, 0 2px 8px rgba(0,0,0,0.06)`
              : '0 4px 12px rgba(0,0,0,0.04)',
            border: selectedBrand === "" ? `3px solid ${currentColor.border}` : '2px dashed rgba(0,0,0,0.12)'
          }}
        >
          <AnimatePresence>
            {selectedBrand === "" && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentColor.primary }}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300"
            style={{
              backgroundColor: selectedBrand === "" ? currentColor.primary : 'rgba(255, 255, 255, 0.9)',
              borderColor: selectedBrand === "" ? currentColor.primary : 'rgba(0,0,0,0.1)',
              color: selectedBrand === "" ? currentColor.text : currentColor.primary,
            }}
          >
            <Grid2X2 className="w-7 h-7" />
          </motion.div>
          <div className="text-center mt-2">
            <h3 
              className="font-semibold text-base tracking-tight transition-colors duration-300"
              style={{ color: '#111827' }}
            >
              Any Brand
            </h3>
            <span 
              className="text-xs font-medium uppercase tracking-wider mt-1 block"
              style={{ color: '#6B7280' }}
            >
              Best Overall
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-6"
      >
        <button
          onClick={handleProceed}
          disabled={selectedBrand === null}
          className={cn(
            "px-12 py-4 rounded-2xl font-semibold text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95",
            selectedBrand === null ? "opacity-40 cursor-not-allowed" : "hover:scale-105"
          )}
          style={{
            backgroundColor: selectedBrand !== null ? currentColor.primary : '#D1D5DB',
            color: '#FFFFFF',
            boxShadow: selectedBrand !== null ? `0 8px 24px ${currentColor.glow}` : 'none'
          }}
        >
          {selectedBrand === null ? 'Select a Brand' : 'Continue'}
        </button>
      </motion.div>
    </div>
  );
};

export default BrandSelectionStep;
