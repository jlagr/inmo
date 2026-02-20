"use client";

import { useState, useEffect, useCallback } from "react";
import { propertyTypeLabels, type Property, type PropertyType } from "@/data/properties";
import MultiSelect from "@/components/MultiSelect";
import PropertyListCard from "@/components/PropertyListCard";

const statusOptions = ["Comprar", "Rentar"];
const typeOptions = Object.entries(propertyTypeLabels).map(([, label]) => label);
const bedroomOptions = ["1", "2", "3", "4", "5"];
const parkingOptions = ["1", "2", "3", "4", "5"];

function typeLabelToKey(label: string): PropertyType | undefined {
  const entry = Object.entries(propertyTypeLabels).find(([, v]) => v === label);
  return entry ? (entry[0] as PropertyType) : undefined;
}

interface State {
  id: number;
  name: string;
}

export default function PropiedadesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [countyInput, setCountyInput] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [statuses, setStatuses] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [parking, setParking] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load states once on mount
  useEffect(() => {
    fetch("/api/states")
      .then((r) => r.json())
      .then(setStates)
      .catch(() => setStates([]));
  }, []);

  // Debounce county text input
  useEffect(() => {
    const timer = setTimeout(() => setCounty(countyInput), 400);
    return () => clearTimeout(timer);
  }, [countyInput]);

  const hasFilters =
    selectedStates.length > 0 ||
    county !== "" ||
    statuses.length > 0 ||
    types.length > 0 ||
    bedrooms.length > 0 ||
    parking.length > 0;

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (selectedStates.length > 0) {
        const ids = selectedStates
          .map((name) => states.find((s) => s.name === name)?.id)
          .filter(Boolean) as number[];
        if (ids.length > 0) params.set("state_id", ids.join(","));
      }
      if (county) params.set("county", county);
      if (statuses.length > 0) {
        const mapped = statuses.map((s) => (s === "Comprar" ? "venta" : "renta"));
        params.set("status", mapped.join(","));
      }
      if (types.length > 0) {
        const typeKeys = types.map(typeLabelToKey).filter(Boolean) as PropertyType[];
        params.set("type", typeKeys.join(","));
      }
      if (bedrooms.length > 0) params.set("bedrooms", bedrooms.join(","));
      if (parking.length > 0) params.set("parking", parking.join(","));

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data: Property[] = await res.json();

      if (!hasFilters) {
        setFiltered(data.slice(0, 5));
      } else {
        setFiltered(data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, [selectedStates, states, county, statuses, types, bedrooms, parking, hasFilters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const clearFilters = () => {
    setSelectedStates([]);
    setCountyInput("");
    setCounty("");
    setStatuses([]);
    setTypes([]);
    setBedrooms([]);
    setParking([]);
  };

  const filterBase = "min-w-[160px] px-3 py-2 text-sm rounded-lg border transition";
  const filterActive = "border-blue-500 bg-blue-50 text-blue-700";
  const filterIdle = "border-gray-300 bg-white text-gray-700 hover:border-gray-400";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Propiedades</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-gray-50 rounded-xl">
        <MultiSelect
          label="Estado"
          options={states.map((s) => s.name)}
          selected={selectedStates}
          onChange={setSelectedStates}
        />

        {/* County free-text input */}
        <input
          type="text"
          placeholder="Municipio"
          value={countyInput}
          onChange={(e) => setCountyInput(e.target.value)}
          className={`${filterBase} outline-none ${countyInput ? filterActive + " placeholder:text-blue-400" : filterIdle + " placeholder:text-gray-400"}`}
        />

        <MultiSelect
          label="Comprar / Rentar"
          options={statusOptions}
          selected={statuses}
          onChange={setStatuses}
        />
        <MultiSelect
          label="Tipo de propiedad"
          options={typeOptions}
          selected={types}
          onChange={setTypes}
        />
        <MultiSelect
          label="Recámaras"
          options={bedroomOptions}
          selected={bedrooms}
          onChange={setBedrooms}
        />
        <MultiSelect
          label="Estacionamientos"
          options={parkingOptions}
          selected={parking}
          onChange={setParking}
        />
        <button
          onClick={clearFilters}
          disabled={!hasFilters}
          className={`text-sm font-medium ml-auto cursor-pointer ${hasFilters ? "text-red-500 hover:text-red-600" : "text-gray-300 cursor-default"}`}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {loading
          ? "Cargando propiedades..."
          : hasFilters
            ? `${filtered.length} propiedad${filtered.length !== 1 ? "es" : ""} encontrada${filtered.length !== 1 ? "s" : ""}`
            : "Últimas propiedades agregadas"}
      </p>

      {/* Property list */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="flex flex-col gap-5">
          {filtered.map((property) => (
            <PropertyListCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            No se encontraron propiedades con los filtros seleccionados.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
