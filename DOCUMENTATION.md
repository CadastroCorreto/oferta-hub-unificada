
# Documentação do OfertaHub

## Visão Geral

O OfertaHub é uma aplicação web que permite aos usuários comparar preços e ofertas entre diferentes marketplaces (como MercadoLivre, Amazon, Shopee, etc). O sistema permite conectar contas de diferentes marketplaces para acessar ofertas personalizadas, acompanhar pedidos e utilizar recursos específicos de cada plataforma.

## Estrutura do Projeto

O projeto é construído com as seguintes tecnologias:
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- React Query

### Estrutura de Diretórios

```
src/
├── components/          # Componentes reutilizáveis da interface
│   ├── ui/              # Componentes de UI genéricos (shadcn/ui)
│   ├── marketplace/     # Componentes específicos para marketplaces
├── data/                # Dados estáticos e mocks
├── hooks/               # Custom React hooks
├── lib/                 # Utilitários e funções auxiliares
├── pages/               # Componentes de página
├── services/            # Serviços para chamadas de API
├── types/               # Definições de tipos TypeScript
```

## Principais Funcionalidades

### Página Inicial

A página inicial apresenta:
- Uma barra de pesquisa para buscar produtos em diferentes marketplaces
- Um carrossel de marketplaces disponíveis para conexão
- Uma seção de produtos em destaque
- Descrição das principais funcionalidades do sistema

### Conexão com Marketplaces

Os usuários podem:
- Ver informações sobre diferentes marketplaces
- Conectar suas contas de marketplace fornecendo credenciais
- Gerenciar suas conexões existentes (visualizar/desconectar)
- Configurar preferências relacionadas aos marketplaces conectados

### Busca de Produtos

O sistema permite:
- Buscar produtos em múltiplos marketplaces simultaneamente
- Comparar preços entre diferentes plataformas
- Filtrar e ordenar resultados por diversos critérios
- Ver detalhes completos de cada produto

## Componentes Principais

### MarketplaceConnector

O componente principal para gerenciar conexões com marketplaces. Permite aos usuários:
- Ver lista de marketplaces disponíveis
- Visualizar detalhes sobre cada marketplace
- Conectar-se a marketplaces usando credenciais
- Desconectar marketplaces existentes

### MarketplaceCard

Exibe informações sobre cada marketplace em um formato de card, mostrando:
- Nome e logotipo
- Descrição curta
- Status de conexão
- Botões para conectar/desconectar e obter mais informações

### MarketplaceConnectDialog

Modal utilizado para inserir credenciais ao conectar-se a um marketplace.

### MarketplaceInfoDialog

Modal que exibe informações detalhadas sobre um marketplace específico.

### ProductCard

Exibe informações sobre produtos, incluindo:
- Imagem
- Título
- Preço atual e original
- Marketplace de origem
- Classificação e status de envio

## Fluxo de Dados

1. **Conexão com Marketplaces**:
   - Os dados dos marketplaces disponíveis são carregados do arquivo `marketplaces.ts`
   - O serviço `marketplace.ts` gerencia as chamadas de API para conectar/desconectar marketplaces
   - O estado das conexões é gerenciado no componente `MarketplaceConnector.tsx`

2. **Busca de Produtos**:
   - Usuários podem buscar produtos através da `SearchBar`
   - Os resultados são exibidos na página de busca como `ProductCard`s
   - Produtos podem ser selecionados para visualizar detalhes completos

## Guia de Desenvolvimento

### Pré-requisitos

- Node.js (versão recomendada: 16+)
- npm ou yarn

### Configuração do Ambiente

```bash
# Clone o repositório
git clone <URL_DO_REPOSITÓRIO>

# Entre na pasta do projeto
cd ofertahub

# Instale as dependências
npm install
# ou
yarn

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

### Adicionando um novo Marketplace

Para adicionar um novo marketplace:

1. Adicione as informações do marketplace no arquivo `src/data/marketplaces.ts`
2. Implemente os métodos necessários no serviço `src/services/marketplace.ts` para conectar/desconectar o novo marketplace
3. Atualize os tipos em `src/types/marketplace.ts` se necessário

### Estendendo os Componentes

Todos os componentes foram projetados para serem modulares e facilmente extensíveis. Para modificar ou estender um componente:

1. Identifique o componente que precisa ser modificado
2. Faça as alterações necessárias mantendo as interfaces existentes
3. Atualize os tipos TypeScript correspondentes
4. Teste as alterações para garantir compatibilidade com o restante da aplicação

## Considerações Técnicas

### Gerenciamento de Estado

O aplicativo utiliza:
- Estado local do React para interações de componentes individuais
- React Query para gerenciamento de estado de servidor e cache de dados
- Passagem de props para comunicação entre componentes próximos na árvore

### Estilização

O projeto utiliza:
- Tailwind CSS para estilização baseada em utility classes
- Componentes do Shadcn UI como base para elementos de UI consistentes
- Layout responsivo para funcionar em diferentes tamanhos de tela

### Tipos e Interfaces

TypeScript é utilizado em todo o projeto para garantir segurança de tipos. As definições principais estão em:
- `src/types/marketplace.ts` - Tipos relacionados a marketplaces

## Roadmap e Melhorias Futuras

Possíveis melhorias para o projeto:

1. **Implementação de autenticação de usuário**
   - Adicionar login/registro com email, Google, etc.
   - Perfil de usuário para salvar preferências

2. **Integrações reais com APIs de marketplaces**
   - Substituir dados mock por chamadas reais às APIs
   - Implementar OAuth para autenticação segura

3. **Funcionalidades avançadas**
   - Alertas de preço
   - Histórico de preços com gráficos
   - Recomendações personalizadas

4. **Melhorias de UX/UI**
   - Temas claro/escuro
   - Animações e transições
   - Modos de visualização alternativos para produtos

## Solução de Problemas

### Problemas Comuns

- **Erro ao conectar marketplace**: Verifique as credenciais e certifique-se de que o serviço está respondendo corretamente.
- **Produtos não aparecem na busca**: Verifique a conectividade com a API e os filtros aplicados.
- **UI não responsiva em dispositivos móveis**: Verifique as classes Tailwind para garantir que estão usando os breakpoints corretos (sm, md, lg).

## Contribuição

Para contribuir com o projeto:

1. Faça fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
