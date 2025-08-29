const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import {
  Travel,
  TravelCreate,
  travelCreateSchema,
  travelSchema,
} from "@/schemas/travelSchema";
import {
  TravelWithDetails,
  travelWithDetailsSchema,
} from "@/schemas/travelWithDetails";

export const travelService = {
  async getAllTravels(token: string) {
    const res = await fetch(`${apiUrl}/travel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Erro ao buscar viagens do usuário.");
    }

    return result;
  },

  async getTravelById(travelId: string, token: string) {
    const res = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Erro ao buscar viagem.");
    }

    return result;
  },

  async createTravel(
    token: string,
    data: TravelCreate
  ): Promise<Travel | undefined> {
    try {
      const parsedData = travelCreateSchema.parse(data);

      const res = await fetch(`${apiUrl}/travel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar viagem.");
      }

      const result = await res.json();

      const parsedResult = travelSchema.safeParse(result);

      if (!parsedResult.success) {
        console.error(
          "Resposta inválida da API ao criar a viagem:",
          parsedResult.error
        );
        return;
      }

      return parsedResult.data;
    } catch (error) {
      console.error("Erro ao criar a viagem: " + error);
    }
  },

  deleteTravel: async (token: string, travelId: string) => {
    const res = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao deletar viagem");
    }

    return true;
  },

  async getTravelWithDetails(travelId: string): Promise<TravelWithDetails> {
    const res = await fetch(`${apiUrl}/travel/invite/${travelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Erro ao buscar detalhes da viagem.");
    }

    const parsed = travelWithDetailsSchema.safeParse(result);

    if (!parsed.success) {
      console.error("Resposta inválida da API:", parsed.error);
      console.error("Payload recebido:", result);
      throw new Error("Resposta inválida da API.");
    }

    return parsed.data;
  },
};
