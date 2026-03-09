import { useState, useEffect, useCallback } from "react";

const scenarios = [
  {
    id: 1,
    type: "whatsapp",
    category: "Golpe do Pix",
    sender: "Filho Lucas 👦",
    avatar: "👦",
    message: "Mãe, tô sem crédito no celular, preciso que você mande R$300 agora no Pix pra esse número: 078.432.111-09. É urgente!!",
    isScam: true,
    explanation: "Golpe do 'filho em apuros'! Sempre ligue para confirmar. Golpistas criam urgência para você não pensar direito.",
    tip: "💡 Dica: Sempre ligue para o número salvo do familiar antes de fazer qualquer Pix.",
  },
  {
    id: 2,
    type: "sms",
    category: "Link Malicioso",
    sender: "Banco Seguro 🏦",
    avatar: "🏦",
    message: "Sua conta foi BLOQUEADA por suspeita de fraude! Clique AGORA para desbloquear: http://banco-segur0.com.br/desbloqueio",
    isScam: true,
    explanation: "Link falso! Bancos nunca enviam links por SMS pedindo login. O endereço 'banco-segur0' tem um zero no lugar do 'o'.",
    tip: "💡 Dica: Nunca clique em links de SMS. Acesse sempre o app oficial do banco.",
  },
  {
    id: 3,
    type: "whatsapp",
    category: "Mensagem Legítima",
    sender: "Farmácia Saúde 💊",
    avatar: "💊",
    message: "Olá! Seu pedido #4521 está pronto para retirada. Horário: Seg-Sex das 8h às 18h. Dúvidas: (86) 3232-1234",
    isScam: false,
    explanation: "Mensagem legítima! Não pede dados, não tem links suspeitos, não cria urgência. Só informa sobre seu pedido.",
    tip: "💡 Dica: Mensagens verdadeiras não pedem senhas, Pix ou dados pessoais.",
  },
  {
    id: 4,
    type: "ligacao",
    category: "Engenharia Social",
    sender: "Central INSS 📞",
    avatar: "📞",
    message: '"Aqui é do INSS. Sua aposentadoria será CANCELADA amanhã se você não confirmar seus dados agora: CPF, senha do banco e número do cartão."',
    isScam: true,
    explanation: "Golpe clássico do falso INSS! Órgãos públicos nunca pedem senha ou dados bancários por telefone.",
    tip: "💡 Dica: Desligue e ligue para o número oficial do INSS: 135.",
  },
  {
    id: 5,
    type: "email",
    category: "Phishing",
    sender: "Receita Federal 📧",
    avatar: "📧",
    message: "Parabéns! Você tem uma restituição de R$1.847,00 disponível. Para receber, acesse: www.receitafederal-restituicao.com e insira seus dados bancários.",
    isScam: true,
    explanation: "Phishing! O site verdadeiro da Receita é gov.br. Nunca acesse restituições por links de e-mail.",
    tip: "💡 Dica: Sites do governo terminam sempre em .gov.br",
  },
  {
    id: 6,
    type: "whatsapp",
    category: "Promoção Falsa",
    sender: "Mercado Livre 🛒",
    avatar: "🛒",
    message: "🎉 PARABÉNS! Você foi sorteado! Ganhou um iPhone 15! Mas atenção: pague R$49,90 de taxa de entrega agora pelo Pix para garantir seu prêmio! ⏰ Expira em 10 min!",
    isScam: true,
    explanation: "Promoção falsa! Nenhuma empresa legítima pede pagamento para entregar prêmio. A urgência dos '10 minutos' é uma armadilha.",
    tip: "💡 Dica: Se precisou pagar para receber, é golpe. Sempre.",
  },
  {
    id: 7,
    type: "sms",
    category: "Mensagem Legítima",
    sender: "iFood 🍕",
    avatar: "🍕",
    message: "Seu pedido #78234 saiu para entrega! Previsão: 30-45 min. Acompanhe pelo app. Bom apetite! 😊",
    isScam: false,
    explanation: "Mensagem verdadeira! Informa sobre seu pedido sem pedir nada. Sem links estranhos, sem urgência, sem dados pessoais.",
    tip: "💡 Dica: Mensagens de rastreio legítimas só informam — nunca pedem.",
  },
  {
    id: 8,
    type: "ligacao",
    category: "Vírus / Suporte Falso",
    sender: "Microsoft Suporte 💻",
    avatar: "💻",
    message: '"Detectamos um vírus grave no seu computador! Preciso de acesso remoto AGORA para remover antes que seus dados sejam roubados. Me passa o código do TeamViewer."',
    isScam: true,
    explanation: "Suporte técnico falso! A Microsoft nunca liga espontaneamente. Dar acesso remoto significa entregar seu computador ao golpista.",
    tip: "💡 Dica: Nenhuma empresa de tecnologia liga pedindo acesso remoto sem que você tenha pedido suporte.",
  },
];

const TOTAL_TIME = 15;

export default function EscudoDigital() {
  const [screen, setScreen] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showExplanation, setShowExplanation] = useState(false);
  const [combo, setCombo] = useState(0);
  const [history, setHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [shake, setShake] = useState(false);
  const [pulse, setPulse] = useState(false);

  const current = scenarios[currentIndex];

  useEffect(() => {
    if (!timerActive || answered) return;
    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, answered]);

  const startGame = () => {
    setScreen("game");
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(TOTAL_TIME);
    setCombo(0);
    setHistory([]);
    setTimerActive(true);
  };

  const handleAnswer = useCallback((isScam) => {
    if (answered) return;
    setAnswered(true);
    setTimerActive(false);
    setSelectedAnswer(isScam);

    const correct = isScam === current.isScam || (isScam === null && false);
    const timedOut = isScam === null;

    if (correct) {
      const bonus = combo >= 2 ? 20 : 0;
      const timeBonus = Math.floor(timeLeft * 2);
      setScore(s => s + 10 + bonus + timeBonus);
      setCombo(c => c + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    } else {
      setLives(l => l - 1);
      setCombo(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setHistory(h => [...h, { scenario: current, correct, timedOut }]);
    setShowExplanation(true);
  }, [answered, current, combo, timeLeft]);

  const nextQuestion = () => {
    if (lives <= 0) { setScreen("gameover"); return; }
    if (currentIndex >= scenarios.length - 1) { setScreen("result"); return; }
    setCurrentIndex(i => i + 1);
    setAnswered(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(TOTAL_TIME);
    setTimerActive(true);
  };

  const typeIcon = { whatsapp: "💬", sms: "📱", ligacao: "📞", email: "📧" };
  const typeName = { whatsapp: "WhatsApp", sms: "SMS", ligacao: "Ligação", email: "E-mail" };

  const timerColor = timeLeft > 8 ? "#22c55e" : timeLeft > 4 ? "#f59e0b" : "#ef4444";
  const timerPct = (timeLeft / TOTAL_TIME) * 100;

  // ── INTRO ──
  if (screen === "intro") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: "20px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 16, filter: "drop-shadow(0 0 30px rgba(59,130,246,0.6))", animation: "float 3s ease-in-out infinite" }}>🛡️</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px", textShadow: "0 0 40px rgba(59,130,246,0.5)" }}>Escudo Digital</h1>
        <p style={{ color: "#93c5fd", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>Você consegue identificar os golpes antes de cair neles?<br /><strong style={{ color: "#fbbf24" }}>Proteja-se e proteja quem você ama.</strong></p>

        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "20px 24px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
          {[["🎯", "8 situações reais do dia a dia"], ["⏱️", "15 segundos por decisão"], ["❤️", "3 vidas — use com sabedoria"], ["🏆", "Aprenda com cada erro"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, color: "#e2e8f0", fontSize: 15 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>{text}
            </div>
          ))}
        </div>

        <button onClick={startGame} style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 14, fontSize: 20, fontWeight: 800, cursor: "pointer", letterSpacing: 0.5, boxShadow: "0 8px 32px rgba(37,99,235,0.5)", transition: "transform 0.15s", fontFamily: "Georgia, serif" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}>
          Começar o Jogo 🚀
        </button>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 16 }}>Projeto Escudo Digital • Proteção para todos</p>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>
    </div>
  );

  // ── GAME OVER ──
  if (screen === "gameover") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a0000, #3d0000)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: 20 }}>
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 80, marginBottom: 16 }}>💔</div>
        <h2 style={{ color: "#fca5a5", fontSize: 36, fontWeight: 900, margin: "0 0 12px" }}>Você caiu no golpe!</h2>
        <p style={{ color: "#fcd34d", fontSize: 18, marginBottom: 8 }}>Pontuação: <strong>{score} pts</strong></p>
        <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>Não desanime! Os golpistas são especialistas em enganar. O importante é aprender e se proteger da próxima vez. 💪</p>
        <button onClick={startGame} style={{ width: "100%", padding: 16, background: "#dc2626", color: "#fff", border: "none", borderRadius: 14, fontSize: 18, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif" }}>
          Tentar Novamente 🔄
        </button>
      </div>
    </div>
  );

  // ── RESULT ──
  if (screen === "result") {
    const pct = Math.round((history.filter(h => h.correct).length / scenarios.length) * 100);
    const medal = pct === 100 ? "🥇" : pct >= 75 ? "🥈" : pct >= 50 ? "🥉" : "📚";
    const msg = pct === 100 ? "Especialista em Segurança Digital!" : pct >= 75 ? "Muito bem! Você está protegido!" : pct >= 50 ? "Bom começo! Continue aprendendo." : "Pratique mais — os golpistas não descansam.";
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: 20 }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 8 }}>{medal}</div>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 8px" }}>{msg}</h2>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, margin: "20px 0", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#fbbf24" }}>{score}</div>
            <div style={{ color: "#93c5fd", fontSize: 14 }}>pontos totais</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 16 }}>
              <div><div style={{ color: "#4ade80", fontSize: 24, fontWeight: 800 }}>{history.filter(h => h.correct).length}</div><div style={{ color: "#94a3b8", fontSize: 12 }}>acertos</div></div>
              <div><div style={{ color: "#f87171", fontSize: 24, fontWeight: 800 }}>{history.filter(h => !h.correct).length}</div><div style={{ color: "#94a3b8", fontSize: 12 }}>erros</div></div>
              <div><div style={{ color: "#fbbf24", fontSize: 24, fontWeight: 800 }}>{pct}%</div><div style={{ color: "#94a3b8", fontSize: 12 }}>aproveitamento</div></div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "left", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "#93c5fd", fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>RESUMO DAS QUESTÕES</p>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span>{h.correct ? "✅" : "❌"}</span>
                <span style={{ color: "#e2e8f0", fontSize: 13 }}>{h.scenario.category}</span>
                {h.timedOut && <span style={{ color: "#f59e0b", fontSize: 11 }}>(tempo esgotado)</span>}
              </div>
            ))}
          </div>
          <button onClick={startGame} style={{ width: "100%", padding: 16, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 14, fontSize: 18, fontWeight: 800, cursor: "pointer", marginBottom: 10, fontFamily: "Georgia, serif" }}>
            Jogar Novamente 🔄
          </button>
          <button onClick={() => setScreen("intro")} style={{ width: "100%", padding: 14, background: "transparent", color: "#64748b", border: "1px solid #334155", borderRadius: 14, fontSize: 15, cursor: "pointer", fontFamily: "Georgia, serif" }}>
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  // ── GAME ──
  const bgAnswer = !answered ? "transparent" : showExplanation && selectedAnswer === current.isScam ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "16px" }}>
      <div style={{ maxWidth: 480, width: "100%", animation: shake ? "shake 0.4s ease" : pulse ? "pulseGreen 0.4s ease" : "none" }}>

        {/* HUD */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: 3 }).map((_, i) => <span key={i} style={{ fontSize: 22, filter: i < lives ? "none" : "grayscale(1) opacity(0.3)" }}>❤️</span>)}
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: 16 }}>⭐ {score}</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>{currentIndex + 1} / {scenarios.length}</div>
        </div>

        {/* Timer */}
        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 8, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, borderRadius: 8, transition: "width 1s linear, background 0.3s" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: -16, marginBottom: 12 }}>
          <span style={{ color: timerColor, fontSize: 13, fontWeight: 700 }}>⏱️ {timeLeft}s</span>
          {combo >= 2 && <span style={{ color: "#f59e0b", fontSize: 13, marginLeft: 12 }}>🔥 Combo x{combo}!</span>}
        </div>

        {/* Card da mensagem */}
        <div style={{ background: bgAnswer || "rgba(255,255,255,0.04)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: 16, transition: "background 0.3s" }}>
          {/* Header */}
          <div style={{ background: "rgba(255,255,255,0.06)", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{current.avatar}</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{current.sender}</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>{typeIcon[current.type]} {typeName[current.type]}</div>
            </div>
            <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#93c5fd" }}>{current.category}</div>
          </div>

          {/* Mensagem */}
          <div style={{ padding: "20px 20px 16px" }}>
            <p style={{ color: "#e2e8f0", fontSize: 16, lineHeight: 1.7, margin: 0, fontStyle: current.type === "ligacao" ? "italic" : "normal" }}>{current.message}</p>
          </div>

          {/* Explicação */}
          {showExplanation && (
            <div style={{ margin: "0 16px 16px", background: current.isScam ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)", borderRadius: 12, padding: 16, border: `1px solid ${current.isScam ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}` }}>
              <p style={{ margin: "0 0 8px", color: current.isScam ? "#fca5a5" : "#86efac", fontWeight: 700, fontSize: 15 }}>
                {selectedAnswer === current.isScam ? "✅ Correto!" : "❌ Errou!"} {current.isScam ? "🚨 É um GOLPE!" : "✔️ É LEGÍTIMO!"}
              </p>
              <p style={{ margin: "0 0 8px", color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{current.explanation}</p>
              <p style={{ margin: 0, color: "#fbbf24", fontSize: 13, lineHeight: 1.5 }}>{current.tip}</p>
            </div>
          )}
        </div>

        {/* Botões */}
        {!answered ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button onClick={() => handleAnswer(true)} style={{ padding: "18px", background: "linear-gradient(135deg, #dc2626, #b91c1c)", color: "#fff", border: "none", borderRadius: 14, fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: "0 4px 20px rgba(220,38,38,0.3)" }}>
              🚨 É Golpe!
            </button>
            <button onClick={() => handleAnswer(false)} style={{ padding: "18px", background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff", border: "none", borderRadius: 14, fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: "0 4px 20px rgba(22,163,74,0.3)" }}>
              ✅ É Seguro!
            </button>
          </div>
        ) : (
          <button onClick={nextQuestion} style={{ width: "100%", padding: 18, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 14, fontSize: 18, fontWeight: 800, cursor: "pointer", fontFamily: "Georgia, serif", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
            {currentIndex >= scenarios.length - 1 ? "Ver Resultado 🏆" : "Próxima →"}
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes pulseGreen { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
      `}</style>
    </div>
  );
}