// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);

  // const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log("From Private Route: ", user, isAuthenticated);

  // const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  // console.log("token frm Pvt: ", token);

  if (!token) {
    // return <Navigate to="/login" replace />;
    return <Navigate to="/signin" replace />;
  }
  return children;
  // return token ? children : <Navigate replace to="/login" />;
}

export default PrivateRoute;
