import React, { useState } from "react";

interface StructuredRFP {
  title: string;
  description: string;
  items: { type: string; quantity: number; specs: string }[];
  budget: number;
  delivery_timeline: string;
  payment_terms: string;
  warranty: string;
}

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
      const example: StructuredRFP = {
        title,
        description,
        items: [
          {
            type: "Laptop",
            quantity: 10,
            specs: "Intel i7, 16GB RAM, 512GB SSD",
          },
          {
            type: "Monitor",
            quantity: 10,
            specs: "24-inch FHD IPS Display",
          },
        ],
        budget: 250000,
        delivery_timeline: "Within 15 days from PO",
        payment_terms: "50% advance, 50% after delivery",
        warranty: "1-year onsite warranty for all items",
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGeneratedRFP(example);
    } catch {
      setError("Something went wrong.");
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
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded mb-4"
          placeholder="Describe your procurement needs…"
        />

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
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
                <span className="font-semibold">Description:</span>{" "}
                {generatedRFP.description}
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
                <span className="font-semibold">Budget:</span> ₹
                {generatedRFP.budget.toLocaleString()}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Delivery Timeline:</span>{" "}
                {generatedRFP.delivery_timeline}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Payment Terms:</span>{" "}
                {generatedRFP.payment_terms}
              </p>

              <p className="mb-2">
                <span className="font-semibold">Warranty:</span>{" "}
                {generatedRFP.warranty}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRFP;
