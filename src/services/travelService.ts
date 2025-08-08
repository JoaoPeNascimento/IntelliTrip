const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
};
