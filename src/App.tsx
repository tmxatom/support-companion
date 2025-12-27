import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ComplaintProvider } from "@/contexts/ComplaintContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NewComplaintPage from "./pages/NewComplaintPage";
import ComplaintDetailPage from "./pages/ComplaintDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ComplaintProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Customer Routes */}
              <Route path="/customer" element={<CustomerDashboard />} />
              <Route path="/customer/new-complaint" element={<NewComplaintPage />} />

              {/* Agent Routes */}
              <Route path="/agent" element={<AgentDashboard />} />

              {/* Manager Routes */}
              <Route path="/manager" element={<ManagerDashboard />} />

              {/* Shared Routes */}
              <Route path="/complaint/:id" element={<ComplaintDetailPage />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ComplaintProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
