"use client";

import { useAuthStore } from "@/stores/authStore";

const ResetPassword = () => {
  const email = useAuthStore((state) => state.email);

  return (
    <div>
      <h1>Alterar senha</h1>
      {email ? (
        <p>Alterando senha para: {email}</p>
      ) : (
        <p>Nenhum e-mail encontrado.</p>
      )}
    </div>
  );
};

export default ResetPassword;
