/** Check local workspace exist */
export const issetActiveWorkSpace = () => {
  return !!localStorage.getItem("workspaceId");
};

/** Check local authtype exist */
export const issetAuthType = () => {
  return !!localStorage.getItem("authType");
};

/** Set expiresOn */
export const setExpiresOn = (data) => {
  if (data) {
    localStorage.setItem("expiresOn", data);
  } else {
    localStorage.removeItem("expiresOn");
  }
};

/** Get expiresOn */
export const getExpiresOn = () => {
  const expiresOn = localStorage.getItem("expiresOn");
  return expiresOn ? Number(expiresOn) : null;
};

/** Set auth type */
export const setAuthType = (data) => {
  if (data) {
    localStorage.setItem("authType", data);
  } else {
    localStorage.removeItem("authType");
  }
};

/** Get auth type */
export const getAuthType = () => {
  return localStorage.getItem("authType") || null;
};

/** Set DeepLink URL */
export const setDeepLinkURL = (data) => {
  if (data) {
    localStorage.setItem("deepLinkURL", data);
  } else {
    localStorage.removeItem("deepLinkURL");
  }
};

/** Get DeepLink URL */
export const getDeepLinkURL = () => {
  return localStorage.getItem("deepLinkURL") || null;
};

/** Set active workspace */
export const setActiveWorkSpace = (data) => {
  if (data) {
    localStorage.setItem("workspaceId", data);
  } else {
    localStorage.removeItem("workspaceId");
  }
};

/** Get active workspace info */
export const getActiveWorkSpace = () => {
  return localStorage.getItem("workspaceId") || "";
};

/** Flush the session after logout */
export const flushAuthToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresOn");
  localStorage.removeItem("authType");
  localStorage.removeItem("workspaceId");
};
