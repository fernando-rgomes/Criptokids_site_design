import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import julioCesarImg from "../../assets/Julius-Caesar.jpg"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function CaesarLesson() {
  const navigate = useNavigate();
  const [shift, setShift] = useState(3);
  const [animating, setAnimating] = useState(false);
  const [exampleLetter, setExampleLetter] = useState("A");

  const getShifted = (letter: string, s: number) => {
    const idx = ALPHABET.indexOf(letter.toUpperCase());
    if (idx === -1) return letter;
    return ALPHABET[(idx + s) % 26];
  };

  const handleShiftChange = (newShift: number) => {
    setShift(newShift);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-7xl mb-4">🏛️</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          A Cifra de César
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginTop: "0.75rem" }}>
          O segredo que Júlio César usava para suas mensagens militares!
        </p>
      </motion.div>

      {/* Story Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* IMAGEM DINÂMICA DE JÚLIO CÉSAR */}
          <motion.div 
            className="shrink-0 relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4"
            style={{ borderColor: "#7C3AED" }}
            // A mágica acontece aqui: quando `animating` for true, a imagem dá um "pulo" e vibra
            animate={animating ? { 
              scale: [1, 1.1, 1], 
              rotate: [0, -5, 5, -5, 0] 
            } : {}}
            transition={{ duration: 0.4 }}
          >
            <img 
              src={julioCesarImg} 
              alt="Busto de Júlio César"
              className="w-full h-full object-cover"
            />
          </motion.div>


          <div>
            <h2 style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.75rem" }}>
              A história da Cifra de César
            </h2>
            <p style={{ color: "#374151", fontSize: "0.95rem", lineHeight: 1.8 }}>
              Há mais de 2.000 anos, o imperador romano <strong>Júlio César</strong> precisava enviar 
              mensagens secretas para seus generais durante as guerras. Ele inventou um método simples e 
              genial: <strong>deslocar cada letra do alfabeto por um número fixo de posições!</strong>
            </p>
            <div
              className="mt-4 p-3 rounded-xl"
              style={{ background: "#EDE9FE", border: "2px solid #7C3AED" }}
            >
              <p style={{ color: "#7C3AED", fontWeight: 600, fontSize: "0.9rem" }}>
                💡 Com chave 3: A vira D, B vira E, C vira F... e assim por diante!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Alphabet Shift */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem", textAlign: "center" }}>
          🔤 Veja o alfabeto se deslocando!
        </h2>
        <p className="text-center mb-6" style={{ color: "#6B7280", fontSize: "0.9rem" }}>
          Arraste o slider para mudar a chave e veja o deslocamento
        </p>

        {/* Shift Control */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleShiftChange(Math.max(0, shift - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#7C3AED", color: "white", border: "none", cursor: "pointer" }}
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className="flex flex-col items-center px-6 py-3 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", minWidth: "120px" }}
            >
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 600 }}>CHAVE</span>
              <span style={{ color: "white", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>{shift}</span>
            </div>
            <button
              onClick={() => handleShiftChange(Math.min(25, shift + 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#7C3AED", color: "white", border: "none", cursor: "pointer" }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            value={shift}
            onChange={(e) => handleShiftChange(Number(e.target.value))}
            className="w-full max-w-sm"
            style={{ accentColor: "#7C3AED", height: "6px" }}
          />
        </div>

        {/* Original Alphabet */}
        <div className="mb-4">
          <div className="text-center mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 700 }}
            >
              📝 Alfabeto Original
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {ALPHABET.map((letter, i) => (
              <motion.div
                key={letter}
                whileHover={{ scale: 1.2 }}
                onClick={() => setExampleLetter(letter)}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{
                  background: letter === exampleLetter ? "#1E40AF" : "#DBEAFE",
                  color: letter === exampleLetter ? "white" : "#1E40AF",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  border: letter === exampleLetter ? "2px solid #1E40AF" : "2px solid transparent",
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-center my-3">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ color: "#7C3AED", fontSize: "1.5rem" }}
          >
            ⬇️ deslocamento de {shift} posições
          </motion.div>
        </div>

        {/* Shifted Alphabet */}
        <div>
          <div className="text-center mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 700 }}
            >
              🔐 Alfabeto Cifrado
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {ALPHABET.map((letter, i) => {
              const shiftedFor = ALPHABET[(i - shift + 26) % 26];
              const isHighlighted = shiftedFor === exampleLetter;
              return (
                <motion.div
                  key={letter}
                  animate={animating ? { y: [-10, 0], opacity: [0, 1] } : {}}
                  transition={{ duration: 0.3, delay: i * 0.01 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: isHighlighted ? "#BE185D" : "#FCE7F3",
                    color: isHighlighted ? "white" : "#BE185D",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    border: isHighlighted ? "2px solid #BE185D" : "2px solid transparent",
                  }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Example box */}
        <motion.div
          layout
          className="mt-6 p-4 rounded-2xl text-center"
          style={{ background: "linear-gradient(135deg, #EDE9FE, #FCE7F3)", border: "3px solid #7C3AED" }}
        >
          <p style={{ color: "#374151", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
            Com chave <strong>{shift}</strong>:
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-1"
                style={{ background: "#1E40AF", color: "white", fontSize: "1.5rem", fontWeight: 900 }}
              >
                {exampleLetter}
              </div>
              <span style={{ color: "#1E40AF", fontSize: "0.75rem", fontWeight: 600 }}>Original</span>
            </div>
            <div style={{ color: "#7C3AED", fontSize: "2rem" }}>→</div>
            <div className="text-center">
              <motion.div
                key={`${exampleLetter}-${shift}`}
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-1"
                style={{ background: "#BE185D", color: "white", fontSize: "1.5rem", fontWeight: 900 }}
              >
                {getShifted(exampleLetter, shift)}
              </motion.div>
              <span style={{ color: "#BE185D", fontSize: "0.75rem", fontWeight: 600 }}>Cifrada</span>
            </div>
          </div>
          <p className="mt-2" style={{ color: "#7C3AED", fontSize: "0.85rem" }}>
            Clique em qualquer letra no alfabeto original para ver a transformação!
          </p>
        </motion.div>
      </motion.div>

      {/* Example word */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.25rem", textAlign: "center" }}>
          📝 Exemplo com chave {shift}: cifrando "CESAR"
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {"CESAR".split("").map((letter, i) => {
            const cifrada = getShifted(letter, shift);
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 900, fontSize: "1.2rem" }}
                >
                  {letter}
                </div>
                <div style={{ color: "#9CA3AF", fontSize: "1.2rem" }}>↓</div>
                <motion.div
                  key={`${cifrada}-${shift}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 900, fontSize: "1.2rem" }}
                >
                  {cifrada}
                </motion.div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-4 mt-5">
          <div className="text-center">
            <div style={{ color: "#1E40AF", fontWeight: 700, fontSize: "0.85rem" }}>Original</div>
            <div
              className="px-4 py-2 rounded-xl mt-1"
              style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.15em" }}
            >
              CESAR
            </div>
          </div>
          <div style={{ color: "#7C3AED", fontSize: "2rem" }}>→</div>
          <div className="text-center">
            <div style={{ color: "#BE185D", fontWeight: 700, fontSize: "0.85rem" }}>Cifrado</div>
            <div
              className="px-4 py-2 rounded-xl mt-1"
              style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.15em" }}
            >
              {"CESAR".split("").map(l => getShifted(l, shift)).join("")}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "3px solid #F59E0B", boxShadow: "0 10px 30px rgba(245,158,11,0.3)" }}
      >
        <h2 style={{ color: "#92400E", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem" }}>
          💡 Como decifrar?
        </h2>
        <p style={{ color: "#78350F", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Para <strong>decifrar</strong> uma mensagem, basta fazer o caminho contrário: em vez de avançar 
          {shift} posições, você <strong>volta {shift} posições</strong> no alfabeto. Se a mensagem foi 
          cifrada com chave 3, você decifra voltando 3 posições!
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.6)" }}>
            <div style={{ color: "#92400E", fontWeight: 700, fontSize: "0.85rem" }}>Cifrar</div>
            <div style={{ color: "#78350F", fontSize: "1.5rem" }}>➡️</div>
            <div style={{ color: "#92400E", fontSize: "0.85rem" }}>Avança {shift} posições</div>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.6)" }}>
            <div style={{ color: "#92400E", fontWeight: 700, fontSize: "0.85rem" }}>Decifrar</div>
            <div style={{ color: "#78350F", fontSize: "1.5rem" }}>⬅️</div>
            <div style={{ color: "#92400E", fontSize: "0.85rem" }}>Volta {shift} posições</div>
          </div>
        </div>
      </motion.div>

      {/* Next */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/simulador")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            color: "white",
            fontWeight: 800,
            fontSize: "1.1rem",
            boxShadow: "0 8px 30px rgba(245,158,11,0.5)",
            border: "none",
          }}
        >
          ⚙️ Ir para o Simulador
          <ArrowRight size={22} />
        </motion.button>
      </motion.div>
    </div>
  );
}
