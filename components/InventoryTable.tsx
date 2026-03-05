"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { showError } from "@/lib/alert";
import { useLocations } from "@/hooks/useLocations";

type InventoryTableProps = {
  type?: "sales_point" | "central";
};

type InventoryLocation = {
  id: number;
  name: string;
  stock: number;
  reserved: number;
  available: number;
};

type InventoryItem = {
  id: number;
  name: string;
  price: number;
  locations: InventoryLocation[];
};

export default function InventoryTable({ type }: (InventoryTableProps)) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { locations, setQuery } = useLocations();

  const [data, setData] = useState<InventoryItem[]>([]);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);

  const load = async (type?: string, location?: string | null) => {
    try {
      const url = location
        ? `${apiUrl}/inventory?type=${type}&location=${location}`
        : `${apiUrl}/inventory?type=${type}`;

      const result = await apiFetch(url);
      setData(result);
    } catch (err: any) {
      showError(err.message);
    }
  };

  // Load pertama kali TANPA filter
  useEffect(() => {
    load(type, null);
    setQuery({ type: type })
  }, [type]);

  // Reload hanya jika filter halaman ini berubah
  useEffect(() => {
    if (locationFilter !== null) {
      load(type, locationFilter);
    }
  }, [locationFilter, type]);

  if (!data.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
        No inventory data.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-foreground">
          Location Filter
        </label>

        <select
          value={locationFilter ?? ""}
          onChange={(e) => setLocationFilter(e.target.value || null)}
          className="w-max rounded-lg bg-slate-800 border border-slate-700 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="" disabled> Select location </option>
          <option value="0">All location</option>
          {locations?.map((loc: any) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}

        </select>
      </div>
      <div className="hidden md:block rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <table className="w-full text-sm rounded-t-xl text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-500">
                {type === 'central' ? 'Product/Material' : 'Product'}
              </th>
              <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-500">
                Location
              </th>
              {type === 'sales_point' &&
                <>
                  <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                    Stock
                  </th>
                  <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                    Reserved
                  </th>
                </>
              }
              <th className="p-4 text-right text-xs uppercase tracking-wide text-slate-500">
                Available
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {data.flatMap((product, i) =>
              product.locations.map((loc) => {
                const available = loc.available;

                return (
                  <tr
                    key={`${i}-${product.id}-${loc.id}`}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 text-slate-100">{product.name}</td>
                    <td className="p-4 text-slate-400">{loc.name}</td>
                    {type === 'sales_point' &&
                      <>
                        <td className="p-4 text-right">{loc.stock}</td>
                        <td className="p-4 text-right text-slate-400"> {loc.reserved} </td>
                      </>
                    }
                    <td
                      className={`p-4 text-right font-medium ${available > 0 ? "text-amber-400" : "text-red-400"
                        }`}
                    >
                      {available}
                    </td>
                    <td className="p-4 text-right">
                      {type === 'sales_point' &&
                        <Link
                          href={`/inventory/transfer?product=${product.id}&location=${loc.id}`}
                          className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          Transfer
                        </Link>
                      }
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>


      <div className="md:hidden space-y-4">
        {data.map((product, i) => (
          <div
            key={`${i}-${product.id}`}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <div className="mb-3 text-sm font-semibold text-slate-100">
              {product.name}
            </div>

            <div className="space-y-3">
              {product.locations.map((loc) => {
                const available = loc.available;

                return (
                  <div
                    key={loc.id}
                    className="rounded-lg bg-slate-800/40 p-3"
                  >
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                      {loc.name}
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-xs text-slate-400">
                      {type === 'sales_point' &&
                        <>
                          <div>
                            <div>Stock</div>
                            <div className="mt-1 text-sm text-slate-200">
                              {loc.stock}
                            </div>
                          </div>

                          <div>
                            <div>Reserved</div>
                            <div className="mt-1 text-sm text-slate-200">
                              {loc.reserved}
                            </div>
                          </div>
                        </>
                      }

                      <div>
                        <div>Available</div>
                        <div
                          className={`mt-1 text-sm font-medium ${available > 0
                            ? "text-amber-400"
                            : "text-red-400"
                            }`}
                        >
                          {available}
                        </div>
                      </div>
                    </div>

                    {type === 'sales_point' &&
                      <Link
                        href={`/inventory/transfer?product=${product.id}&location=${loc.id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        Transfer
                      </Link>
                    }

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div >
    </>
  );

}
