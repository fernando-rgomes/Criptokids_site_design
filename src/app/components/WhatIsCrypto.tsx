import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare, Lock, Eye, Wifi } from "lucide-react";

const examples = [
  {
    icon: "💬",
    title: "Mensagens no WhatsApp",
    desc: "Suas mensagens são criptografadas! Só você e quem recebe pode ler.",
    color: "#25D366",
    bg: "#DCFCE7",
  },
  {
    icon: "🔑",
    title: "Senhas no celular",
    desc: "Sua senha nunca fica guardada como texto. Ela é transformada em código!",
    color: "#3B82F6",
    bg: "#DBEAFE",
  },
  {
    icon: "🛒",
    title: "Compras online",
    desc: "Seus dados de pagamento são cifrados para ninguém interceptar.",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    icon: "🎮",
    title: "Jogos online",
    desc: "Sua conta e dados no jogo ficam protegidos pela criptografia.",
    color: "#8B5CF6",
    bg: "#EDE9FE",
  },
];

const cryptoHistory = [
  { year: "~50 a.C.", event: "Júlio César usa a Cifra de César para mensagens militares", icon: "⚔️" },
  { year: "1940s", event: "A máquina Enigma usa criptografia na Segunda Guerra Mundial", icon: "⚙️" },
  { year: "1970s", event: "Nasce a criptografia moderna com chaves digitais", icon: "💻" },
  { year: "Hoje", event: "A maior parte da internet usa criptografia (HTTPS) para nos proteger", icon: "🌐" },
];

export function WhatIsCrypto() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          className="text-7xl mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔒
        </motion.div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          O que é Criptografia?
        </h1>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginTop: "0.75rem" }}>
          Descubra como as mensagens secretas funcionam no mundo real!
        </p>
      </motion.div>

      {/* Main Definition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl p-6 md:p-8 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="text-8xl shrink-0">🤫</div>
          <div>
            <h2 style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.75rem" }}>
              Criptografia = Arte de esconder mensagens
            </h2>
            <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.7 }}>
              <strong>Criptografia</strong> é a ciência de transformar uma mensagem normal em um código secreto, 
              para que só quem tem a <span style={{ color: "#7C3AED", fontWeight: 700 }}>chave certa</span> consiga ler.
            </p>
            <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.7, marginTop: "0.5rem" }}>
              A palavra vem do grego: <em>kryptós</em> = escondido + <em>graphía</em> = escrita. 
              <strong> Escrita escondida!</strong> 🎯
            </p>
          </div>
        </div>
      </motion.div>

      {/* Visual Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.5rem", textAlign: "center" }}>
          🔄 Como funciona o processo?
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 flex-wrap">
          {[
            { step: "1", icon: "📝", label: "Texto Original", desc: "OLÁ MUNDO", color: "#3B82F6", bg: "#DBEAFE" },
            { step: "→", icon: "🔑", label: "Chave Secreta", desc: "Deslocamento 3", color: "#7C3AED", bg: "#EDE9FE", isArrow: true },
            { step: "2", icon: "⚡", label: "Cifrar", desc: "Transformar", color: "#F59E0B", bg: "#FEF3C7" },
            { step: "→", icon: null, label: "", desc: "", isArrow: true, color: "#6B7280", bg: "transparent" },
            { step: "3", icon: "🔐", label: "Texto Cifrado", desc: "ROÓ PXQGR", color: "#EC4899", bg: "#FCE7F3" },
          ].map((item, i) =>
            item.isArrow && !item.icon ? (
              <div key={i} className="text-3xl hidden md:block" style={{ color: "#7C3AED" }}>→</div>
            ) : item.isArrow ? (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-3xl hidden md:block">→</div>
                <div className="px-3 py-1 rounded-lg text-xs" style={{ background: item.bg, color: item.color, fontWeight: 600 }}>
                  {item.icon} {item.label}: {item.desc}
                </div>
              </div>
            ) : (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 rounded-2xl text-center w-32"
                style={{ background: item.bg, border: `3px solid ${item.color}` }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div style={{ color: item.color, fontWeight: 800, fontSize: "0.75rem" }}>{item.label}</div>
                <div style={{ color: "#374151", fontWeight: 700, fontSize: "0.9rem", marginTop: "0.25rem" }}>{item.desc}</div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Real World Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-center mb-5" style={{ color: "white", fontWeight: 800, fontSize: "1.4rem" }}>
          🌍 Criptografia no seu dia a dia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div
                className="text-3xl w-14 h-14 flex items-center justify-center rounded-2xl shrink-0"
                style={{ background: ex.bg, border: `3px solid ${ex.color}` }}
              >
                {ex.icon}
              </div>
              <div>
                <h3 style={{ color: ex.color, fontWeight: 800, fontSize: "1rem" }}>{ex.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "0.25rem" }}>{ex.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.25rem" }}>
          📖 Palavras importantes para memorizar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { term: "Cifrar", def: "Transformar uma mensagem normal em código secreto", icon: "🔒", color: "#7C3AED" },
            { term: "Decifrar", def: "Transformar o código secreto de volta em mensagem normal", icon: "🔓", color: "#059669" },
            { term: "Chave", def: "O segredo que define como a mensagem foi cifrada", icon: "🗝️", color: "#D97706" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl text-center"
              style={{ background: "#F9FAFB", border: `3px solid ${item.color}20` }}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div style={{ color: item.color, fontWeight: 800, fontSize: "1.1rem" }}>{item.term}</div>
              <div style={{ color: "#6B7280", fontSize: "0.85rem", marginTop: "0.5rem" }}>{item.def}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* History Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-3xl p-6 mb-8"
        style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
      >
        <h2 style={{ color: "#374151", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          📅 Um pouquinho de história
        </h2>
        <div className="space-y-4">
          {cryptoHistory.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
                >
                  {item.icon}
                </div>
                {i < cryptoHistory.length - 1 && (
                  <div className="w-0.5 h-8 mt-1" style={{ background: "#E5E7EB" }} />
                )}
              </div>
              <div className="pb-2">
                <span
                  className="px-2 py-0.5 rounded-full text-xs mr-2"
                  style={{ background: "#EDE9FE", color: "#7C3AED", fontWeight: 700 }}
                >
                  {item.year}
                </span>
                <span style={{ color: "#374151", fontSize: "0.95rem" }}>{item.event}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fun Fact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-3xl p-6 mb-8 text-center"
        style={{
          background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
          border: "3px solid #F59E0B",
          boxShadow: "0 10px 30px rgba(245,158,11,0.3)",
        }}
      >
        <div className="text-4xl mb-3">💡</div>
        <h3 style={{ color: "#92400E", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Você sabia?
        </h3>
        <p style={{ color: "#78350F", fontSize: "0.95rem", lineHeight: 1.7 }}>
          Toda vez que você acessa um site com <strong>"https://"</strong> (que vem do inglês <em>HyperText Transfer Protocol Secure</em>, ou Protocolo de Transferência Seguro), sua conexão está sendo protegida por criptografia! O cadeado 🔒 na barra do navegador significa que seus dados estão seguros.
        </p>
      </motion.div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/cifra-cesar")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #EC4899)",
            color: "white",
            fontWeight: 800,
            fontSize: "1.1rem",
            boxShadow: "0 8px 30px rgba(124,58,237,0.5)",
            border: "none",
          }}
        >
          🔤 Entender a Cifra de César
          <ArrowRight size={22} />
        </motion.button>
      </motion.div>
    </div>
  );
}
