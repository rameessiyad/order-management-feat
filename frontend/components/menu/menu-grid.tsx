import { MenuItem } from "@/lib/types";
import MenuItemCard from "./menu-item-card";

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed">
        <p className="text-muted-foreground">No menu items available.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Our Menu</h2>

        <p className="mt-2 text-muted-foreground">
          Freshly prepared meals made with quality ingredients.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
