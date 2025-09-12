import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRestaurantsQuery, useRestaurantDetailQuery, useCartMutations } from "@/services/queries/resto";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/features/cart/cartSlice";
import CartDrawer from "@/components/CartDrawer";
import RestaurantCard from "@/components/RestaurantCard";
import ProductCard from "@/components/ProductCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<number | string | null>(null);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useRestaurantsQuery(q ? { q } : undefined);
  const detail = useRestaurantDetailQuery(selected || undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenCart={() => {}} onSearch={setQ} />

      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1551782450-17144c3a0914?q=80&w=1600&auto=format&fit=crop"
          alt="Hero burger"
          className="h-[360px] md:h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow">Explore Culinary Experiences</h1>
            <p className="max-w-2xl mx-auto opacity-90">Search and refine your choice to discover the perfect restaurant.</p>
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
                <div key={i} className="h-28 bg-muted/30 animate-pulse rounded-xl" />
              ))}
            </div>
          )}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((r) => (
                <RestaurantCard key={String(r.id)} data={r} onClick={() => setSelected(r.id)} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Show More</Button>
          </div>
        </div>
      </main>

      <Footer />

      <div className="fixed bottom-5 right-5">
        <CartDrawer>
          <Button>Open Cart</Button>
        </CartDrawer>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{detail.data?.name || "Restaurant"}</DialogTitle>
          </DialogHeader>
          {detail.isLoading && <div className="h-28 bg-muted/30 animate-pulse rounded-xl" />}
          {!!detail.data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(detail.data.menus || []).map((m: any) => (
                <ProductCard
                  key={String(m.id)}
                  item={{ id: m.id, name: m.name, price: m.price, image: m.image, category: m.category, restaurantId: detail.data.id }}
                  onAdd={(item) => dispatch(addToCart({ id: item.id, name: item.name, price: item.price, qty: 1, image: item.image, restaurantId: item.restaurantId }))}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
