import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import CreateRFP from "./components/create-rfp";
import RfpListPage from "./components/rfp-list";
import Test from "./components/test";
import VendorListPage from "./components/vendor-list";
import RfpDetails from "./components/rfp";
import CreateVendor from "./components/create-vendor";
import VendorDetails from "./components/vendor";
import RfpVendorStatusPage from "./components/rfp-vendor-status";
import RfpProposalsPage from "./components/rfp-proposal";

// At last need to implement lazy load if time is there
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rfp/create" element={<CreateRFP />} />
        <Route path="/rfp/list" element={<RfpListPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/vendor/list" element={<VendorListPage />} />
        <Route path="/rfp/:id" element={<RfpDetails />} />
        <Route path="/vendor/create" element={<CreateVendor />} />
        <Route path="/vendor/:id" element={<VendorDetails />} />
        <Route path="/rfp/:id/status" element={<RfpVendorStatusPage />} />
        <Route path="/rfp/:id/proposals" element={<RfpProposalsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
