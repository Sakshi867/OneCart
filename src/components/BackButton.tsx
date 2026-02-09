import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  variant?: "dashboard" | "home" | "back";
  className?: string;
}

const BackButton = ({ to = "/dashboard", variant = "dashboard", className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  const getButtonContent = () => {
    switch (variant) {
      case "home":
        return (
          <>
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </>
        );
      case "back":
        return (
          <>
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </>
        );
      default: // dashboard
        return (
          <>
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </>
        );
    }
  };

  const handleClick = () => {
    if (to === "/dashboard") {
      navigate(to);
    } else if (to === "/") {
      navigate(to);
    } else {
      navigate(-1); // Go back in history
    }
  };

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        onClick={handleClick}
        className="gap-2 rounded-full px-6 py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 hover:border-pink-300 hover:from-pink-100 hover:to-purple-100 group"
      >
        <motion.div
          animate={{ x: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="group-hover:text-primary transition-colors"
        >
          {getButtonContent()}
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default BackButton;