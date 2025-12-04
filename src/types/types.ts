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