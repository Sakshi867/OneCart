import { useNavigate } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, BarChart3, Search, Shield, Zap, TrendingDown, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const features = [
  { icon: Search, title: "Smart Search", desc: "Search or paste any product link to instantly compare prices across platforms." },
  { icon: BarChart3, title: "Side-by-Side", desc: "See prices, ratings, and delivery times from multiple sellers at a glance." },
  { icon: Shield, title: "Trusted Sources", desc: "We only compare from verified, reliable, and authentic sellers." },
  { icon: Zap, title: "Lightning Fast", desc: "Get real-time comparison results in seconds, not minutes." },
];

const stats = [
  { value: "5+", label: "Categories", icon: Star },
  { value: "50+", label: "Platforms", icon: TrendingDown },
  { value: "10K+", label: "Users", icon: Users },
];

const categories = [
  { emoji: "🛒", label: "Groceries", color: "bg-[hsl(var(--cat-groceries-light))] text-[hsl(var(--cat-groceries))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" },
  { emoji: "💄", label: "Cosmetics", color: "bg-[hsl(var(--cat-cosmetics-light))] text-[hsl(var(--cat-cosmetics))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" },
  { emoji: "🚕", label: "Transport", color: "bg-[hsl(var(--cat-transport-light))] text-[hsl(var(--cat-transport))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" },
  { emoji: "💊", label: "Medicines", color: "bg-[hsl(var(--cat-medicines-light))] text-[hsl(var(--cat-medicines))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" },
  { emoji: "🛍", label: "Shopping", color: "bg-[hsl(var(--cat-shopping-light))] text-[hsl(var(--cat-shopping))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as Easing },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-6xl mx-auto"
      >
        <motion.h1
          className="text-xl sm:text-2xl font-extrabold font-heading text-foreground tracking-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          OneCart<span className="text-primary">+</span>
        </motion.h1>
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/onboarding")}
              className="font-medium text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-cyan-500/10 to-green-500/10 hover:from-cyan-500/20 hover:to-green-500/20"
            >
              🎬 View 3D Demo
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="font-medium text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        <motion.div
          className="flex-1 space-y-6 sm:space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} custom={0} className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((c, index) => (
              <motion.span
                key={c.label}
                className={`${c.color} px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 shadow-sm`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.05, y: -1 }}
              >
                <span className="text-sm sm:text-base animate-bounce-gentle">{c.emoji}</span>
                <span className="truncate max-w-[80px] sm:max-w-none">{c.label}</span>
              </motion.span>
            ))}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground"
          >
            Compare Smarter,{" "}
            <span className="text-gradient">Spend Better</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            Compare prices and fares across groceries, transport, medicines, cosmetics, and shopping — all in one place. Save time, save money.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold bg-gradient-vibrant text-white"
              >
                Let's Start <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl font-semibold border-2 hover:border-primary"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-6 sm:gap-8 pt-4 sm:pt-6 justify-center sm:justify-start">
            {stats.map((s, index) => (
              <motion.div
                key={s.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative inline-block">
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground relative z-10">{s.value}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur animate-pulse-soft" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center mt-8 sm:mt-0"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-4 sm:-inset-6 bg-primary/5 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
            <motion.img
              src={heroImage}
              alt="OneCart+ price comparison illustration"
              className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl drop-shadow-lg sm:drop-shadow-xl rounded-xl sm:rounded-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="text-primary font-semibold text-sm uppercase tracking-widest bg-accent px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-block"
              whileHover={{ scale: 1.05 }}
            >
              How it works
            </motion.span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 text-foreground">
              Three steps to smarter spending
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { step: "01", title: "Choose a category", desc: "Pick from Groceries, Cosmetics, Transport, Medicines, or Shopping." },
              { step: "02", title: "Search or paste a link", desc: "Enter the product name or paste a link from any platform." },
              { step: "03", title: "Compare & save", desc: "See prices side-by-side and pick the best deal instantly." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-xl sm:rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.span
                  className="text-4xl sm:text-5xl font-extrabold text-primary/20 group-hover:text-primary/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.step}
                </motion.span>
                <h4 className="text-lg sm:text-xl font-bold mt-3 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="text-primary font-semibold text-sm uppercase tracking-widest bg-accent px-3 py-1 sm:px-4 sm:py-1.5 rounded-full inline-block"
              whileHover={{ scale: 1.05 }}
            >
              Features
            </motion.span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 text-foreground">
              Why OneCart+?
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <f.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </motion.div>
                <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors relative z-10">{f.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="bg-gradient-vibrant rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-float" />
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-bounce-gentle" />

            <div className="relative z-10">
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ready to save on every purchase?
              </motion.h3>
              <motion.p
                className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Join thousands of smart shoppers who compare before they buy.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl sm:rounded-full font-semibold shadow-lg hover:shadow-xl text-primary bg-white hover:bg-gray-50"
                >
                  Start Comparing Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.h1
            className="text-lg sm:text-xl font-bold font-heading text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            OneCart<span className="text-primary">+</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-sm text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © 2026 OneCart+. Compare smarter, spend better.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
