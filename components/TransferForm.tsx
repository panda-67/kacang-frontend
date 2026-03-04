"use client";

import { showError, showSuccess } from "@/lib/alert";
import { apiFetch } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Location = {
  id: string;
  name: string;
}

type Product = {
  id: number;
  name: string;
}

export default function TransferForm() {
  const searchParams = useSearchParams();

  const productParam = searchParams.get("product");
  const locationParam = searchParams.get("location");

  const [products, setProducts] = useState<Product[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [productId, setProductId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState<any>(null)
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fethcProducts = async () => {
      try {
        const result = await apiFetch(`${apiUrl}/products`);
        setProducts(result);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLocations = async () => {
      try {
        const result = await apiFetch(`${apiUrl}/locations`);
        setLocations(result);
      } catch (err) {
        console.error(err);
      }
    };

    fethcProducts();
    fetchLocations();
  }, [apiUrl]);

  useEffect(() => {
    if (productParam) setProductId(productParam);
    if (locationParam) setLocationId(locationParam);
  }, [productParam, locationParam]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!productId) {
      showError("Please select product.");
      return;
    }

    const central = locations.find(l => l.name === "Central Kitchen");

    if (!central) {
      throw new Error("Central location not found.");
    }

    setLoading(true);
    setErrors(null);

    try {
      const data = await apiFetch(`${apiUrl}/inventory/${productId}/transfer`, {
        method: "POST",
        body: JSON.stringify({
          from: central.id,
          destination: locationId,
          quantity
        })
      });

      await showSuccess(data.message || "Transfer execute successfully.");

      setProductId("");
      setLocationId("");
      setQuantity(0);

    } catch (err: any) {
      setErrors(err.errors);
      await showError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
      <div className="space-y-6">

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Source (Central Point)
          </label>
          <p className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none">
            {locations.find(l => l.name === "Central Kitchen")?.name || "Central"}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Product
          </label>
          <select
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
            value={productId}
            onChange={e => setProductId(e.target.value)}
          >
            <option value="" disabled>Select product</option>
            {products.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Destination (Sale Point)
          </label>
          <select
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 mb-1 text-sm text-slate-100
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
            value={locationId}
            onChange={e => { setLocationId(e.target.value); setErrors(null); }}
          >
            <option value="" disabled>Select location</option>
            {locations.map((l: any) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          {errors && errors.destination?.map((msg: string, i: number) => (
            <p key={i} className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
              {msg}
            </p>
          ))}
        </div>

        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            Quantity
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 mb-1 text-sm text-slate-100
            focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
            value={quantity}
            onChange={e => { setQuantity(Number(e.target.value)); setErrors(null); }}
          />
          {errors && errors.quantity?.map((msg: string, i: number) => (
            <p key={i} className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
              {msg}
            </p>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:bg-slate-900 disabled:text-slate-100"
        >
          {loading ? 'Processing...' : 'Transfer'}
        </button>

      </div>
    </form>
  );
}
