import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type SubCategory } from "@/lib/categories";

interface ExpandingMorphPanelProps {
  subcategories: SubCategory[];
  activeCategory: string;
  themeClass: string;
  onSubcategorySelect: (subcategory: SubCategory) => void;
  onSubcategoryClick?: (subcategory: SubCategory) => void; // Called when panel header is clicked
}

const ExpandingMorphPanel = ({ 
  subcategories, 
  activeCategory, 
  themeClass,
  onSubcategorySelect,
  onSubcategoryClick
}: ExpandingMorphPanelProps) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Explore {activeCategory}
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Tap any category below to discover subcategories and popular items
        </p>
      </motion.div>

      <div className="space-y-5 max-w-4xl mx-auto">
        {subcategories.map((sub, index) => (
          <ExpandingPanelItem
            key={sub.id}
            subcategory={sub}
            index={index}
            themeClass={themeClass}
            onSelect={onSubcategorySelect}
            onHeaderClick={onSubcategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

interface ExpandingPanelItemProps {
  subcategory: SubCategory;
  index: number;
  themeClass: string;
  onSelect: (subcategory: SubCategory) => void;
  onHeaderClick?: (subcategory: SubCategory) => void; // Called when panel header is clicked
}

const ExpandingPanelItem = ({ 
  subcategory, 
  index, 
  themeClass,
  onSelect 
}: ExpandingPanelItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = subcategory.icon;

  // Extract theme colors from the theme class
  const getThemeColors = () => {
    if (themeClass.includes('theme-groceries')) {
      return {
        primary: 'from-green-500/20 to-emerald-500/20',
        border: 'border-green-200',
        hoverBorder: 'hover:border-green-300',
        text: 'text-green-700'
      };
    } else if (themeClass.includes('theme-cosmetics')) {
      return {
        primary: 'from-pink-500/20 to-rose-500/20',
        border: 'border-pink-200',
        hoverBorder: 'hover:border-pink-300',
        text: 'text-pink-700'
      };
    } else if (themeClass.includes('theme-transport')) {
      return {
        primary: 'from-blue-500/20 to-sky-500/20',
        border: 'border-blue-200',
        hoverBorder: 'hover:border-blue-300',
        text: 'text-blue-700'
      };
    } else if (themeClass.includes('theme-medicines')) {
      return {
        primary: 'from-teal-500/20 to-cyan-500/20',
        border: 'border-teal-200',
        hoverBorder: 'hover:border-teal-300',
        text: 'text-teal-700'
      };
    } else if (themeClass.includes('theme-shopping')) {
      return {
        primary: 'from-orange-500/20 to-amber-500/20',
        border: 'border-orange-200',
        hoverBorder: 'hover:border-orange-300',
        text: 'text-orange-700'
      };
    }
    return {
      primary: 'from-primary/20 to-accent/20',
      border: 'border-border',
      hoverBorder: 'hover:border-primary/30',
      text: 'text-foreground'
    };
  };

  const colors = getThemeColors();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Main Panel */}
      <motion.div
        className={`
          rounded-2xl p-6 cursor-pointer border-2 transition-all duration-300
          bg-white/90 backdrop-blur-sm shadow-lg
          ${isExpanded 
            ? 'shadow-2xl scale-[1.02] border-primary/50' 
            : `shadow-lg ${colors.border} hover:shadow-xl ${colors.hoverBorder} hover:scale-[1.01]`
          }
        `}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          // Toggle the expansion state
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.primary} flex items-center justify-center shadow-md`}>
              <Icon className={`h-7 w-7 ${colors.text}`} />
            </div>
            <div>
              <h4 className="font-bold text-xl text-foreground">{subcategory.label}</h4>
              {subcategory.tag && (
                <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 ${colors.text}`}>
                  {subcategory.tag}
                </span>
              )}
              {subcategory.badgeText && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-destructive/10 text-destructive">
                  {subcategory.badgeText}
                </span>
              )}
              {subcategory.highlight && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  ⭐ Highlight
                </span>
              )}
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={colors.text}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-background/80 to-accent/5 rounded-2xl p-6 border border-primary/10 backdrop-blur-sm shadow-inner"
            >
              {/* Items List */}
              {subcategory.items && subcategory.items.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.primary}`}></span>
                    Popular Items
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subcategory.items.map((item, itemIndex) => {
                      // Get the appropriate icon for this item if available
                      const ItemIcon = subcategory.itemIcons?.[item] || subcategory.icon;
                      
                      return (
                        <motion.button
                          key={item}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            // Directly trigger search for the selected item
                            onSelect({ ...subcategory, label: item });
                          }}
                          className="text-left p-4 rounded-xl bg-white/60 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-3"
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.primary}`}>
                            <ItemIcon className={`h-5 w-5 ${colors.text}`} />
                          </div>
                          <span className="text-base font-medium text-foreground">{item}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Options */}
              {subcategory.options && subcategory.options.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-lg">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-primary"></span>
                    Available Options
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {subcategory.options.map((option, optionIndex) => {
                      // Get the appropriate icon for this option if available
                      const OptionIcon = subcategory.optionIcons?.[option] || subcategory.icon;
                      
                      return (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: optionIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-5 py-2.5 rounded-full bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center gap-2`}
                        >
                          <OptionIcon className="h-4 w-4" />
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => onSelect(subcategory)}
                    className="rounded-full px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Browse {subcategory.label} <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandingMorphPanel;