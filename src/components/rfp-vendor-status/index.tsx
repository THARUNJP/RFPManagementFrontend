import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RfpStatusItem } from "../../types/types";
import { getRfpStatus } from "../../service/rfp.service";


const RfpVendorStatusPage: React.FC = () => {
  const { rfpId } = useParams<{ rfpId: string }>();
  const [data, setData] = useState<RfpStatusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rfpId) return;

    async function fetchStatus() {
        if(!rfpId) return
      try {
        setLoading(true);
        const res = await getRfpStatus(rfpId);
        setData(res.data);
      } catch (err: any) {
        setError("Failed to fetch vendor status");
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [rfpId]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-white mb-4">
        Vendor Status for RFP: {rfpId}
      </h1>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">Vendor Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Sent At</th>
            </tr>
          </thead>

          <tbody className="text-white">
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.contact_email}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3 capitalize">{item.email_status}</td>
                <td className="p-3">
                  {new Date(item.sent_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RfpVendorStatusPage;
