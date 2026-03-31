import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";

const floatingEmojis = ["🔐", "🗝️", "📨", "🔑", "💬", "🛡️", "⚡", "🌟"];

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (i % 3) * 25}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)" }}
          >
            <Star size={16} style={{ color: "#F59E0B" }} fill="#F59E0B" />
            <span style={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}>
              Plataforma Educacional Interativa
            </span>
            <Star size={16} style={{ color: "#F59E0B" }} fill="#F59E0B" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              color: "white",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              lineHeight: 1.1,
            }}
          >
            🔐 CriptoKids
            <br />
            <span style={{ color: "#FDE68A" }}>Mensagens Secretas</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1rem",
            }}
          >
            Aprenda criptografia brincando! 🎮
          </motion.p>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto p-6 rounded-2xl mb-8"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-4xl mb-3">🕵️</div>
            <p style={{ color: "white", fontSize: "1.1rem", fontStyle: "italic" }}>
              "Você é um agente secreto e precisa enviar mensagens para sua equipe sem que ninguém entenda! Aprenda a criar e decifrar mensagens secretas com a <strong>Cifra de César</strong>."
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/criptografia")}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #EF4444)",
              color: "white",
              fontWeight: 800,
              fontSize: "1.2rem",
              boxShadow: "0 8px 30px rgba(245,158,11,0.5)",
              border: "none",
            }}
          >
            🚀 Começar Missão
            <ArrowRight size={22} />
          </motion.button>
        </motion.div>

        {/* Infographic: Mensagem normal → Mensagem secreta */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <h3 className="text-center mb-6" style={{ color: "#7C3AED", fontWeight: 800, fontSize: "1.1rem" }}>
              ✨ Como funciona a criptografia?
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Original Message */}
              <div className="text-center">
                <div
                  className="px-6 py-4 rounded-2xl mb-3"
                  style={{ background: "linear-gradient(135deg, #DBEAFE, #EDE9FE)", border: "3px solid #7C3AED" }}
                >
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1E40AF", letterSpacing: "0.1em" }}>
                    OLÁ AMIGO
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ background: "#DBEAFE", color: "#1E40AF", fontWeight: 600 }}
                >
                  📝 Mensagem Normal
                </span>
              </div>

              {/* Arrow with key */}
              <div className="flex flex-col items-center gap-1">
                <div className="text-3xl">🗝️</div>
                <div className="flex items-center gap-2">
                  <div className="hidden md:block h-0.5 w-8" style={{ background: "#7C3AED" }} />
                  <div
                    className="px-3 py-1 rounded-full text-sm whitespace-nowrap"
                    style={{ background: "#7C3AED", color: "white", fontWeight: 700 }}
                  >
                    chave = 3
                  </div>
                  <div className="hidden md:block h-0.5 w-8" style={{ background: "#7C3AED" }} />
                </div>
                <div className="text-2xl">⚡</div>
              </div>

              {/* Encrypted Message */}
              <div className="text-center">
                <div
                  className="px-6 py-4 rounded-2xl mb-3"
                  style={{ background: "linear-gradient(135deg, #FEF3C7, #FCE7F3)", border: "3px solid #EC4899" }}
                >
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, color: "#BE185D", letterSpacing: "0.1em" }}>
                    ROÓ DPLÉR
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ background: "#FCE7F3", color: "#BE185D", fontWeight: 600 }}
                >
                  🔐 Mensagem Secreta
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: "📚", title: "Aprenda", desc: "Conceitos de criptografia de forma simples e visual", color: "#7C3AED", bg: "#EDE9FE" },
            { icon: "🔐", title: "Pratique", desc: "Cifre e decifre mensagens no simulador interativo", color: "#059669", bg: "#D1FAE5" },
            { icon: "🏆", title: "Conquiste", desc: "Complete desafios e ganhe pontos e estrelas", color: "#D97706", bg: "#FEF3C7" },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-5 rounded-2xl text-center"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 style={{ color: card.color, fontWeight: 800, fontSize: "1.1rem" }}>{card.title}</h3>
              <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "0.5rem" }}>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { path: "/cifra-cesar", emoji: "🔤", label: "Cifra de César" },
            { path: "/simulador", emoji: "⚙️", label: "Simulador" },
            { path: "/desafios", emoji: "🎮", label: "Desafios" },
            { path: "/forca-bruta", emoji: "🔓", label: "Quebrar Cifras" },
          ].map((item, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
