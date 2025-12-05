import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { RfpDocument, Vendor } from "../../types/types";
import { getRfpById, sendRfpToVendor } from "../../service/rfp.service";
import { ShareRfpModal } from "../../lib/modal";

const RfpDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [rfp, setRfp] = useState<RfpDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRfp() {
      if (!id) return;
      try {
        const res = await getRfpById(id); // returns single RFP object
        setRfp(res.document);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRfp();
  }, [id]);
  const handleOnShare = useCallback(
    async (selectedVendors: Vendor[]) => {
      if (!id) return;
      try {
        setLoading(true);

        const response = await sendRfpToVendor(id, selectedVendors);

        // TODO: Replace with toast success
        alert(response.message || "Emails sent successfully");

        setIsShareOpen(false); // close modal after sending
      } catch (error) {
        console.error("Error sending email to vendors:", error);

        // TODO: Replace with toast error
        alert("Something went wrong while sending emails");
      } finally {
        setLoading(false);
      }
    },
    [id] // important — needs 'id'
  );

  if (loading) {
    return <p className="p-10 text-gray-500">Loading RFP…</p>;
  }

  if (!rfp) {
    return <p className="p-10 text-red-500">RFP not found.</p>;
  }

  return (
    <div className="min-h-screen p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl border border-gray-200">
        {/* Title + Right Buttons */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-semibold">{rfp.title}</h1>

          <div className="flex gap-3">
            <Link
              to="status"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition hover:bg-blue-700 cursor-pointer inline-block"
            >
              Vendor Status
            </Link>

            <Link
              to="proposals"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition hover:bg-blue-700 cursor-pointer inline-block"
            >
              Proposals
            </Link>
          </div>
        </div>

        {/* Human-readable RFP Content */}
        <div className="prose max-w-full mb-6 space-y-4 md:space-y-8">
          <p>{rfp.description_raw}</p>

          <p>
            <strong>Budget:</strong> ${rfp.description_structured.budget}
          </p>

          <p>
            <strong>Delivery Timeline:</strong>{" "}
            {rfp.description_structured.delivery_timeline}
          </p>

          <p>
            <strong>Payment Terms:</strong>{" "}
            {rfp.description_structured.payment_terms}
          </p>

          <p>
            <strong>Warranty:</strong> {rfp.description_structured.warranty}
          </p>

          {rfp.description_structured.items?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-medium mb-2">Items</h2>
              <ul className="list-disc list-inside space-y-2">
                {rfp.description_structured.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.type}</strong> — Quantity: {item.quantity},
                    Specs: {item.specs}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Share Modal */}
        <ShareRfpModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          onShare={(selected) => handleOnShare(selected)}
        />

        {/* Share Button */}
        <div className="mt-6 text-right">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsShareOpen(true)}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RfpDetails;
