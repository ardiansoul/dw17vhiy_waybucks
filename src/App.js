import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./pages/LandingPage";

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
          <Route to="/">
            <LandingPage
              isLogin={isLogin}
              showModalLogin={showModalLogin}
              showModalRegister={showModalRegister}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
