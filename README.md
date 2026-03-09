# 🛡️ Escudo Digital

> Jogo educativo sobre segurança digital voltado para idosos e seus cuidadores.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📌 Sobre o Projeto

O **Escudo Digital** é um projeto de extensão universitária desenvolvido como parte da graduação em **Análise e Desenvolvimento de Sistemas**, com o objetivo de combater golpes digitais por meio da educação e do engajamento.

A proposta é simples e poderosa: ensinar pessoas — especialmente idosos — a identificar golpes comuns do dia a dia (Pix falso, links maliciosos, engenharia social) por meio de um **jogo interativo**, **cards de WhatsApp** e **cartilhas acessíveis**.

---

## 🎮 Como Funciona o Jogo

O jogador recebe **8 situações reais** — mensagens de WhatsApp, SMS, e-mails e ligações — e precisa decidir em **15 segundos**:

- 🚨 **É Golpe!**
- ✅ **É Seguro!**

Após cada resposta, o jogo explica o motivo e dá uma dica prática. O objetivo é aprender com cada erro antes que aconteça na vida real.

### Mecânicas
- ⏱️ Timer de 15 segundos por questão
- ❤️ 3 vidas
- 🔥 Sistema de combo para respostas consecutivas corretas
- ⭐ Pontuação com bônus por velocidade
- 📊 Tela de resultado com aproveitamento detalhado

### Cenários cobertos
| Tipo | Golpe |
|------|-------|
| WhatsApp | Golpe do Pix / Filho em apuros |
| SMS | Link malicioso de banco falso |
| Ligação | INSS falso (Engenharia Social) |
| E-mail | Phishing da Receita Federal |
| WhatsApp | Promoção e prêmio falso |
| Ligação | Suporte técnico falso (Microsoft) |
| WhatsApp/SMS | Mensagens legítimas (para treinar discernimento) |

---

## 🚀 Como Rodar Localmente

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

## 📦 Deploy

O projeto está hospedado na **Vercel** com deploy automático a cada `git push` na branch `main`.

🔗 **Acesse o jogo:** [escudo-digital.vercel.app]([(https://escudo-digital-ruddy.vercel.app/))

---

## 🗂️ Estrutura do Projeto

```
escudo-digital/
├── public/
├── src/
│   ├── App.jsx        # Jogo principal
│   └── main.jsx       # Entry point
├── index.html
├── vite.config.js
└── README.md
```

---

## 📋 Planejamento Scrum

O projeto foi desenvolvido com metodologia **Scrum**, com Product Backlog, Sprint Planning e personas definidas para orientar cada entrega.

| Sprint | Entregável |
|--------|------------|
| Sprint 1 | Pesquisa com idosos + Cards WhatsApp (Pix e Links) |
| Sprint 2 | Card Engenharia Social + Guia do Cuidador |
| Sprint 3 | Roteiro de oficina + Passaporte Digital |
| Sprint 4 | Vídeos curtos + Métricas de impacto |

---

## 👥 Público-alvo

- 👵 **Idosos** — usuários principais, aprendem pelo jogo e pelas cartilhas
- 👨‍👩‍👧 **Cuidadores e familiares** — repassam o conteúdo com apoio do guia
- 🏫 **Facilitadores** — conduzem as oficinas presenciais com o roteiro do projeto

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona novo cenário'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 👩‍💻 Autora

**Alice Alves de Sousa**  
Estudante de Análise e Desenvolvimento de Sistemas  
Teresina, Piauí 🌵

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/alice-alves-b76a6238b)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AlicySousaa)

---

## 📄 Licença

Este projeto é de código aberto e está sob a licença MIT.

---

> *"Nenhum idoso deveria perder dinheiro ou dignidade por falta de informação."* 🛡️
