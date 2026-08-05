<div align="center">

# OpenBaaS

**Open Source Backend as a Service**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/seu-usuario/openbaas/actions/workflows/ci.yml/badge.svg)](https://github.com/seu-usuario/openbaas/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Commit Convention](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[Português](README.md) | [English](README.en.md)

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
| [Zustand](https://zustand-demo.pmnd.rs/)      | Gerenciamento de estado          |
| [Axios](https://axios-http.com/)              | Cliente HTTP                     |
| [date-fns](https://date-fns.org/)             | Utilitários de data              |

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

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/openbaas.git

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
├── .github/
│   ├── ISSUE_TEMPLATE/    # Templates de issues
│   └── workflows/         # GitHub Actions CI/CD
├── src/
│   ├── app/               # App Router (Next.js)
│   ├── components/
│   │   └── ui/            # Componentes shadcn/ui
│   ├── lib/               # Utilitários
│   └── hooks/             # Custom hooks
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

## Contribuindo

Contribuições são muito bem-vindas! Leia nosso [Guia de Contribuição](CONTRIBUTING.md) para começar.

## Licença

Este projeto está sob a licença MIT. Veja o [LICENSE](LICENSE) para mais detalhes.

## Apoio

Se este projeto te ajudou, considere deixar uma ⭐ no repositório!
