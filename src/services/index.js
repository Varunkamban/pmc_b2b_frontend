import baseAPI from "./baseAPI";
import createAPI from "./creatAPI";

// Auth
export const getLogin = (params) => createAPI.POST("/auth/login", params);

export const getRefreshTocken = (params) =>
  createAPI.POST("/auth/refresh-token", params);

export const getUserInfo = () => baseAPI.GET("/auth/me");

export const logout = () => baseAPI.POST("/auth/logout");

export const sendOtp = (params) => createAPI.POST("/auth/send-otp", params);

export const verifyOtp = (params) => createAPI.POST("/auth/verify-otp", params);

// Master data
export const getAllArea = () => baseAPI.GET("/master/areas");

export const getAllLocation = () => baseAPI.GET("/master/locations");

export const getDiningStatus = () => baseAPI.GET("/master/dining-status");

export const getSeatsStatusMatsers = () => baseAPI.GET("/master/seats-status");

// Attachments
export const uploadMultipleAttachmentFile = (params) => {
  const formData = new FormData();
  params.files.forEach((file) => formData.append("files", file));
  formData.append("module", params.body.module);
  formData.append("referenceId", params.body.referenceId);
  return baseAPI.POST("/attachments/upload", formData);
};

export const downloadedAttachmentFile = (params) =>
  baseAPI.GET(`/attachments/download/${params.id}`);

export const deleteAttachmentFile = (params) =>
  baseAPI.DELETE(`/attachments/${params.id}`);
