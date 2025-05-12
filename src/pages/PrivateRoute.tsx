import { Navigate } from "react-router-dom";
import React from "react";
import { useLoginStore } from "@/stores/useLoginStore";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLogin } = useLoginStore();

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
