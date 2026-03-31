import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RotateCcw, Eye, Zap, List } from "lucide-react";

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

interface StepResult {
  original: string;
  shifted: string;
  isLetter: boolean;
  shiftIdx: number;
}

function getSteps(text: string, shift: number, decrypt: boolean): StepResult[] {
  const s = decrypt ? (26 - shift) % 26 : shift;
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const idx = ALPHABET.indexOf(char);
      if (idx === -1) return { original: char, shifted: char, isLetter: false, shiftIdx: -1 };
      return {
        original: char,
        shifted: ALPHABET[(idx + s) % 26],
        isLetter: true,
        shiftIdx: (idx + s) % 26,
      };
    });
}

export function Simulator() {
  const navigate = useNavigate();
  const [input, setInput] = useState("OLÁ MUNDO");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"cifrar" | "decifrar">("cifrar");
  const [showSteps, setShowSteps] = useState(false);
  const [result, setResult] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  const processText = (decrypt: boolean) => {
    setMode(decrypt ? "decifrar" : "cifrar");
    const r = caesarCipher(input, shift, decrypt);
    setResult(r);
    setHasResult(true);
    setShowSteps(false);
  };

  const steps = getSteps(input, shift, mode === "decifrar");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-7xl mb-4">⚙️</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          Simulador Interativo
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginTop: "0.75rem" }}>
          Cifre e decifre suas próprias mensagens secretas!
        </p>
      </motion.div>

      {/* Main Simulator Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        {/* Text Input */}
        <div className="mb-6">
          <label style={{ color: "#374151", fontWeight: 700, fontSize: "1rem" }}>
            📝 Digite sua mensagem:
          </label>
          <div className="mt-2 relative">
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setHasResult(false); }}
              placeholder="Digite aqui sua mensagem..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl resize-none outline-none"
              style={{
                border: "3px solid #7C3AED",
                color: "#374151",
                fontSize: "1.1rem",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                background: "#FAFAFA",
              }}
            />
            <button
              onClick={() => { setInput(""); setHasResult(false); }}
              className="absolute top-3 right-3 p-1 rounded-lg"
              style={{ color: "#9CA3AF", background: "transparent", border: "none", cursor: "pointer" }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Shift Slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label style={{ color: "#374151", fontWeight: 700, fontSize: "1rem" }}>
              🗝️ Chave (deslocamento):
            </label>
            <motion.div
              key={shift}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="px-4 py-1 rounded-xl"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white", fontWeight: 900, fontSize: "1.3rem", minWidth: "60px", textAlign: "center" }}
            >
              {shift}
            </motion.div>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            value={shift}
            onChange={(e) => { setShift(Number(e.target.value)); setHasResult(false); }}
            className="w-full"
            style={{ accentColor: "#7C3AED", height: "8px" }}
          />
          <div className="flex justify-between mt-1" style={{ color: "#9CA3AF", fontSize: "0.75rem" }}>
            <span>0</span>
            <span>Deslocamento no alfabeto</span>
            <span>25</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => processText(false)}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              color: "white",
              fontWeight: 800,
              fontSize: "1rem",
              border: "none",
              boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
            }}
          >
            <Zap size={20} />
            🔒 Cifrar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => processText(true)}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #059669, #0EA5E9)",
              color: "white",
              fontWeight: 800,
              fontSize: "1rem",
              border: "none",
              boxShadow: "0 6px 20px rgba(5,150,105,0.4)",
            }}
          >
            <Eye size={20} />
            🔓 Decifrar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { processText(mode === "decifrar"); setShowSteps(true); }}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #EF4444)",
              color: "white",
              fontWeight: 800,
              fontSize: "1rem",
              border: "none",
              boxShadow: "0 6px 20px rgba(245,158,11,0.4)",
            }}
          >
            <List size={20} />
            📋 Passo a Passo
          </motion.button>
        </div>

        {/* Result Area */}
        <AnimatePresence>
          {hasResult && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl"
              style={{
                background: mode === "cifrar"
                  ? "linear-gradient(135deg, #FCE7F3, #EDE9FE)"
                  : "linear-gradient(135deg, #D1FAE5, #DBEAFE)",
                border: `3px solid ${mode === "cifrar" ? "#EC4899" : "#059669"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{mode === "cifrar" ? "🔐" : "🔓"}</span>
                <span style={{ color: mode === "cifrar" ? "#BE185D" : "#065F46", fontWeight: 700 }}>
                  Mensagem {mode === "cifrar" ? "Cifrada" : "Decifrada"} — chave: {shift}
                </span>
              </div>
              <motion.div
                key={result}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-3 rounded-xl"
                style={{
                  background: "white",
                  fontFamily: "monospace",
                  fontSize: "1.3rem",
                  fontWeight: 900,
                  color: mode === "cifrar" ? "#BE185D" : "#065F46",
                  letterSpacing: "0.1em",
                  wordBreak: "break-all",
                }}
              >
                {result}
              </motion.div>

              {/* Use result as input button */}
              <button
                onClick={() => { setInput(result); setHasResult(false); }}
                className="mt-3 flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#374151",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                ↩️ Usar este resultado como entrada
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Step by Step View */}
      <AnimatePresence>
        {showSteps && hasResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              📋 Passo a Passo — letra por letra
            </h2>
            <p className="mb-4" style={{ color: "#6B7280", fontSize: "0.85rem" }}>
              Modo: <strong>{mode === "cifrar" ? "Cifrando" : "Decifrando"}</strong> com chave <strong>{shift}</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex flex-col items-center p-2 rounded-xl"
                  style={{
                    background: step.isLetter ? "#F3F4F6" : "#FAFAFA",
                    border: `2px solid ${step.isLetter ? "#E5E7EB" : "#F3F4F6"}`,
                    minWidth: "52px",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "#DBEAFE",
                      color: "#1E40AF",
                      fontWeight: 900,
                      fontSize: "1rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {step.original}
                  </div>
                  {step.isLetter && (
                    <>
                      <div style={{ color: "#9CA3AF", fontSize: "0.7rem" }}>↓{mode === "cifrar" ? "+" : "-"}{shift}</div>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: mode === "cifrar" ? "#FCE7F3" : "#D1FAE5",
                          color: mode === "cifrar" ? "#BE185D" : "#065F46",
                          fontWeight: 900,
                          fontSize: "1rem",
                          fontFamily: "monospace",
                        }}
                      >
                        {step.shifted}
                      </div>
                    </>
                  )}
                  {!step.isLetter && (
                    <div style={{ color: "#9CA3AF", fontSize: "0.7rem", marginTop: "2px" }}>espaço</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alphabet Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
          🔤 Visualização do Deslocamento — chave {shift}
        </h2>
        <div className="space-y-3">
          <div>
            <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 700 }}>
              Original
            </span>
            <div className="flex flex-wrap gap-1">
              {ALPHABET.map((l, i) => (
                <div
                  key={l}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                  style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 700 }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-0.5" style={{ background: "linear-gradient(90deg, #7C3AED, #EC4899)" }} />
            <span style={{ color: "#7C3AED", fontSize: "0.85rem", fontWeight: 700, whiteSpace: "nowrap" }}>
              ⬇️ +{shift} posições
            </span>
            <div className="flex-1 h-0.5" style={{ background: "linear-gradient(90deg, #EC4899, #7C3AED)" }} />
          </div>
          <div>
            <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 700 }}>
              Cifrado
            </span>
            <div className="flex flex-wrap gap-1">
              {ALPHABET.map((l, i) => {
                const originalIdx = (i - shift + 26) % 26;
                return (
                  <div
                    key={l}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                    style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 700 }}
                  >
                    {l}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl" style={{ background: "#F9FAFB", border: "2px solid #E5E7EB" }}>
          <p style={{ color: "#6B7280", fontSize: "0.85rem" }}>
            💡 <strong>Como ler:</strong> A letra na posição <em>i</em> do alfabeto original vira a letra 
            na posição <em>i + {shift}</em>. Se passar de Z, volta para o início do alfabeto!
          </p>
        </div>
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/desafios")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #059669, #0EA5E9)",
            color: "white",
            fontWeight: 800,
            fontSize: "1.1rem",
            boxShadow: "0 8px 30px rgba(5,150,105,0.5)",
            border: "none",
          }}
        >
          🎮 Ir para os Desafios
          <ArrowRight size={22} />
        </motion.button>
      </motion.div>
    </div>
  );
}
