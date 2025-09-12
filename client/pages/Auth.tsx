import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { login, register } from "@/services/api/auth";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      if (mode === "login") {
        const data = await login(
          String(fd.get("email")),
          String(fd.get("password")),
        );
        localStorage.setItem("auth_token", data.token);
      } else {
        const data = await register(
          String(fd.get("name")),
          String(fd.get("email")),
          String(fd.get("password")),
        );
        localStorage.setItem("auth_token", data.token);
      }
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} />
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-10">
          <div className="flex gap-2 mb-6">
            <Button
              variant={mode === "login" ? "default" : "outline"}
              onClick={() => setMode("login")}
            >
              Login
            </Button>
            <Button
              variant={mode === "register" ? "default" : "outline"}
              onClick={() => setMode("register")}
            >
              Register
            </Button>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            {mode === "register" && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Register"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
