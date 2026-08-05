<div align="center">

# OpenBusiness

**Gestão completa para pequenos negócios**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/mmdj04/openbusiness/actions/workflows/ci.yml/badge.svg)](https://github.com/mmdj04/openbusiness/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Commit Convention](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

</div>

---

## Sobre o OpenBusiness

O OpenBusiness é uma plataforma de gestão para pequenos negócios construída com tecnologias modernas. Resolve problemas reais como faltas, erros e falta de organização.

## Stack Tecnológica

| Tecnologia                                    | Descrição                        |
| --------------------------------------------- | -------------------------------- |
| [Next.js 16](https://nextjs.org/)             | Framework React full-stack       |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática para JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Utility-first CSS                |
| [shadcn/ui](https://ui.shadcn.com/)           | Componentes UI acessíveis        |
| [Recharts](https://recharts.org/)             | Biblioteca de gráficos           |
| [Geist](https://github.com/vercel/geist-font) | Fonte tipográfica local (woff2)  |

## Funcionalidades

- Agenda inteligente com lembretes
- CRM e gestão de clientes
- Financeiro completo
- WhatsApp integrado
- Relatórios e dashboards
- Backup automático
- Usuários ilimitados
- Suporte técnico incluso
- App mobile ou PWA
- Módulos adicionais sob demanda

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/mmdj04/openbusiness.git

# Entre na pasta do projeto
cd openbusiness

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
| `npm run validate`  | Rodar todas as verificações |

## Estrutura do Projeto

```
openbusiness/
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
