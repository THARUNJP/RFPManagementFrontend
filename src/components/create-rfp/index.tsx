import React, { useState } from "react";

interface StructuredRFP {
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

    setError("");
    setLoading(true);

    try {
      // Call backend AI API
      const response = await fetch("/rfps/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error("Failed to generate RFP.");

      const data: StructuredRFP = await response.json();
      setGeneratedRFP(data);
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
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded mb-4"
          placeholder="Describe your procurement needs in natural language..."
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
          <h2 className="text-xl font-semibold mb-4">Generated RFP JSON</h2>
          <pre className="overflow-x-auto bg-white p-4 rounded border">
            {JSON.stringify(generatedRFP, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CreateRFP;
