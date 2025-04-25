
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-4 text-primary">404</h1>
          <p className="text-2xl font-medium mb-6">Oops! Página não encontrada</p>
          <p className="text-muted-foreground mb-8 max-w-md">
            A página que você está procurando não existe ou foi removida.
            Tente voltar para a página inicial.
          </p>
          <Button asChild size="lg">
            <a href="/">Voltar para o início</a>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
