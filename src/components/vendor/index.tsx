import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vendor } from "../../types/types";
import { getVendorById } from "../../service/vendor.service";


const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendor() {
      if (!id) return;

      try {
        const res = await getVendorById(id);
        setVendor(res.data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendor();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading Vendor…</p>;
  }

  if (!vendor) {
    return <p className="p-10 text-red-500">Vendor not found.</p>;
  }

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl border border-gray-200">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-6">Vendor Details</h1>

        {/* Vendor Information */}
        <div className="space-y-4">
          <p><strong>Name:</strong> {vendor.name}</p>
          <p><strong>Email:</strong> {vendor.contact_email}</p>
          <p><strong>Phone:</strong> {vendor.phone}</p>

         
          {vendor.created_at && (
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(vendor.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
