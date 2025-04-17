
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FlightResults from "./pages/FlightResults";
import HotelResults from "./pages/HotelResults";
import PackageResults from "./pages/PackageResults";
import Profile from "./pages/Profile";
import CreateAlert from "./pages/CreateAlert";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flight-results" element={<FlightResults />} />
          <Route path="/hotel-results" element={<HotelResults />} />
          <Route path="/package-results" element={<PackageResults />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-alert" element={<CreateAlert />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
