import {
  activitySchema,
  activityCreateSchema,
  Activity,
  ActivityCreate,
  activityUpdateSchema,
} from "@/schemas/activitySchema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const activityService = {
  async getActivitiesByTrip(
    travelId: string,
    token: string
  ): Promise<Activity[]> {
    try {
      const res = await fetch(`${apiUrl}/activity/${travelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data = await res.json();

      const parsed = activitySchema.array().safeParse(data);
      if (!parsed.success) {
        return [];
      }

      return parsed.data;
    } catch (error) {
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

      const res = await fetch(`${apiUrl}/activity/${travelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const result = await res.json();

      const parsedResult = activitySchema.safeParse(result);
      if (!parsedResult.success) {
        return;
      }

      return parsedResult.data;
    } catch (error) {
      return;
    }
  },

  async deleteActivity(activityId: string, token: string): Promise<boolean> {
    try {
      const res = await fetch(`${apiUrl}/activity/${activityId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Erro ao deletar atividade: ${res.status}`);
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  async updateActivity(
    activityId: string,
    token: string,
    data: Partial<ActivityCreate>
  ): Promise<Activity | undefined> {
    try {
      const parsedData = activityUpdateSchema.parse(data);

      const res = await fetch(`${apiUrl}/activity/${activityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) {
        throw new Error(`Erro ao atualizar atividade: ${res.status}`);
      }

      const result = await res.json();

      const parsedResult = activitySchema.safeParse(result);
      if (!parsedResult.success) {
        return;
      }

      return parsedResult.data;
    } catch (error) {
      return;
    }
  },
};
