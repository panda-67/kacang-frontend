"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

type InventoryItem = {
  id: string;
  name: string;
  stock: number;
  reserved: number;
};

export default function InventoryTable() {
  const [data, setData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inventory`
        );
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!data.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        No inventory data.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <table className="w-full text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-500">
                Product
              </th>
              <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                Stock
              </th>
              <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                Reserved
              </th>
              <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                Available
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const available = item.stock - item.reserved;

              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="p-4 text-slate-100">{item.name}</td>
                  <td className="p-4 text-right">{item.stock}</td>
                  <td className="p-4 text-right text-slate-400">
                    {item.reserved}
                  </td>
                  <td
                    className={`p-4 text-right font-medium ${available > 0 ? "text-amber-400" : "text-red-400"
                      }`}
                  >
                    {available}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={`/inventory/transfer?product=${item.id}`}
                      className="text-xs font-semibold uppercase tracking-wide text-amber-500 hover:text-amber-400"
                    >
                      Transfer
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {data.map((item) => {
          const available = item.stock - item.reserved;

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="mb-3 text-sm font-semibold text-slate-100">
                {item.name}
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-slate-400">
                <div>
                  <div className="uppercase tracking-wide">Stock</div>
                  <div className="mt-1 text-sm text-slate-200">
                    {item.stock}
                  </div>
                </div>

                <div>
                  <div className="uppercase tracking-wide">Reserved</div>
                  <div className="mt-1 text-sm text-slate-200">
                    {item.reserved}
                  </div>
                </div>

                <div>
                  <div className="uppercase tracking-wide">Available</div>
                  <div
                    className={`mt-1 text-sm font-medium ${available > 0 ? "text-amber-400" : "text-red-400"
                      }`}
                  >
                    {available}
                  </div>
                </div>
              </div>

              <a
                href={`/inventory/transfer?product=${item.id}`}
                className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-amber-500 hover:text-amber-400"
              >
                Transfer
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
