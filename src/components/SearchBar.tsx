
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  size?: 'default' | 'lg';
  onSearch?: (query: string) => void;
}

export function SearchBar({ className, size = 'default', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn(
      "flex w-full max-w-3xl mx-auto",
      size === 'lg' ? 'gap-3' : 'gap-2',
      className
    )}>
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Busque produtos em todos os marketplaces..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "w-full pr-10 focus-visible:ring-primary",
            size === 'lg' && 'h-12 text-lg rounded-full px-6'
          )}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
      <Button 
        type="submit" 
        className={cn(
          size === 'lg' && 'h-12 px-8 text-base rounded-full'
        )}
      >
        Buscar
      </Button>
    </form>
  );
}
