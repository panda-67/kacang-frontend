"use client";

import { useState } from "react";
import InventoryTable from "@/components/InventoryTable";

export default function InventoryPage() {
  const [type, setType] = useState<"sales_point" | "central">("sales_point");

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-4">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="flex gap-3 flex-col justify-center md:flex-row  md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100">
              Inventory Overview
            </h1>
            <p className="text-sm text-slate-400">
              Current stock per product
            </p>
          </div>

          <div className="flex rounded-lg border border-slate-700 overflow-hidden w-max">
            <button
              onClick={() => setType("sales_point")}
              className={`px-4 py-2 text-sm ${type === "sales_point"
                ? "bg-amber-500 text-white"
                : "bg-slate-800 text-slate-400"
                }`}
            >
              Sale Points
            </button>
            <button
              onClick={() => setType("central")}
              className={`px-4 py-2 text-sm ${type === "central"
                ? "bg-amber-500 text-white"
                : "bg-slate-800 text-slate-400"
                }`}
            >
              Central
            </button>
          </div>
        </div>

        <InventoryTable type={type} />

      </div>
    </div>
  );
}
