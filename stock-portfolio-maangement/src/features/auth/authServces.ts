import { LoginPayload } from './authTypes';
import api from "@/services/api";
import { API_ENDPOINTS } from "@/app/constants/apiEndpoints";



export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post(
    API_ENDPOINTS.LOGIN,
    payload
  );

  return response.data;
};