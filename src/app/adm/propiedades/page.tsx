"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import frinmoLogo from "@/app/frinmo_logo.png";
import { propertyTypeLabels, type PropertyType } from "@/data/properties";
import ImageUploadDialog from "@/components/ImageUploadDialog";

interface State {
  id: number;
  name: string;
}

interface PropertyRow {
  id: number;
  title: string;
  type: string;
  status: string;
  state_id: number;
  state: State;
  county: string;
  address: string;
  description: string;
  square_meters: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  image: string;
  gallery: string[];
  price: string;
  show_price: boolean;
  lat: number;
  lng: number;
  active: boolean;
  sold: boolean;
}

interface FormData {
  title: string;
  type: string;
  status: string;
  state_id: number;
  county: string;
  address: string;
  description: string;
  square_meters: number | string;
  bedrooms: number | string;
  bathrooms: number | string;
  parking: number | string;
  images: string[];
  price: string;
  show_price: boolean;
  lat: number | string;
  lng: number | string;
  active: boolean;
  sold: boolean;
}

const emptyForm: FormData = {
  title: "",
  type: "casa",
  status: "venta",
  state_id: 0,
  county: "",
  address: "",
  description: "",
  square_meters: 0,
  bedrooms: 0,
  bathrooms: 0,
  parking: 0,
  images: [],
  price: "",
  show_price: false,
  lat: 0,
  lng: 0,
  active: true,
  sold: false,
};

const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

export default function AdminPropiedadesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProperties = useCallback(async () => {
    const res = await fetch("/api/admin/properties");
    if (res.status === 401) {
      router.replace("/adm");
      return;
    }
    setProperties(await res.json());
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchProperties();
    fetch("/api/states")
      .then((r) => r.json())
      .then(setStates);
  }, [fetchProperties]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/adm");
  };

  const set = (field: keyof FormData, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const openNew = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: PropertyRow) => {
    setEditingId(p.id);
    // Merge image + gallery deduplicating; first = main image
    const images = p.image
      ? [p.image, ...p.gallery.filter((g) => g !== p.image)]
      : [...p.gallery];
    setFormData({
      title: p.title,
      type: p.type,
      status: p.status,
      state_id: p.state_id,
      county: p.county,
      address: p.address,
      description: p.description,
      square_meters: p.square_meters,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      parking: p.parking,
      images,
      price: p.price,
      show_price: p.show_price,
      lat: p.lat,
      lng: p.lng,
      active: p.active,
      sold: p.sold,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const { images, ...rest } = formData;
    const payload = {
      ...rest,
      image: images[0] ?? "",
      gallery: images,
      state_id: Number(formData.state_id),
      square_meters: Number(formData.square_meters),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      parking: Number(formData.parking),
      lat: Number(formData.lat),
      lng: Number(formData.lng),
    };

    const url = editingId
      ? `/api/admin/properties/${editingId}`
      : "/api/admin/properties";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    setModalOpen(false);
    await fetchProperties();
  };

  const toggleActive = async (p: PropertyRow) => {
    await fetch(`/api/admin/properties/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, active: !p.active }),
    });
    await fetchProperties();
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleUploadAccept = (urls: string[]) => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    setUploadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm h-14 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src={frinmoLogo} alt="FR Inmobiliaria" width={30} height={30} />
          <span className="text-base font-bold tracking-wide text-gray-900">INMOBILIARIA</span>
        </Link>
        <span className="mx-3 text-gray-300">|</span>
        <span className="text-gray-500 text-sm">Administrador</span>
        <button
          onClick={logout}
          className="ml-auto text-sm text-gray-500 hover:text-red-500 transition cursor-pointer"
        >
          Cerrar sesión
        </button>
      </nav>

      {/* Content */}
      <main className="pt-26.5 px-6 pb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
          <button
            onClick={openNew}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            + Nueva propiedad
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 w-10">#</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Estado / Municipio</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Precio</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Activa</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Vendida</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((p) => (
                  <tr key={p.id} className={`hover:bg-gray-50 ${!p.active ? "opacity-50" : ""}`}>
                    <td className="px-4 py-3 text-gray-400 text-xs">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-50 truncate">
                      {p.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {propertyTypeLabels[p.type as PropertyType] ?? p.type}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {p.state?.name} / {p.county}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {p.show_price ? (
                        p.price
                      ) : (
                        <span className="text-gray-400 italic text-xs">Oculto</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${p.active ? "bg-green-500" : "bg-red-400"}`}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.sold && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          Sí
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEdit(p)}
                          title="Editar"
                          className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleActive(p)}
                          title={p.active ? "Desactivar" : "Activar"}
                          className={`cursor-pointer ${p.active ? "text-gray-400 hover:text-red-500" : "text-gray-400 hover:text-green-500"}`}
                        >
                          {p.active ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center py-8 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId ? "Editar propiedad" : "Nueva propiedad"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal form */}
              <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className={labelCls}>Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => set("title", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Type + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Tipo de propiedad</label>
                    <select
                      value={formData.type}
                      onChange={(e) => set("type", e.target.value)}
                      className={inputCls}
                    >
                      {Object.entries(propertyTypeLabels).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Operación</label>
                    <select
                      value={formData.status}
                      onChange={(e) => set("status", e.target.value)}
                      className={inputCls}
                    >
                      <option value="venta">Venta</option>
                      <option value="renta">Renta</option>
                    </select>
                  </div>
                </div>

                {/* State + County */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Estado</label>
                    <select
                      value={formData.state_id}
                      onChange={(e) => set("state_id", Number(e.target.value))}
                      className={inputCls}
                    >
                      <option value={0}>Seleccionar estado</option>
                      {states.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Municipio</label>
                    <input
                      type="text"
                      value={formData.county}
                      onChange={(e) => set("county", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className={labelCls}>Dirección</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => set("address", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={labelCls}>Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Specs */}
                <div className="grid grid-cols-4 gap-3">
                  {(
                    [
                      ["square_meters", "m²"],
                      ["bedrooms", "Recámaras"],
                      ["bathrooms", "Baños"],
                      ["parking", "Estac."],
                    ] as [keyof FormData, string][]
                  ).map(([field, label]) => (
                    <div key={field}>
                      <label className={labelCls}>{label}</label>
                      <input
                        type="number"
                        min={0}
                        value={formData[field] as number}
                        onChange={(e) => set(field, e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>

                {/* Price + show_price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Precio</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => set("price", e.target.value)}
                      placeholder="$1,000,000"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.show_price}
                        onChange={(e) => set("show_price", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Mostrar precio</span>
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className={labelCls}>
                    Imágenes
                    {formData.images.length > 0 && (
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        La primera es la imagen principal
                      </span>
                    )}
                  </label>

                  {/* Thumbnail gallery */}
                  {formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.images.map((url, i) => (
                        <div
                          key={i}
                          className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          {i === 0 && (
                            <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] leading-tight px-1 py-0.5 rounded font-medium">
                              Principal
                            </span>
                          )}
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute bottom-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow cursor-pointer transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setUploadDialogOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {formData.images.length > 0 ? "Agregar más imágenes" : "Subir imágenes"}
                  </button>
                </div>

                {/* Lat + Lng */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Latitud</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => set("lat", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Longitud</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) => set("lng", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Active + Sold */}
                <div className="flex gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => set("active", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Propiedad activa</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.sold}
                      onChange={(e) => set("sold", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Vendida / Rentada</span>
                  </label>
                </div>
              </div>

              {/* Modal footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer"
                >
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image upload dialog — renders on top of the edit modal */}
      <ImageUploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onAccept={handleUploadAccept}
      />
    </div>
  );
}
