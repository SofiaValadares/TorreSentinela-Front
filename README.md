# 🛰️ Torres Sentinela – Frontend

Interface web do projeto **Torres Sentinela**, um sistema de monitoramento voltado para a coleta e visualização de dados de precipitação (chuvas).  

Este frontend foi desenvolvido em **Angular** e tem como objetivo exibir, de forma clara e intuitiva, as informações coletadas pelas torres do projeto, permitindo acompanhar os dados em tempo quase real.

> ℹ️ Para entender o contexto completo do projeto (objetivo, aplicação e arquitetura geral), consulte o site oficial do Projeto Sentinela e o repositório responsável pela parte de coleta de dados (hardware + firmware).

---

## 🌐 Sobre este repositório

Este repositório contém **apenas a interface web** (frontend) do sistema **Torres Sentinela**.

Aqui você encontrará:

- Páginas e componentes de visualização dos dados de precipitação;
- Lógica de apresentação e organização das informações retornadas pelo backend;
- Estrutura base em Angular para evolução futura da aplicação.

O backend / firmware responsável pela coleta dos dados é mantido em outro repositório.

---

## 🧰 Tecnologias utilizadas

- [Angular CLI](https://angular.dev/) (versão 20.3.7)
- TypeScript
- HTML / CSS / SCSS

---

## 🚀 Como executar o projeto

### 1. Pré-requisitos

- Node.js instalado  
- Angular CLI instalado globalmente (opcional, mas recomendado)

### 2. Instalar dependências

Na pasta do projeto, execute:

```bash
npm install
```
### 3. Subir o servidor de desenvolvimento

Execute:

```bash
ng serve
```

Depois, acesse no navegador: `http://localhost:4200/`

A aplicação será recarregada automaticamente sempre que você alterar algum arquivo fonte.

---

## 🏗️ Scripts úteis (Angular CLI)

**Gerar um novo componente**

```bash
ng generate component nome-do-componente
```

Para ver todos os esquemas disponíveis (components, directives, pipes, etc.):

```bash
ng generate --help
```

**Build de produção**

```bash
ng build
```

Os artefatos gerados ficarão na pasta `dist/`, já otimizados para desempenho.

---

## 🧪 Testes

### Testes unitários

Para executar os testes unitários com o Karma:

```bash
ng test
```

### Testes end-to-end (e2e)

```bash
ng e2e
```

> **Nota:** O Angular CLI não vem com um framework e2e configurado por padrão. Você pode escolher a solução que melhor se adequar ao projeto.

---

## 🔗 Integração com o restante do projeto

Este frontend foi pensado para consumir os dados coletados pelas **Torres Sentinela** (módulo de hardware/firmware).

> ⚠️ **Atenção:** Certifique-se de que o backend / serviço responsável pela disponibilização dos dados esteja configurado e em execução para que os gráficos e telas funcionem corretamente.

---

## 👥 Desenvolvedores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/LuizaCalife">
        <img src="https://avatars.githubusercontent.com/u/109395661?v=4" width="100px;" alt="Maria Luiza Calife"/><br>
        <sub><b>Maria Luiza Calife</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dan-albuquerque">
        <img src="https://avatars.githubusercontent.com/u/114592376?v=4" width="100px;" alt="Foto Danilo Albuquerque"/><br>
        <sub><b>Danilo Albuquerque</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/guiga-sa">
        <img src="https://avatars.githubusercontent.com/u/123979639?v=4" width="100px;" alt="Foto Guilherme Silveira"/><br>
        <sub><b>Guilherme Silveira</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SofiaValadares">
        <img src="https://avatars.githubusercontent.com/u/113111708?v=4" width="100px;" alt="Foto Sofia Valadares"/><br>
        <sub><b>Sofia Valadares</b></sub>
      </a>
    </td>
</table>

---

## 📚 Recursos adicionais

Para mais detalhes sobre comandos e possibilidades do Angular CLI, acesse a documentação oficial:

[Angular CLI Documentation](https://angular.dev/tools/cli)
