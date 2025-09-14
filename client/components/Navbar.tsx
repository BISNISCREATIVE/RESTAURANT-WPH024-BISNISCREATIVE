import { ShoppingCart, Search, User, LogIn, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({
  onOpenCart,
  onSearch,
}: {
  onOpenCart: () => void;
  onSearch?: (q: string) => void;
}) {
  const count = useAppSelector((s) =>
    s.cart.items.reduce((a, b) => a + b.qty, 0),
  );
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-3">
        <Link to="/" className="font-extrabold text-2xl tracking-tight">
          Foody
        </Link>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Search restaurants, food and drink"
              className="pl-9 rounded-full"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Profile"
            onClick={() => nav("/profile")}
          >
            <User className="h-5 w-5" />
          </Button>
          {(() => {
            const authed = !!(
              localStorage.getItem("auth_token") ||
              sessionStorage.getItem("auth_token")
            );
            return !authed ? (
              <Button variant="outline" onClick={() => nav("/auth")}>
                {" "}
                <LogIn className="h-4 w-4 mr-1" /> Login
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("auth_token");
                  sessionStorage.removeItem("auth_token");
                  window.location.reload();
                }}
              >
                {" "}
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            );
          })()}
          <Button onClick={onOpenCart} className="relative rounded-full">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
