import api from "../clientApi/clientApi";
import type {
  CreateRfpRequest,
  CreateRfpResponse,
  GetRfpListResponse,
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
