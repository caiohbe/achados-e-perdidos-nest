# 📦 Achados e Perdidos — Backend

API REST para gerenciamento de itens achados e perdidos, desenvolvida para o SENAI.  
Permite registrar, buscar, filtrar e devolver itens encontrados nas dependências da instituição.

![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat&logo=mysql&logoColor=white)

---

## Sumário

- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Endpoints](#endpoints)
- [Exemplos de Uso](#exemplos-de-uso)
- [Modelo de Dados](#modelo-de-dados)
- [Scripts](#scripts)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## Stack

| Tecnologia      | Versão | Função                                       |
| --------------- | ------ | -------------------------------------------- |
| NestJS          | ^10    | Framework principal para a API REST          |
| TypeScript      | ^5     | Tipagem estática em todo o projeto           |
| Prisma ORM      | ^6     | Acesso ao banco com type-safety e migrations |
| MySQL           | 8      | Banco de dados relacional                    |
| class-validator | ^0.14  | Validação de DTOs via decorators             |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior (incluso com o Node)
- [MySQL 8](https://dev.mysql.com/downloads/) rodando localmente

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/achados-e-perdidos.git
cd achados-e-perdidos
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com os dados do seu banco:

```env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/achados_e_perdidos"
```

### 4. Criar o banco de dados

```sql
CREATE DATABASE achados_e_perdidos;
```

### 5. Gerar o Prisma Client

> ⚠️ Este passo é obrigatório antes de rodar migrations ou seed.

```bash
npx prisma generate
```

### 6. Executar as migrations

```bash
npx prisma migrate deploy
```

### 7. Popular o banco com dados iniciais

```bash
npx prisma db seed
```

> Insere 5 locais, 5 usuários e 27 itens de exemplo para desenvolvimento.

### 8. Iniciar o servidor

```bash
# Desenvolvimento (com hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

Servidor disponível em `http://localhost:3000`.

---

## Endpoints

### Itens — `/items`

| Método   | Rota         | Descrição               |
| -------- | ------------ | ----------------------- |
| `GET`    | `/items`     | Lista todos os itens    |
| `GET`    | `/items/:id` | Retorna um item pelo ID |
| `POST`   | `/items`     | Cadastra um novo item   |
| `PATCH`  | `/items/:id` | Atualiza um item        |
| `DELETE` | `/items/:id` | Remove um item          |

**Query params disponíveis em `GET /items`:**

| Param     | Tipo                | Descrição                                                            |
| --------- | ------------------- | -------------------------------------------------------------------- |
| `search`  | string              | Filtra por nome do item (startsWith)                                 |
| `userId`  | number \| `"none"`  | Filtra por usuário que recebeu; `none` retorna apenas não devolvidos |
| `localId` | number              | Filtra pelo local onde foi encontrado                                |
| `date`    | string (YYYY-MM-DD) | Filtra pela data de encontro                                         |

### Usuários — `/users`

| Método   | Rota           | Descrição                                  |
| -------- | -------------- | ------------------------------------------ |
| `GET`    | `/users`       | Lista usuários. Aceita `?search=` por nome |
| `GET`    | `/users/:name` | Busca usuário por nome                     |
| `POST`   | `/users`       | Cadastra um novo usuário                   |
| `PATCH`  | `/users/:id`   | Atualiza dados de um usuário               |
| `DELETE` | `/users/:id`   | Remove um usuário                          |

### Locais — `/locais`

| Método   | Rota            | Descrição                                |
| -------- | --------------- | ---------------------------------------- |
| `GET`    | `/locais`       | Lista locais. Aceita `?search=` por nome |
| `GET`    | `/locais/:nome` | Busca locais pelo nome                   |
| `POST`   | `/locais`       | Cadastra um novo local                   |
| `PATCH`  | `/locais/:id`   | Atualiza um local                        |
| `DELETE` | `/locais/:id`   | Remove um local                          |

---

## Exemplos de Uso

### Cadastrar um item

```http
POST /items
Content-Type: application/json

{
  "item": "Guarda-chuva",
  "descricao": "Preto com detalhes vermelhos",
  "imagem_URL": "https://exemplo.com/imagem.png",
  "data_encontrado": "2024-06-01",
  "local_encontrado_id": 1
}
```

### Registrar devolução

```http
PATCH /items/3
Content-Type: application/json

{
  "usuario_devolvido_id": 2
}
```

### Buscar com filtros

```bash
# Itens não devolvidos no local 2
GET /items?userId=none&localId=2

# Busca por nome
GET /items?search=mochila
```

### Cadastrar usuário

```http
POST /users
Content-Type: application/json

{
  "nome": "Ana Souza",
  "cpf": "12345678900",
  "email": "ana@exemplo.com"
}
```

> O CPF é automaticamente sanitizado (aceita `123.456.789-00` ou `12345678900`).

---

## Modelo de Dados

```
Item
├── id                   Int      (PK)
├── item                 String   nome do objeto
├── descricao            String
├── imagem_URL           String?  (max 500 chars)
├── data_encontrado      DateTime?
├── local_encontrado_id  Int      (FK → LocaisSenai)
└── usuario_devolvido_id Int?     (FK → User, null = não devolvido)

User
├── id    Int     (PK)
├── nome  String
├── cpf   String  (unique)
└── email String  (unique)

LocaisSenai
├── id   Int    (PK)
└── nome String (unique)
```

### Resposta de erro

Todos os erros seguem o mesmo formato:

```json
{
  "statusCode": 400,
  "message": "Registro duplicado: cpf já cadastrado(s).",
  "timestamp": "2024-06-01T12:00:00.000Z",
  "path": "/users"
}
```

---

## Scripts

| Comando                     | Descrição                           |
| --------------------------- | ----------------------------------- |
| `npm run start:dev`         | Desenvolvimento com hot reload      |
| `npm run build`             | Compila TypeScript para `dist/`     |
| `npm run start:prod`        | Inicia a versão compilada           |
| `npm run test`              | Executa testes unitários            |
| `npm run test:e2e`          | Executa testes end-to-end           |
| `npx prisma generate`       | Gera o Prisma Client                |
| `npx prisma migrate deploy` | Aplica migrations pendentes         |
| `npx prisma db seed`        | Popula o banco com dados de exemplo |
| `npx prisma studio`         | Interface visual para o banco       |

---

## Variáveis de Ambiente

| Variável       | Obrigatória | Padrão | Descrição               |
| -------------- | ----------- | ------ | ----------------------- |
| `DATABASE_URL` | ✅          | —      | String de conexão MySQL |
| `PORT`         | ❌          | `3000` | Porta do servidor       |

---

## Estrutura do Projeto

```
src/
├── common/
│   ├── errors/
│   │   └── prisma-error.handler.ts   # Tratamento centralizado de erros Prisma
│   └── filters/
│       └── all-exceptions.filter.ts  # Filtro global de exceções HTTP
├── items/
│   ├── dto/                          # Validação de entrada (create + update)
│   ├── entities/item.entity.ts
│   ├── items.controller.ts           # Rotas HTTP
│   ├── items.service.ts              # Lógica de negócio e filtros
│   ├── items.repository.ts           # Queries Prisma
│   └── items.module.ts
├── users/                            # Mesma estrutura do módulo items
├── locais/                           # Mesma estrutura do módulo items
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
└── main.ts

prisma/
├── schema.prisma                     # Modelos do banco
├── seed.ts                           # Dados iniciais
└── migrations/                       # Histórico de migrations
```
