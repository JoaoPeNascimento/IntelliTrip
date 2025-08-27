const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

interface RegisterResponse {
  token: string;
  userId: string;
}

interface LoginData {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

interface UserData {
  name: string;
  email: string;
}

interface CheckEmailData {
  email: string;
}

interface CheckEmailResponse {
  exists: boolean;
}

export const authService = {
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.nome,
        email: data.email,
        password: data.senha,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro desconhecido.");
    }

    return result;
  },

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.senha,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert("Usuário não encontrado!");
      throw new Error(result.error || "Erro desconhecido.");
    }

    return result;
  },

  async getUser(token: string): Promise<UserData> {
    const response = await fetch(`${apiUrl}/auth/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao buscar dados do usuário.");
    }

    return result.userData;
  },

  async checkEmail(email: string): Promise<CheckEmailResponse> {
    const response = await fetch(`${apiUrl}/auth/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao verificar e-mail.");
    }

    return result;
  },
};
