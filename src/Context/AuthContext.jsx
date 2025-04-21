import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  decodedToken: {},
  setToken: () => {},
  token: null,
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextComponent({ children }) {
  const navigate = useNavigate();

  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, _setToken] = useState(() => sessionStorage.getItem("_tk"));
  const [ready, setReady] = useState(false);

  const { decodedToken, isExpired } = useJwt(token || "");

  const setToken = (newToken) => {
    if (newToken) {
      sessionStorage.setItem("_tk", newToken);
    } else {
      sessionStorage.removeItem("_tk");
    }
    _setToken(newToken);
  };

  // Wait for token decode readiness
  useEffect(() => {
    if (decodedToken !== null && isExpired !== undefined) {
      setReady(true);
    }
  }, [decodedToken, isExpired]);

  // Set login status after readiness
  useEffect(() => {
    if (!ready) return;
    if (token && isExpired === false) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, isExpired, ready]);

  // Navigate based on role after login
  useEffect(() => {
    if (
      ready &&
      decodedToken &&
      isFirstLogin &&
      decodedToken.roles &&
      isExpired === false
    ) {
      const roles = decodedToken.roles;
      console.log("Redirecting based on role:", roles);

      if (roles.includes("Student")) {
        navigate("/student-dashboard");
      } else if (roles.includes("Teacher")) {
        navigate("/teacher-dashboard");
      } else if (roles.includes("Admin")) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

      setIsFirstLogin(false);
    }
  }, [decodedToken, navigate, isFirstLogin, isExpired, ready]);

  useEffect(() => {
    console.log("Decoded Token:", decodedToken);
    console.log("Is Expired:", isExpired);
    console.log("Token:", token);
    console.log("Is Logged In:", isLoggedIn);
  }, [decodedToken, isExpired, token, isLoggedIn]);

  const values = Object.seal({
    isLoggedIn,
    setIsLoggedIn,
    decodedToken,
    setToken,
    token,
  });

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
}