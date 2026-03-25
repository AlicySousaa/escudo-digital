import { useState, useEffect, useCallback, useRef } from "react";

const ALL_SCENARIOS = [
  {
    id: 1, type: "whatsapp", category: "Golpe de Jogo",
    sender: "Free Fire Oficial", avatar: "🎮",
    message: "🔥 PARABÉNS! Você foi selecionado para ganhar 10.000 DIAMANTES no Free Fire! Clique agora: freefire-diamantes.net/resgatar e informe seu login e senha para receber!",
    isScam: true,
    explanation: "Golpe clássico de jogo! Nenhum jogo envia diamantes ou itens grátis por WhatsApp. O site 'freefire-diamantes.net' é falso — o site oficial é freefire.garena.com.",
    tip: "Nunca informe seu login e senha de jogos para ninguém. Itens grátis 'demais' são sempre golpe!",
    difficulty: "easy", age: "both",
  },
  {
    id: 2, type: "instagram", category: "Perfil Falso",
    sender: "@ loud_thurzin_real", avatar: "⭐",
    message: "Oi! Sou o Thurzin da LOUD. Estamos selecionando fãs para testar nosso novo jogo ANTES do lançamento! Me manda seu e-mail e senha do Instagram para liberar o acesso VIP. 🎮🔥",
    isScam: true,
    explanation: "Perfil falso de famoso! Youtubers e streamers nunca pedem senha de redes sociais. Veja que o @ tem '_real' no final — sinal claro de conta falsa.",
    tip: "Famosos nunca pedem sua senha. Verifique sempre o selo azul de verificação no perfil.",
    difficulty: "easy", age: "both",
  },
  {
    id: 3, type: "sms", category: "Mensagem Legítima",
    sender: "Spotify", avatar: "🎵",
    message: "Seu plano Spotify Premium foi renovado com sucesso. Próxima cobrança: 15/05. Dúvidas acesse spotify.com/conta ou ligue 0800-123-4567.",
    isScam: false,
    explanation: "Mensagem legítima! Só informa sobre renovação, direciona para o site oficial e não pede nenhum dado.",
    tip: "Mensagens reais de empresas só informam — nunca pedem senha ou dados pessoais por SMS.",
    difficulty: "easy", age: "both",
  },
  {
    id: 4, type: "whatsapp", category: "Golpe do Emprego",
    sender: "Recrutadora Julia", avatar: "👩‍💼",
    message: "Oi! Vi seu perfil e temos vaga de DIVULGADOR online, trabalho de casa, R$500/semana! Só precisa pagar R$49,90 de cadastro no sistema pra começar hoje mesmo! 💰",
    isScam: true,
    explanation: "Golpe de falsa vaga! Empresas sérias NUNCA cobram para você trabalhar. Essa taxa de 'cadastro' é o golpe.",
    tip: "Se precisou pagar para conseguir emprego, é golpe. Empresa séria nunca cobra do candidato.",
    difficulty: "medium", age: "teen",
  },
  {
    id: 5, type: "instagram", category: "Sorteio Falso",
    sender: "Nike Brasil Sorteios", avatar: "👟",
    message: "🎉 SORTEIO RELÂMPAGO! Você ganhou um tênis Nike Air Force exclusivo! Para receber, siga nossa página, marque 3 amigos e pague R$29,90 de frete no link: nike-sorteio.com/retirar ⏰ 1 hora!",
    isScam: true,
    explanation: "Sorteio falso! A Nike nunca faz sorteios em páginas não verificadas. Pagar frete para receber prêmio é golpe — e o site não é oficial.",
    tip: "Sorteios legítimos não cobram frete. Sempre verifique se a página tem o selo azul de verificação.",
    difficulty: "easy", age: "both",
  },
  {
    id: 6, type: "whatsapp", category: "Print Falso de Pix",
    sender: "Comprador Desconhecido", avatar: "💸",
    message: "Oi! Vi que você tá vendendo seu controle. Vou comprar! Já fiz o Pix de R$150 [imagem de comprovante]. Pode enviar que o dinheiro já tá na sua conta!",
    isScam: true,
    explanation: "Golpe do comprovante falso! Qualquer pessoa consegue editar um print de Pix. Sempre verifique no app do seu banco se o dinheiro realmente entrou ANTES de enviar qualquer coisa.",
    tip: "Nunca confie em print de comprovante. Só envie o produto depois de ver o dinheiro no seu saldo.",
    difficulty: "medium", age: "teen",
  },
  {
    id: 7, type: "sms", category: "Mensagem Legítima",
    sender: "iFood", avatar: "🍔",
    message: "Seu pedido #45231 foi confirmado! Previsão de entrega: 35-50 min. Acompanhe pelo app. Bom apetite! 😋",
    isScam: false,
    explanation: "Mensagem legítima! Só informa sobre seu pedido, sem pedir dados, sem links suspeitos.",
    tip: "Mensagens de delivery só avisam sobre o pedido — nunca pedem senha ou pagamento extra.",
    difficulty: "easy", age: "both",
  },
  {
    id: 8, type: "whatsapp", category: "Golpe do Amor",
    sender: "Pessoa Desconhecida", avatar: "😍",
    message: "Oi! Te vi no Instagram e achei muito lindo(a)! Posso te adicionar? Tenho 16 anos, moro em SP. Manda uma foto sua pra eu te conhecer melhor... 👀",
    isScam: true,
    explanation: "Possível grooming! Adultos mal-intencionados criam perfis falsos para se aproximar de adolescentes. Nunca envie fotos para desconhecidos da internet.",
    tip: "Nunca envie fotos para quem você não conhece pessoalmente. Conte para um adulto de confiança.",
    difficulty: "hard", age: "teen",
  },
  {
    id: 9, type: "instagram", category: "Link Malicioso",
    sender: "Amiga Carol", avatar: "👧",
    message: "GENTE olha esse site, dá pra ver quem visitou seu perfil no Instagram!! É real demais: instagram-visitantes.com — coloca seu @ e senha lá 👀👀",
    isScam: true,
    explanation: "Link malicioso! O Instagram não permite ver quem visitou seu perfil — isso não existe. Qualquer site que prometa isso vai roubar sua conta.",
    tip: "O Instagram nunca mostra quem visitou seu perfil. Sites que prometem isso roubam sua senha.",
    difficulty: "medium", age: "both",
  },
  {
    id: 10, type: "whatsapp", category: "Golpe do Roblox",
    sender: "Roblox Suporte", avatar: "🟥",
    message: "⚠️ Sua conta Roblox será BANIDA em 24h por uso suspeito! Para cancelar o banimento, acesse: roblox-suporte.net e confirme seus dados de login URGENTE!",
    isScam: true,
    explanation: "Golpe de ameaça de banimento! O Roblox nunca avisa sobre banimentos por WhatsApp. Esse link é falso e vai roubar sua conta.",
    tip: "Avisos oficiais de jogos chegam DENTRO do próprio jogo ou por e-mail oficial. Nunca por WhatsApp.",
    difficulty: "medium", age: "both",
  },
  {
    id: 11, type: "instagram", category: "Mensagem Legítima",
    sender: "Instagram", avatar: "📸",
    message: "Notamos um login novo na sua conta de um dispositivo em São Paulo, SP. Se foi você, pode ignorar. Se não foi, acesse instagram.com/hacked para proteger sua conta.",
    isScam: false,
    explanation: "Mensagem legítima! O Instagram realmente avisa sobre logins suspeitos e direciona para o site oficial instagram.com.",
    tip: "Avisos de segurança legítimos sempre direcionam para o site oficial. Verifique sempre o endereço.",
    difficulty: "hard", age: "both",
  },
  {
    id: 12, type: "whatsapp", category: "Chantagem Digital",
    sender: "Número Desconhecido", avatar: "😈",
    message: "Tenho prints e vídeos seus. Se não me mandar R$300 em Pix até amanhã, vou postar tudo nos seus contatos. Não tenta me bloquear ou piora.",
    isScam: true,
    explanation: "Chantagem digital (sextorsão)! Isso é CRIME. Na maioria das vezes o golpista não tem nada. Não pague, bloqueie e conte para um adulto de confiança ou polícia.",
    tip: "Chantagem digital é crime! Não pague nunca. Guarde as mensagens, bloqueie e conte para um adulto.",
    difficulty: "hard", age: "teen",
  },
];

const MODES = [
  { id: "easy", label: "Fácil", icon: "😊", desc: "11-12 anos — mais tempo, dicas extras", time: 25, color: "#16a34a" },
  { id: "normal", label: "Normal", icon: "🎯", desc: "13-14 anos — 15 segundos", time: 15, color: "#2563eb" },
  { id: "hard", label: "Difícil", icon: "⚡", desc: "15-16 anos — apenas 8 segundos", time: 8, color: "#dc2626" },
  { id: "training", label: "Treino", icon: "📚", desc: "Sem tempo — só aprender", time: 999, color: "#7c3aed" },
];

const TUTORIAL_STEPS = [
  { icon: "🛡️", title: "Bem-vindo ao Escudo Digital!", text: "Você vai receber mensagens, DMs e notificações simuladas. Sua missão: identificar se é golpe ou mensagem segura antes de cair na armadilha!" },
  { icon: "📱", title: "Cuidado com a internet!", text: "Golpistas usam Instagram, WhatsApp, SMS e até perfis de famosos para te enganar. Nesse jogo você vai aprender a reconhecer cada tipo de golpe." },
  { icon: "⏱️", title: "Atenção ao tempo!", text: "Cada situação tem um contador regressivo. Quanto mais rápido você responder certo, mais pontos ganha. No modo Difícil o tempo é curto!" },
  { icon: "💡", title: "Aprenda com os erros!", text: "Após cada resposta você recebe uma explicação de como o golpe funciona e uma dica prática para se proteger na vida real." },
  { icon: "🔥", title: "Combos e ranking!", text: "Acertar várias seguidas ativa o combo e multiplica seus pontos. Quanto mais certeiro, mais alto você sobe no ranking!" },
];

const typeIcon = { whatsapp: "💬", sms: "📱", ligacao: "📞", email: "📧", instagram: "📸" };
const typeName = { whatsapp: "WhatsApp", sms: "SMS", ligacao: "Ligação", email: "E-mail", instagram: "Instagram" };
const typeBg = {
  whatsapp: "#25d366", sms: "#64748b", ligacao: "#f59e0b",
  email: "#3b82f6", instagram: "#e1306c"
};

export default function EscudoDigital() {
  const [screen, setScreen] = useState("intro");
  const [theme, setTheme] = useState("dark");
  const [mode, setMode] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [combo, setCombo] = useState(0);
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [rankings, setRankings] = useState([
    { name: "Pedro L.", score: 420, mode: "Difícil" },
    { name: "Julia M.", score: 380, mode: "Normal" },
    { name: "Kaique S.", score: 310, mode: "Normal" },
  ]);
  const timerRef = useRef(null);
  const isDark = theme === "dark";

  const T = {
    bg: isDark ? "#0a0a0f" : "#f5f3ff",
    bg2: isDark ? "#13131a" : "#ffffff",
    bg3: isDark ? "#1e1e2e" : "#ede9fe",
    text: isDark ? "#e8e8ff" : "#1e1b4b",
    text2: isDark ? "#6b7280" : "#7c3aed",
    border: isDark ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.2)",
    card: isDark ? "#13131a" : "#ffffff",
    accent: "#7c3aed",
    success: "#16a34a",
    danger: "#dc2626",
    warning: "#d97706",
    neon: "#a78bfa",
  };

  const current = scenarios[currentIndex];
  const totalTime = mode?.time || 15;

  useEffect(() => {
    if (screen !== "game" || answered || !mode || mode.id === "training") return;
    if (timeLeft <= 0) { handleAnswer(null); return; }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, screen, answered, mode]);

  const startGame = useCallback((selectedMode) => {
    const shuffled = [...ALL_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 8);
    setScenarios(shuffled);
    setCurrentIndex(0); setScore(0); setLives(3);
    setAnswered(false); setSelectedAnswer(null);
    setTimeLeft(selectedMode.time); setCombo(0); setHistory([]);
    setMode(selectedMode); setScreen("game");
  }, []);

  const handleAnswer = useCallback((isScam) => {
    if (answered) return;
    clearTimeout(timerRef.current);
    setAnswered(true); setSelectedAnswer(isScam);
    const correct = isScam !== null && isScam === current?.isScam;
    if (correct && mode?.id !== "training") {
      const timeBonus = Math.floor(timeLeft * 2);
      const comboBonus = combo >= 2 ? 25 : 0;
      setScore(s => s + 10 + timeBonus + comboBonus);
      setCombo(c => c + 1);
      setPulse(true); setTimeout(() => setPulse(false), 600);
    } else if (!correct) {
      setLives(l => l - 1); setCombo(0);
      setShake(true); setTimeout(() => setShake(false), 500);
    }
    setHistory(h => [...h, { scenario: current, correct, timedOut: isScam === null }]);
  }, [answered, current, combo, timeLeft, mode]);

  const nextQuestion = () => {
    if (lives <= 0) { setScreen("gameover"); return; }
    if (currentIndex >= scenarios.length - 1) {
      if (mode?.id !== "training") {
        setRankings(r => [...r, { name: "Você", score, mode: mode?.label }].sort((a, b) => b.score - a.score).slice(0, 10));
      }
      setScreen("result"); return;
    }
    setCurrentIndex(i => i + 1); setAnswered(false);
    setSelectedAnswer(null); setTimeLeft(mode?.time || 15);
  };

  const timerPct = mode?.id === "training" ? 100 : (timeLeft / totalTime) * 100;
  const timerColor = timerPct > 50 ? "#a78bfa" : timerPct > 25 ? T.warning : T.danger;

  const s = { minHeight: "100vh", background: T.bg, fontFamily: "'Segoe UI', sans-serif", padding: 16, transition: "background 0.3s" };

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 20, padding: "6px 14px", cursor: "pointer", color: T.text, fontSize: 13 }}>
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 80, marginBottom: 8 }}>🛡️</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: T.neon, margin: "0 0 4px", letterSpacing: -1 }}>Escudo Digital</h1>
          <p style={{ color: T.text2, fontSize: 14, margin: "0 0 4px" }}>Você consegue identificar os golpes da internet?</p>
          <div style={{ display: "inline-block", background: T.bg3, borderRadius: 20, padding: "4px 14px", fontSize: 12, color: T.neon, marginTop: 6 }}>
            🎓 Projeto de Extensão ADS • Alice Alves
          </div>
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
          {MODES.map(m => (
            <button key={m.id}
              onClick={() => { setMode(m); setTutorialStep(0); setScreen("tutorial"); }}
              style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.background = m.color + "11"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}>
              <div style={{ width: 46, height: 46, background: m.color + "22", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: m.color, fontSize: 16 }}>{m.label}</div>
                <div style={{ color: T.text2, fontSize: 13, marginTop: 2 }}>{m.desc}</div>
              </div>
              <span style={{ color: T.text2, fontSize: 20 }}>›</span>
            </button>
          ))}
        </div>

        <button onClick={() => setScreen("ranking")}
          style={{ width: "100%", padding: 13, background: "transparent", border: `1px solid ${T.border}`, borderRadius: 12, color: T.text2, fontSize: 14, cursor: "pointer" }}>
          🏆 Ver Ranking
        </button>
      </div>
    </div>
  );

  // ── TUTORIAL ──
  if (screen === "tutorial") {
    const step = TUTORIAL_STEPS[tutorialStep];
    return (
      <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 420, width: "100%" }}>
          <div style={{ background: T.card, borderRadius: 24, padding: 32, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>{step.icon}</div>
            <h2 style={{ color: T.neon, fontSize: 20, fontWeight: 800, margin: "0 0 12px" }}>{step.title}</h2>
            <p style={{ color: T.text, fontSize: 15, lineHeight: 1.8, margin: "0 0 28px" }}>{step.text}</p>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {TUTORIAL_STEPS.map((_, i) => (
                <div key={i} style={{ width: i === tutorialStep ? 24 : 8, height: 8, borderRadius: 4, background: i === tutorialStep ? mode?.color : T.bg3, transition: "all 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {tutorialStep > 0 && (
                <button onClick={() => setTutorialStep(t => t - 1)}
                  style={{ flex: 1, padding: 13, background: T.bg3, border: "none", borderRadius: 12, color: T.text2, fontSize: 14, cursor: "pointer" }}>← Voltar</button>
              )}
              <button onClick={() => tutorialStep < TUTORIAL_STEPS.length - 1 ? setTutorialStep(t => t + 1) : startGame(mode)}
                style={{ flex: 2, padding: 13, background: mode?.color, border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
                {tutorialStep < TUTORIAL_STEPS.length - 1 ? "Próximo →" : "Bora jogar! 🚀"}
              </button>
            </div>
            <button onClick={() => startGame(mode)} style={{ marginTop: 12, background: "none", border: "none", color: T.text2, fontSize: 13, cursor: "pointer" }}>Pular tutorial</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "ranking") return (
    <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ background: T.card, borderRadius: 20, padding: 28, border: `1px solid ${T.border}` }}>
          <h2 style={{ color: T.neon, fontSize: 22, fontWeight: 800, margin: "0 0 20px", textAlign: "center" }}>🏆 Ranking</h2>
          {rankings.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < rankings.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#d97706" : T.bg3, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: i < 3 ? "#fff" : T.text2 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: T.text, fontSize: 15 }}>{r.name}</div>
                <div style={{ color: T.text2, fontSize: 12 }}>Modo {r.mode}</div>
              </div>
              <div style={{ fontWeight: 800, color: "#fbbf24", fontSize: 16 }}>⭐ {r.score}</div>
            </div>
          ))}
          <button onClick={() => setScreen("intro")} style={{ width: "100%", marginTop: 20, padding: 13, background: T.accent, border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>← Voltar</button>
        </div>
      </div>
    </div>
  );

  if (screen === "gameover") return (
    <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center", background: isDark ? "#0a0005" : "#fff0f5" }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 12 }}>😵</div>
        <h2 style={{ color: "#f87171", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Você caiu no golpe!</h2>
        <p style={{ color: "#fcd34d", fontSize: 18, marginBottom: 8 }}>Pontuação: <strong>{score} pts</strong></p>
        <p style={{ color: T.text2, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Não desanime! Os golpistas são especialistas. O importante é aprender antes que aconteça de verdade. 💪</p>
        <button onClick={() => setScreen("intro")} style={{ width: "100%", padding: 16, background: "#dc2626", color: "#fff", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer" }}>Tentar Novamente 🔄</button>
      </div>
    </div>
  );

  if (screen === "result") {
    const pct = history.length ? Math.round((history.filter(h => h.correct).length / history.length) * 100) : 0;
    const medal = pct === 100 ? "🥇" : pct >= 75 ? "🥈" : pct >= 50 ? "🥉" : "📚";
    const msg = pct === 100 ? "Você é fera em segurança digital!" : pct >= 75 ? "Muito bem! Você tá protegido(a)!" : pct >= 50 ? "Tá no caminho! Continue praticando." : "Pratique mais — os golpistas não dormem!";
    return (
      <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 460, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 60 }}>{medal}</div>
            <h2 style={{ color: T.neon, fontSize: 24, fontWeight: 900, margin: "8px 0 4px" }}>{msg}</h2>
            {mode?.id === "training" && <div style={{ color: "#7c3aed", fontSize: 13, fontWeight: 700 }}>📚 Modo Treino</div>}
          </div>
          {mode?.id !== "training" && (
            <div style={{ background: T.card, borderRadius: 16, padding: 20, marginBottom: 16, border: `1px solid ${T.border}`, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[["⭐", score, "pontos"], ["✅", history.filter(h => h.correct).length, "acertos"], ["❌", history.filter(h => !h.correct).length, "erros"], ["📊", pct + "%", "aproveit."]].map(([icon, val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: T.text2, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: T.neon }}>{val}</div>
                  <div style={{ fontSize: 11, color: T.text2 }}>{label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ background: T.card, borderRadius: 14, padding: 16, marginBottom: 16, border: `1px solid ${T.border}` }}>
            <p style={{ color: T.text2, fontSize: 11, fontWeight: 700, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: 1 }}>Resumo</p>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span>{h.correct ? "✅" : "❌"}</span>
                <span style={{ color: T.text, fontSize: 13, flex: 1 }}>{h.scenario?.category}</span>
                {h.timedOut && <span style={{ color: T.warning, fontSize: 11 }}>tempo!</span>}
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <button onClick={() => startGame(mode)} style={{ padding: 15, background: T.accent, color: "#fff", border: "none", borderRadius: 13, fontSize: 16, fontWeight: 800, cursor: "pointer" }}>Jogar de Novo 🔄</button>
            <button onClick={() => setScreen("ranking")} style={{ padding: 13, background: T.bg3, color: T.neon, border: "none", borderRadius: 13, fontSize: 14, cursor: "pointer" }}>🏆 Ver Ranking</button>
            <button onClick={() => setScreen("intro")} style={{ padding: 13, background: "transparent", color: T.text2, border: `1px solid ${T.border}`, borderRadius: 13, fontSize: 14, cursor: "pointer" }}>← Menu</button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;
  const isCorrect = answered && selectedAnswer === current.isScam;
  const cardBg = !answered ? T.card : isCorrect ? (isDark ? "rgba(167,139,250,0.08)" : "rgba(34,197,94,0.06)") : "rgba(239,68,68,0.07)";

  return (
    <div style={{ ...s, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ maxWidth: 500, width: "100%", animation: shake ? "shake 0.4s" : pulse ? "pulseG 0.4s" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} style={{ fontSize: 18, filter: i < lives ? "none" : "grayscale(1) opacity(0.3)" }}>❤️</span>
            ))}
          </div>
          <div style={{ background: T.bg2, borderRadius: 20, padding: "5px 14px", border: `1px solid ${T.border}` }}>
            <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: 14 }}>⭐ {mode?.id === "training" ? "—" : score}</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: T.text2, fontSize: 13 }}>{currentIndex + 1}/{scenarios.length}</span>
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 20, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: T.text2 }}>
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ background: (mode?.color || T.accent) + "22", color: mode?.color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>
            {mode?.icon} {mode?.label}
          </span>
          <span style={{ background: typeBg[current.type] + "22", color: typeBg[current.type], borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>
            {typeIcon[current.type]} {typeName[current.type]}
          </span>
          {combo >= 2 && (
            <span style={{ background: "#d97706" + "22", color: "#d97706", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>🔥 Combo x{combo}</span>
          )}
        </div>

        {mode?.id !== "training" && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ background: T.bg3, borderRadius: 8, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, borderRadius: 8, transition: "width 1s linear, background 0.3s" }} />
            </div>
            <div style={{ textAlign: "center", marginTop: 4 }}>
              <span style={{ color: timerColor, fontSize: 12, fontWeight: 700 }}>⏱️ {timeLeft}s</span>
            </div>
          </div>
        )}

        <div style={{ background: cardBg, borderRadius: 20, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 14, transition: "background 0.3s" }}>
          <div style={{ background: T.bg2, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 42, height: 42, background: typeBg[current.type] + "33", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: `2px solid ${typeBg[current.type]}44` }}>
              {current.avatar}
            </div>
            <div>
              <div style={{ color: isDark ? "#fff" : "#1e1b4b", fontWeight: 700, fontSize: 15 }}>{current.sender}</div>
              <div style={{ color: typeBg[current.type], fontSize: 12, fontWeight: 600 }}>{typeName[current.type]}</div>
            </div>
            <div style={{ marginLeft: "auto", background: T.bg3, borderRadius: 20, padding: "3px 10px", fontSize: 11, color: T.text2 }}>
              {current.category}
            </div>
          </div>

          <div style={{ padding: "18px 16px" }}>
            <p style={{ color: T.text, fontSize: 15, lineHeight: 1.8, margin: 0 }}>{current.message}</p>
          </div>

          {answered && (
            <div style={{ margin: "0 14px 14px", background: current.isScam ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)", borderRadius: 14, padding: 16, border: `1px solid ${current.isScam ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}` }}>
              <p style={{ margin: "0 0 8px", color: current.isScam ? "#fca5a5" : "#86efac", fontWeight: 800, fontSize: 14 }}>
                {isCorrect ? "✅ Arrasou!" : selectedAnswer === null ? "⏰ Tempo esgotado!" : "❌ Errou!"} {current.isScam ? "🚨 ERA UM GOLPE!" : "✔️ ERA LEGÍTIMO!"}
              </p>
              <p style={{ margin: "0 0 8px", color: T.text, fontSize: 13, lineHeight: 1.7 }}>{current.explanation}</p>
              <p style={{ margin: 0, color: "#fbbf24", fontSize: 13 }}>💡 {current.tip}</p>
            </div>
          )}
        </div>
        {!answered ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button onClick={() => handleAnswer(true)}
              style={{ padding: 18, background: "linear-gradient(135deg,#dc2626,#b91c1c)", color: "#fff", border: "none", borderRadius: 16, fontSize: 17, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 20px rgba(220,38,38,0.3)" }}>
              🚨 É Golpe!
            </button>
            <button onClick={() => handleAnswer(false)}
              style={{ padding: 18, background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 16, fontSize: 17, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 20px rgba(22,163,74,0.3)" }}>
              ✅ É Seguro!
            </button>
          </div>
        ) : (
          <button onClick={nextQuestion}
            style={{ width: "100%", padding: 18, background: `linear-gradient(135deg,${T.accent},#6d28d9)`, color: "#fff", border: "none", borderRadius: 16, fontSize: 17, fontWeight: 800, cursor: "pointer" }}>
            {currentIndex >= scenarios.length - 1 ? "Ver Resultado 🏆" : "Próxima →"}
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        @keyframes pulseG{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
      `}</style>
    </div>
  );
}