const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Invite {
  recieverEmail: string;
}

type UserInvite = {
  id: string;
  travelId: string;
  userId: string | null;
  recieverEmail: string;
  travel: {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
  };
};

type Travel = {
  id: string;
  inviteId: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export const inviteService = {
  async getInvitesByTrip(travelId: string, token: string) {
    try {
      const res = await fetch(`${apiUrl}/invite/${travelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Erro: ${res.status}`);
      }

      const data: Invite[] = await res.json();

      const uniqueEmails = [
        ...new Set(data.map((invite) => invite.recieverEmail)),
      ];

      return uniqueEmails;
    } catch (error) {
      console.error("Erro ao buscar convites:", error);
    }
  },

  async createInvite(
    token: string,
    data: { travelId: string; recieverEmail: string }
  ) {
    const res = await fetch(`${apiUrl}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erro ao criar o convite.");
    }

    return res.json();
  },

  async getUserInvites(token: string) {
    try {
      const res = await fetch(`${apiUrl}/invite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar convites");
      }

      const data: UserInvite[] = await res.json();

      const trips: Travel[] = data.map((invite) => ({
        id: invite.travel.id,
        inviteId: invite.id,
        destination: invite.travel.destination,
        startDate: invite.travel.startDate,
        endDate: invite.travel.endDate,
      }));

      return trips;
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    }
  },

  async deleteInvite(token: string, inviteId: string) {
    try {
      const res = await fetch(`${apiUrl}/invite/${inviteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar o convite.");
      }
    } catch (error) {
      throw new Error("Erro ao deletar o convite: " + error);
    }
  },
};
