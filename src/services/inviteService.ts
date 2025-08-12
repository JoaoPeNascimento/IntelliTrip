const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Invite {
  recieverEmail: string;
}

export const inviteService = {
  async getInvitesByTrip(travelId: string, token: string) {
    try {
      const response = await fetch(`${apiUrl}/invite/${travelId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data: Invite[] = await response.json();

      const uniqueEmails = [
        ...new Set(data.map((invite) => invite.recieverEmail)),
      ];

      console.log(uniqueEmails);
      return uniqueEmails;
    } catch (error) {
      console.error("Erro ao buscar convites:", error);
      return [];
    }
  },
};
