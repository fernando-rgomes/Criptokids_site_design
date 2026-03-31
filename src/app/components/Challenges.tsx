import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, Trophy, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function caesarCipher(text: string, shift: number, decrypt = false): string {
  const s = decrypt ? (26 - shift) % 26 : shift;
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const idx = ALPHABET.indexOf(char);
      if (idx === -1) return char;
      return ALPHABET[(idx + s) % 26];
    })
    .join("");
}

interface Challenge {
  id: number;
  level: 1 | 2 | 3;
  levelLabel: string;
  emoji: string;
  color: string;
  bg: string;
  title: string;
  description: string;
  hint: string;
  task: string;
  type: "encrypt" | "decrypt" | "findkey";
  input: string;
  key?: number;
  answer: string;
  explanation: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    level: 1,
    levelLabel: "Nível 1",
    emoji: "⭐",
    color: "#059669",
    bg: "#D1FAE5",
    title: "Agente Iniciante",
    description: "Cifre a mensagem abaixo usando a chave indicada.",
    hint: "Avance cada letra X posições no alfabeto.",
    task: "Cifre 'ACAO SECRETA' com chave 4",
    type: "encrypt",
    input: "ACAO SECRETA",
    key: 4,
    answer: "EGIS WIGVIXE",
    explanation: "A→E (+4), C→G (+4), A→E (+4), O→S (+4)... e assim por diante!",
  },
  {
    id: 2,
    level: 1,
    levelLabel: "Nível 1",
    emoji: "⭐",
    color: "#059669",
    bg: "#D1FAE5",
    title: "Primeira Missão",
    description: "Cifre a mensagem abaixo usando a chave indicada.",
    hint: "Cada letra avança 7 posições.",
    task: "Cifre 'MISSAO' com chave 7",
    type: "encrypt",
    input: "MISSAO",
    key: 7,
    answer: caesarCipher("MISSAO", 7),
    explanation: "M→T, I→P, S→Z, S→Z, A→H, O→V com deslocamento de 7!",
  },
  {
    id: 3,
    level: 2,
    levelLabel: "Nível 2",
    emoji: "🌟",
    color: "#D97706",
    bg: "#FEF3C7",
    title: "Decifrando Mensagens",
    description: "Decifre a mensagem secreta abaixo. A chave é 3.",
    hint: "Volte cada letra 3 posições no alfabeto.",
    task: `Decifre '${caesarCipher("PARABENS AGENTE", 3)}' com chave 3`,
    type: "decrypt",
    input: caesarCipher("PARABENS AGENTE", 3),
    key: 3,
    answer: "PARABENS AGENTE",
    explanation: "Basta voltar 3 posições para cada letra cifrada!",
  },
  {
    id: 4,
    level: 2,
    levelLabel: "Nível 2",
    emoji: "🌟",
    color: "#D97706",
    bg: "#FEF3C7",
    title: "Mensagem do Quartel",
    description: "Decifre esta mensagem urgente! A chave é 10.",
    hint: "Volte cada letra 10 posições.",
    task: `Decifre '${caesarCipher("CODIGO CONFIRMADO", 10)}' com chave 10`,
    type: "decrypt",
    input: caesarCipher("CODIGO CONFIRMADO", 10),
    key: 10,
    answer: "CODIGO CONFIRMADO",
    explanation: "Com chave 10, cada letra cifrada volta 10 posições no alfabeto.",
  },
  {
    id: 5,
    level: 3,
    levelLabel: "Nível 3",
    emoji: "💎",
    color: "#7C3AED",
    bg: "#EDE9FE",
    title: "Encontre a Chave!",
    description: "Você interceptou uma mensagem. Sabe que 'A' virou 'F'. Qual é a chave?",
    hint: "A → F. Quantas posições avançou?",
    task: "A letra A foi cifrada como F. Qual é a chave?",
    type: "findkey",
    input: "A → F",
    answer: "5",
    explanation: "A (posição 0) → F (posição 5). O deslocamento é 5!",
  },
  {
    id: 6,
    level: 3,
    levelLabel: "Nível 3",
    emoji: "💎",
    color: "#7C3AED",
    bg: "#EDE9FE",
    title: "Detetive da Cifra",
    description: "A palavra 'OLA' foi cifrada. Descubra a chave!",
    hint: `A palavra cifrada é '${caesarCipher("OLA", 8)}'. Tente diferentes deslocamentos!`,
    task: `'OLA' foi cifrado como '${caesarCipher("OLA", 8)}'. Qual é a chave?`,
    type: "findkey",
    input: `OLA → ${caesarCipher("OLA", 8)}`,
    answer: "8",
    explanation: `O (14) → ${caesarCipher("O", 8)} (${ALPHABET.indexOf(caesarCipher("O", 8))}). Diferença = 8!`,
  },
];

export function Challenges() {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stars, setStars] = useState<Record<number, number>>({});

  const challenge = challenges[currentChallenge];

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toUpperCase().replace(/\s+/g, " ");
    const correct = challenge.answer.trim().toUpperCase().replace(/\s+/g, " ");
    const isCorrect = normalized === correct;

    setFeedback(isCorrect ? "correct" : "wrong");
    setShowExplanation(true);

    if (isCorrect && !completed.has(currentChallenge)) {
      setCompleted((prev) => new Set([...prev, currentChallenge]));
      const starCount = showHint ? 2 : 3;
      setStars((prev) => ({ ...prev, [currentChallenge]: starCount }));
      setScore((prev) => prev + (starCount === 3 ? 100 : 70));
    }
  };

  const goNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setUserAnswer("");
      setFeedback(null);
      setShowHint(false);
      setShowExplanation(false);
    }
  };

  const resetChallenge = () => {
    setUserAnswer("");
    setFeedback(null);
    setShowHint(false);
    setShowExplanation(false);
  };

  const progress = (completed.size / challenges.length) * 100;

  const levelColors: Record<number, { color: string; bg: string; emoji: string }> = {
    1: { color: "#059669", bg: "#D1FAE5", emoji: "⭐" },
    2: { color: "#D97706", bg: "#FEF3C7", emoji: "🌟" },
    3: { color: "#7C3AED", bg: "#EDE9FE", emoji: "💎" },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-7xl mb-4">🎮</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          Desafios
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginTop: "0.75rem" }}>
          Prove que você é um verdadeiro agente secreto!
        </p>
      </motion.div>

      {/* Score & Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-5 mb-6"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Trophy size={24} style={{ color: "#F59E0B" }} />
            <div>
              <div style={{ color: "#374151", fontWeight: 800, fontSize: "1rem" }}>Pontuação</div>
              <motion.div
                key={score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                style={{ color: "#F59E0B", fontWeight: 900, fontSize: "1.5rem" }}
              >
                {score} pts
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {challenges.map((_, i) => {
              const starCount = stars[i] || 0;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        style={{ color: s <= starCount ? "#F59E0B" : "#E5E7EB" }}
                        fill={s <= starCount ? "#F59E0B" : "#E5E7EB"}
                      />
                    ))}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs mt-1"
                    style={{
                      background: completed.has(i) ? "#059669" : i === currentChallenge ? "#7C3AED" : "#E5E7EB",
                      color: completed.has(i) || i === currentChallenge ? "white" : "#9CA3AF",
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span style={{ color: "#6B7280", fontSize: "0.8rem" }}>Progresso</span>
            <span style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.8rem" }}>
              {completed.size}/{challenges.length} completos
            </span>
          </div>
          <div className="h-4 rounded-full" style={{ background: "#E5E7EB" }}>
            <motion.div
              className="h-4 rounded-full"
              style={{ background: "linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Challenge Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {challenges.map((c, i) => {
          const lvl = levelColors[c.level];
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentChallenge(i); resetChallenge(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap cursor-pointer"
              style={{
                background: i === currentChallenge ? lvl.color : completed.has(i) ? lvl.bg : "rgba(255,255,255,0.5)",
                color: i === currentChallenge ? "white" : completed.has(i) ? lvl.color : "rgba(255,255,255,0.8)",
                fontWeight: 700,
                fontSize: "0.85rem",
                border: i === currentChallenge ? `2px solid ${lvl.color}` : "2px solid transparent",
              }}
            >
              {completed.has(i) ? "✅" : lvl.emoji} {i + 1}
            </motion.button>
          );
        })}
      </div>

      {/* Current Challenge */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChallenge}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="rounded-3xl p-6 md:p-8 mb-6"
          style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
        >
          {/* Level Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-4 py-1.5 rounded-full"
              style={{ background: challenge.bg, color: challenge.color, fontWeight: 800, fontSize: "0.9rem" }}
            >
              {challenge.emoji} {challenge.levelLabel}
            </span>
            <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem" }}>{challenge.title}</h2>
          </div>

          {/* Description */}
          <p style={{ color: "#374151", fontSize: "1rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
            {challenge.description}
          </p>

          {/* Task Box */}
          <div
            className="p-4 rounded-2xl mb-5"
            style={{ background: challenge.bg, border: `3px solid ${challenge.color}` }}
          >
            <p style={{ color: challenge.color, fontWeight: 700, fontSize: "1rem" }}>
              📋 {challenge.task}
            </p>
          </div>

          {/* Hint Button */}
          {!showHint && !feedback && (
            <button
              onClick={() => setShowHint(true)}
              className="mb-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm cursor-pointer"
              style={{ background: "#FEF3C7", color: "#D97706", fontWeight: 600, border: "2px solid #F59E0B" }}
            >
              💡 Ver dica (perde 1 estrela)
            </button>
          )}

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-2xl mb-4"
                style={{ background: "#FEF3C7", border: "2px solid #F59E0B" }}
              >
                <p style={{ color: "#92400E", fontWeight: 600, fontSize: "0.9rem" }}>
                  💡 Dica: {challenge.hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer Input */}
          {!showExplanation ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                placeholder="Digite sua resposta aqui..."
                className="flex-1 px-4 py-3 rounded-2xl outline-none"
                style={{
                  border: "3px solid #7C3AED",
                  fontSize: "1rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  color: "#374151",
                  background: "#FAFAFA",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={checkAnswer}
                className="px-6 py-3 rounded-2xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1rem",
                  border: "none",
                  boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                ✅ Verificar
              </motion.button>
            </div>
          ) : null}

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                {/* Result Banner */}
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl mb-4"
                  style={{
                    background: feedback === "correct" ? "#D1FAE5" : "#FEE2E2",
                    border: `3px solid ${feedback === "correct" ? "#059669" : "#EF4444"}`,
                  }}
                >
                  {feedback === "correct" ? (
                    <CheckCircle size={28} style={{ color: "#059669" }} />
                  ) : (
                    <XCircle size={28} style={{ color: "#EF4444" }} />
                  )}
                  <div>
                    <div style={{ color: feedback === "correct" ? "#065F46" : "#991B1B", fontWeight: 800, fontSize: "1.1rem" }}>
                      {feedback === "correct" ? "🎉 Parabéns! Correto!" : "❌ Não foi dessa vez..."}
                    </div>
                    {feedback === "correct" && (
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3].map((s) => (
                          <motion.div
                            key={s}
                            initial={{ scale: 0, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: s * 0.1, type: "spring" }}
                          >
                            <Star
                              size={20}
                              style={{ color: s <= (stars[currentChallenge] || 0) ? "#F59E0B" : "#E5E7EB" }}
                              fill={s <= (stars[currentChallenge] || 0) ? "#F59E0B" : "#E5E7EB"}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <div
                  className="p-4 rounded-2xl mb-4"
                  style={{ background: "#F9FAFB", border: "2px solid #E5E7EB" }}
                >
                  <p style={{ color: "#374151", fontWeight: 700, marginBottom: "0.25rem" }}>
                    📖 Resposta correta: <span style={{ color: "#7C3AED", fontFamily: "monospace", fontSize: "1.1rem" }}>{challenge.answer}</span>
                  </p>
                  <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>{challenge.explanation}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  {feedback === "wrong" && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={resetChallenge}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl cursor-pointer"
                      style={{
                        background: "#F3F4F6",
                        color: "#374151",
                        fontWeight: 700,
                        border: "2px solid #E5E7EB",
                      }}
                    >
                      <RefreshCw size={16} />
                      Tentar novamente
                    </motion.button>
                  )}
                  {currentChallenge < challenges.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goNext}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                        color: "white",
                        fontWeight: 700,
                        border: "none",
                      }}
                    >
                      Próximo desafio
                      <ArrowRight size={16} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* All Completed! */}
      {completed.size === challenges.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl p-8 mb-6 text-center"
          style={{
            background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
            border: "3px solid #F59E0B",
            boxShadow: "0 10px 30px rgba(245,158,11,0.4)",
          }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <h2 style={{ color: "#92400E", fontWeight: 900, fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Parabéns, Agente Secreto!
          </h2>
          <p style={{ color: "#78350F", fontSize: "1rem" }}>
            Você completou todos os desafios com <strong>{score} pontos</strong>! Você é um verdadeiro expert em Cifra de César! 🎉
          </p>
        </motion.div>
      )}

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/forca-bruta")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
            color: "white",
            fontWeight: 800,
            fontSize: "1.1rem",
            boxShadow: "0 8px 30px rgba(236,72,153,0.5)",
            border: "none",
          }}
        >
          🔓 Aprender a Quebrar Cifras
          <ArrowRight size={22} />
        </motion.button>
      </motion.div>
    </div>
  );
}
