// Request Body
export interface CreateRfpRequest {
  title: string;
  description_raw: string;
}

// Structured Items
export interface StructuredItem {
  type: string;
  specs: string;
  quantity: number;
}

// Structured Description
export interface StructuredDescription {
  items: StructuredItem[];
  budget: number;
  warranty: string;
  payment_terms: string;
  delivery_timeline: string;
}

// Document returned by API
export interface RfpDocument {
  rfp_id: string;
  title: string;
  description_raw: string;
  description_structured: StructuredDescription;
  budget: string;
  delivery_timeline: string;
  payment_terms: string;
  warranty: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// Full API Response
export interface CreateRfpResponse {
  status: boolean;
  message: string;
  document: RfpDocument;
}

export interface GetRfpListResponse {
  status: boolean;
  message: string;
  data: RfpDocument[];
  total: number;
}

export interface Vendor {
  vendor_id: string;
  name: string;
  contact_email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface GetVendorListResponse {
  status: boolean;
  message: string;
  data: Vendor[];
  total: number;
}
export interface CreateVendorPayload {
  name: string;
  contact_email: string;
  phone: string;
}

export interface CreateVendorResponse {
  status: boolean;
  message: string;
  data: Vendor;
}

// Props: all available vendors
export interface ShareRfpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (selected: Vendor[]) => void;
}

export interface SendRfpToVendorPayload {
  status: boolean;
  message: string;
  rfp_id: string;
}

export interface RfpStatusItem {
  id: string;
  rfp_id: string;
  vendor_id: string;
  email_status: string;
  sent_at: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  name: string;
  contact_email: string;
  phone: string;
}

export interface RfpStatusResponse {
  status: boolean;
  message: string;
  data: RfpStatusItem[];
}

export interface ParsedProposalItem {
  type: string;
  specs: string;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
}

export interface ProposalItem {
  proposal_id: string;
  rfp_id: string;
  vendor_id: string;
  email_id: string;
  budget: number | null;
  warranty: string | null;
  total_price: number | null;
  payment_terms: string | null;
  delivery_timeline: string | null;
  completeness_score: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  items_summary: string; // flattened items as a string
  vendor_name: string;
  vendor_contact_email: string;
  vendor_phone: string;
}

export interface GetRfpProposalResponse {
  status: boolean;
  message: string;
  data: ProposalItem[];
}
