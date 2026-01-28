"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AILoadingOverlayProps {
  visible: boolean;
}

const loadingPhrases = [
  "Analisando o clima e a localização...",
  "Consultando as melhores atividades locais...",
  "Verificando horários de funcionamento...",
  "Personalizando sugestões para seu perfil...",
  "Encontrando joias escondidas no destino...",
  "Compilando as melhores dicas...",
];

export default function AILoadingOverlay({ visible }: AILoadingOverlayProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;

    setPhraseIndex(0);

    const intervalId = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md transition-all duration-300">
      {/* Container do Ícone com animação */}
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-xl">
          <Sparkles className="h-10 w-10 text-white animate-pulse" />
        </div>
      </div>

      {/* Texto mudando dinamicamente */}
      <div className="h-8 flex items-center justify-center">
        <p className="text-lg font-medium text-slate-700 animate-fade-in text-center px-4">
          {loadingPhrases[phraseIndex]}
        </p>
      </div>
    </div>
  );
}
