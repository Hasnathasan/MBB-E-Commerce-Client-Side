import { useContext } from "react";
import useUser from "../../Hooks/useUser";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Loader from "../Loader/Loader";

const AdminOnlyRoute = ({children}) => {
    const [user, isUserDataLoading] = useUser();
    const { loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(user, loading);
  if (loading || isUserDataLoading) {
    return <Loader></Loader>;
  } else if (user?.userRole === "admin") {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default AdminOnlyRoute;