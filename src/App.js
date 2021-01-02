import "./App.scss";
import React, { useEffect } from "react";
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
import {Socket} from "./components/Socket/Socket";
import ManageUser from "./pages/ManageUser/ManageUser";
import home from "./layouts/MainLayout";
import MainLayout from "./layouts/MainLayout";


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
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token) {
      // console.log(socket);
      Socket.emit("token", token);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin-login" component={AdminLoginScreen} />
          {/* <AdminRoute path="/home" component={Signout} /> */}
          {/* <Redirect from="/" to="/admin-login" /> */}
          <Route path="/">
            <MainLayout/>
            {/* <ManageUser/> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
