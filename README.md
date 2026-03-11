# 🎓 Plataforma de Matrículas - Cursos On-line

Este projeto é uma aplicação web Full-Stack desenvolvida como resolução de um caso de uso para um sistema educacional. O objetivo principal é simular um fluxo de matrícula em cursos on-line, focando na integração entre uma interface de usuário responsiva (Frontend) e uma API estruturada e segura (Backend).



## 🚀 Funcionalidades

* **Listagem Dinâmica de Cursos:** O frontend consome uma rota `GET` da API para buscar e exibir os cursos disponíveis em tempo real.
* **Validação de Dados:** * **Frontend:** Utilização de atributos HTML5 e bloqueio de botões para evitar submissões duplas ou com dados em branco.
  * **Backend:** Validação rigorosa dos dados recebidos (tipagem, verificação de campos vazios e formato de e-mail) antes de processar a matrícula.
* **Experiência do Usuário (UX):**
  * Feedbacks visuais imediatos (mensagens de sucesso em verde e erros em vermelho).
  * Tratamento de estados de carregamento (*Loading*) enquanto a API processa as requisições.
* **Banco de Dados Simulado:** Armazenamento das matrículas em memória (arrays) no servidor Node.js.

## 💻 Tecnologias Utilizadas

**Front-end:**
* **Vue.js 3:** Framework progressivo para construção da interface de usuário (utilizando a Composition API).
* **CSS3:** Estilização componentizada para uma interface limpa e responsiva.

**Back-end:**
* **Node.js:** Ambiente de execução JavaScript no servidor.
* **Express:** Micro-framework para roteamento da API RESTful.
* **TypeScript:** Adição de tipagem estática ao JavaScript, garantindo maior segurança e previsibilidade no tráfego de dados.
* **CORS:** Middleware para permitir a comunicação segura entre portas diferentes (Client-Server).

**Ferramentas:**
* **VS Code:** Editor de código.
* **Postman:** Plataforma para teste e validação das rotas da API.

## ⚙️ Como executar o projeto localmente

Para rodar este projeto, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina. O projeto está dividido em duas pastas principais: `api-matriculas` (Backend) e `front-matriculas` (Frontend).

### 1. Rodando o Back-end (API)

Abra o seu terminal e execute os seguintes comandos:

```bash
# Entre na pasta do backend
cd api-matriculas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
### O servidor iniciará na porta 3000. Você verá a mensagem: Servidor rodando na porta 3000.

    Rota GET: http://localhost:3000/cursos

    Rota POST: http://localhost:3000/matricula

### Rodando o Front-end (Interface)

Abra um novo terminal (mantenha o terminal do backend rodando) e execute:
```bash
# Entre na pasta do frontend
cd front-matriculas

# Instale as dependências
npm install

# Inicie a aplicação Vue
npm run dev
```
A aplicação abrirá no seu navegador, geralmente no endereço: http://localhost:5173/.

Agora é só interagir com o formulário na tela e ver a comunicação com o servidor acontecendo:

<img width="600" height="554" alt="tela_matricula" src="https://github.com/user-attachments/assets/2436c592-2fe9-4fcf-af6e-812496346a59" />
