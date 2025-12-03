import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import CreateRFP from "./components/create-rfp";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rfp/create" element={<CreateRFP />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
