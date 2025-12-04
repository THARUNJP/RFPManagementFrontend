import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import CreateRFP from "./components/create-rfp";
import RfpListPage from "./components/rfp-list";
import Test from "./components/test";
import VendorListPage from "./components/vendor-list";

// need to implement lazy load if time is there
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rfp/create" element={<CreateRFP />} />
        <Route path="/rfp/list" element={<RfpListPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/vendor/list" element={<VendorListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
