
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3">OfertaHub</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">Sobre nós</Link>
              <Link to="/terms" className="hover:text-foreground">Termos de uso</Link>
              <Link to="/privacy" className="hover:text-foreground">Política de privacidade</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3">Marketplaces</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/connect" className="hover:text-foreground">Conectar marketplaces</Link>
              <Link to="/partners" className="hover:text-foreground">Parcerias</Link>
              <Link to="/popular" className="hover:text-foreground">Mais populares</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3">Ajuda</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/faq" className="hover:text-foreground">Perguntas frequentes</Link>
              <Link to="/contact" className="hover:text-foreground">Contato</Link>
              <Link to="/support" className="hover:text-foreground">Suporte</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold mb-3">Siga-nos</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OfertaHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
