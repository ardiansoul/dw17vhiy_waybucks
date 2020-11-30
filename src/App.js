import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppContextProvider } from "./context/AuthContext";
import AddProductPage from "./pages/AddProductPage";
import AddTopingPage from "./pages/AddTopingPage";
import CartPage from "./pages/CartPage";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import TransPage from "./pages/TransPage";
import UserPage from "./pages/UserPage";
import AdminRoute from "./Utils/AdminRoute";
import PrivateRoute from "./Utils/PrivateRoute";

function App() {
  const [isLogin, setisLogin] = useState(false);
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

  const handleLogin = () => {
    setisLogin(!isLogin);
  };

  return (
    <>
      <AppContextProvider>
        {modalLogin && (
          <Login
            showModalRegister={showModalRegister}
            handleLogin={handleLogin}
            showModalLogin={showModalLogin}
          />
        )}
        {modalRegister && (
          <Register
            showModalLogin={showModalLogin}
            showModalRegister={showModalRegister}
            handleLogin={handleLogin}
          />
        )}

        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage
                isLogin={isLogin}
                showModalLogin={showModalLogin}
                showModalRegister={showModalRegister}
              />
            </Route>
            <Route path="/products/:id" exact>
              <ProductPage
                isLogin={isLogin}
                showModalLogin={showModalLogin}
                showModalRegister={showModalRegister}
              />
            </Route>
            <PrivateRoute exact path="/cart" component={CartPage} />
            <PrivateRoute exact path="/user/:id" component={UserPage} />
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
            <Route> <Redirect to="/" /> </Route>
          </Switch>
        </Router>
      </AppContextProvider>
    </>
  );
}

export default App;
