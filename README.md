# Bus Pass - Frontend

O **Bus Pass** é um sistema de gerenciamento de viagens e passe livre para estudantes e usuários da prefeitura. Este repositório contém o frontend da aplicação, construído com foco em performance, responsividade e uma excelente experiência de usuário (UX).

## Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Biblioteca UI:** [React](https://react.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Requisições HTTP:** [Axios](https://axios-http.com/)

## Funcionalidades Atuais

### Navegação e Layout
* **Sidebar Responsiva:** Menu lateral retrátil com comportamento adaptativo para mobile e desktop. Inclui fechamento automático ao clicar fora (Click Outside) ou ao selecionar um link.
* **Navegação Universal:** Componente de `BackButton` integrado ao layout principal para facilitar a navegação profunda.
* **Tema Customizado:** Paleta de cores exclusiva (Brand Yellow, Dark Slate, Indigo Actions) configurada globalmente via Tailwind.

### Gestão de Viagens (Admin & Usuário)
* **Listagem de Viagens (Grid):** Exibição de viagens em cards responsivos (`TripsGrid`), com altura e largura padronizadas.
* **Filtro em Tempo Real:** Barra de pesquisa (`SearchInput`) que filtra a lista instantaneamente pelo nome da origem ou destino.
* **Criação e Edição:** Formulário dinâmico (`TripForm`) com validação de estado, suporte a `datetime-local` e select de tipos (Prefeitura/Empresa).
* **Exclusão Segura:** Modal de confirmação customizado (com efeito de desfoque e design limpo) para evitar exclusões acidentais, integrado ao método `DELETE` da API.

### Gestão de Documentos (Em Desenvolvimento)
* Tipagem base e Enums (`DocumentStatus`) já estruturados.
* Serviços HTTP mapeados para integração com o backend (Aprovação, Reprovação, Criação e Listagem).

## Estrutura de Pastas Principal

```text
bus-pass-front/
├── app/                  # Rotas do Next.js (App Router)
│   ├── admin/trips/      # Rotas protegidas de administração de viagens
│   ├── trips/            # Visão de viagens para o passageiro
│   ├── documents/        # Gestão de anexos e comprovantes
│   └── layout.tsx        # Layout raiz com Sidebar e BackButton
├── components/           # Componentes reutilizáveis (UI)
│   ├── Sidebar.tsx
│   ├── TripsGrid.tsx
│   ├── TripForm.tsx
│   └── SearchInput.tsx
├── services/             # Integração com a API Spring Boot (Axios)
│   ├── api.ts            # Instância configurada do Axios
│   ├── trips.ts          # CRUD de viagens
│   └── documents.ts      # CRUD de documentos
├── types/                # Interfaces e Tipos do TypeScript
│   ├── trip.ts
│   └── document.ts
└── globals.css           # Variáveis CSS e configurações do Tailwind v4

```

## Como Executar o Projeto Localmente

1. **Clone o repositório:**
```bash
git clone git@github.com:MuriloBarros304/bus-pass-front.git
cd bus-pass-front

```


2. **Instale as dependências:**
```bash
npm install
# ou
yarn install

```


3. **Configure as variáveis de ambiente:**
* Crie um arquivo `.env.local` na raiz do projeto.
* Adicione a URL do seu backend Spring Boot (ex: `NEXT_PUBLIC_API_URL=http://localhost:8080`). *(Ajuste conforme sua configuração no `api.ts`)*.


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
# ou
yarn dev

```


5. **Acesse a aplicação:**
Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador.
