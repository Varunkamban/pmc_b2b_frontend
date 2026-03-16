import axiosClient from "constant/axiosClient";
import SessionModal from "components/common/SessionModal";
import { createContext, useState, useEffect, useRef, useCallback } from "react";

export const AuthContext = createContext();

const SESSION_DURATION_MS = 29 * 60 * 1000;
const IS_DEV = process.env.NODE_ENV === "development";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const sessionTimerRef = useRef(null);
  const sessionStartRef = useRef(null);

  const startSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    sessionStartRef.current = Date.now();
    sessionTimerRef.current = setTimeout(() => {
      setShowSessionModal(true);
    }, SESSION_DURATION_MS);
  }, []);

  const logout = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    window.location.href = "/";
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        logout();
        return;
      }

      const res = await axiosClient.post("/auth/refresh-token", {
        refreshToken: storedRefreshToken,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      startSessionTimer();
    } catch (error) {
      logout();
    }
  }, [logout, startSessionTimer]);

  const handleAuthSuccess = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data);
    startSessionTimer();
  };

  const login = async (email, password) => {
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      handleAuthSuccess(res.data);
      return true;
    } catch {
      return false;
    }
  };

  const sendOtp = async (mobile) => {
    if (IS_DEV && ["0000000000", "7811815553"].includes(mobile.replace(/\s/g, ""))) return true;
    try {
      await axiosClient.post("/auth/send-otp", { mobile });
      return true;
    } catch {
      return false;
    }
  };

  const loginWithOtp = async (mobile, otp) => {
    if (IS_DEV && mobile.replace(/\s/g, "") === "0000000000" && otp === "000000") {
      handleAuthSuccess({
        accessToken: "dev-access-token",
        refreshToken: "dev-refresh-token",
        name: "Dev User",
        email: "dev@localhost",
        mobile: "0000000000",
      });
      return true;
    }
    if (IS_DEV && mobile.replace(/\s/g, "") === "7811815553" && otp === "123456") {
      handleAuthSuccess({
        accessToken: "dev-access-token",
        refreshToken: "dev-refresh-token",
        name: "Dev User",
        email: "dev@localhost",
        mobile: "7811815553",
      });
      return true;
    }
    try {
      const res = await axiosClient.post("/auth/verify-otp", { mobile, otp });
      handleAuthSuccess(res.data);
      return true;
    } catch {
      return false;
    }
  };

  const continueSession = async () => {
    setShowSessionModal(false);
    await refreshToken();
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !sessionStartRef.current) return;
      const elapsed = Date.now() - sessionStartRef.current;
      if (elapsed >= SESSION_DURATION_MS) {
        setShowSessionModal(true);
      } else {
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = setTimeout(() => {
          setShowSessionModal(true);
        }, SESSION_DURATION_MS - elapsed);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosClient.get("/auth/me");
        setUser(res.data);
        startSessionTimer();
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();

    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
      }
    };
  }, [startSessionTimer]);

  return (
    <AuthContext.Provider
      value={{
        login,
        sendOtp,
        loginWithOtp,
        logout,
        user,
        loading,
        showSessionModal,
        continueSession,
      }}
    >
      {children}
      <SessionModal show={showSessionModal} onContinue={continueSession} />
    </AuthContext.Provider>
  );
};