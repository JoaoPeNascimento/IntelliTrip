import { create } from "zustand";

interface SugestaoIA {
  nome: string;
  descricao: string;
  categoria: string;
  endereco: string;
  horarioFuncionamento: string;
  dicas: string;
}

interface RespostaIA {
  sobre: string;
  sugestoes: SugestaoIA[];
}

interface SuggestionState {
  cache: Record<string, RespostaIA>;
  setCache: (travelId: string, data: RespostaIA) => void;
  getCache: (travelId: string) => RespostaIA | undefined;
}

export const useSuggestionStore = create<SuggestionState>((set, get) => ({
  cache: {},
  setCache: (travelId, data) =>
    set((state) => ({
      cache: { ...state.cache, [travelId]: data },
    })),
  getCache: (travelId) => get().cache[travelId],
}));
