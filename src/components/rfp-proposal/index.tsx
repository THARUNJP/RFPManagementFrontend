import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAIRecommendation,
  getRfpProposals,
} from "../../service/rfp.service";
import type { AIRecommendation, ProposalItem } from "../../types/types";

const RfpProposalsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIRecommendation | null>(null);

  useEffect(() => {
    async function fetchProposals() {
      if (!id) return;

      setLoading(true);
      try {
        const res = await getRfpProposals(id);
        setProposals(res.data);
      } catch {
        setError("Failed to fetch proposals");
      } finally {
        setLoading(false);
      }
    }

    fetchProposals();
  }, [id]);

  const handleAIRecommendation = async () => {
    if (!id) return;
    setShowModal(true);
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await getAIRecommendation(id);
      setAiResult(res.recomendation);
    } catch (err) {
      setAiResult({
        message: "Failed to fetch AI recommendation",
        best_proposal_id: "",
        reason: (err as Error).message,
        vendor: {
          vendor_id: "",
          name: "",
          contact_email: "",
          phone: "",
        },
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Sort proposals: highest completeness_score first
  const sortedProposals = [...proposals].sort(
    (a, b) => (b.completeness_score || 0) - (a.completeness_score || 0)
  );

  const recommendedId =
    sortedProposals.length > 0 ? sortedProposals[0].proposal_id : null;

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Proposals for RFP: {id}
        </h1>

        <button
          onClick={handleAIRecommendation}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          AI Recommendation
        </button>
      </div>

      {sortedProposals.length === 0 ? (
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
                {sortedProposals.map((proposal) => (
                  <tr
                    key={proposal.proposal_id}
                    className={`border-b border-gray-200 transition ${
                      proposal.proposal_id === recommendedId
                        ? "bg-blue-50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="p-4 font-medium flex items-center gap-2">
                      {proposal.vendor_name}
                      {proposal.proposal_id === recommendedId && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Recommended
                        </span>
                      )}
                    </td>

                    <td className="p-4">{proposal.vendor_contact_email}</td>
                    <td className="p-4">{proposal.vendor_phone}</td>
                    <td className="p-4">{proposal.items_summary}</td>
                    <td className="p-4">{proposal.budget}</td>
                    <td className="p-4">{proposal.payment_terms}</td>
                    <td className="p-4">{proposal.delivery_timeline}</td>
                    <td className="p-4">{proposal.warranty}</td>
                    <td className="p-4 font-semibold">
                      {proposal.completeness_score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Recommendation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {aiLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-b-4 border-gray-200"></div>
                <p className="text-gray-700 text-center font-medium">
                  Fetching AI Recommendation… This may take 1–2 minutes, please
                  wait.
                </p>
              </div>
            ) : aiResult ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Best Proposal: {aiResult.best_proposal_id}
                </h2>
                <p className="text-gray-700">{aiResult.reason}</p>

                <div className="mt-4 border-t pt-4">
                  <h3 className="font-medium text-gray-900">Vendor Details</h3>
                  <p>Name: {aiResult.vendor.name}</p>
                  <p>Email: {aiResult.vendor.contact_email}</p>
                  <p>Phone: {aiResult.vendor.phone}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-center">
                No recommendation found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RfpProposalsPage;
