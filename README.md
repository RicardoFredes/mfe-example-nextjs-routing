# Exemplo de uso entre dois MFEs em Next JS

Esse repositório apresenta uma solução para composição via rotas entre dois Apps usando o Module Federation:

- Host
- Remote

## Apps

Nesse exemplo, a composição ocorre a partir das rotas `remote/*`.
Ambos os apps usam a build estática do Next.

**Tecnologias:**

- Next JS
- @module-federation/nextjs-mf

### Host (MFE)

Para integrar o MFE Remote, as páginas das rotas `/remote/*` são as mesmas, no entanto é necessário ter o conjunto:
- `index.tsx`
- `[...paths].tsx`

### Remote (MFE)

O arquivo `remote-app.tsx` é exposto via Module Federation e possui as regras de carregamento das páginas a partir do `pathname`. Para fazer esse roteamento é usado o `routes-manifest.json` gerado pelo Next JS e que já contém as regras de `regex` necessárias.

**Limitações:**

- Ao invés de adicionar contextos e regras ao arquivo `__app.tsx`, deve ser criado um componente que possui esses regras e é usado tanto no `__app.tsx` como no `remote-app.tsx`;
- O módulo federado só funciona via client Side;
- O roteamento dinâmico não funciona usando o `router.query`, para isso foi criado um hook chamado de `useWatchParam` para tratar do `pathname`;

## Rodar o projeto

O Module Federation só funciona com a aplicação compilada, portanto é necessário servir a aplicação Remote após o build.

**Instalação dos pacotes:**

```bash
yarn install
```

**Rodar o Remote:**

```bash
yarn run remote
# http://localhost:3000/remote
```

**Rodar o Host:**

```bash
yarn run host
# http://localhost:3001
```

Se tudo deu certo, a aplicação estará rodando na porta `3001`

<img width="565" alt="image" src="https://github.com/RicardoFredes/mfe-example-nextjs-routing/assets/29892001/58bc781b-fca9-4f46-be5a-c14b7e286d75">
