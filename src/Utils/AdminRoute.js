import { useContext } from "react";
import { Route } from "react-router-dom";
import { AppContext } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";

function AdminRoute({ component: Component, ...rest }) {
  const [state] = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isLogin && state.role === "admin" ? (
          <Component {...props} />
        ) : (
          <PrivateRoute {...props} />
        );
      }}
    />
  );
}

export default AdminRoute;
