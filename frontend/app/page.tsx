"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/common/navbar";
import MenuGrid from "@/components/menu/menu-grid";

import { api } from "@/lib/api";
import { MenuItem } from "@/lib/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HomePage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await api.getMenu();
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 py-8">
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        {loading && (
          <div className="flex h-60 items-center justify-center">
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex h-60 items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && <MenuGrid items={filteredMenu} />}
      </main>
    </div>
  );
}
