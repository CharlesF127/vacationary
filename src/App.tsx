
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FlightResults from "./pages/FlightResults";
import HotelResults from "./pages/HotelResults";
import PackageResults from "./pages/PackageResults";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile1 from "./pages/Profile1";
import CreateAlert from "./pages/CreateAlert";
import NotFound from "./pages/NotFound";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import DealsPage from "./pages/deals";

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
          <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile1 />} />
          <Route path="/create-alert" element={<CreateAlert />} />
          <Route path="/success" element={<Success />} />
          <Route path="/deals" element={<DealsPage />} />

        <Route path="/cancel" element={<Cancel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
