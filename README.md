# 🛰️ SAMI - Sistema Automatizado de Monitoramento de Infraestrutura
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A **SAMI** é um sistema de monitoramento de infraestrutura desenvolvido em **Node.js + TypeScript**, responsável por verificar periodicamente a disponibilidade de hosts cadastrados em um banco de dados PostgreSQL.

O objetivo é automatizar a verificação de disponibilidade de servidores e equipamentos de rede, registrando o histórico de cada verificação para futuras consultas e análises.
---
# 🚧 Status do Projeto

> **Em desenvolvimento (MVP funcional)**

### ✅ Concluído

- [x] Estrutura inicial do projeto
- [x] Configuração do TypeScript
- [x] Configuração do Prisma ORM
- [x] Integração com PostgreSQL
- [x] Modelagem das entidades Host e PingLog
- [x] Sistema de monitoramento via ICMP (Ping)
- [x] Atualização automática do status dos hosts
- [x] Registro do histórico de verificações
- [x] Estrutura inicial da API com Express

### 🚧 Em desenvolvimento

- [ ] CRUD completo de Hosts
- [ ] Validação de dados da API
- [ ] Organização em Controllers e Routes
- [ ] Sistema de filtros para consultas

### 📅 Roadmap

- [ ] Dashboard Web (React + TypeScript)
- [ ] Gráficos de disponibilidade
- [ ] Pesquisa por período
- [ ] Estatísticas de latência
- [ ] Docker
- [ ] Autenticação
- [ ] Deploy em nuvem

---


# 📖 Objetivo

Em ambientes corporativos, especialmente em empresas de telecomunicações e infraestrutura, a indisponibilidade de um servidor ou equipamento pode impactar milhares de usuários.

O SAMI foi desenvolvido para:

- Monitorar automaticamente hosts cadastrados;
- Registrar o histórico de disponibilidade;
- Atualizar o status atual de cada equipamento;
- Disponibilizar essas informações através de uma API REST;
- Servir como base para um Dashboard Web.

---

# 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Ping (ICMP)

---

# 🏗️ Arquitetura Atual

```
                  React Dashboard
                         │
                         ▼
                  Express REST API
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 Monitor Service                    Prisma ORM
        │                                 │
        └────────────────┬────────────────┘
                         ▼
                    PostgreSQL
```

---

# 📂 Estrutura do Projeto

```
src/

├── config/
│
├── database/
│   └── prisma.ts
│
├── services/
│   └── monitor.service.ts
│
├── api.ts
│
└── server.ts

prisma/

└── schema.prisma
```

---

# 🗄️ Modelagem do Banco

## Host

Representa um equipamento monitorado pelo sistema.

Campos principais:

- Nome
- Endereço IP
- Status atual
- Datas de criação e atualização

Cada Host possui vários registros de monitoramento.

---

## PingLog

Representa o histórico das verificações realizadas pelo monitor.

Cada registro armazena:

- Host monitorado
- Status (ONLINE / OFFLINE)
- Latência
- Data da verificação

Relacionamento:

```
┌───────────────┐
│     Host      │
├───────────────┤
│ id            │
│ name          │
│ ipAddress     │
│ status        │
└───────┬───────┘
        │ 1
        │
        │
        │ N
┌───────▼────────┐
│    PingLog     │
├────────────────┤
│ id             │
│ hostId         │
│ status         │
│ latencyMs      │
│ createdAt      │
└────────────────┘
```

---

# ⚙️ Funcionamento

A cada intervalo configurado o monitor:

1. Consulta todos os Hosts cadastrados.
2. Executa um Ping ICMP para cada Host.
3. Atualiza o status atual do Host.
4. Registra um novo PingLog com:
   - Status
   - Latência
   - Data/Hora

---

# 📡 API

Atualmente a API está sendo desenvolvida utilizando Express.

### Endpoints implementados

```
GET /hosts
```

### Endpoints planejados

```
GET    /hosts

GET    /hosts/:id

POST   /hosts

PUT    /hosts/:id

DELETE /hosts/:id

GET    /hosts/:id/logs

GET    /pinglogs

GET    /dashboard
```

---

# 🔄 Fluxo do Sistema

```
Monitor

↓

Consulta Hosts

↓

Executa Ping

↓

Atualiza Status

↓

Cria PingLog

↓

Banco de Dados

↓

Express API

↓

Dashboard
```

---

# 📈 Próximas Funcionalidades

- CRUD completo de Hosts
- Dashboard Web
- Filtros de pesquisa
- Histórico por Host
- Estatísticas de disponibilidade
- Tempo médio de resposta
- Gráficos de latência
- Docker
- Autenticação de usuários
- Deploy em nuvem

---

# 📌 Objetivos de Aprendizado

Este projeto foi desenvolvido com o objetivo de praticar:

- Arquitetura Backend
- TypeScript
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- APIs REST
- Modelagem de Banco de Dados
- Organização de Projetos
- Boas práticas de Engenharia de Software

---

# 📄 Licença

Projeto desenvolvido para fins de estudo e construção de portfólio.
