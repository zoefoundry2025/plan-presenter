import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProposalPage from "./pages/ProposalPage";
import WhyThisPlanPage from "./pages/WhyThisPlanPage";
import BenefitsPage from "./pages/BenefitsPage";
import TestAirtable from "./pages/TestAirtable";
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
          <Route path="/proposal/:proposalId" element={<ProposalPage />} />
          <Route path="/proposal/:proposalId/why-this-plan" element={<WhyThisPlanPage />} />
          <Route path="/proposal/:proposalId/benefits" element={<BenefitsPage />} />
          <Route path="/test-airtable" element={<TestAirtable />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
