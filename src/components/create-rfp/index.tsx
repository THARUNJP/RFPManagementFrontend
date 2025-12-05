import React, { useState } from "react";
import type { CreateRfpRequest, CreateRfpResponse, StructuredRFP } from "../../types/types";
import { createRfp } from "../../service/rfp.service";

const CreateRFP: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [generatedRFP, setGeneratedRFP] = useState<StructuredRFP | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Generate structured RFP locally
      const example: StructuredRFP = {
        title,
        description,
        items: [
          { type: "Laptop", quantity: 10, specs: "Intel i7, 16GB RAM, 512GB SSD" },
          { type: "Monitor", quantity: 10, specs: "24-inch FHD IPS Display" },
        ],
        budget: 250000,
        delivery_timeline: "Within 15 days from PO",
        payment_terms: "50% advance, 50% after delivery",
        warranty: "1-year onsite warranty for all items",
      };

      // Send to backend API
      const payload: CreateRfpRequest = {
        title: example.title,
        description_raw: example.description,
      };
      const res: CreateRfpResponse = await createRfp(payload);

      // Set generated RFP from backend response
      setGeneratedRFP({
        title: res.document.title,
        description: res.document.description_raw,
        items: res.document.description_structured.items,
        budget: res.document.description_structured.budget,
        delivery_timeline: res.document.description_structured.delivery_timeline,
        payment_terms: res.document.description_structured.payment_terms,
        warranty: res.document.description_structured.warranty,
      });

      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Create New RFP</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          placeholder="E.g., Laptop & Monitor Procurement"
          disabled={loading}
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded mb-4"
          placeholder="Describe your procurement needs…"
          disabled={loading}
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4z"
              ></path>
            </svg>
          )}
          {loading ? "Generating..." : "Generate RFP"}
        </button>
      </div>

      {generatedRFP && (
        <div className="bg-gray-50 p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Generated RFP Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-2">
                <span className="font-semibold">Title:</span> {generatedRFP.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span> {generatedRFP.description}
              </p>

              <p className="mb-2 font-semibold">Items:</p>
              <ul className="ml-4 mb-2 list-disc">
                {generatedRFP.items.map((item, i) => (
                  <li key={i}>
                    {item.type}: qty {item.quantity}, {item.specs}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2">
                <span className="font-semibold">Budget:</span> ₹{generatedRFP.budget.toLocaleString()}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Delivery Timeline:</span> {generatedRFP.delivery_timeline}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Terms:</span> {generatedRFP.payment_terms}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Warranty:</span> {generatedRFP.warranty}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRFP;