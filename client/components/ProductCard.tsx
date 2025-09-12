import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { MenuItem } from "@/types";

export default function ProductCard({ item, onAdd }: { item: MenuItem; onAdd?: (item: MenuItem) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-36 w-full object-cover" />
      <div className="p-3 space-y-1">
        <div className="font-medium line-clamp-1">{item.name}</div>
        <div className="text-sm text-muted-foreground">{formatCurrency(item.price)}</div>
        <Button className="w-full mt-2" onClick={() => onAdd?.(item)}>Add to Cart</Button>
      </div>
    </div>
  );
}
