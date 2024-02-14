import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const timeNow = Math.round(Date.now() / 1000);

  if (user) {
    if (user.exp < timeNow) {
      dispatch(logout());
    }
  }

  if (!token) {
    toast.info("Login first!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
