import { Outlet, useLocation } from "react-router-dom";
import { Fragment, useState, useEffect, useCallback } from "react";
import SideNav from "./sidenav/sidenav.component";
import { useGlobalContext } from "store/context/GlobalProvider";
import useAuth from "hooks/useAuth";
import { getRefreshTocken } from "services";
import { getExpiresOn } from "utils/storage";

const UserLayout = () => {
  const [collapseNav, setCollapseNav] = useState(false);
  const { authState, dispatch } = useGlobalContext();
  const [{ data }, { getUserInfoData, logoutUser }] = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const refreshTokenValue = localStorage.getItem("refreshToken");

  if (token && token !== "null" && !data?.accessToken) {
    dispatch({ type: "SET_AUTH", payload: token });
  }

  useEffect(() => {
    if (token && token !== "null") {
      getUserInfoData();
    } else {
      dispatch({ type: "SET_AUTH", payload: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
    }
  }, [token, getUserInfoData, dispatch]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await getRefreshTocken({
        refreshToken: refreshTokenValue,
      });
      if (response?.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch({ type: "SET_AUTH", payload: response.accessToken });
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutUser();
    }
  }, [refreshTokenValue, dispatch, logoutUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiresOn = getExpiresOn();
      if (expiresOn) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (expiresOn - currentTime < 300) {
          refreshToken();
        }
      } else {
        logoutUser();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [refreshToken, logoutUser]);

  const tempChange = (status) => {
    setCollapseNav(status);
  };

  return (
    <Fragment>
      <div className={`layout-container ${collapseNav ? "" : "left-sidebar"}`}>
        <SideNav onChange={tempChange} />
        <div className="container layout-page">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export default UserLayout;
