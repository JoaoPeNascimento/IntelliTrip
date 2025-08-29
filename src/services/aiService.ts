const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const iaService = {
  async getRecommendations(
    token: string,
    data: { destination: string; startDate: string; endDate: string }
  ) {
    const res = await fetch(`${apiUrl}/ia/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }

    const recommendations = await res.json();
    return recommendations;
  },
};
