import "./App.scss";
import React from "react";
import "antd/dist/antd.css";
import AdminLoginScreen from "./pages/LoginScreen/LoginScreen";
import { Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminRoute from "./components/Router/AdminRoute";

const Signout = (props) => (
  <Button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/login";
    }}
  >
    Logout
  </Button>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin-login" component={AdminLoginScreen} />
          <AdminRoute path="/home" component={Signout} />
          <Redirect from="/" to="/home" />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
