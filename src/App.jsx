import { useState, useEffect, useCallback, useRef } from "react";

const ALL_SCENARIOS = [
  {
    id: 1, type: "whatsapp", category: "Golpe de Jogo",
    sender: "Free Fire Oficial", avatar: "🎮",
    message: "🔥 PARABÉNS! Você foi selecionado para ganhar 10.000 DIAMANTES no Free Fire! Clique agora: freefire-diamantes.net/resgatar e informe seu login e senha para receber!",
    isScam: true,
    explanation: "Golpe clássico de jogo! Nenhum jogo envia diamantes grátis por WhatsApp. O site é falso — o oficial é freefire.garena.com.",
    tip: "Nunca informe seu login e senha de jogos para ninguém!",
  },
  {
    id: 2, type: "instagram", category: "Perfil Falso",
    sender: "@ loud_thurzin_real", avatar: "⭐",
    message: "Oi! Sou o Thurzin da LOUD. Estamos selecionando fãs para testar nosso novo jogo ANTES do lançamento! Me manda seu e-mail e senha do Instagram para liberar o acesso VIP. 🎮🔥",
    isScam: true,
    explanation: "Perfil falso de famoso! Youtubers nunca pedem sua senha. O @ tem '_real' no final — sinal claro de conta falsa.",
    tip: "Famosos nunca pedem sua senha. Verifique sempre o selo azul de verificação!",
  },
  {
    id: 3, type: "sms", category: "Mensagem Legítima",
    sender: "Spotify", avatar: "🎵",
    message: "Seu plano Spotify Premium foi renovado com sucesso. Próxima cobrança: 15/05. Dúvidas acesse spotify.com/conta ou ligue 0800-123-4567.",
    isScam: false,
    explanation: "Mensagem legítima! Só informa sobre renovação, direciona para o site oficial e não pede nenhum dado.",
    tip: "Mensagens reais de empresas só informam — nunca pedem senha por SMS.",
  },
  {
    id: 4, type: "whatsapp", category: "Golpe do Emprego",
    sender: "Recrutadora Julia", avatar: "👩‍💼",
    message: "Oi! Vi seu perfil e temos vaga de DIVULGADOR online, trabalho de casa, R$500/semana! Só precisa pagar R$49,90 de cadastro no sistema pra começar hoje mesmo! 💰",
    isScam: true,
    explanation: "Golpe de falsa vaga! Empresas sérias NUNCA cobram para você trabalhar.",
    tip: "Se precisou pagar para conseguir emprego, é golpe. Sempre.",
  },
  {
    id: 5, type: "instagram", category: "Sorteio Falso",
    sender: "Nike Brasil Sorteios", avatar: "👟",
    message: "🎉 SORTEIO RELÂMPAGO! Você ganhou um tênis Nike Air Force exclusivo! Para receber, siga nossa página, marque 3 amigos e pague R$29,90 de frete no link: nike-sorteio.com/retirar ⏰ 1 hora!",
    isScam: true,
    explanation: "Sorteio falso! A Nike nunca faz sorteios em páginas sem verificação. Pagar frete para prêmio é golpe.",
    tip: "Sorteios legítimos não cobram frete. Verifique o selo azul de verificação.",
  },
  {
    id: 6, type: "whatsapp", category: "Pix Falso",
    sender: "Comprador Desconhecido", avatar: "💸",
    message: "Oi! Vi que você tá vendendo seu controle. Vou comprar! Já fiz o Pix de R$150 [imagem de comprovante]. Pode enviar que o dinheiro já tá na sua conta!",
    isScam: true,
    explanation: "Golpe do comprovante falso! Qualquer pessoa consegue editar um print de Pix. Sempre confira no app do banco.",
    tip: "Nunca confie em print. Só envie o produto depois de ver o dinheiro no saldo.",
  },
  {
    id: 7, type: "sms", category: "Mensagem Legítima",
    sender: "iFood", avatar: "🍔",
    message: "Seu pedido #45231 foi confirmado! Previsão de entrega: 35-50 min. Acompanhe pelo app. Bom apetite! 😋",
    isScam: false,
    explanation: "Mensagem legítima! Só informa sobre seu pedido, sem pedir dados ou links suspeitos.",
    tip: "Mensagens de delivery só avisam — nunca pedem senha ou pagamento extra.",
  },
  {
    id: 8, type: "whatsapp", category: "Desconhecido",
    sender: "Pessoa Desconhecida", avatar: "😍",
    message: "Oi! Te vi no Instagram e achei muito lindo(a)! Posso te adicionar? Tenho 16 anos, moro em SP. Manda uma foto sua pra eu te conhecer melhor... 👀",
    isScam: true,
    explanation: "Possível grooming! Adultos mal-intencionados criam perfis falsos para se aproximar de adolescentes.",
    tip: "Nunca envie fotos para desconhecidos. Conte para um adulto de confiança.",
  },
  {
    id: 9, type: "instagram", category: "Link Suspeito",
    sender: "Amiga Carol", avatar: "👧",
    message: "GENTE olha esse site, dá pra ver quem visitou seu perfil no Instagram!! É real demais: instagram-visitantes.com — coloca seu @ e senha lá 👀👀",
    isScam: true,
    explanation: "Link malicioso! O Instagram não permite ver visitantes — isso não existe. Sites assim roubam sua conta.",
    tip: "O Instagram nunca mostra quem visitou seu perfil. Sites que prometem isso roubam sua senha.",
  },
  {
    id: 10, type: "whatsapp", category: "Suporte Falso",
    sender: "Roblox Suporte", avatar: "🟥",
    message: "⚠️ Sua conta Roblox será BANIDA em 24h por uso suspeito! Para cancelar o banimento, acesse: roblox-suporte.net e confirme seus dados de login URGENTE!",
    isScam: true,
    explanation: "Golpe de ameaça! O Roblox nunca avisa banimentos por WhatsApp. Esse link é falso.",
    tip: "Avisos oficiais chegam DENTRO do jogo ou por e-mail oficial. Nunca por WhatsApp.",
  },
  {
    id: 11, type: "instagram", category: "Aviso de Segurança",
    sender: "Instagram", avatar: "📸",
    message: "Notamos um login novo na sua conta de um dispositivo em São Paulo, SP. Se foi você, pode ignorar. Se não foi, acesse instagram.com/hacked para proteger sua conta.",
    isScam: false,
    explanation: "Mensagem legítima! O Instagram realmente avisa sobre logins suspeitos e direciona para o site oficial.",
    tip: "Avisos legítimos sempre direcionam para o site oficial. Verifique sempre o endereço.",
  },
  {
    id: 12, type: "whatsapp", category: "Mensagem Suspeita",
    sender: "Número Desconhecido", avatar: "😈",
    message: "Tenho prints e vídeos seus. Se não me mandar R$300 em Pix até amanhã, vou postar tudo nos seus contatos. Não tenta me bloquear ou piora.",
    isScam: true,
    explanation: "Chantagem digital! Isso é CRIME. Na maioria das vezes o golpista não tem nada.",
    tip: "Chantagem digital é crime! Não pague. Guarde as mensagens e conte para um adulto.",
  },
];

const MODES = [
  { id: "easy",     label: "FÁCIL",   icon: "😊", desc: "11-12 anos • 25 segundos", time: 25,  color: "#22c55e", dark: "#15803d" },
  { id: "normal",   label: "NORMAL",  icon: "🎯", desc: "13-14 anos • 15 segundos", time: 15,  color: "#3b82f6", dark: "#1d4ed8" },
  { id: "hard",     label: "DIFÍCIL", icon: "⚡", desc: "15-16 anos • 8 segundos",  time: 8,   color: "#ef4444", dark: "#b91c1c" },
  { id: "training", label: "TREINO",  icon: "📚", desc: "Sem tempo • só aprender",  time: 999, color: "#a855f7", dark: "#7e22ce" },
];

const TUTORIAL_STEPS = [
  { icon: "🛡️", title: "BEM-VINDO!", text: "Você vai receber mensagens reais simuladas. Sua missão: descobrir se é GOLPE ou SEGURO antes de cair na armadilha!" },
  { icon: "📱", title: "FIQUE ESPERTO!", text: "Golpistas usam Instagram, WhatsApp e SMS para te enganar. Nesse jogo você aprende a reconhecer cada armadilha." },
  { icon: "⏱️", title: "CORRE!", text: "Você tem poucos segundos para decidir. Quanto mais rápido acertar, mais pontos ganha!" },
  { icon: "💡", title: "APRENDA!", text: "Errou? Sem drama! Cada erro vem com uma explicação de como o golpe funciona na vida real." },
  { icon: "🔥", title: "COMBO!", text: "Acerte várias seguidas para ativar o COMBO e multiplicar seus pontos. Sobe no ranking!" },
];

const typeIcon = { whatsapp: "💬", sms: "📱", ligacao: "📞", email: "📧", instagram: "📸" };
const typeName = { whatsapp: "WhatsApp", sms: "SMS", ligacao: "Ligação", email: "E-mail", instagram: "Instagram" };
const typeBg   = { whatsapp: "#25d366", sms: "#64748b", ligacao: "#f59e0b", email: "#3b82f6", instagram: "#e1306c" };

// ── PIXEL FONT via Google Fonts CDN ──
const PIXEL_FONT = "'Press Start 2P', monospace";
const BODY_FONT  = "'Segoe UI', sans-serif";

export default function EscudoDigital() {
  const [screen, setScreen]             = useState("intro");
  const [theme, setTheme]               = useState("dark");
  const [mode, setMode]                 = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [scenarios, setScenarios]       = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [lives, setLives]               = useState(3);
  const [answered, setAnswered]         = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft]         = useState(15);
  const [combo, setCombo]               = useState(0);
  const [history, setHistory]           = useState([]);
  const [shake, setShake]               = useState(false);
  const [pulse, setPulse]               = useState(false);
  const [showResult, setShowResult]     = useState(false);
  const [rankings, setRankings]         = useState([
    { name: "PEDRO L.", score: 420, mode: "DIFÍCIL" },
    { name: "JULIA M.", score: 380, mode: "NORMAL"  },
    { name: "KAIQUE S.",score: 310, mode: "NORMAL"  },
  ]);
  const timerRef = useRef(null);
  const isDark   = theme === "dark";

  const P = {
    bg:      isDark ? "#0a0014" : "#1a0a2e",
    bg2:     isDark ? "#12002a" : "#2d1b4e",
    bg3:     isDark ? "#1e0a3a" : "#3d2560",
    card:    isDark ? "#13002e" : "#ffffff",
    text:    isDark ? "#e0d0ff" : "#1e003a",
    text2:   isDark ? "#9070c0" : "#6030a0",
    border:  isDark ? "#4a0080" : "#8040c0",
    neon:    "#c084fc",
    yellow:  "#fbbf24",
    green:   "#22c55e",
    red:     "#ef4444",
    warning: "#f59e0b",
    accent:  "#7c3aed",
  };

  const current   = scenarios[currentIndex];
  const totalTime = mode?.time || 15;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    document.head.appendChild(link);
  }, []);

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
      setScore(s => s + 10 + Math.floor(timeLeft * 2) + (combo >= 2 ? 25 : 0));
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
      if (mode?.id !== "training")
        setRankings(r => [...r, { name: "VOCÊ", score, mode: mode?.label }].sort((a,b) => b.score - a.score).slice(0,10));
      setScreen("result"); return;
    }
    setCurrentIndex(i => i + 1); setAnswered(false);
    setSelectedAnswer(null); setTimeLeft(mode?.time || 15);
  };

  const timerPct   = mode?.id === "training" ? 100 : (timeLeft / totalTime) * 100;
  const timerColor = timerPct > 50 ? P.green : timerPct > 25 ? P.warning : P.red;

  // ── pixel box shadow ──
  const pixelBorder = (color = "#7c3aed", size = 3) =>
    `${size}px ${size}px 0 0 ${color}, -${size}px ${size}px 0 0 ${color}, ${size}px -${size}px 0 0 ${color}, -${size}px -${size}px 0 0 ${color}`;

  const pixelBtn = (color, darkColor) => ({
    background: color,
    border: "none",
    borderRadius: 0,
    boxShadow: `4px 4px 0 0 ${darkColor}`,
    color: "#fff",
    fontFamily: PIXEL_FONT,
    fontSize: "clamp(9px, 2.5vw, 11px)",
    cursor: "pointer",
    padding: "14px 10px",
    width: "100%",
    letterSpacing: 1,
    transition: "transform 0.1s, box-shadow 0.1s",
    imageRendering: "pixelated",
  });

  const base = {
    minHeight: "100dvh",
    background: P.bg,
    fontFamily: BODY_FONT,
    boxSizing: "border-box",
    transition: "background 0.3s",
    padding: 0,
  };

  const inner = (maxW = 500) => ({
    width: "100%",
    maxWidth: maxW,
    margin: "0 auto",
    padding: "16px 16px env(safe-area-inset-bottom, 16px)",
    boxSizing: "border-box",
  });

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={{ ...base, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={inner(460)}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 64, marginBottom: 12, imageRendering: "pixelated" }}>🛡️</div>
          <h1 style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(14px,4.5vw,20px)", color: P.neon, margin: "0 0 8px", lineHeight: 1.5, textShadow: `2px 2px 0 #4a0080` }}>
            ESCUDO<br/>DIGITAL
          </h1>
          <div style={{ width: "100%", height: 4, background: `repeating-linear-gradient(90deg, ${P.neon} 0 8px, transparent 8px 16px)`, margin: "12px 0" }} />
          <p style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(7px,2vw,9px)", color: P.text2, lineHeight: 1.8 }}>
            VOCÊ CONSEGUE IDENTIFICAR<br/>OS GOLPES DA INTERNET?
          </p>
          <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.8vw,8px)", color: P.neon, marginTop: 8, opacity: 0.7 }}>
            PROJETO DE EXTENSÃO ADS • ALICE ALVES
          </div>
        </div>

        {/* Modos */}
        <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
          {MODES.map(m => (
            <button key={m.id}
              onClick={() => { setMode(m); setTutorialStep(0); setScreen("tutorial"); }}
              style={{ ...pixelBtn(m.color, m.dark), display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "clamp(9px,2.5vw,11px)", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: "clamp(6px,1.8vw,8px)", opacity: 0.8, fontFamily: PIXEL_FONT }}>{m.desc}</div>
              </div>
              <span style={{ fontSize: 16, opacity: 0.8 }}>▶</span>
            </button>
          ))}
        </div>

        <button onClick={() => setScreen("ranking")}
          style={{ ...pixelBtn("#1e1e2e", "#000"), border: `3px solid ${P.border}`, boxShadow: `4px 4px 0 0 #000`, marginTop: 4 }}>
          🏆 VER RANKING
        </button>

        <div style={{ width: "100%", height: 4, background: `repeating-linear-gradient(90deg, ${P.border} 0 8px, transparent 8px 16px)`, margin: "16px 0 0" }} />
      </div>
    </div>
  );

  // ── TUTORIAL ──
  if (screen === "tutorial") {
    const step = TUTORIAL_STEPS[tutorialStep];
    return (
      <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={inner(420)}>
          <div style={{ background: P.bg2, padding: 24, border: `4px solid ${P.border}`, boxShadow: `6px 6px 0 0 #000`, textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>{step.icon}</div>
            <h2 style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(10px,3vw,13px)", color: P.neon, margin: "0 0 16px", lineHeight: 1.6, textShadow: `2px 2px 0 #4a0080` }}>
              {step.title}
            </h2>
            <p style={{ color: P.text, fontSize: 14, lineHeight: 1.9, margin: "0 0 24px" }}>{step.text}</p>

            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24 }}>
              {TUTORIAL_STEPS.map((_, i) => (
                <div key={i} style={{ width: i === tutorialStep ? 20 : 8, height: 8, background: i === tutorialStep ? mode?.color : P.bg3, imageRendering: "pixelated", transition: "all 0.3s" }} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {tutorialStep > 0 && (
                <button onClick={() => setTutorialStep(t => t-1)}
                  style={{ ...pixelBtn("#334155","#000"), flex: 1 }}>◀ VOLTAR</button>
              )}
              <button onClick={() => tutorialStep < TUTORIAL_STEPS.length-1 ? setTutorialStep(t=>t+1) : startGame(mode)}
                style={{ ...pixelBtn(mode?.color||P.accent, mode?.dark||"#4a0080"), flex: 2 }}>
                {tutorialStep < TUTORIAL_STEPS.length-1 ? "PRÓXIMO ▶" : "JOGAR! ▶▶"}
              </button>
            </div>
            <button onClick={() => startGame(mode)}
              style={{ marginTop: 12, background: "none", border: "none", color: P.text2, fontSize: 11, cursor: "pointer", fontFamily: PIXEL_FONT }}>
              pular
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RANKING ──
  if (screen === "ranking") return (
    <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={inner(420)}>
        <div style={{ background: P.bg2, padding: 24, border: `4px solid ${P.border}`, boxShadow: `6px 6px 0 0 #000` }}>
          <h2 style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(12px,3.5vw,15px)", color: P.yellow, margin: "0 0 20px", textAlign: "center", textShadow: "2px 2px 0 #92400e" }}>
            🏆 RANKING
          </h2>
          {rankings.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < rankings.length-1 ? `2px dashed ${P.border}` : "none" }}>
              <div style={{ width: 32, height: 32, background: i===0?"#fbbf24":i===1?"#94a3b8":i===2?"#d97706":P.bg3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PIXEL_FONT, fontSize: 11, color: i<3?"#000":P.text2, imageRendering: "pixelated" }}>{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(8px,2.5vw,10px)", color: P.text }}>{r.name}</div>
                <div style={{ color: P.text2, fontSize: 11, marginTop: 2 }}>{r.mode}</div>
              </div>
              <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(9px,2.5vw,11px)", color: P.yellow }}>★{r.score}</div>
            </div>
          ))}
          <button onClick={() => setScreen("intro")} style={{ ...pixelBtn(P.accent,"#4a0080"), marginTop: 20 }}>◀ VOLTAR</button>
        </div>
      </div>
    </div>
  );

  // ── GAME OVER ──
  if (screen === "gameover") return (
    <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center", background: "#1a0000" }}>
      <div style={inner(400)}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 12, animation: "shake 0.4s infinite" }}>💀</div>
          <h2 style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(11px,3vw,14px)", color: P.red, margin: "0 0 16px", lineHeight: 1.6, textShadow: "2px 2px 0 #7f1d1d" }}>
            GAME OVER!<br/>VOCÊ CAIU<br/>NO GOLPE!
          </h2>
          <p style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(9px,2.5vw,11px)", color: P.yellow, marginBottom: 8 }}>PONTUAÇÃO: {score} PTS</p>
          <p style={{ color: P.text2, fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
            Não desanime! O importante é aprender antes que aconteça de verdade. 💪
          </p>
          <button onClick={() => setScreen("intro")} style={pixelBtn(P.red,"#7f1d1d")}>▶ TENTAR DE NOVO</button>
        </div>
      </div>
    </div>
  );

  // ── RESULT ──
  if (screen === "result") {
    const pct   = history.length ? Math.round((history.filter(h=>h.correct).length/history.length)*100) : 0;
    const medal = pct===100?"🥇":pct>=75?"🥈":pct>=50?"🥉":"📚";
    const msg   = pct===100?"VOCÊ É FERA!":pct>=75?"MUITO BOM!":pct>=50?"NO CAMINHO!":"PRATIQUE MAIS!";
    return (
      <div style={{ ...base, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={inner(460)}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 56 }}>{medal}</div>
            <h2 style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(12px,3.5vw,16px)", color: P.neon, margin: "10px 0 4px", textShadow: "2px 2px 0 #4a0080" }}>{msg}</h2>
            {mode?.id === "training" && <div style={{ fontFamily: PIXEL_FONT, fontSize: 9, color: "#a855f7", marginTop: 4 }}>MODO TREINO</div>}
          </div>

          {mode?.id !== "training" && (
            <div style={{ background: P.bg2, border: `4px solid ${P.border}`, boxShadow: "4px 4px 0 0 #000", padding: 16, marginBottom: 14, display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              {[["★",score,"PTS"],["✅",history.filter(h=>h.correct).length,"OK"],["❌",history.filter(h=>!h.correct).length,"ERR"],["📊",pct+"%","APROV"]].map(([icon,val,label]) => (
                <div key={label}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
                  <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(12px,3.5vw,16px)", color: P.neon }}>{val}</div>
                  <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.8vw,8px)", color: P.text2, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: P.bg2, border: `4px solid ${P.border}`, boxShadow: "4px 4px 0 0 #000", padding: 16, marginBottom: 14 }}>
            <p style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(7px,2vw,9px)", color: P.text2, margin: "0 0 12px" }}>— RESUMO —</p>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>{h.correct ? "✅" : "❌"}</span>
                <span style={{ color: P.text, fontSize: 13, flex: 1 }}>{h.scenario?.sender}</span>
                {h.timedOut && <span style={{ fontFamily: PIXEL_FONT, fontSize: 8, color: P.warning }}>TEMPO!</span>}
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <button onClick={() => startGame(mode)} style={pixelBtn(P.accent,"#4a0080")}>▶ JOGAR DE NOVO</button>
            <button onClick={() => setScreen("ranking")} style={pixelBtn("#1e1e2e","#000")}>🏆 RANKING</button>
            <button onClick={() => setScreen("intro")} style={{ ...pixelBtn("#1e1e2e","#000"), border: `3px solid ${P.border}` }}>◀ MENU</button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME ──
  if (!current) return null;
  const isCorrect = answered && selectedAnswer === current.isScam;
  const cardBg    = !answered ? P.bg2 : isCorrect ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)";
  const cardBorder = !answered ? P.border : isCorrect ? "#22c55e" : "#ef4444";

  return (
    <div style={{ ...base }}>
      <div style={inner(500)}>

        {/* HUD pixel */}
        <div style={{ background: P.bg2, border: `3px solid ${P.border}`, boxShadow: "3px 3px 0 0 #000", padding: "10px 14px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({length:3}).map((_,i) => (
              <span key={i} style={{ fontSize: 18, filter: i < lives ? "none" : "grayscale(1) opacity(0.3)", imageRendering: "pixelated" }}>❤️</span>
            ))}
          </div>
          <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(9px,2.5vw,11px)", color: P.yellow, textShadow: "1px 1px 0 #92400e" }}>
            ★ {mode?.id === "training" ? "---" : score}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(8px,2vw,9px)", color: P.text2 }}>{currentIndex+1}/{scenarios.length}</span>
            <button onClick={() => setTheme(t => t==="dark"?"light":"dark")}
              style={{ background: P.bg3, border: `2px solid ${P.border}`, padding: "3px 8px", cursor: "pointer", fontSize: 12, color: P.text2, fontFamily: PIXEL_FONT }}>
              {isDark?"☀":"🌙"}
            </button>
          </div>
        </div>

        {/* Modo + Combo — SEM categoria! */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ background: (mode?.color||P.accent)+"33", color: mode?.color, border: `2px solid ${mode?.color||P.accent}`, padding: "3px 10px", fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.8vw,8px)" }}>
            {mode?.icon} {mode?.label}
          </span>
          <span style={{ background: typeBg[current.type]+"33", color: typeBg[current.type], border: `2px solid ${typeBg[current.type]}`, padding: "3px 10px", fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.8vw,8px)" }}>
            {typeIcon[current.type]} {typeName[current.type]}
          </span>
          {combo >= 2 && (
            <span style={{ background: "#d9770633", color: P.warning, border: `2px solid ${P.warning}`, padding: "3px 10px", fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.8vw,8px)", animation: "blink 0.5s step-end infinite" }}>
              🔥 COMBO x{combo}
            </span>
          )}
        </div>

        {/* Timer pixel */}
        {mode?.id !== "training" && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ background: "#1a0028", border: `2px solid ${P.border}`, height: 16, imageRendering: "pixelated", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, transition: "width 1s linear, background 0.3s", imageRendering: "pixelated" }} />
            </div>
            <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(8px,2vw,9px)", color: timerColor, textAlign: "center", marginTop: 4 }}>
              ⏱ {timeLeft}s
            </div>
          </div>
        )}

        {/* Card da mensagem */}
        <div style={{
          background: cardBg,
          border: `4px solid ${cardBorder}`,
          boxShadow: `4px 4px 0 0 #000`,
          marginBottom: 14,
          transition: "all 0.2s",
          animation: shake ? "shake 0.4s" : pulse ? "pulseG 0.4s" : "none",
          overflow: "hidden",
        }}>
          {/* Header do card — SEM badge de categoria */}
          <div style={{ background: P.bg3, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: `3px solid ${cardBorder}` }}>
            <div style={{ width: 40, height: 40, background: typeBg[current.type]+"44", border: `3px solid ${typeBg[current.type]}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, imageRendering: "pixelated" }}>
              {current.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(8px,2.5vw,10px)", color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {current.sender}
              </div>
              <div style={{ color: typeBg[current.type], fontSize: 11, marginTop: 3, fontWeight: 600 }}>
                {typeName[current.type]}
              </div>
            </div>
            {/* Categoria aparece SÓ depois de responder */}
            {answered && (
              <div style={{ background: current.isScam ? "#ef444433" : "#22c55e33", border: `2px solid ${current.isScam ? "#ef4444" : "#22c55e"}`, padding: "3px 8px", fontFamily: PIXEL_FONT, fontSize: "clamp(6px,1.5vw,7px)", color: current.isScam ? "#ef4444" : "#22c55e", flexShrink: 0 }}>
                {current.category}
              </div>
            )}
          </div>

          {/* Mensagem */}
          <div style={{ padding: 16 }}>
            <p style={{ color: P.text, fontSize: "clamp(13px,3.5vw,15px)", lineHeight: 1.8, margin: 0, wordBreak: "break-word" }}>
              {current.message}
            </p>
          </div>

          {/* Explicação — aparece só depois */}
          {answered && (
            <div style={{ margin: "0 12px 12px", background: current.isScam ? "#ef444422" : "#22c55e22", border: `3px solid ${current.isScam?"#ef4444":"#22c55e"}`, padding: 14 }}>
              <p style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(8px,2vw,10px)", color: current.isScam ? "#fca5a5" : "#86efac", margin: "0 0 10px", lineHeight: 1.6 }}>
                {isCorrect ? "✅ ARRASOU!" : selectedAnswer===null ? "⏰ TEMPO!" : "❌ ERROU!"}{" "}
                {current.isScam ? "🚨 ERA GOLPE!" : "✔ ERA SEGURO!"}
              </p>
              <p style={{ color: P.text, fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>{current.explanation}</p>
              <p style={{ fontFamily: PIXEL_FONT, fontSize: "clamp(7px,2vw,9px)", color: P.yellow, margin: 0, lineHeight: 1.6 }}>💡 {current.tip}</p>
            </div>
          )}
        </div>

        {/* Botões */}
        {!answered ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button onClick={() => handleAnswer(true)}  style={pixelBtn("#dc2626","#7f1d1d")}>🚨 GOLPE!</button>
            <button onClick={() => handleAnswer(false)} style={pixelBtn("#16a34a","#14532d")}>✅ SEGURO!</button>
          </div>
        ) : (
          <button onClick={nextQuestion} style={pixelBtn(P.accent,"#4a0080")}>
            {currentIndex >= scenarios.length-1 ? "▶ VER RESULTADO" : "▶ PRÓXIMA"}
          </button>
        )}

        <div style={{ height: "env(safe-area-inset-bottom, 8px)" }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; }
        html, body { margin:0; padding:0; width:100%; overflow-x:hidden; background: #0a0014; }
        @keyframes shake  { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
        @keyframes pulseG { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        button:active { transform: translate(3px,3px) !important; box-shadow: 1px 1px 0 0 currentColor !important; }
      `}</style>
    </div>
  );
}