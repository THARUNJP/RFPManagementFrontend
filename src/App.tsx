import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<div className="text-red-500">Home Page</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
