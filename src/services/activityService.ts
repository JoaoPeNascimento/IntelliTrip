const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
}

export const activityService = {
  async getActivitiesByTrip(travelId: string, token: string) {
    try {
      const response = await fetch(`${apiUrl}/activity/${travelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data: Activity[] = await response.json();

      return data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return [];
    }
  },
};
