import api from "../clientApi/clientApi";
import type {
  AIRecommendationResponse,
  CreateRfpRequest,
  CreateRfpResponse,
  GetRfpListResponse,
  GetRfpProposalResponse,
  RfpStatusResponse,
  SendRfpToVendorPayload,
  Vendor,
} from "../types/types";

export async function createRfp(
  data: CreateRfpRequest
): Promise<CreateRfpResponse> {
  const res = await api.post<CreateRfpResponse>("/api/v1/rfp", data);
  return res.data;
}

export async function getRfpList(
  page: number = 1,
  limit: number = 10
): Promise<GetRfpListResponse> {
  const res = await api.get<GetRfpListResponse>(
    `/api/v1/rfp?page=${page}&limit=${limit}`
  );
  return res.data;
}

export async function getRfpById(rfpId: string): Promise<CreateRfpResponse> {
  const res = await api.get<CreateRfpResponse>(`/api/v1/rfp/${rfpId}`);
  return res.data;
}

export async function sendRfpToVendor(
  rfpId: string,
  vendorIds: Vendor[]
): Promise<SendRfpToVendorPayload> {
  const data = {
    vendor_ids: vendorIds.map((v) => v.vendor_id),
  };

  const res = await api.post<SendRfpToVendorPayload>(
    `/api/v1/rfp/${rfpId}/send`,
    data
  );

  return res.data;
}

export async function getRfpStatus(rfpId: string): Promise<RfpStatusResponse> {
  const res = await api.get<RfpStatusResponse>(`/api/v1/rfp/${rfpId}/status`);
  return res.data;
}

export async function getRfpProposals(
  rfpId: string
): Promise<GetRfpProposalResponse> {
  const res = await api.get<GetRfpProposalResponse>(
    `/api/v1/rfp/${rfpId}/proposal`
  );
  return res.data;
}

export async function getAIRecommendation(
  rfpId: string
): Promise<AIRecommendationResponse> {
  const res = await api.get<AIRecommendationResponse>(
    `/api/v1/rfp/${rfpId}/ai-recommendations`
  );
  return res.data;
}
