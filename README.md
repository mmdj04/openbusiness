<div align="center">

# OpenBaaS

**Open Source Backend as a Service**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/mmdj04/openbaas/actions/workflows/ci.yml/badge.svg)](https://github.com/mmdj04/openbaas/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Commit Convention](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

</div>

---

## Sobre o OpenBaaS

O OpenBaaS é uma plataforma open-source de Backend as a Service construída com tecnologias modernas. Fornece uma API completa para autenticação, gerenciamento de dados e muito mais.

## Stack Tecnológica

| Tecnologia                                    | Descrição                        |
| --------------------------------------------- | -------------------------------- |
| [Next.js 16](https://nextjs.org/)             | Framework React full-stack       |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática para JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Utility-first CSS                |
| [shadcn/ui](https://ui.shadcn.com/)           | Componentes UI acessíveis        |
| [Recharts](https://recharts.org/)             | Biblioteca de gráficos           |
| [Zustand](https://zustand-demo.pmnd.rs/)      | Gerenciamento de estado          |
| [Axios](https://axios-http.com/)              | Cliente HTTP                     |
| [date-fns](https://date-fns.org/)             | Utilitários de data              |
| [Geist](https://github.com/vercel/geist-font) | Fonte tipográfica local (woff2)  |

## Funcionalidades

- Autenticação completa (Login, Registro, Recuperação de Senha)
- CRUD de recursos
- API RESTful
- Testes unitários e E2E
- CI/CD com GitHub Actions (gratuito)
- Deploy automático na Vercel
- Design responsivo
- Tema claro/escuro
- Acessibilidade (WCAG 2.1)
- 59 componentes shadcn/ui
- 27 blocks (dashboard, sidebar, login, signup)
- Gráficos (Area, Bar, Line, Pie, Radar, Radial)
- Skills shadcn/ui para assistentes de IA

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/mmdj04/openbaas.git

# Entre na pasta do projeto
cd openbaas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Comandos Disponíveis

| Comando             | Descrição                   |
| ------------------- | --------------------------- |
| `npm run dev`       | Servidor de desenvolvimento |
| `npm run build`     | Build de produção           |
| `npm run start`     | Iniciar em produção         |
| `npm run lint`      | Verificar lint              |
| `npm run lint:fix`  | Corrigir lint               |
| `npm run format`    | Formatar com Prettier       |
| `npm run typecheck` | Verificar tipos             |
| `npm run test`      | Testes unitários            |
| `npm run test:e2e`  | Testes E2E                  |
| `npm run validate`  | Rodar todas as verificações |

## Estrutura do Projeto

```
openbaas/
├── .agents/
│   └── skills/           # Skills shadcn/ui para IA
├── .github/
│   ├── ISSUE_TEMPLATE/   # Templates de issues
│   └── workflows/        # GitHub Actions CI/CD
├── public/
│   └── fonts/            # Fontes Geist (woff2)
├── src/
│   ├── app/              # App Router (Next.js)
│   │   ├── dashboard/    # Página de dashboard
│   │   ├── login/        # Página de login
│   │   └── signup/       # Página de registro
│   ├── components/
│   │   └── ui/           # Componentes shadcn/ui
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utilitários
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Contribuindo

Contribuições são muito bem-vindas! Leia nosso [Guia de Contribuição](CONTRIBUTING.md) para começar.

## Licença

Este projeto está sob a licença MIT. Veja o [LICENSE](LICENSE) para mais detalhes.
