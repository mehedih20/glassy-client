import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { TUser, logout } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const SuperAdminRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const user = jwtDecode(token as string) as TUser;
  const dispatch = useAppDispatch();

  if (user?.role !== "super-admin") {
    dispatch(logout());
  }

  if (!token) {
    toast.info("Login first!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default SuperAdminRoute;
