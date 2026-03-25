#  Escudo Digital

> Jogo educativo sobre segurança digital para crianças e adolescentes de 11 a 16 anos.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)

---

##  Sobre o Projeto

O **Escudo Digital** é um projeto de extensão universitária desenvolvido durante a graduação em **Análise e Desenvolvimento de Sistemas**, com foco em combater golpes digitais por meio da educação e do engajamento.

O projeto será aplicado em escolas com alunos do **Ensino Fundamental e Médio**, com faixa etária entre 11 e 16 anos, um público altamente conectado e cada vez mais exposto a golpes digitais, desinformação e situações de risco na internet.

A iniciativa é embasada na **Lei nº 15.211/2025 (Lei Felca)**, o ECA Digital, que entrou em vigor em março de 2026 e reforça a necessidade de proteção digital de crianças e adolescentes no Brasil.

> *"Tecnologia é ferramenta. O objetivo sempre foi, e continua sendo, as pessoas."*

---

##  Como Funciona

O jogador recebe mensagens simuladas de WhatsApp, Instagram, SMS e e-mail e precisa decidir em tempo real se é golpe ou mensagem legítima. Após cada resposta, o jogo explica como o golpe funciona e dá uma dica prática de proteção.

---

##  Cenários do Jogo

Todos os cenários foram criados a partir do universo real de crianças e adolescentes:

| # | Cenário | Canal | Tipo |
|---|---------|-------|------|
| 1 | Diamantes falsos no Free Fire | WhatsApp | Golpe de jogo |
| 2 | Perfil falso de youtuber da LOUD | Instagram | Perfil falso |
| 3 | Renovação do Spotify | SMS | Legítima |
| 4 | Vaga falsa de divulgador online | WhatsApp | Golpe de emprego |
| 5 | Sorteio falso de tênis Nike | Instagram | Sorteio falso |
| 6 | Comprovante de Pix falso | WhatsApp | Golpe do Pix |
| 7 | Confirmação de pedido iFood | SMS | Legítima |
| 8 | Desconhecido pedindo foto | WhatsApp | Grooming |
| 9 | Link para ver visitantes do Instagram | Instagram | Link malicioso |
| 10 | Ameaça de banimento no Roblox | WhatsApp | Golpe de jogo |
| 11 | Aviso de login suspeito | Instagram | Legítima |
| 12 | Chantagem digital | WhatsApp | Sextorsão |

---

##  Modos de Jogo

| Modo | Público | Tempo | Descrição |
|------|---------|-------|-----------|
| 😊 Fácil | 11-12 anos | 25s | Mais tempo, dicas extras |
| 🎯 Normal | 13-14 anos | 15s | Padrão |
| ⚡ Difícil | 15-16 anos | 8s | Desafio de velocidade |
| 📚 Treino | Todos | Sem tempo | Só aprender, sem pressão |

---

## ✨ Funcionalidades

- 🌙 Tema claro e escuro
- 📖 Tutorial interativo antes de começar
- 🏆 Ranking de pontuação
- 🔥 Sistema de combo
- ⭐ Pontuação com bônus por velocidade
- 💡 Explicação educativa após cada resposta
- 📊 Tela de resultado com aproveitamento detalhado

---

##  Como Rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- Git instalado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/AlicySousaa/escudo-digital.git

# Entre na pasta
cd escudo-digital

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🌐 Deploy

Hospedado na **Vercel** com deploy automático a cada `git push` na branch `main`.

🔗 **Acesse o jogo:** [escudo-digital.vercel.app](https://escudo-digital.vercel.app)

---

##  Estrutura do Projeto

```
escudo-digital/
├── public/
├── src/
│   ├── App.jsx        # Jogo principal
│   └── main.jsx
├── index.html
├── vite.config.js
└── README.md
```

---

##  Planejamento Scrum

Projeto desenvolvido com metodologia **Scrum**, 4 sprints de 2 semanas cada.

| Sprint | Entregável |
|--------|------------|
| Sprint 1 | Pesquisa com alunos + cenários iniciais |
| Sprint 2 | Jogo completo + chatbot adaptado |
| Sprint 3 | Oficinas presenciais na escola |
| Sprint 4 | Métricas, relatório e apresentação final |

---

## ⚖️ Embasamento Legal

Este projeto é orientado pela **Lei nº 15.211/2025 (Lei Felca)**, o ECA Digital, que entrou em vigor em março de 2026 e estabelece diretrizes para a proteção de crianças e adolescentes no ambiente digital, incluindo verificação etária, privacidade de dados e responsabilização de plataformas.

---

## 🗂️ Projetos Relacionados

| Repositório | Tecnologia | Descrição |
|-------------|-----------|-----------|
| [escudo-digital](https://github.com/AlicySousaa/escudo-digital) | React | Jogo interativo (este repo) |
| [Chatbot-escudo-digital](https://github.com/AlicySousaa/Chatbot-escudo-digital) | Python | Simulador de golpista |

---

## 📅 Roadmap

- [x] Jogo v1 — cenários para idosos
- [x] Jogo v2 — 4 modos + ranking + tutorial
- [x] Jogo v3 — cenários para crianças e adolescentes
- [ ] Chatbot atualizado para novo público
- [ ] Oficinas presenciais na escola
- [ ] Relatório de impacto
- [ ] Versão Construct (pós-extensão)
- [ ] App mobile React Native (pós-extensão)

---

## 👥 Público-alvo

- 🧒 **11-12 anos** — Ensino Fundamental, modo Fácil
- 👦 **13-14 anos** — Ensino Fundamental/Médio, modo Normal
- 👨‍🎓 **15-16 anos** — Ensino Médio, modo Difícil

---

##  Autora

**Alice Alves de Sousa**
Estudante de Análise e Desenvolvimento de Sistemas
Teresina, Piauí 

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/alice-alves-b76a6238b)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AlicySousaa)

---

## 📄 Licença

Este projeto é de código aberto e está sob a licença MIT.

---

> *"Nenhuma criança deveria ser vítima de golpe por falta de informação."* 🛡️