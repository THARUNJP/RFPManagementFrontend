import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProposalItem } from "../../types/types";
import { getRfpProposals } from "../../service/rfp.service";


const RfpProposalsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProposals() {
      if(!id) return;
      try {
        setLoading(true);
        const res = await getRfpProposals(id);
        setProposals(res.data);
      } catch (err) {
        setError("Failed to fetch proposals");
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Proposals for RFP: {id}
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          AI Recommendation
        </button>
      </div>

      {proposals.length === 0 ? (
        <div className="mt-10 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-gray-500 text-lg font-medium">
            Oops! No proposals submitted yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white">
            <table className="min-w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-4 text-left">Vendor Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Budget</th>
                  <th className="p-4 text-left">Payment Terms</th>
                  <th className="p-4 text-left">Delivery Timeline</th>
                  <th className="p-4 text-left">Warranty</th>
                  <th className="p-4 text-left">Completeness</th>
                </tr>
              </thead>

              <tbody className="text-gray-900">
                {proposals.map((proposal) => (
                  <tr
                    key={proposal.proposal_id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="p-4">{proposal.vendor_name}</td>
                    <td className="p-4">{proposal.vendor_contact_email}</td>
                    <td className="p-4">{proposal.vendor_phone}</td>
                    <td className="p-4">{proposal.items_summary}</td>
                    <td className="p-4">{proposal.budget}</td>
                    <td className="p-4">{proposal.payment_terms}</td>
                    <td className="p-4">{proposal.delivery_timeline}</td>
                    <td className="p-4">{proposal.warranty}</td>
                    <td className="p-4">{proposal.completeness_score}</td>
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

export default RfpProposalsPage;
