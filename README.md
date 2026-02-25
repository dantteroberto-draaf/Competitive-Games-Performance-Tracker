# 🎮 Competitive Games Performance Tracker
---
<img width="1902" height="916" alt="image" src="https://github.com/user-attachments/assets/b8d108c6-36f9-4b41-a7b3-5d468d0bded1" />

---

## 📌 Sobre o projeto
Este projeto consiste em uma aplicação Full Stack para monitorar desempenho em jogos competitivos. A ideia não é apenas ser um "depósito" de partidas, mas sim calcular automaticamente, a partir dos dados do usuário, métricas sobre desempenho como **Taxa de vitórias** e **KDA médio**. O projeto segue uma arquitetura separada (Frontend desacoplado do Backend), garantindo **escalabilidade e organização de código**, utilizando o PostgreSQL para **persistência robusta dos dados**.

---
## Tecnologias utilizadas
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

---
## Funcionalidades
* [x] Cadastro de partidas (Jogo, Resultado, K/D/A).
* [x] Listagem de histórico.
* [x] Filtro dinâmico por jogo (Valorant/LoL).
* [x] Cálculo automático de Winrate e AMA (Assistências Médias por Abate).
* [x] Exclusão de partidas com atualização em tempo real.
* [x] Persistência de dados no PostgreSQL.

---
## Como rodar o projeto

### Pré-requisitos
Certifique-se de ter instalado na sua máquina:
- [Python 3.10+](https://www.python.org/)
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/)

### 1. Configurando o Banco de Dados
Crie um banco de dados no PostgreSQL chamado `tracker_db`.

```sql
CREATE DATABASE tracker_db;
```
### 2. Rodando o Backend (API)
Abra um terminal na pasta raiz do projeto e entre na pasta ```backend```:
```bash
cd backend
```
Crie e ative o ambiente virtual:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```
Instale as dependências:
```bash
pip install -r requirements.txt
```
Rode o servidor:
```bash
uvicorn main:app --reload
```
O backend estará rodando em: http://localhost:8000

### Rodando o Frontend (Angular)
Abra um novo terminal, volte à raiz e entre na pasta ```frontend```:
```bash
cd frontend
```
Instale as dependências do Node:
```bash
npm install
```
Inicie o servidor de desenvolvimento:
```bash
ng serve
```
Acesse a aplicação no navegador em: http://localhost:4200

---
Desenvolvido por **Dantte Roberto**

Contato: dantteroberto10@gmail.com

LinkedIn: www.linkedin.com/in/dantte-roberto
