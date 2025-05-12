import { useEffect } from "react";
import queryString from "query-string";
import { useLocation, Navigate } from "react-router-dom";

export function Oauth() {
  const { search } = useLocation();
  const { Authorization, refresh } = queryString.parse(search);

  useEffect(() => {
    if (Authorization && refresh) {
      localStorage.setItem("access-token", ("Bearer " + Authorization) as string);
      localStorage.setItem("refresh-token", ("Bearer " + refresh) as string);
      window.location.replace("/");
    } else {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    }
  }, [Authorization, refresh]);

  if (!Authorization || !refresh) {
    return <Navigate to="/login" />;
  }

  return null;
}
