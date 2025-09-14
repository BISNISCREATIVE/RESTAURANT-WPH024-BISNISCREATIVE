import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRestaurantsQuery } from "@/services/queries/resto";
import CartDrawer from "@/components/CartDrawer";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [q, setQ] = useState("");
  const { data, isLoading } = useRestaurantsQuery(q ? { q } : undefined);
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} onSearch={setQ} />

      <section className="relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fcf8594e38e724fa3abfa91ad793c6168%2F52ee757c4e724332bba8d2e5b41e33ef?format=webp&width=1600"
          alt="Hero burger"
          className="h-[420px] md:h-[560px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Sign in / Sign up bubble (only when logged out) */}
        {!(localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")) && (
          <div className="absolute right-6 top-6 flex gap-3">
            <a
              href="/auth?mode=login"
              className="rounded-full border border-white/70 text-white px-5 h-11 flex items-center font-semibold backdrop-blur bg-white/10"
            >
              Sign In
            </a>
            <a
              href="/auth?mode=register"
              className="rounded-full bg-white text-gray-900 px-5 h-11 flex items-center font-semibold"
            >
              Sign Up
            </a>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow">
              Explore Culinary Experiences
            </h1>
            <p className="max-w-2xl mx-auto opacity-90">
              Search and refine your choice to discover the perfect restaurant.
            </p>
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  placeholder="Search restaurants, food and drink"
                  onChange={(e)=>setQ(e.target.value)}
                  onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); } }}
                  className="w-full h-12 rounded-full pl-12 pr-4 text-black outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-extrabold">Recommended</h2>
          </div>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-muted/30 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((r) => (
                <RestaurantCard
                  key={String(r.id)}
                  data={r}
                  onClick={() => nav(`/resto/${r.id}`)}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Show More
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      <div className="fixed bottom-5 right-5">
        <CartDrawer>
          <Button>Open Cart</Button>
        </CartDrawer>
      </div>
    </div>
  );
}
