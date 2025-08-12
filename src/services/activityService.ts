import {
  activitySchema,
  activityCreateSchema,
  Activity,
  ActivityCreate,
} from "@/schemas/activitySchema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const activityService = {
  async getActivitiesByTrip(
    travelId: string,
    token: string
  ): Promise<Activity[]> {
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

      const data = await response.json();

      const parsed = activitySchema.array().safeParse(data);
      if (!parsed.success) {
        console.error(
          "Erro de validação nas atividades recebidas:",
          parsed.error
        );
        return [];
      }

      return parsed.data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      return [];
    }
  },

  async createActivity(
    travelId: string,
    token: string,
    data: ActivityCreate
  ): Promise<Activity | undefined> {
    try {
      const parsedData = activityCreateSchema.parse(data);

      const response = await fetch(`${apiUrl}/activity/${travelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const result = await response.json();

      const parsedResult = activitySchema.safeParse(result);
      if (!parsedResult.success) {
        console.error(
          "Resposta inválida da API ao criar atividade:",
          parsedResult.error
        );
        return;
      }

      return parsedResult.data;
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
    }
  },

  async deleteActivity(activityId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${apiUrl}/activity/${activityId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar atividade: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
      return false;
    }
  },
};
