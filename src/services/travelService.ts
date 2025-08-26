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
    const response = await fetch(`${apiUrl}/travel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao buscar viagens do usuário.");
    }

    return result;
  },

  async getTravelById(travelId: string, token: string) {
    const response = await fetch(`${apiUrl}/travel/${travelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
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

      const response = await fetch(`${apiUrl}/travel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar viagem.");
      }

      const result = await response.json();

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

  async getTravelWithDetails(travelId: string): Promise<TravelWithDetails> {
    const response = await fetch(`${apiUrl}/travel/invite/${travelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
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
