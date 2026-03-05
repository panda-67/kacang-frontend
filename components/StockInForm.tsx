"use client";

import { showError, showSuccess } from "@/lib/alert";
import { apiFetch, fetchMaterials } from "@/lib/api";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

type Material = {
  id: string;
  name: string;
};

export default function MaterialStockInForm() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialId, setMaterialId] = useState<string | "">("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<any>(null)
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const getMaterials = async () => {
      try {
        const result = await fetchMaterials({ is_stocked: true });
        setMaterials(result);
      } catch (err: any) {
        showError(err.message);
      }
    };

    getMaterials();
  }, []);


  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!materialId) return showError("Material is required");
    // if (!quantity) return showError("Quantity is required");

    setLoading(true);
    setErrors(null);

    try {
      const res = await apiFetch(`${apiUrl}/inventory/${materialId}/stock-in`, {
        method: "POST",
        body: JSON.stringify({
          quantity: Number(quantity),
          price: price ? Number(price) : null,
          note,
        }),
      });


      await showSuccess(res.message || "Material stock successfully added");

      setQuantity(0);
      setPrice(0);
      setNote("");
      setMaterialId("");

    } catch (error: any) {
      setErrors(error.errors);
      showError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-6">

          {/* Material */}
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Material
            </label>
            <select
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              value={materialId}
              onChange={e => { setMaterialId(e.target.value); setErrors(null); }}
            >
              <option value="" disabled>Select material</option>
              {materials.map((m: any) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            {errors && errors.material_id?.map((msg: string, i: number) => (
              <p key={i} className="my-1 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
                {msg}
              </p>
            ))}
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Quantity
            </label>
            <input
              type="number"
              step="0.0001"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              value={quantity}
              onChange={e => { setQuantity(Number(e.target.value)); setErrors(null); }}
            />
            {errors && errors.quantity?.map((msg: string, i: number) => (
              <p key={i} className="my-1 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
                {msg}
              </p>
            ))}
          </div>

          {/* Unit Price */}
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Unit Price
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              value={price}
              onChange={e => { setPrice(Number(e.target.value)); setErrors(null); }}
            />
            {errors && errors.price?.map((msg: string, i: number) => (
              <p key={i} className="my-1 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 border border-red-500/20">
                {msg}
              </p>
            ))}
          </div>

          {/* Note */}
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Note
            </label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-400 disabled:bg-slate-900 disabled:text-slate-100"
          >
            {loading ? 'Processing ...' : 'Add Stock'}
          </button>

        </div>
      </form>
    </Card>
  );
}
