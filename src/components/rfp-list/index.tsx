import { useEffect, useState } from "react";
import { getRfpList } from "../../service/rfp.service";
import type { RfpDocument } from "../../types/types";



const ITEMS_PER_PAGE = 10;

const RfpListPage: React.FC = () => {
  const [rfps, setRfps] = useState<RfpDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);

 const fetchRfps = async () => {
  setLoading(true);
  try {
    const res = await getRfpList(page, ITEMS_PER_PAGE);

    // Adjust based on your real API response shape
    setRfps(res.data);
    setTotal(res.total);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRfps();
  }, [page]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold mb-6">All RFPs</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="space-y-4">
          {rfps?.map((rfp) => (
            <div
              key={rfp.rfp_id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-lg font-semibold">{rfp.title}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {/* {rfp.description} */}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(rfp.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-2 border rounded ${
            page === 1 ? "opacity-40" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-4 py-2 border rounded ${
                page === pageNum
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 border rounded ${
            page === totalPages ? "opacity-40" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RfpListPage;
