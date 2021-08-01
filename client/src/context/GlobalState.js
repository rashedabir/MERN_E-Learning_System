import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import UserAPI from "../api/UserAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get("/user/refresh_token");
    setToken(res.data.accessToken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      refreshToken();
      setTimeout(() => {
        refreshToken();
      }, 150000);
    }
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
