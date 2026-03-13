import Config from "../config";

export const API_BASE = Config.apiBaseUrl;

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh-token"
};