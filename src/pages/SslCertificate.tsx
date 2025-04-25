
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { FileText, Shield, CheckCircle } from 'lucide-react';

export default function SslCertificate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold">Certificado SSL Local</h1>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-medium">HTTPS está configurado corretamente</p>
            </div>
            <p className="text-green-700 mt-2 text-sm">
              Seu aplicativo está rodando com HTTPS local para permitir redirecionamentos seguros
              para integrações com API como o Mercado Livre.
            </p>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Arquivos de Certificado</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 border rounded-md">
              <FileText className="h-10 w-10 text-blue-500" />
              <div>
                <h3 className="font-medium">Certificado (cert.pem)</h3>
                <p className="text-sm text-gray-600">Localização: ./cert/cert.pem</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-md">
              <FileText className="h-10 w-10 text-purple-500" />
              <div>
                <h3 className="font-medium">Chave Privada (key.pem)</h3>
                <p className="text-sm text-gray-600">Localização: ./cert/key.pem</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h3 className="font-medium mb-2">Próximos passos para integração:</h3>
            <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700">
              <li>Configure seu App ID e Secret no painel do desenvolvedor Mercado Livre</li>
              <li>Use a URL <code className="bg-gray-100 px-1 py-0.5 rounded">https://localhost:8080/callback/mercadolivre</code> como URI de redirecionamento</li>
              <li>Defina suas variáveis de ambiente (<code>VITE_ML_APP_ID</code> e <code>VITE_ML_SECRET_KEY</code>)</li>
            </ol>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => window.location.href = '/marketplaces'}>
              Ir para Configuração de Marketplaces
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
