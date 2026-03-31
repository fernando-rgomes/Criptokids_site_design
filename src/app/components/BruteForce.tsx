import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, Zap, CheckCircle, XCircle } from "lucide-react";

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

// Highlights rows that contain common Portuguese words (helps students identify readable text)
function looksReadable(text: string): boolean {
  const ptWords = [
    "DE", "DO", "DA", "EU", "ELA", "ELE", "NAO", "SIM", "MAS", "COM",
    "UMA", "UM", "OS", "AS", "SE", "NO", "NA", "EM", "AO", "AOS",
    "QUE", "POR", "PARA", "FOI", "TEM", "SAO", "SUA", "MEU",
    "GATO", "ESCOLA", "SORVETE", "AMIGO", "MUITO", "LEGAL",
    "GOSTO", "SUBIU", "TELHADO", "GOSTO", "BONITO",
  ];
  const upper = text.toUpperCase();
  return ptWords.filter((w) => {
    const re = new RegExp(`(^|\\s)${w}(\\s|$)`);
    return re.test(upper);
  }).length >= 2;
}

const ORIGINALS = [
  { label: "🕵️ Mensagem 1", original: "O GATO SUBIU NO TELHADO", key: 6 },
  { label: "🌟 Mensagem 2", original: "EU GOSTO DE SORVETE", key: 9 },
  { label: "📚 Mensagem 3", original: "A ESCOLA E MUITO LEGAL", key: 14 },
];

const presetMessages = ORIGINALS.map((m) => ({
  ...m,
  value: caesarCipher(m.original, m.key),
}));

export function BruteForce() {
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customMessage, setCustomMessage] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [results, setResults] = useState<{ key: number; text: string; readable: boolean }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [showConclusion, setShowConclusion] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const messageToBreak = useCustom
    ? customMessage.toUpperCase()
    : presetMessages[selectedPreset].value;

  const correctKey = useCustom ? null : presetMessages[selectedPreset].key;

  const isCorrectSelection = selectedKey !== null && !useCustom && selectedKey === correctKey;
  const isWrongSelection = selectedKey !== null && !useCustom && selectedKey !== correctKey;

  const runBruteForce = async () => {
    setResults([]);
    setSelectedKey(null);
    setShowConclusion(false);
    setIsRunning(true);
    setAnimStep(0);

    for (let k = 0; k <= 25; k++) {
      await new Promise((res) => setTimeout(res, 80));
      const decoded = caesarCipher(messageToBreak, k, true);
      setResults((prev) => [
        ...prev,
        { key: k, text: decoded, readable: looksReadable(decoded) },
      ]);
      setAnimStep(k);
    }

    setIsRunning(false);
    setTimeout(() => setShowConclusion(true), 600);
  };

  const handleSelectKey = (key: number) => {
    if (isRunning) return;
    setSelectedKey(key === selectedKey ? null : key);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-7xl mb-4">🔓</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          Quebrando a Cifra
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginTop: "0.75rem" }}>
          Aprenda por que a Cifra de César não é tão segura!
        </p>
      </motion.div>

      {/* Intro Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="text-5xl shrink-0">🕵️</div>
          <div>
            <h2 style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
              O que é Força Bruta?
            </h2>
            <p style={{ color: "#374151", fontSize: "0.95rem", lineHeight: 1.8 }}>
              <strong>Força bruta</strong> é uma técnica onde tentamos <em>todas as possibilidades possíveis</em>{" "}
              até encontrar a correta. Na Cifra de César, como só existem <strong>26 chaves possíveis</strong>{" "}
              (0 a 25), podemos testar todas em segundos!
            </p>
            <div
              className="mt-3 p-3 rounded-xl flex items-center gap-2"
              style={{ background: "#FEF3C7", border: "2px solid #F59E0B" }}
            >
              <span className="text-xl">⚠️</span>
              <p style={{ color: "#92400E", fontSize: "0.9rem", fontWeight: 600 }}>
                Um computador moderno pode testar todas as 26 chaves em milissegundos!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
          📨 Escolha uma mensagem interceptada
        </h2>

        {/* Toggle */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setUseCustom(false); setResults([]); setSelectedKey(null); setShowConclusion(false); }}
            className="flex-1 py-2 rounded-xl cursor-pointer"
            style={{
              background: !useCustom ? "#7C3AED" : "#F3F4F6",
              color: !useCustom ? "white" : "#374151",
              fontWeight: 700,
              border: "none",
              fontSize: "0.9rem",
            }}
          >
            📋 Mensagens Prontas
          </button>
          <button
            onClick={() => { setUseCustom(true); setResults([]); setSelectedKey(null); setShowConclusion(false); }}
            className="flex-1 py-2 rounded-xl cursor-pointer"
            style={{
              background: useCustom ? "#7C3AED" : "#F3F4F6",
              color: useCustom ? "white" : "#374151",
              fontWeight: 700,
              border: "none",
              fontSize: "0.9rem",
            }}
          >
            ✏️ Minha Mensagem
          </button>
        </div>

        {!useCustom ? (
          <div className="space-y-2 mb-4">
            {presetMessages.map((pm, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedPreset(i);
                  setResults([]);
                  setSelectedKey(null);
                  setShowConclusion(false);
                }}
                className="w-full text-left p-4 rounded-2xl cursor-pointer transition-all"
                style={{
                  background: selectedPreset === i ? "#EDE9FE" : "#F9FAFB",
                  border: `3px solid ${selectedPreset === i ? "#7C3AED" : "#E5E7EB"}`,
                  color: "#374151",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#7C3AED" }}>{pm.label}</div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    marginTop: "0.25rem",
                    letterSpacing: "0.08em",
                    color: "#374151",
                  }}
                >
                  {pm.value}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-4">
            <p style={{ color: "#6B7280", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Cole aqui uma mensagem cifrada para descobrir a chave:
            </p>
            <textarea
              value={customMessage}
              onChange={(e) => {
                setCustomMessage(e.target.value);
                setResults([]);
                setSelectedKey(null);
                setShowConclusion(false);
              }}
              placeholder="Ex: IROD PXQGR"
              rows={2}
              className="w-full px-4 py-3 rounded-2xl resize-none outline-none"
              style={{
                border: "3px solid #7C3AED",
                color: "#374151",
                fontSize: "1rem",
                fontFamily: "monospace",
                background: "#FAFAFA",
              }}
            />
          </div>
        )}

        {/* Current message display */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: "#F3F4F6", border: "2px solid #E5E7EB" }}
        >
          <span style={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 700 }}>
            MENSAGEM CIFRADA INTERCEPTADA:
          </span>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#374151",
              marginTop: "0.25rem",
              letterSpacing: "0.1em",
            }}
          >
            {messageToBreak || "Digite uma mensagem acima..."}
          </div>
        </div>

        {/* Instruction */}
        <div
          className="p-3 rounded-xl mb-4 flex items-start gap-2"
          style={{ background: "#EDE9FE", border: "2px solid #7C3AED" }}
        >
          <span className="text-lg">🧠</span>
          <p style={{ color: "#5B21B6", fontSize: "0.85rem", fontWeight: 600 }}>
            Clique em "Tentar Todas as Chaves" e observe os resultados. Depois, clique na linha cuja
            mensagem <strong>faz sentido em português</strong>!
          </p>
        </div>

        {/* Run Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={runBruteForce}
          disabled={isRunning || !messageToBreak}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl cursor-pointer"
          style={{
            background: isRunning
              ? "linear-gradient(135deg, #9CA3AF, #6B7280)"
              : "linear-gradient(135deg, #EF4444, #DC2626)",
            color: "white",
            fontWeight: 800,
            fontSize: "1.1rem",
            border: "none",
            boxShadow: isRunning ? "none" : "0 8px 30px rgba(239,68,68,0.5)",
            opacity: !messageToBreak ? 0.6 : 1,
            cursor: !messageToBreak || isRunning ? "not-allowed" : "pointer",
          }}
        >
          {isRunning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block" }}
              >
                ⚙️
              </motion.div>
              Testando chave {animStep} de 25...
            </>
          ) : (
            <>
              <Zap size={22} />
              🔓 Tentar Todas as Chaves!
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.1rem" }}>
                🔍 {results.length} de 26 chaves testadas
              </h2>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{ background: "#EDE9FE", color: "#7C3AED", fontWeight: 700 }}
              >
                👆 Clique na que faz sentido!
              </span>
            </div>

            {/* Progress bar while running */}
            {isRunning && (
              <div className="mb-4">
                <div className="h-3 rounded-full" style={{ background: "#E5E7EB" }}>
                  <motion.div
                    className="h-3 rounded-full"
                    style={{ background: "linear-gradient(90deg, #EF4444, #F59E0B)" }}
                    animate={{ width: `${((animStep + 1) / 26) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
              {results.map((r) => {
                const isSelected = selectedKey === r.key;
                const isThisCorrect = !useCustom && r.key === correctKey;

                // Determine row styling — all gray by default, color only on selection
                let rowBg = "#F9FAFB";
                let rowBorder = "2px solid transparent";
                let keyBg = "#E5E7EB";
                let keyColor = "#6B7280";

                if (isSelected && isCorrectSelection) {
                  rowBg = "#D1FAE5";
                  rowBorder = "3px solid #059669";
                  keyBg = "#059669";
                  keyColor = "white";
                } else if (isSelected && isWrongSelection) {
                  rowBg = "#FEE2E2";
                  rowBorder = "3px solid #EF4444";
                  keyBg = "#EF4444";
                  keyColor = "white";
                } else if (isSelected && useCustom) {
                  rowBg = "#EDE9FE";
                  rowBorder = "3px solid #7C3AED";
                  keyBg = "#7C3AED";
                  keyColor = "white";
                }

                return (
                  <motion.div
                    key={r.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => handleSelectKey(r.key)}
                    className="cursor-pointer"
                  >
                    <div
                      className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-200"
                      style={{ background: rowBg, border: rowBorder }}
                    >
                      {/* Key badge */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: keyBg, color: keyColor, fontWeight: 900, fontSize: "0.85rem" }}
                      >
                        {r.key}
                      </div>

                      {/* Decoded text */}
                      <div className="flex-1 min-w-0">
                        <div style={{ color: "#9CA3AF", fontSize: "0.68rem", fontWeight: 700 }}>
                          CHAVE {r.key}
                        </div>
                        <div
                          style={{
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                            fontWeight: isSelected ? 700 : 400,
                            color:
                              isSelected && isCorrectSelection
                                ? "#065F46"
                                : isSelected && isWrongSelection
                                ? "#991B1B"
                                : isSelected && useCustom
                                ? "#5B21B6"
                                : "#6B7280",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.text}
                        </div>
                      </div>

                      {/* Status icon — only shown for the selected row */}
                      {isSelected && isCorrectSelection && (
                        <CheckCircle size={22} style={{ color: "#059669", flexShrink: 0 }} />
                      )}
                      {isSelected && isWrongSelection && (
                        <XCircle size={22} style={{ color: "#EF4444", flexShrink: 0 }} />
                      )}
                      {isSelected && useCustom && (
                        <CheckCircle size={22} style={{ color: "#7C3AED", flexShrink: 0 }} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Feedback banner after selection */}
            <AnimatePresence>
              {selectedKey !== null && !isRunning && (
                <motion.div
                  key={selectedKey}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 p-5 rounded-2xl"
                  style={{
                    background: useCustom
                      ? "#EDE9FE"
                      : isCorrectSelection
                      ? "#D1FAE5"
                      : "#FEE2E2",
                    border: `3px solid ${
                      useCustom ? "#7C3AED" : isCorrectSelection ? "#059669" : "#EF4444"
                    }`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    {!useCustom && isCorrectSelection && (
                      <CheckCircle size={28} style={{ color: "#059669", flexShrink: 0, marginTop: 2 }} />
                    )}
                    {!useCustom && isWrongSelection && (
                      <XCircle size={28} style={{ color: "#EF4444", flexShrink: 0, marginTop: 2 }} />
                    )}
                    {useCustom && (
                      <span className="text-2xl">🔍</span>
                    )}
                    <div className="flex-1">
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: "1rem",
                          color: useCustom
                            ? "#5B21B6"
                            : isCorrectSelection
                            ? "#065F46"
                            : "#991B1B",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {useCustom
                          ? `Você selecionou a chave ${selectedKey}:`
                          : isCorrectSelection
                          ? "🎉 Isso faz sentido em português! Você acertou!"
                          : "❌ Essa mensagem não parece fazer sentido em português. Tente outra linha!"}
                      </div>

                      {/* Show decoded text */}
                      <div
                        className="px-4 py-3 rounded-xl"
                        style={{
                          background: "white",
                          fontFamily: "monospace",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          color: useCustom
                            ? "#5B21B6"
                            : isCorrectSelection
                            ? "#065F46"
                            : "#991B1B",
                        }}
                      >
                        {caesarCipher(messageToBreak, selectedKey, true)}
                      </div>

                      {isWrongSelection && (
                        <p
                          className="mt-2"
                          style={{ color: "#7F1D1D", fontSize: "0.85rem" }}
                        >
                          💡 Leia as linhas com atenção e procure a que forma uma frase com sentido!
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Educational Conclusion */}
      <AnimatePresence>
        {showConclusion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-6"
          >
            {/* Main Conclusion */}
            <motion.div
              className="rounded-3xl p-6"
              style={{
                background: "linear-gradient(135deg, #FEE2E2, #FCE7F3)",
                border: "3px solid #EF4444",
                boxShadow: "0 10px 30px rgba(239,68,68,0.3)",
              }}
            >
              <div className="text-4xl mb-3 text-center">💡</div>
              <h2
                style={{
                  color: "#991B1B",
                  fontWeight: 900,
                  fontSize: "1.3rem",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                Conclusão Educativa
              </h2>
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: "rgba(255,255,255,0.8)", border: "2px solid #EF4444" }}
              >
                <p
                  style={{
                    color: "#991B1B",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  "A Cifra de César é fraca porque existem apenas 26 chaves possíveis!"
                </p>
              </div>
              <p style={{ color: "#7F1D1D", fontSize: "0.95rem", lineHeight: 1.8 }}>
                Um computador moderno pode testar todas as 26 possibilidades em frações de segundo.
                Por isso, a Cifra de César{" "}
                <strong>não deve ser usada para proteger informações reais</strong> — ela serve
                apenas para aprender os conceitos básicos de criptografia!
              </p>
            </motion.div>

            {/* Comparison */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl p-6"
              style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
            >
              <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
                🆚 Comparação: Cifras antigas x Criptografia Moderna
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="p-4 rounded-2xl"
                  style={{ background: "#FEE2E2", border: "3px solid #EF4444" }}
                >
                  <div className="text-3xl mb-2">😬</div>
                  <h3 style={{ color: "#991B1B", fontWeight: 800 }}>Cifra de César</h3>
                  <ul className="mt-2 space-y-1">
                    {[
                      "Apenas 26 chaves possíveis",
                      "Fácil de quebrar por força bruta",
                      "Boa apenas para aprendizado",
                      "Inventada há 2.000 anos",
                    ].map((item, i) => (
                      <li key={i} style={{ color: "#7F1D1D", fontSize: "0.85rem" }}>
                        ❌ {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-4 rounded-2xl"
                  style={{ background: "#D1FAE5", border: "3px solid #059669" }}
                >
                  <div className="text-3xl mb-2">😎</div>
                  <h3 style={{ color: "#065F46", fontWeight: 800 }}>Criptografia Moderna (AES)</h3>
                  <ul className="mt-2 space-y-1">
                    {[
                      "Trilhões de trilhões de chaves",
                      "Impossível quebrar por força bruta",
                      "Protege bancos e comunicações",
                      "Desenvolvida nos anos 1970–2000",
                    ].map((item, i) => (
                      <li key={i} style={{ color: "#065F46", fontSize: "0.85rem" }}>
                        ✅ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Fun Numbers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl p-6"
              style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
            >
              <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
                🔢 Números para impressionar seus amigos!
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { number: "26", label: "Chaves na Cifra de César", color: "#EF4444", bg: "#FEE2E2" },
                  { number: "10³⁸", label: "Chaves no AES-128", color: "#059669", bg: "#D1FAE5" },
                  { number: "∞ anos", label: "Para quebrar AES por força bruta", color: "#7C3AED", bg: "#EDE9FE" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl" style={{ background: item.bg }}>
                    <div style={{ color: item.color, fontWeight: 900, fontSize: "1.8rem" }}>
                      {item.number}
                    </div>
                    <div style={{ color: "#374151", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="rounded-3xl p-6 text-center"
              style={{
                background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)",
                border: "3px solid #7C3AED",
                boxShadow: "0 10px 30px rgba(124,58,237,0.3)",
              }}
            >
              <div className="text-5xl mb-3">🎓</div>
              <h2
                style={{
                  color: "#7C3AED",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  marginBottom: "0.75rem",
                }}
              >
                O que você aprendeu hoje?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                {[
                  "✅ O que é criptografia e como ela nos protege",
                  "✅ Como a Cifra de César funciona com deslocamento",
                  "✅ Como cifrar e decifrar mensagens",
                  "✅ Por que a Cifra de César não é segura hoje",
                  "✅ O conceito de força bruta em segurança",
                  "✅ A diferença entre cifras antigas e modernas",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      color: "#374151",
                      fontSize: "0.85rem",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          <Home size={20} />
          Voltar ao Início
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/simulador")}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            boxShadow: "0 8px 30px rgba(124,58,237,0.5)",
          }}
        >
          ⚙️ Voltar ao Simulador
        </motion.button>
      </motion.div>
    </div>
  );
}