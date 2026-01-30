# IntelliTrip - Frontend

Este repositório contém o **Frontend** da aplicação **IntelliTrip**, desenvolvido com Next.js. É a interface através da qual os usuários planejam suas viagens, convidam amigos e recebem sugestões via IA.

A aplicação consome a API desenvolvida no repositório **Travel-AI**.

🔗 **Repositório do Backend:** [https://github.com/JoaoPeNascimento/Travel-Ai]

## 🚀 Tecnologias Utilizadas

A interface foi construída com foco em performance e experiência do usuário moderna:

- **Next.js 15**: Framework React com suporte a Server Components e Turbopack.
- **TypeScript**: Desenvolvimento mais seguro e escalável.
- **Tailwind CSS**: Estilização utilitária rápida e responsiva.
- **Zustand**: Gerenciamento de estado leve e prático (usado para autenticação e UI).
- **React Hook Form & Zod**: Gerenciamento e validação de formulários.
- **Shadcn UI / Radix UI**: Componentes de interface acessíveis e customizáveis (Dialogs, Cards, Dropdowns).
- **Sonner**: Notificações toast elegantes.
- **Lucide React**: Ícones modernos.

## 📱 Funcionalidades

- **Autenticação**: Login e Cadastro de usuários.
- **Dashboard**: Visualização das viagens planejadas.
- **Planejamento**: Criação de viagens com datas, destinos e atividades.
- **Colaboração**: Convite para amigos participarem do planejamento.
- **IA**: Sugestões de roteiros baseadas no destino (integrado ao Backend).

## 🛠️ Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- Backend (Travel-AI) rodando localmente ou em produção para que a API esteja acessível.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone <https://github.com/JoaoPeNascimento/IntelliTrip>
    cd intellitrip
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto:

    ```env
    NEXT_PUBLIC_API_URL="http://localhost:3333" # Ou a URL de produção do backend
    ```

4.  **Execute o projeto:**
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000` no seu navegador.

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com Turbopack.
- `npm run build`: Cria a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa a verificação de linting.

---
