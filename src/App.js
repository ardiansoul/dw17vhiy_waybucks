import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route to="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
