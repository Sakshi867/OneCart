import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategory, type Category } from "@/contexts/CategoryContext";
import { categoryConfig } from "@/lib/categories";
import { Search, LayoutGrid, Link2, MapPin, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ComparisonResults from "@/components/ComparisonResults";
import BackButton from "@/components/BackButton";
import ExpandingMorphPanel from "@/components/ExpandingMorphPanel";
import { PriceTicker, Category3DCard, ComparisonHero } from "@/components/SmartSaverComponents";
import CategoryItemList from "@/components/CategoryItemList";
import { type SubCategory } from "@/lib/categories";

const CategoryHome = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCategory } = useCategory();
  const cat = id as Category;
  const cfg = categoryConfig[cat];
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState<SubCategory | null>(null);

  useEffect(() => {
    if (cfg) setCategory(cat);

    // Handle query parameter
    const query = searchParams.get("q");
    if (query) {
      setSearchVal(query);
      setIsSearching(true);
      setShowResults(false);
      setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 800);
    } else {
      setShowResults(false);
      setSearchVal("");
    }
  }, [cat, cfg, setCategory, searchParams]);

  if (!cfg) {
    navigate("/dashboard");
    return null;
  }

  const isTransport = cat === "transport";
  const isGroceries = cat === "groceries";

  const handleSearch = () => {
    setIsSearching(true);
    setShowResults(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-pink-50/10 to-purple-50/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className={`absolute top-10 left-5 w-56 h-56 ${cfg.bgClass.replace('bg-', 'bg-').replace(' to-', '/10 to-')} rounded-full blur-3xl animate-float opacity-30`} />
      <div className="absolute bottom-10 right-5 w-72 h-72 bg-gradient-to-tl from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-bounce-gentle opacity-40" />

      {/* SmartSaver Ticker */}
      {isGroceries && <PriceTicker />}

      {/* Nav */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto relative z-10"
      >
        <motion.h1
          className="text-2xl font-extrabold font-heading cursor-pointer text-foreground flex items-center gap-2"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Sparkles className="h-6 w-6 text-primary animate-twinkle" />
          OneCart<span className="text-primary animate-twinkle">+</span>
        </motion.h1>
        <Button
          variant="outline"
          onClick={() => {
            setCategory(null);
            navigate("/dashboard");
          }}
          className="gap-2 rounded-full px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 hover:border-pink-300"
        >
          <LayoutGrid className="h-4 w-4" /> Switch Category
        </Button>
      </motion.header>

      {/* Hero area */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`${cfg.bgClass} py-12 transition-colors duration-500 relative z-10`}
      >
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 mb-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="h-5 w-5 text-primary animate-twinkle" />
            <span className="text-primary font-semibold text-sm uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {cfg.label.split(' — ')[0]}
            </span>
            <Sparkles className="h-5 w-5 text-primary animate-twinkle" style={{ animationDelay: '1s' }} />
          </motion.div>

          <div className="flex items-center justify-center gap-4">
            <motion.span
              className="text-5xl inline-block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
            >
              {cfg.emoji}
            </motion.span>
            <motion.h2
              className="text-3xl font-extrabold text-foreground"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {cfg.label.split(' — ')[0]}
            </motion.h2>
          </div>

          <motion.p
            className="text-muted-foreground text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {cfg.heroText}
          </motion.p>
        </div>
      </motion.section>

      {/* Search */}
      <motion.section
        className="max-w-3xl mx-auto px-6 -mt-7 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-card rounded-2xl shadow-xl border border-border p-6 sm:p-8 space-y-5 backdrop-blur-sm bg-white/70">
          {isTransport ? (
            <div className="space-y-4">
              <div className="relative group">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-primary transition-colors group-focus-within:text-pink-500" />
                <Input
                  placeholder="From — Enter pickup location"
                  className="pl-12 h-14 rounded-2xl border-2 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 transition-all duration-300"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </div>
              <div className="relative group">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-pink-500" />
                <Input
                  placeholder="To — Enter destination"
                  className="pl-12 h-14 rounded-2xl border-2 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 transition-all duration-300"
                />
              </div>
              <Button
                className="w-full h-14 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-500 hover:from-pink-500 hover:to-purple-600"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Compare Fares"}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-pink-500" />
                  <Input
                    placeholder={cfg.searchPlaceholder}
                    className="pl-12 h-14 rounded-2xl border-2 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 transition-all duration-300"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  className="h-14 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-500 hover:from-pink-500 hover:to-purple-600"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search Now"}
                </Button>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground bg-accent/30 rounded-xl p-4">
                <Link2 className="h-5 w-5 text-primary" />
                <span>Or paste a product link to compare instantly</span>
              </div>
            </>
          )}

          {/* Quick demo button */}
          {!showResults && !isSearching && (
            <button
              onClick={() => {
                setSearchVal(cfg.mockQuery);
                handleSearch();
              }}
              className="text-xs text-primary hover:underline font-medium"
            >
              Try demo: "{cfg.mockQuery}"
            </button>
          )}
        </div>
      </motion.section>

      {/* Results */}
      <section className="max-w-3xl mx-auto px-6 py-10 relative z-10">
        <AnimatePresence mode="wait">
          {isSearching && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
              />
              <p className="text-muted-foreground text-lg font-medium">
                {isTransport ? "Finding best fares..." : "Comparing prices across platforms..."}
              </p>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}

          {showResults && !isSearching && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    Results for "{searchVal || cfg.mockQuery}"
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary animate-twinkle" />
                    <span>Found {cfg.mockResults.length} options for you</span>
                  </div>
                </div>
                {cfg.subcategories && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchVal("");
                      setShowResults(false);
                      setSearchParams({});
                    }}
                    className="text-primary hover:text-primary hover:bg-primary/10 rounded-full gap-2 font-bold"
                  >
                    Back to Browse
                  </Button>
                )}
              </div>

              {/* SmartSaver Battle Mode Hero */}
              {isGroceries && cfg.mockResults.length > 0 && (
                <ComparisonHero
                  winner={{
                    ...cfg.mockResults[0],
                    rating: Math.floor(cfg.mockResults[0].rating),
                    deliveryTime: parseInt(cfg.mockResults[0].delivery) || 15
                  }}
                  onCompare={() => { }}
                />
              )}

              <ComparisonResults
                results={cfg.mockResults}
                query={searchVal || cfg.mockQuery}
                isTransport={isTransport}
              />
            </motion.div>
          )}

          {!showResults && !isSearching && (
            <motion.div
              key="browse-or-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeSubcategory ? (
                <CategoryItemList
                  subcategory={activeSubcategory}
                  onBack={() => setActiveSubcategory(null)}
                  onItemClick={(item) => {
                    setSearchVal(item);
                    setActiveSubcategory(null);
                    handleSearch();
                  }}
                />
              ) : cfg.subcategories ? (
                <ExpandingMorphPanel
                  subcategories={cfg.subcategories}
                  activeCategory={cfg.label.split(' — ')[0]}
                  themeClass={cfg.bgClass}
                  onSubcategorySelect={(sub) => {
                    // When a subcategory is selected from the morph panel, it could be either:
                    // 1. The subcategory header was clicked (should show item list if items exist)
                    // 2. An item within the expanded panel was clicked (should start search)
                    
                    // If this subcategory has items and the user clicked on the header to expand,
                    // we show the item list. This happens when the subcategory has items but 
                    // no specific item was selected yet.
                    if (sub.items && sub.items.length > 0) {
                      // Check if this is a click on the header vs an item click
                      // We can differentiate by checking if the label matches one of the items
                      // If the label is one of the items, then it's an item click and should search
                      if (sub.items.includes(sub.label)) {
                        // This is an item click from the expanded panel
                        setSearchVal(sub.label);
                        handleSearch();
                      } else {
                        // This is a header click, show the item list
                        setActiveSubcategory(sub);
                      }
                    } else {
                      // No items, so this is definitely a header click, start search
                      setSearchVal(sub.label);
                      handleSearch();
                    }
                  }}
                />
              ) : (
                <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center bg-gradient-to-br from-pink-50/20 to-purple-50/20 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {isTransport ? "Ready to find the best fares?" : "Ready to compare prices?"}
                      </h3>
                      <p className="text-muted-foreground">
                        {isTransport
                          ? "Enter your pickup and destination locations above"
                          : "Enter a product name or paste a link to get started"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Back Navigation */}
      <div className="max-w-3xl mx-auto px-6 pb-12 relative z-10">
        <BackButton variant="dashboard" />
      </div>
    </div>
  );
};

export default CategoryHome;
