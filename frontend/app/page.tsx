"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/common/navbar";
import MenuGrid from "@/components/menu/menu-grid";

import { api } from "@/lib/api";
import { MenuItem } from "@/lib/types";

export default function HomePage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 py-8">
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

        {!loading && !error && <MenuGrid items={menu} />}
      </main>
    </div>
  );
}
