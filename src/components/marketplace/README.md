
# Componentes de Marketplace

Esta pasta contém os componentes relacionados à funcionalidade de conexão e exibição de marketplaces.

## MarketplaceConnectDialog

Este componente renderiza um modal para conectar uma conta de marketplace.

### Props

```typescript
interface MarketplaceConnectDialogProps {
  isOpen: boolean;                                     // Controla se o diálogo está aberto
  onOpenChange: (open: boolean) => void;               // Callback quando o estado de abertura muda
  marketplace?: { name: string; };                     // Dados do marketplace que está sendo conectado
  credentials: { email: string; password: string; };    // Estado das credenciais inseridas
  onCredentialsChange: (field: "email" | "password", value: string) => void; // Callback para atualizar credenciais
  onConnect: () => void;                              // Callback para iniciar a conexão
}
```

### Uso

```jsx
<MarketplaceConnectDialog
  isOpen={isDialogOpen}
  onOpenChange={setIsDialogOpen}
  marketplace={currentMarketplace}
  credentials={credentials}
  onCredentialsChange={handleCredentialsChange}
  onConnect={handleConnect}
/>
```

## MarketplaceInfoDialog

Este componente exibe informações detalhadas sobre um marketplace em um modal.

### Props

```typescript
interface MarketplaceInfoDialogProps {
  isOpen: boolean;                       // Controla se o diálogo está aberto
  onOpenChange: (open: boolean) => void;  // Callback quando o estado de abertura muda
  marketplace?: {                        // Dados do marketplace
    name: string;
    logo: string;
    description: string;
  };
  onConnectClick: () => void;            // Callback quando o botão de conectar é clicado
}
```

### Uso

```jsx
<MarketplaceInfoDialog
  isOpen={isInfoDialogOpen}
  onOpenChange={setIsInfoDialogOpen}
  marketplace={currentMarketplace}
  onConnectClick={handleConnectClick}
/>
```

## Fluxo de interação

O fluxo típico para conectar um marketplace é:

1. Usuário clica no botão "Conectar" no MarketplaceCard
2. O MarketplaceConnectDialog é exibido
3. Usuário insere suas credenciais
4. Após clicar em "Conectar conta", o callback onConnect é acionado
5. O diálogo é fechado e a lista de marketplaces conectados é atualizada

Alternativamente, o usuário pode:

1. Clicar no botão de informações no MarketplaceCard
2. O MarketplaceInfoDialog é exibido com detalhes do marketplace
3. Usuário pode clicar em "Conectar" a partir do diálogo de informações
4. O fluxo continua como descrito acima

## Personalização

Estes componentes utilizam os componentes UI do shadcn e podem ser personalizados através de:

1. Modificação das props passadas para os componentes
2. Alteração das classes Tailwind para estilização
3. Extensão dos componentes para adicionar funcionalidades específicas
