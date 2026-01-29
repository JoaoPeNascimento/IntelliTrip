"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Title from "./Title";

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Fernando de Noronha",
    description:
      "Venha conhecer uma das praias mais bonitas do mundo em Fernando de Noronha.",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Paris, França",
    description:
      "A Cidade Luz espera por você com sua arquitetura deslumbrante e gastronomia única.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rio de Janeiro",
    description:
      "O encontro perfeito entre mar e montanha no coração do Brasil.",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Tóquio, Japão",
    description:
      "Uma mistura fascinante de tradição milenar e tecnologia futurista.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Santorini, Grécia",
    description:
      "Casas brancas e o pôr do sol mais famoso do mundo nas ilhas gregas.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Nova York, EUA",
    description:
      "A cidade que nunca dorme oferece experiências inesquecíveis e cultura vibrante.",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Machu Picchu, Peru",
    description:
      "Descubra os mistérios e a energia da cidade perdida dos Incas.",
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Bali, Indonésia",
    description:
      "Espiritualidade, templos e belezas naturais em um paraíso tropical.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Roma, Itália",
    description:
      "Explore a história viva e o Coliseu em cada esquina da Cidade Eterna.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Cancún, México",
    description:
      "Praias de areia branca e águas turquesas no coração do Caribe mexicano.",
    image:
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function DestinationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avança para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  // Volta para o slide anterior
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Title>Destinos Populares</Title>
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl group">
        {/* Imagens */}
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Usei img padrão pois o next/image requer configuração de domínio no next.config.ts */}
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />

            {/* Overlay Escuro para o Texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Conteúdo de Texto */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-2xl">
              <h3 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {dest.name}
              </h3>
              <p className="text-sm md:text-lg opacity-90 font-medium drop-shadow-md">
                {dest.description}
              </p>
            </div>
          </div>
        ))}

        {/* Controles Manuais (opcionais, aparecem no hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicadores (Bolinhas) */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {destinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
