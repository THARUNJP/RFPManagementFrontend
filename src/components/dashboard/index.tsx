import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
        <h2 className="text-xl font-medium mb-4">RFP Management</h2>

        <Link
          to="/rfp/create"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create RFP
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
