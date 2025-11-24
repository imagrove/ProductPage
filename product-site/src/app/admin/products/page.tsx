"use client";

import { useEffect, useMemo, useState } from "react";
import client from "../../../../tina/__generated__/client";

type ProductNode = {
  id: string;
  title: string;
  description: string;
  excerpt?: string | null;
  price: number;
  image: string;
  sku: string;
  stock: number;
  category?: string | null;
  slug: string;
  published?: boolean | null;
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<ProductNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ProductNode | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res: any = await (client as any).queries.productConnection();
        const edges = res?.data?.productConnection?.edges || [];
        const list: ProductNode[] = edges
          .map((e: any) => e?.node)
          .filter(Boolean);
        setItems(list);
      } catch (e: any) {
        setError(e?.message || "加载产品列表失败");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSelect = async (p: ProductNode) => {
    try {
      setError(null);
      // 优先单文档查询以获取最新
      const doc: any = await (client as any).queries.product({ relativePath: `${p.slug}.md` });
      const node: ProductNode = doc?.data?.product || p;
      setSelected(node);
    } catch {
      setSelected(p);
    }
  };

  const form = useMemo(() => {
    if (!selected) return null;
    return (
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setSaving(true);
            setError(null);
            const params: any = {
              title: selected.title,
              description: selected.description,
              excerpt: selected.excerpt ?? "",
              price: Number(selected.price) || 0,
              image: selected.image,
              sku: selected.sku,
              stock: Number(selected.stock) || 0,
              category: selected.category ?? "",
              slug: selected.slug,
              published: !!selected.published,
            };
            const mutation = `mutation UpdateProduct($relativePath: String!, $params: ProductMutation!) {
              updateProduct(relativePath: $relativePath, params: $params) {
                id title description excerpt price image sku stock category slug published
              }
            }`;
            const req: any = await (client as any).request({
              query: mutation,
              variables: {
                relativePath: `${selected.slug}.md`,
                params,
              },
            });
            const updated: ProductNode = req?.data?.updateProduct || selected;
            setSelected(updated);
            // 同步列表数据
            setItems((prev) => prev.map((i) => (i.slug === updated.slug ? updated : i)));
          } catch (e: any) {
            setError(e?.message || "保存失败");
          } finally {
            setSaving(false);
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-600">Title</span>
            <input className="mt-1 w-full border rounded px-3 py-2"
              value={selected.title}
              onChange={(e) => setSelected({ ...(selected as ProductNode), title: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">SKU</span>
            <input className="mt-1 w-full border rounded px-3 py-2"
              value={selected.sku}
              onChange={(e) => setSelected({ ...(selected as ProductNode), sku: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Price</span>
            <input type="number" className="mt-1 w-full border rounded px-3 py-2"
              value={selected.price}
              onChange={(e) => setSelected({ ...(selected as ProductNode), price: Number(e.target.value) })}
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Stock</span>
            <input type="number" className="mt-1 w-full border rounded px-3 py-2"
              value={selected.stock}
              onChange={(e) => setSelected({ ...(selected as ProductNode), stock: Number(e.target.value) })}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-gray-600">Image</span>
            <input className="mt-1 w-full border rounded px-3 py-2"
              value={selected.image}
              onChange={(e) => setSelected({ ...(selected as ProductNode), image: e.target.value })}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm text-gray-600">Description</span>
            <textarea className="mt-1 w-full border rounded px-3 py-2"
              value={selected.description}
              onChange={(e) => setSelected({ ...(selected as ProductNode), description: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Category</span>
            <input className="mt-1 w-full border rounded px-3 py-2"
              value={selected.category || ""}
              onChange={(e) => setSelected({ ...(selected as ProductNode), category: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Slug</span>
            <input className="mt-1 w-full border rounded px-3 py-2"
              value={selected.slug}
              onChange={(e) => setSelected({ ...(selected as ProductNode), slug: e.target.value })}
            />
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={!!selected.published}
              onChange={(e) => setSelected({ ...(selected as ProductNode), published: e.target.checked })}
            />
            <span className="text-sm text-gray-600">Published</span>
          </label>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="mt-4">
          <button disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400">
            {saving ? "Saving..." : "Save"}
          </button>
          <a href={`/products/${selected.slug}`} className="ml-3 text-blue-600 underline">View product page</a>
        </div>
      </form>
    );
  }, [selected, saving, error]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Admin - Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-3">Product List</h2>
              <ul className="space-y-2">
                {items.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border rounded px-3 py-2">
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-sm text-gray-600">SKU: {p.sku} · Price: {p.price} · Stock: {p.stock}</div>
                    </div>
                    <button className="text-blue-600 underline" onClick={() => onSelect(p)}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Editor</h2>
              {selected ? form : <p className="text-gray-600">Select a product to edit</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}