
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary via-secondary to-primary-foreground flex items-center justify-center text-white font-bold text-xl">
              <Search className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-primary-foreground hover:text-primary/80 transition-colors">
              Encontrae
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-sm hover:text-primary">
            Início
          </Link>
          <Link to="/search" className="font-medium text-sm hover:text-primary">
            Pesquisar
          </Link>
          <Link to="/marketplaces" className="font-medium text-sm hover:text-primary">
            Marketplaces
          </Link>
          <Link to="/favorites" className="font-medium text-sm hover:text-primary">
            Favoritos
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex gap-2">
            <UserCircle className="h-4 w-4" />
            <span>Entrar</span>
          </Button>
          <Button className="hidden sm:flex">Cadastrar</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
