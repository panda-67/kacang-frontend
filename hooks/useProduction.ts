import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { showError, showSuccess } from "@/lib/alert";

type Product = {
  id: string;
  name: string;
  unit: string;
};

type Material = {
  id: string;
  name: string;
  default_unit_cost: number;
  unit: string;
};

type MaterialInput = {
  material_id: string;
  quantity_used: number;
  unit_cost: number;
};


export function useProductionForm(apiUrl: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [productId, setProductId] = useState("");
  const [outputQty, setOutputQty] = useState(0);
  const [items, setItems] = useState<MaterialInput[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodResult, matResult] = await Promise.all([
          apiFetch(`${apiUrl}/products`),
          apiFetch(`${apiUrl}/materials`)
        ]);
        setProducts(prodResult);
        setMaterials(matResult.map((m: Material) => ({ ...m, id: String(m.id) })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [apiUrl]);

  function addMaterialRow() {
    setItems([...items, { material_id: "", quantity_used: 0, unit_cost: 0 }]);
  }

  function removeMaterialRow(index: number) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function updateMaterial(index: number, updates: Partial<MaterialInput>) {
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, ...updates } : item))
    );
  }

  async function submit() {
    if (!productId) { showError("Product required"); return; }
    if (!outputQty || outputQty <= 0) { showError("Output quantity must be greater then 0"); return; }
    if (items.length === 0) { showError("At least one material required"); return; }

    setLoading(true);
    setMessage(null);

    try {
      const res = await apiFetch(`${apiUrl}/inventory/${productId}/production`, {
        method: "POST",
        body: JSON.stringify({ quantity: outputQty, materials: items }),
      });

      await showSuccess(res.message || "Production executed successfully");

      setProductId("");
      setOutputQty(0);
      setItems([]);

    } catch (err: any) {
      showError(err.message || "Error executing production");
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    materials,
    productId,
    setProductId,
    outputQty,
    setOutputQty,
    items,
    addMaterialRow,
    removeMaterialRow,
    updateMaterial,
    loading,
    message,
    submit
  };
}
