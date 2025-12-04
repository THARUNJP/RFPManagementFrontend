import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRfpList } from "../../service/rfp.service";
import type { RfpDocument, Vendor } from "../../types/types";
import { getVendorList } from "../../service/vendor.service";

const Dashboard: React.FC = () => {
  const [rfps, setRfps] = useState<RfpDocument[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingRfp, setLoadingRfp] = useState(true);
  const [loadingVendor, setLoadingVendor] = useState(true);

  useEffect(() => {
    async function fetchRfps() {
      try {
        const res = await getRfpList(1, 4);
        setRfps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRfp(false);
      }
    }

    async function fetchVendors() {
      try {
        const res = await getVendorList();
        setVendors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingVendor(false);
      }
    }

    fetchRfps();
    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-8 justify-center">

        {/* ------------------ LEFT: RFP LIST ------------------ */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-1/2 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Recent RFPs</h2>
            <Link
              to="/rfp/create"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create RFP
            </Link>
          </div>

          <div className="relative max-h-72 overflow-hidden">
            {loadingRfp ? (
              <p className="text-gray-500">Loading…</p>
            ) : (
              <ul className="space-y-4">
                {rfps?.map((rfp) => (
                  <li
                    key={rfp.rfp_id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-semibold">{rfp.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Budget: ${rfp.budget}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(rfp.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/rfp/list"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-black transition"
            >
              See More
            </Link>
          </div>
        </div>

        {/* ------------------ RIGHT: VENDOR LIST ------------------ */}
        <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-1/2 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Vendors</h2>
            <Link
              to="/vendors/create"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Vendor
            </Link>
          </div>

          <div className="relative max-h-72 overflow-hidden">
            {loadingVendor ? (
              <p className="text-gray-500">Loading…</p>
            ) : (
              <ul className="space-y-4">
                {vendors?.map((vendor) => (
                  <li
                    key={vendor.vendor_id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.contact_email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(vendor.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/vendors"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-black transition"
            >
              See More
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
