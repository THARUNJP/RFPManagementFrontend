import api from "../clientApi/clientApi";
import type { CreateRfpRequest, CreateRfpResponse } from "../types/types";




export async function createRfp(
  data: CreateRfpRequest
): Promise<CreateRfpResponse> {
  const res = await api.post<CreateRfpResponse>("/api/v1/rfp", data);
  return res.data;
}