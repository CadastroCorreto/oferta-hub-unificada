import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Marketplaces from "./pages/Marketplaces";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { MercadoLivreCallback } from "./components/marketplace/MercadoLivreCallback";
import SslCertificate from "./pages/SslCertificate";
import ApiManagement from "./pages/ApiManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/marketplaces" element={<Marketplaces />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/callback/mercadolivre" element={<MercadoLivreCallback />} />
          <Route path="/ssl-certificate" element={<SslCertificate />} />
          <Route path="/admin/apis" element={<ApiManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
