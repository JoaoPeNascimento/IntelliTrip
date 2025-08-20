const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const iaService = {
  async getRecommendations(
    token: string,
    data: { destination: string; startDate: string; endDate: string }
  ) {
    const response = await fetch(`${apiUrl}/ia/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error);
    }

    const recommendations = await response.json();
    return recommendations;
  },
};
