"use client";

import { useProductionForm } from "@/hooks/useProduction";
import Card from "@/components/ui/Card";

export default function ProductInForm() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
  const {
    products, materials, productId, setProductId, outputQty, setOutputQty,
    items, addMaterialRow, removeMaterialRow, updateMaterial,
    loading, message, submit
  } = useProductionForm(apiUrl);

  return (
    <Card>
      <form onSubmit={e => { e.preventDefault(); submit(); }} className="space-y-5">

        {message && (
          <div className="text-sm text-amber-400">
            {message}
          </div>
        )}

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-400 block mb-1">Product</label>
          <select
            value={productId}
            onChange={e => setProductId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
          >
            <option value="" disabled>Select product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-400 block mb-1">Output Quantity</label>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              min={1}
              value={outputQty || ""}
              onChange={e => setOutputQty(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
            />
            <span className="uppercase text-xs w-24">
              {products.find((p) => String(p.id) === String(productId))?.unit ?? "-"}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Materials</span>
            <button
              type="button"
              onClick={addMaterialRow}
              className="text-xs text-amber-500"
            >
              + Add Material
            </button>
          </div>

          {items.map((item, i) => {
            const selectedMaterial = materials.find(m => m.id === item.material_id);

            return (
              <div key={i} className="flex items-center gap-3 mb-3">

                <select
                  value={item.material_id}
                  onChange={e => {
                    const selectedId = e.target.value;
                    const selectedMaterial = materials.find(m => String(m.id) === String(selectedId));

                    updateMaterial(i, {
                      material_id: selectedId,
                      unit_cost: selectedMaterial?.default_unit_cost ?? 0
                    });
                  }}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="" disabled>Select material</option>
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  value={item.quantity_used || ""}
                  onChange={e => updateMaterial(i, { quantity_used: Number(e.target.value) })}
                  className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm"
                />

                <span className="uppercase text-xs w-10">
                  {selectedMaterial?.unit ?? "-"}
                </span>

                <button
                  type="button"
                  onClick={() => removeMaterialRow(i)}
                  className="text-red-500 text-xs px-2"
                >
                  ✕
                </button>

              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 py-2.5 rounded-lg text-black font-semibold hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Execute Production"}
        </button>
      </form>
    </Card>
  );
}
