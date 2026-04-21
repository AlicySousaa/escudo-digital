import { useState, useEffect, useCallback, useRef } from "react";

// ── CENÁRIOS EDUCACIONAIS ──
const SECURITY_SCENARIOS = [
  {
    id: 1,
    type: "whatsapp",
    category: "Golpe Clássico",
    sender: "Free Fire Oficial",
    avatar: "🎮",
    message: "🔥 PARABÉNS! Você foi selecionado para ganhar 10.000 DIAMANTES no Free Fire! Clique agora: freefire-diamantes.net/resgatar",
    isScam: true,
    explanation: "Golpes de jogo! Nenhum jogo envia diamantes grátis por mensagem.",
    tip: "Nunca informe seu login e senha de jogos para ninguém!",
    category_color: "#ff6b6b",
  },
  {
    id: 2,
    type: "instagram",
    category: "Perfil Falso",
    sender: "@ loud_thurzin_real",
    avatar: "⭐",
    message: "Oi! Sou o Thurzin da LOUD. Estamos selecionando fãs para testar nosso novo jogo! Me manda seu e-mail e senha.",
    isScam: true,
    explanation: "Perfil falso de famoso! Youtubers verificados nunca pedem sua senha.",
    tip: "Famosos nunca pedem dados. Procure o selo azul de verificação!",
    category_color: "#e1306c",
  },
  {
    id: 3,
    type: "sms",
    category: "Mensagem Legítima",
    sender: "Spotify",
    avatar: "🎵",
    message: "Seu plano Spotify Premium foi renovado com sucesso. Próxima cobrança: 15/05.",
    isScam: false,
    explanation: "Mensagem legítima! Apenas informa sobre renovação.",
    tip: "Empresas reais só informam - nunca pedem senha por SMS.",
    category_color: "#64748b",
  },
  {
    id: 4,
    type: "whatsapp",
    category: "Golpe de Emprego",
    sender: "Recrutadora Julia",
    avatar: "👩‍💼",
    message: "Oi! Vi seu perfil e temos vaga de DIVULGADOR online! Só precisa pagar R$49,90 de cadastro!",
    isScam: true,
    explanation: "Golpe de falsa vaga! Empresas sérias NUNCA cobram para você trabalhar.",
    tip: "Se precisou pagar para conseguir emprego, é 100% golpe.",
    category_color: "#ff6b6b",
  },
  {
    id: 5,
    type: "instagram",
    category: "Sorteio Falso",
    sender: "Nike Brasil Sorteios",
    avatar: "👟",
    message: "🎉 SORTEIO! Você ganhou um tênis Nike! Pague R$29,90 de frete para receber!",
    isScam: true,
    explanation: "Sorteio falso! Sorteios legítimos não cobram frete.",
    tip: "Sorteios legítimos são GRÁTIS. Verifique o selo azul.",
    category_color: "#ff6b6b",
  },
  {
    id: 6,
    type: "email",
    category: "Phishing Escolar",
    sender: "Principal da Escola",
    avatar: "🏫",
    message: "Seu filho não pode entrar. Clique aqui para atualizar dados: escola-fake.com",
    isScam: true,
    explanation: "Golpe de phishing! A escola entraria em contato de outras formas.",
    tip: "Sempre confirme com a secretaria antes de clicar em links desconhecidos.",
    category_color: "#ff6b6b",
  },
  {
    id: 7,
    type: "link",
    category: "Link Suspeito",
    sender: "Mensagem Desconhecida",
    avatar: "🔗",
    message: "Clique aqui para ganhar prêmio: bit.ly/Sorteio2025",
    isScam: true,
    explanation: "Links encurtados podem esconder URLs maliciosas. Sempre verifique a origem.",
    tip: "Desconfie de links encurtados (bit.ly, tinyurl). Passe o mouse para ver a URL real.",
    category_color: "#ff6b6b",
  },
  {
    id: 8,
    type: "email",
    category: "Email Legítimo",
    sender: "Google",
    avatar: "📧",
    message: "Você fez login em um novo dispositivo. Se não foi você, clique em 'Revisar segurança'.",
    isScam: false,
    explanation: "Email legítimo de segurança! Google avisa sobre logins desconhecidos.",
    tip: "Empresas legítimas avisam sobre atividades suspeitas.",
    category_color: "#22c55e",
  },
];

const VIRUS_SCENARIOS = [
  {
    id: 101,
    type: "popup",
    category: "Pop-up Malicioso",
    sender: "Site Desconhecido",
    avatar: "⚠️",
    message: "⚠️ ALERTA! Seu computador está infectado com VÍRUS! Clique aqui para limpar: cleanup-virus.exe",
    isScam: true,
    explanation: "Pop-ups de 'vírus detectado' são golpes! Ninguém pode detectar vírus por pop-up.",
    tip: "Se seu antivírus detecta algo, ele avisa no próprio programa, não por pop-up.",
    category_color: "#ff6b6b",
  },
  {
    id: 102,
    type: "extension",
    category: "Extensão Maliciosa",
    sender: "Chrome Store (Falsa)",
    avatar: "🔧",
    message: "Instale 'Turbo Download Pro' - aumenta a velocidade do navegador em 10x! ⚡",
    isScam: true,
    explanation: "Extensões maliciosas roubam dados, rastreiam navegação e modifica resultados.",
    tip: "Só instale extensões de desenvolvedoras conhecidas. Leia reviews com atenção!",
    category_color: "#ff6b6b",
  },
  {
    id: 103,
    type: "software",
    category: "Software Legítimo",
    sender: "Google Chrome",
    avatar: "🌐",
    message: "Google Chrome versão 132.0.6834.110 está disponível. Atualizar agora?",
    isScam: false,
    explanation: "Atualizações de navegadores e softwares conhecidos são seguras!",
    tip: "Sempre mantenha seu navegador e programas atualizados!",
    category_color: "#22c55e",
  },
  {
    id: 104,
    type: "website",
    category: "Site Malicioso",
    sender: "URL Suspeita",
    avatar: "🌍",
    message: "Visite: gogle-seguro.com.br (Similar ao Google, mas domínio diferente!)",
    isScam: true,
    explanation: "Sites que imitam nomes conhecidos podem roubar seus dados de login.",
    tip: "Verifique sempre a URL completa. gogle ≠ google. Um caractere diferente = site falso!",
    category_color: "#ff6b6b",
  },
  {
    id: 105,
    type: "download",
    category: "Download Perigoso",
    sender: "Site Torrent Desconhecido",
    avatar: "⬇️",
    message: "Baixe filme GRÁTIS! Versão antes do lançamento: filme_novo.exe (2.5GB)",
    isScam: true,
    explanation: "Arquivos .exe disfarçados de filmes contêm vírus, ransomware ou spyware.",
    tip: "Filmes e músicas legítimas vêm de plataformas conhecidas (Netflix, Spotify).",
    category_color: "#ff6b6b",
  },
  {
    id: 106,
    type: "app",
    category: "App Desconhecido",
    sender: "App Store (Falsa)",
    avatar: "📱",
    message: "App 'WhatsApp Plus' com mais funcionalidades GRÁTIS! Download aqui!",
    isScam: true,
    explanation: "'WhatsApp Plus' é um app pirata que viola suas regras e pode roubar dados.",
    tip: "Só baixe apps das lojas oficiais: App Store (iOS) ou Google Play (Android).",
    category_color: "#ff6b6b",
  },
  {
    id: 107,
    type: "network",
    category: "Wi-Fi Público Seguro",
    sender: "Aeroporto/Café",
    avatar: "📡",
    message: "Conectado a: 'AEROPORTO_WIFI_GRATIS' - Use normalmente",
    isScam: false,
    explanation: "Wi-Fi públicos são seguros se você não insere dados sensíveis.",
    tip: "Em Wi-Fi público, não acesse banco ou email. Use VPN se possível.",
    category_color: "#22c55e",
  },
];

const ADVANCED_SCENARIOS = [
  {
    id: 201,
    type: "email",
    category: "Spoofing de Email",
    sender: "noreply@gogle.com (Falso)",
    avatar: "🎭",
    message: "Sua conta Google foi acessada. Confirme identidade aqui: verify-google-account.com",
    isScam: true,
    explanation: "Email spoofing é quando alguém finge ser outra pessoa por email.",
    tip: "Emails reais do Google vêm de @google.com, não @gogle.com ou domínios similares.",
    category_color: "#ff6b6b",
  },
  {
    id: 202,
    type: "qrcode",
    category: "QR Code Suspeito",
    sender: "Código em Flyer/Poster",
    avatar: "📱",
    message: "Escaneie este QR code para 'ganhar prêmio'... (código aponta para site malicioso)",
    isScam: true,
    explanation: "QR codes podem redirecionar para sites maliciosos ou phishing.",
    tip: "Antes de escanear, verifique a fonte. QR codes em ambientes públicos podem ser perigosos.",
    category_color: "#ff6b6b",
  },
  {
    id: 203,
    type: "password",
    category: "Vazamento de Dados",
    sender: "Site Comprometido",
    avatar: "🔐",
    message: "Seus dados foram vazados! Sua senha é: senha123456",
    isScam: true,
    explanation: "Se sua senha foi vazada, mude-a IMEDIATAMENTE em todos os sites que a usam.",
    tip: "Use senhas únicas e fortes. Nunca reutilize a mesma senha em múltiplos sites!",
    category_color: "#ff6b6b",
  },
  {
    id: 204,
    type: "social",
    category: "Engenharia Social Legítima",
    sender: "Seu Melhor Amigo",
    avatar: "👫",
    message: "Oi! Você recebeu uma compra recente no seu Amazon?",
    isScam: false,
    explanation: "Amigos questionando atividades é normal! Eles querem ajudar você.",
    tip: "Se duvidar, confirme com o amigo por outro canal (ligação, em pessoa).",
    category_color: "#22c55e",
  },
  {
    id: 205,
    type: "ransomware",
    category: "Ransomware Warning",
    sender: "Seu Antivírus Real",
    avatar: "🛡️",
    message: "Ameaça detectada: Ransomware.Gen bloqueado. Arquivo quarentenado.",
    isScam: false,
    explanation: "Antivírus legítimos bloqueiam ransomware e mostram notificações no programa.",
    tip: "Mantenha seu antivírus atualizado. Faça backups regulares de seus arquivos.",
    category_color: "#22c55e",
  },
];

const ALL_SCENARIOS = [...SECURITY_SCENARIOS, ...VIRUS_SCENARIOS, ...ADVANCED_SCENARIOS];

// ── MODOS DE JOGO ──
const MODES = [
  {
    id: "beginner",
    label: "INICIANTE",
    icon: "🟢",
    desc: "7º-8º ano • Golpes básicos",
    time: 20,
    scenarios: SECURITY_SCENARIOS,
    color: "#22c55e",
    dark: "#15803d",
  },
  {
    id: "intermediate",
    label: "INTERMEDIÁRIO",
    icon: "🟡",
    desc: "8º-9º ano • Vírus e segurança",
    time: 12,
    scenarios: [...SECURITY_SCENARIOS, ...VIRUS_SCENARIOS],
    color: "#f59e0b",
    dark: "#92400e",
  },
  {
    id: "advanced",
    label: "AVANÇADO",
    icon: "🔴",
    desc: "9º ano • Engenharia social",
    time: 8,
    scenarios: ALL_SCENARIOS,
    color: "#ef4444",
    dark: "#7f1d1d",
  },
  {
    id: "training",
    label: "TREINO",
    icon: "📚",
    desc: "Sem pressão • Aprenda",
    time: 999,
    scenarios: ALL_SCENARIOS,
    color: "#8b5cf6",
    dark: "#5b21b6",
  },
];

const TUTORIAL_STEPS = [
  {
    icon: "🛡️",
    title: "BEM-VINDO AO ESCUDO DIGITAL!",
    text: "Você vai receber mensagens reais simuladas. Sua missão: descobrir se é GOLPE ou SEGURO!",
  },
  {
    icon: "📱",
    title: "TIPOS DE GOLPES",
    text: "Vírus, phishing, extensões maliciosas, links suspeitos, apps falsos... Existem muitas ameaças online!",
  },
  {
    icon: "⏱️",
    title: "CORRE!",
    text: "Você tem poucos segundos para decidir. Quanto mais rápido acertar, mais pontos!",
  },
  {
    icon: "💡",
    title: "APRENDA",
    text: "Cada erro vem com uma explicação. Entender COMO funciona o golpe é mais importante que acertar.",
  },
];

// ── PALETA DE CORES ──
const COLORS = {
  bg: "#0f0f23",
  bg2: "#1a1a3a",
  bg3: "#252550",
  card: "#13132e",
  text: "#e0d0ff",
  text2: "#9070c0",
  border: "#4a0080",
  neon: "#c084fc",
  yellow: "#fbbf24",
  green: "#22c55e",
  red: "#ef4444",
  warning: "#f59e0b",
  accent: "#7c3aed",
};

const typeEmoji = {
  whatsapp: "💬",
  sms: "📱",
  email: "📧",
  instagram: "📸",
  popup: "⚠️",
  extension: "🔧",
  software: "💾",
  website: "🌍",
  download: "⬇️",
  app: "📱",
  network: "📡",
  link: "🔗",
  qrcode: "📱",
  password: "🔐",
  social: "👫",
  ransomware: "🔒",
};

const typeName = {
  whatsapp: "WhatsApp",
  sms: "SMS",
  email: "E-mail",
  instagram: "Instagram",
  popup: "Pop-up",
  extension: "Extensão",
  software: "Software",
  website: "Website",
  download: "Download",
  app: "App",
  network: "Rede",
  link: "Link",
  qrcode: "QR Code",
  password: "Senha",
  social: "Social",
  ransomware: "Antivírus",
};

// ── COMPONENTE PRINCIPAL ──
export default function EscudoDigital() {
  const [screen, setScreen] = useState("intro");
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
  const [paused, setPaused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [rankings, setRankings] = useState([
    { name: "PEDRO L.", score: 420, mode: "AVANÇADO" },
    { name: "JULIA M.", score: 380, mode: "INTERMEDIÁRIO" },
    { name: "KAIQUE S.", score: 310, mode: "INTERMEDIÁRIO" },
  ]);

  const timerRef = useRef(null);
  const current = scenarios[currentIndex];
  const totalTime = mode?.time || 15;
  const progress = ((currentIndex + 1) / scenarios.length) * 100;

  // ── TIMER ──
  useEffect(() => {
    if (screen !== "game" || answered || !mode || paused || mode.id === "training") return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, screen, answered, mode, paused]);

  const startGame = useCallback((selectedMode) => {
    const shuffled = [...selectedMode.scenarios]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setScenarios(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(selectedMode.time);
    setCombo(0);
    setHistory([]);
    setMode(selectedMode);
    setPaused(false);
    setShowMenu(false);
    setScreen("game");
  }, []);

  const handleAnswer = useCallback(
    (isScam) => {
      if (answered) return;
      clearTimeout(timerRef.current);
      setAnswered(true);
      setSelectedAnswer(isScam);

      const correct = isScam !== null && isScam === current?.isScam;
      if (correct && mode?.id !== "training") {
        setScore((s) => s + 10 + Math.floor(timeLeft * 2) + (combo >= 2 ? 25 : 0));
        setCombo((c) => c + 1);
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      } else if (!correct) {
        setLives((l) => l - 1);
        setCombo(0);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setHistory((h) => [...h, { scenario: current, correct, timedOut: isScam === null }]);
    },
    [answered, current, combo, timeLeft, mode]
  );

  const nextQuestion = () => {
    if (lives <= 0) {
      setScreen("gameover");
      return;
    }
    if (currentIndex >= scenarios.length - 1) {
      setRankings((r) =>
        [...r, { name: "VOCÊ", score, mode: mode?.label }]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
      );
      setScreen("result");
      return;
    }
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(mode?.time || 15);
  };

  const pixelBtn = (color, darkColor) => ({
    background: color,
    border: "none",
    borderRadius: 0,
    boxShadow: `4px 4px 0 0 ${darkColor}`,
    color: "#fff",
    fontFamily: "'Courier New', monospace",
    fontSize: "clamp(10px, 2.5vw, 13px)",
    cursor: "pointer",
    padding: "12px 20px",
    letterSpacing: 1,
    transition: "all 0.1s",
    fontWeight: "bold",
  });

  const base = {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: "border-box",
    padding: 0,
  };

  const container = (maxW = 600) => ({
    width: "100%",
    maxWidth: maxW,
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
  });

  // ── TELA INTRO ──
  if (screen === "intro") {
    return (
      <div
        style={{
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={container(550)}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 80, marginBottom: 10 }}>🛡️</div>
            <h1
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(24px, 6vw, 42px)",
                color: COLORS.neon,
                margin: "0 0 10px",
                lineHeight: 1.2,
                textShadow: `2px 2px 4px rgba(0,0,0,0.5)`,
                letterSpacing: 2,
              }}
            >
              ESCUDO<br />
              DIGITAL
            </h1>
            <div
              style={{
                width: "100%",
                height: 3,
                background: `repeating-linear-gradient(90deg, ${COLORS.neon} 0 10px, transparent 10px 20px)`,
                margin: "15px 0 20px",
              }}
            />
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(11px, 2.5vw, 13px)",
                color: COLORS.text2,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              VOCÊ CONSEGUE IDENTIFICAR<br />
              OS PERIGOS DA INTERNET?
            </p>
          </div>

          <div style={{ display: "grid", gap: 12, marginBottom: 14 }}>
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m);
                  setTutorialStep(0);
                  setScreen("tutorial");
                }}
                style={{
                  ...pixelBtn(m.color, m.dark),
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "left",
                  padding: "14px 16px",
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", fontWeight: "bold" }}>
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(10px, 2vw, 12px)",
                      opacity: 0.85,
                      marginTop: 3,
                    }}
                  >
                    {m.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setScreen("ranking")}
            style={{
              ...pixelBtn(COLORS.warning, "#92400e"),
              width: "100%",
            }}
          >
            🏆 RANKING
          </button>
        </div>
      </div>
    );
  }

  // ── TUTORIAL ──
  if (screen === "tutorial") {
    const step = TUTORIAL_STEPS[tutorialStep];
    return (
      <div
        style={{
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={container(500)}>
          <div
            style={{
              background: COLORS.bg2,
              padding: 30,
              border: `4px solid ${COLORS.border}`,
              boxShadow: `6px 6px 0 0 rgba(0,0,0,0.5)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 20 }}>{step.icon}</div>
            <h2
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(14px, 3.5vw, 18px)",
                color: COLORS.neon,
                margin: "0 0 15px",
                lineHeight: 1.5,
                letterSpacing: 1,
              }}
            >
              {step.title}
            </h2>
            <p
              style={{
                color: COLORS.text,
                fontSize: 15,
                lineHeight: 1.8,
                margin: "0 0 25px",
              }}
            >
              {step.text}
            </p>

            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                marginBottom: 25,
              }}
            >
              {TUTORIAL_STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === tutorialStep ? 20 : 8,
                    height: 8,
                    background:
                      i === tutorialStep ? mode?.color : COLORS.bg3,
                    transition: "all 0.3s",
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {tutorialStep > 0 && (
                <button
                  onClick={() => setTutorialStep((t) => t - 1)}
                  style={{ ...pixelBtn("#334155", "#000"), flex: 1 }}
                >
                  ◀ VOLTAR
                </button>
              )}
              <button
                onClick={() =>
                  tutorialStep < TUTORIAL_STEPS.length - 1
                    ? setTutorialStep((t) => t + 1)
                    : startGame(mode)
                }
                style={{
                  ...pixelBtn(mode?.color || COLORS.accent, mode?.dark || "#4a0080"),
                  flex: 2,
                }}
              >
                {tutorialStep < TUTORIAL_STEPS.length - 1
                  ? "PRÓXIMO ▶"
                  : "JOGAR! ▶▶"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RANKING ──
  if (screen === "ranking") {
    return (
      <div
        style={{
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={container(500)}>
          <div
            style={{
              background: COLORS.bg2,
              padding: 25,
              border: `4px solid ${COLORS.border}`,
              boxShadow: `6px 6px 0 0 rgba(0,0,0,0.5)`,
            }}
          >
            <h2
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(14px, 3.5vw, 18px)",
                color: COLORS.yellow,
                margin: "0 0 20px",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              🏆 RANKING TOP 10
            </h2>
            {rankings.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  padding: "12px 0",
                  borderBottom:
                    i < rankings.length - 1
                      ? `2px dashed ${COLORS.border}`
                      : "none",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background:
                      i === 0
                        ? "#fbbf24"
                        : i === 1
                        ? "#94a3b8"
                        : i === 2
                        ? "#d97706"
                        : COLORS.bg3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Courier New', monospace",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: i < 3 ? "#000" : COLORS.text2,
                    borderRadius: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      color: COLORS.text,
                      fontWeight: "bold",
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      color: COLORS.text2,
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {r.mode}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: COLORS.yellow,
                    fontWeight: "bold",
                  }}
                >
                  ★{r.score}
                </div>
              </div>
            ))}
            <button
              onClick={() => setScreen("intro")}
              style={{
                ...pixelBtn(COLORS.accent, "#4a0080"),
                width: "100%",
                marginTop: 20,
              }}
            >
              ◀ VOLTAR
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME OVER ──
  if (screen === "gameover") {
    return (
      <div
        style={{
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a0000",
        }}
      >
        <div style={container(450)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 15 }}>💀</div>
            <h2
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(14px, 4vw, 20px)",
                color: COLORS.red,
                margin: "0 0 15px",
                lineHeight: 1.5,
                letterSpacing: 1,
              }}
            >
              GAME OVER!<br />
              VOCÊ PERDEU!
            </h2>
            <div
              style={{
                background: COLORS.bg2,
                border: `3px solid ${COLORS.red}`,
                padding: 15,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(12px, 3vw, 16px)",
                  color: COLORS.yellow,
                  fontWeight: "bold",
                }}
              >
                PONTUAÇÃO: {score} PTS
              </div>
              <div
                style={{
                  color: COLORS.text2,
                  fontSize: 13,
                  marginTop: 8,
                }}
              >
                Acertos: {history.filter((h) => h.correct).length}/
                {history.length}
              </div>
            </div>
            <button
              onClick={() => setScreen("intro")}
              style={{
                ...pixelBtn(COLORS.red, "#7f1d1d"),
                width: "100%",
              }}
            >
              ▶ TENTAR DE NOVO
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (screen === "result") {
    const pct = history.length
      ? Math.round((history.filter((h) => h.correct).length / history.length) * 100)
      : 0;
    const medal = pct === 100 ? "🥇" : pct >= 75 ? "🥈" : pct >= 50 ? "🥉" : "📚";
    const msg = pct === 100 ? "VOCÊ É FERA!" : pct >= 75 ? "MUITO BOM!" : pct >= 50 ? "NO CAMINHO!" : "PRATIQUE MAIS!";

    return (
      <div
        style={{
          ...base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={container(550)}>
          <div style={{ textAlign: "center", marginBottom: 25 }}>
            <div style={{ fontSize: 60 }}>{medal}</div>
            <h2
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(14px, 4vw, 20px)",
                color: COLORS.neon,
                margin: "10px 0 5px",
                letterSpacing: 1,
              }}
            >
              {msg}
            </h2>
          </div>

          <div
            style={{
              background: COLORS.bg2,
              border: `4px solid ${COLORS.border}`,
              boxShadow: "4px 4px 0 0 rgba(0,0,0,0.5)",
              padding: 20,
              marginBottom: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 24, marginBottom: 5 }}>★</div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(12px, 3vw, 16px)",
                  color: COLORS.neon,
                  fontWeight: "bold",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(8px, 2vw, 10px)",
                  color: COLORS.text2,
                  marginTop: 4,
                }}
              >
                PTS
              </div>
            </div>
            <div>
              <div style={{ fontSize: 24, marginBottom: 5 }}>✅</div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(12px, 3vw, 16px)",
                  color: COLORS.green,
                  fontWeight: "bold",
                }}
              >
                {history.filter((h) => h.correct).length}
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(8px, 2vw, 10px)",
                  color: COLORS.text2,
                  marginTop: 4,
                }}
              >
                OK
              </div>
            </div>
            <div>
              <div style={{ fontSize: 24, marginBottom: 5 }}>❌</div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(12px, 3vw, 16px)",
                  color: COLORS.red,
                  fontWeight: "bold",
                }}
              >
                {history.filter((h) => !h.correct).length}
              </div>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(8px, 2vw, 10px)",
                  color: COLORS.text2,
                  marginTop: 4,
                }}
              >
                ERR
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <button
              onClick={() => startGame(mode)}
              style={{
                ...pixelBtn(COLORS.accent, "#4a0080"),
                width: "100%",
              }}
            >
              ▶ JOGAR DE NOVO
            </button>
            <button
              onClick={() => setScreen("ranking")}
              style={{
                ...pixelBtn(COLORS.warning, "#92400e"),
                width: "100%",
              }}
            >
              🏆 RANKING
            </button>
            <button
              onClick={() => setScreen("intro")}
              style={{
                ...pixelBtn("#334155", "#000"),
                width: "100%",
                border: `3px solid ${COLORS.border}`,
              }}
            >
              ◀ MENU PRINCIPAL
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── GAME ──
  if (!current) return null;

  const isCorrect = answered && selectedAnswer === current.isScam;
  const cardBg = !answered
    ? COLORS.bg2
    : isCorrect
    ? "rgba(34,197,94,0.15)"
    : "rgba(239,68,68,0.15)";
  const cardBorder = !answered
    ? COLORS.border
    : isCorrect
    ? COLORS.green
    : COLORS.red;

  return (
    <div
      style={{
        ...base,
        animation: shake ? "shake 0.4s" : pulse ? "pulse 0.4s" : "none",
      }}
    >
      <div style={container(700)}>
        {/* HEADER */}
        <div
          style={{
            background: COLORS.bg2,
            border: `3px solid ${COLORS.border}`,
            padding: "12px 16px",
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: 20,
                  filter: i < lives ? "none" : "grayscale(1) opacity(0.3)",
                }}
              >
                ❤️
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(11px, 2.5vw, 13px)",
              color: COLORS.yellow,
              fontWeight: "bold",
            }}
          >
            ★ {score}
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(10px, 2.5vw, 12px)",
              color: COLORS.text2,
            }}
          >
            {currentIndex + 1}/{scenarios.length}
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              padding: 0,
            }}
          >
            ⚙️
          </button>
        </div>

        {/* MENU PAUSA */}
        {showMenu && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: COLORS.bg2,
                border: `4px solid ${COLORS.border}`,
                padding: 25,
                borderRadius: 0,
                minWidth: 280,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 16,
                  color: COLORS.neon,
                  margin: "0 0 20px",
                  textAlign: "center",
                }}
              >
                MENU
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                <button
                  onClick={() => {
                    setPaused(!paused);
                    setShowMenu(false);
                  }}
                  style={{
                    ...pixelBtn(COLORS.warning, "#92400e"),
                    width: "100%",
                  }}
                >
                  {paused ? "▶ CONTINUAR" : "⏸ PAUSAR"}
                </button>
                <button
                  onClick={() => {
                    setScreen("intro");
                    setPaused(false);
                    setShowMenu(false);
                  }}
                  style={{
                    ...pixelBtn("#334155", "#000"),
                    width: "100%",
                  }}
                >
                  ◀ SAIR
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TIMER */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              background: "#1a0028",
              border: `2px solid ${COLORS.border}`,
              height: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(timeLeft / totalTime) * 100}%`,
                background: timeLeft > totalTime * 0.5 ? COLORS.green : COLORS.warning,
                transition: "width 1s linear, background 0.3s",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(9px, 2vw, 11px)",
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgba(0,0,0,0.8)",
                }}
              >
                ⏱ {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            background: COLORS.bg3,
            border: `2px solid ${COLORS.border}`,
            height: 8,
            overflow: "hidden",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: COLORS.neon,
              transition: "width 0.3s",
            }}
          />
        </div>

        {/* CARD */}
        <div
          style={{
            background: cardBg,
            border: `4px solid ${cardBorder}`,
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: COLORS.bg3,
              padding: "12px 16px",
              borderBottom: `3px solid ${cardBorder}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                background: COLORS.bg2,
                border: `2px solid ${cardBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {current.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {current.sender}
              </div>
              <div
                style={{
                  color: COLORS.text2,
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {typeEmoji[current.type]} {typeName[current.type]}
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div style={{ padding: "16px" }}>
            <p
              style={{
                color: COLORS.text,
                fontSize: "clamp(13px, 3.5vw, 16px)",
                lineHeight: 1.7,
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {current.message}
            </p>
          </div>

          {/* RESPOSTA */}
          {answered && (
            <div
              style={{
                margin: "0 12px 12px",
                background: isCorrect
                  ? "rgba(34,197,94,0.2)"
                  : "rgba(239,68,68,0.2)",
                border: `3px solid ${isCorrect ? COLORS.green : COLORS.red}`,
                padding: 14,
              }}
            >
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: isCorrect ? COLORS.green : COLORS.red,
                  margin: "0 0 10px",
                  fontWeight: "bold",
                }}
              >
                {isCorrect
                  ? "✅ ARRASOU!"
                  : selectedAnswer === null
                  ? "⏰ TEMPO!"
                  : "❌ ERROU!"}{" "}
                {current.isScam ? "🚨 ERA GOLPE!" : "✅ ERA SEGURO!"}
              </p>
              <p
                style={{
                  color: COLORS.text,
                  fontSize: "clamp(12px, 3vw, 14px)",
                  lineHeight: 1.7,
                  margin: "0 0 10px",
                }}
              >
                <strong>Explicação:</strong> {current.explanation}
              </p>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: COLORS.yellow,
                  margin: 0,
                }}
              >
                💡 {current.tip}
              </p>
            </div>
          )}
        </div>

        {/* BUTTONS */}
        {!answered ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button
              onClick={() => handleAnswer(true)}
              style={{ ...pixelBtn("#dc2626", "#7f1d1d"), padding: "14px 10px" }}
            >
              🚨 GOLPE!
            </button>
            <button
              onClick={() => handleAnswer(false)}
              style={{ ...pixelBtn("#16a34a", "#14532d"), padding: "14px 10px" }}
            >
              ✅ SEGURO!
            </button>
          </div>
        ) : (
          <button
            onClick={nextQuestion}
            style={{
              ...pixelBtn(COLORS.accent, "#4a0080"),
              width: "100%",
              padding: "14px 10px",
            }}
          >
            {currentIndex >= scenarios.length - 1 ? "▶ VER RESULTADO" : "▶ PRÓXIMA"}
          </button>
        )}
      </div>

      {/* PAUSADO */}
      {paused && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 48,
              color: COLORS.neon,
              textShadow: "0 0 20px rgba(192, 132, 252, 0.5)",
            }}
          >
            ⏸ PAUSADO
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; overflow-x: hidden; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
        button:active { transform: translate(3px, 3px) !important; box-shadow: 1px 1px 0 0 currentColor !important; }
      `}</style>
    </div>
  );
}