import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans text-gray-900">
        <main className="p-6">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
