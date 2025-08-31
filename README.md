# IntelliTrip

Este projeto é composto por dois repositórios principais: **IntelliTrip (Front-end)** e **Travel-Ai (Back-end)**.  
Juntos, eles formam uma aplicação completa de **gestão de viagens**, com funcionalidades que integram convites por e-mail, criação de atividades, sugestões de IA e gerenciamento de participantes.

---

## 🚀 IntelliTrip (Front-end)

### Tecnologias utilizadas

- **Next.js**
- **TypeScript**
- **Zod**
- **Tailwind CSS**
- **Shadn**

### Funcionalidades

- **Criar viagens**
- Enviar **convites por e-mail** para viagens
- Criar e gerenciar **atividades** durante a viagem
- Receber **sugestões de IA** para o destino
- Visualizar e gerenciar **convites recebidos**

### Como executar

```bash
# Instale dependências
npm install
# ou
yarn install

# Execute em modo de desenvolvimento
npm run dev
# ou
yarn dev

# Acesse em http://localhost:3000
```

---

## ⚙️ IntelliTrip (Back-end)

### Tecnologias utilizadas

- **Node.js** com **TypeScript**
- **Express.js** (endpoints de API REST)
- **Prisma ORM** (integração com banco de dados)
- **Nodemailer** (envio de e-mails)
- **Husky** e **Lint-staged** (boas práticas de commits)
- **ESLint**

### Funcionalidades

- Criação, armazenamento e modifição de **Viagens**
- API para envio e gerenciamento de **convites por e-mail**
- Criação e armazenamento de **atividades** relacionadas às viagens
- Integração com **IA** para sugerir atividades no destino
- Comunicação com o front-end via **endpoints REST**

### Como executar

```bash
# Instale dependências
npm install
# ou
yarn install

# Execute em modo de desenvolvimento
npm run dev
# ou
yarn dev

# Configurações adicionais necessárias:
# - Variáveis de ambiente (SMTP para e-mails, conexão com banco de dados, chave da IA, etc.)
# - Migrações do banco (Prisma)
npx prisma migrate dev
# ou
yarn prisma migrate dev
```

---

## 📌 Estrutura do Projeto

- **IntelliTrip (Front-end):** Interface do usuário em Next.js
- **Travel-Ai (Back-end):** API em Node.js com Prisma

---

## 📖 Visão Geral

O **IntelliTrip** é um sistema moderno de gestão de viagens que combina a praticidade de organizar atividades com a inteligência artificial para sugerir passeios e experiências personalizadas.  
Os usuários podem convidar amigos, montar itinerários e acompanhar todas as informações em um só lugar.

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Para sugerir melhorias ou reportar problemas, abra uma **issue** ou envie um **pull request**.
