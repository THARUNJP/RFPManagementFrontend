import { useEffect, useState } from "react";
import type { ShareRfpModalProps, Vendor } from "../types/types";
import { getVendorList } from "../service/vendor.service";
import { ITEMS_PER_PAGE } from "./constant";

export const ShareRfpModal: React.FC<ShareRfpModalProps> = ({
  isOpen,
  onClose,
  onShare,
}) => {
  const [search, setSearch] = useState("");
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);


  // Fetch vendors with search
  const fetchVendors = async (query: string) => {
    setLoading(true);
    try {
      const res = await getVendorList(1, ITEMS_PER_PAGE, query);
      setVendors(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  //  Debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchVendors(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  // Fetch initial vendors (empty search)
  useEffect(() => {
  if (!isOpen) {
    setSearch("");
    setSelectedVendors([]);
    setVendors([]);
    setLoading(false);
  }
}, [isOpen]);

  if (!isOpen) return null;

  const toggleVendor = (vendor: Vendor) => {
    if (selectedVendors.some((v) => v.vendor_id === vendor.vendor_id)) {
      setSelectedVendors(selectedVendors.filter((v) => v.vendor_id !== vendor.vendor_id));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4">Share RFP</h2>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedVendors.map((v) => (
            <div
              key={v.vendor_id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {v.name}
              <button
                onClick={() =>
                  setSelectedVendors(selectedVendors.filter((x) => x.vendor_id !== v.vendor_id))
                }
                className="text-blue-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Search box */}
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-3 focus:ring-1 focus:ring-blue-500"
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Vendor list */}
        <ul className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-1">
          {loading && <li className="text-gray-400 text-center">Searching...</li>}

          {!loading && vendors.length === 0 && (
            <li className="text-gray-400 text-center">No vendors found.</li>
          )}

          {!loading &&
            vendors.map((vendor) => {
              const isSelected = selectedVendors.some(
                (v) => v.vendor_id === vendor.vendor_id
              );

              return (
                <li
                  key={vendor.vendor_id}
                  onClick={() => toggleVendor(vendor)}
                  className={`p-2 rounded cursor-pointer flex justify-between hover:bg-gray-100 ${
                    isSelected ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  <span>{vendor.name}</span>
                  <span className="text-gray-500">{vendor.contact_email}</span>
                </li>
              );
            })}
        </ul>

        {/* Share */}
        <button
          onClick={() => onShare(selectedVendors)}
          disabled={selectedVendors.length === 0}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Share
        </button>
      </div>
    </div>
  );
};


