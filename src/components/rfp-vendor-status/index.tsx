import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RfpStatusItem } from "../../types/types";
import { getRfpStatus } from "../../service/rfp.service";

const RfpVendorStatusPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<RfpStatusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const res = await getRfpStatus(id);
        setData(res.data || []);
      } catch {
        setError("Failed to fetch vendor status");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return <div className="p-6 text-gray-300 text-lg">Loading...</div>;

  if (error) return <div className="p-6 text-red-400 text-lg">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Vendor Status for RFP: {id}
      </h1>

      {/* Empty-state */}
      {data.length === 0 && (
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-200 text-lg font-medium">
            Oops! No emails have been sent to vendors yet.
          </p>
          <p className="text-gray-400 mt-1">
            Once you share the RFP, vendor statuses will appear here.
          </p>
        </div>
      )}

      {data.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <div className="rounded-xl border border-gray-300 shadow-md overflow-hidden bg-white">
            <table className="min-w-full text-gray-800">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Vendor Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Sent At</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.contact_email}</td>
                    <td className="p-4">{item.phone}</td>
                    <td className="p-4 capitalize">{item.email_status}</td>
                    <td className="p-4">
                      {new Date(item.sent_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RfpVendorStatusPage;
