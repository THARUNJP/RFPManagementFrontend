import api from "../clientApi/clientApi";
import type { CreateVendorPayload, CreateVendorResponse, GetVendorListResponse } from "../types/types";


export async function getVendorList(
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<GetVendorListResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search.trim(),
  });

  const res = await api.get<GetVendorListResponse>(`/api/v1/vendor?${params.toString()}`);
  return res.data;
}

export async function createVendor(
  payload: CreateVendorPayload
): Promise<CreateVendorPayload> {
  const res = await api.post<CreateVendorPayload>("/api/v1/vendor", payload);
  return res.data;
}

export async function getVendorById(
  vendorId: string
): Promise<CreateVendorResponse> {
  const res = await api.get<CreateVendorResponse>(`/api/v1/vendor/${vendorId}`);
  return res.data;
}
