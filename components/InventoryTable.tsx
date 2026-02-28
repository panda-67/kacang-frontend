"use client";

import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

type Location = {
  id: string;
  name: string;
}

export default function InventoryTable() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const load = async (location?: string | null) => {
    try {
      const url = location
        ? `${apiUrl}/inventory?location=${location}`
        : `${apiUrl}/inventory`;

      const result = await apiFetch(url);
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  // Load pertama kali TANPA filter
  useEffect(() => {
    load(null);
  }, []);

  // Reload hanya jika filter halaman ini berubah
  useEffect(() => {
    if (locationFilter !== null) {
      load(locationFilter);
    }
  }, [locationFilter]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await apiFetch(`${apiUrl}/locations`);
        setLocations(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, [apiUrl]);

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
                Product
              </th>
              <th className="p-4 text-left text-xs uppercase tracking-wide text-slate-500">
                Location
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
            {data.flatMap((product) =>
              product.locations.map((loc) => {
                const available = loc.available;

                return (
                  <tr
                    key={`${product.id}-${loc.id}`}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 text-slate-100">{product.name}</td>
                    <td className="p-4 text-slate-400">{loc.name}</td>
                    <td className="p-4 text-right">{loc.stock}</td>
                    <td className="p-4 text-right text-slate-400">
                      {loc.reserved}
                    </td>
                    <td
                      className={`p-4 text-right font-medium ${available > 0 ? "text-amber-400" : "text-red-400"
                        }`}
                    >
                      {available}
                    </td>
                    <td className="p-4 text-right">
                      {!loc.name.includes('Central') &&
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
        {data.map((product) => (
          <div
            key={product.id}
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

                    {!loc.name.includes('Central') &&
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
      </div>
    </>
  );

}
