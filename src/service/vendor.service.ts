import api from "../clientApi/clientApi";
import type { GetVendorListResponse } from "../types/types";


export async function getVendorList(
  page: number = 1,
  limit: number = 10
): Promise<GetVendorListResponse> {
  const res = await api.get<GetVendorListResponse>(
    `/api/v1/vendor?page=${page}&limit=${limit}`
  );
  return res.data;
}