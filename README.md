# InnQuizz

> Portal de vendar web de painéis solares.

Aplicação web de Quiz desenvolvido com React, Typescript e TailwindCSS.

A lista complete de bibliotecas e dependências você pode ver em [package.json](./package.json).

## Layout

O layout completo foi desenvolvido no Figma e está [disponível aqui](https://www.figma.com/design/REidLY7Ufy8UWCbZuxcShj/Jovens-Inn-Desenvolvimento).

## Setup & Run

Para executar o projeto da melhor maneira possível recomendamos utilizar o Docker. E caso esteja utilizando Windows e com problemas com o Docker, recomendamos a instalação do WSL conforme descrito [neste guia](https://github.com/codeedu/wsl2-docker-quickstart).

Clone o repositório da maneira que preferir, crie um novo arquivo `.env`, conforme o exemplo `.env.example`, e abra o terminal no diretório do repositório clonado.

#### Com Docker

```sh
docker-compose up -d --build
```

#### Sem Docker

```sh
npm install
npm run dev
```

### Configurações de VSCode recomendadas:

Instale as extensões [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```json
  "eslint.run": "onSave",
  "editor.formatOnSave": true,
  "prettier.requireConfig": false,
```
