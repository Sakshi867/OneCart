import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryProvider } from "@/contexts/CategoryContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CategoryHome from "./pages/CategoryHome";
import NotFound from "./pages/NotFound";
import { OnboardingExperience } from "./components/OnboardingExperience";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CategoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingExperience />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category/:id" element={<CategoryHome />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CategoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
