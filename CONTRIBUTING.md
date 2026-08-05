# Como Contribuir com o OpenBusiness

Obrigado por estar interessado em contribuir com o OpenBusiness! Toda contribuição é bem-vinda.

## Como Começar

1. Faça um fork do repositório
2. Clone o fork: `git clone https://github.com/mmdj04/openbusiness.git`
3. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
4. Instale as dependências: `npm install`
5. Rode o desenvolvimento: `npm run dev`

## Desenvolvimento

### Comandos Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificar lint
npm run lint:fix     # Corrigir lint automaticamente
npm run format       # Formatar código com Prettier
npm run typecheck    # Verificar tipos TypeScript
npm run validate     # Rodar todas as verificações
```

### Commit Convention

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação (não afeta o código)
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` tarefas de manutenção
- `perf:` melhorias de performance
- `ci:` alterações na CI/CD

Exemplo:

```
feat: adicionar autenticação JWT
fix: corrigir bug no login
docs: atualizar README
```

### Pull Requests

1. Mantenha seu código limpo e seguindo o padrão do projeto
2. Adicione testes para novas funcionalidades
3. Atualize a documentação se necessário
4. Certifique-se de que `npm run validate` passa
5. Escreva um PR title claro seguindo a Conventional Commits

### Estrutura de Pastas

```
src/
├── app/              # App Router (Next.js)
├── components/
│   └── ui/           # Componentes shadcn/ui
├── lib/              # Utilitários e helpers
└── hooks/            # Custom React hooks
```

## Código de Conduta

Leia nosso [Código de Conduta](CODE_OF_CONDUCT.md) antes de contribuir.

## Perguntas?

Abra uma [Discussion](https://github.com/mmdj04/openbusiness/discussions) no GitHub.
