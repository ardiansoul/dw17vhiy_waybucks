import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { QueryCache, ReactQueryCacheProvider, useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppContext } from "./context/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import AddTopingPage from "./pages/AddTopingPage";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import TransPage from "./pages/TransPage";
import UserPage from "./pages/UserPage";
import AdminRoute from "./Utils/AdminRoute";
import { baseUrl } from "./Utils/API";
import PrivateRoute from "./Utils/PrivateRoute";

const queryCache = new QueryCache();

function App() {
  // const [state, dispatch] = useContext(AppContext);

  // const { isLoading, isError, error, data } = useQuery("checkAuth", () => {
  //   return Axios({
  //     method: "GET",
  //     url: `${baseUrl}auth/checkUser`,
  //     headers: {
  //       Authorization: localStorage.token,
  //       withCredentials: true,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  // });

  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const showModalLogin = () => {
    setModalLogin(!modalLogin);
    setModalRegister(false);
  };

  const showModalRegister = () => {
    setModalRegister(!modalRegister);
    setModalLogin(false);
  };

  // const loadUser = () => {
  //   try {
  //     console.log(data.data.data);
  //     if (data.data.status === 401) {
  //       return dispatch({
  //         type: "AUTH_ERROR",
  //       });
  //     }
  //     dispatch({
  //       type: "USER_LOADED",
  //       payload: data.data.data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({
  //       type: "AUTH_ERROR",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   loadUser();
  // }, []);

  return (
    // <>
    //   {isLoading ? (
    //     <div className="w-full h-screen flex justify-center items-center">
    //       <FontAwesomeIcon icon={faSpinner} spin size="6x" />
    //     </div>
    //   ) : (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        {modalLogin && (
          <Login
            showModalRegister={showModalRegister}
            showModalLogin={showModalLogin}
          />
        )}
        {modalRegister && (
          <Register
            showModalLogin={showModalLogin}
            showModalRegister={showModalRegister}
          />
        )}

        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage
                showModalLogin={showModalLogin}
                showModalRegister={showModalRegister}
              />
            </Route>
            <Route path="/products/:id" exact>
              <ProductPage
                showModalLogin={showModalLogin}
                showModalRegister={showModalRegister}
              />
            </Route>
            <PrivateRoute exact path="/cart" component={CartPage} />
            <PrivateRoute exact path="/user" component={UserPage} />
            <AdminRoute exact path="/admin/transaction" component={TransPage} />
            <AdminRoute
              exact
              path="/admin/add-product"
              component={AddProductPage}
            />
            <AdminRoute
              exact
              path="/admin/add-toping"
              component={AddTopingPage}
            />
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </ReactQueryCacheProvider>
    </>
    //   )}
    // </>
  );
}

export default App;
