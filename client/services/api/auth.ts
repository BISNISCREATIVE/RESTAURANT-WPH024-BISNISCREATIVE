import axios from "./axios";

export async function login(email: string, password: string) {
  const { data } = await axios.post("/auth/login", { email, password });
  return data as { token: string };
}

export async function register(name: string, email: string, password: string) {
  const { data } = await axios.post("/auth/register", {
    name,
    email,
    password,
  });
  return data as { token: string };
}
