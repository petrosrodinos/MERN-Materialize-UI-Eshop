import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  //   const [email, setEmail] = useState();

  const login = useCallback((values) => {
    setToken(values.token);
    setUserId(values.userId);
    // setEmail(values.email);
    const tokenExpirationDate =
      values.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: values.userId,
        token: values.token,
        expiration: tokenExpirationDate.toISOString(),
        // email: values.email,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    // setEmail(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login({
        userId: storedData.userId,
        token: storedData.token,
        expirationDate: new Date(storedData.expiration),
        // email: storedData.email,
      });
    }
  }, [login]);

  //   return { token, login, logout, userId, email };
  return { token, login, logout, userId };
};
