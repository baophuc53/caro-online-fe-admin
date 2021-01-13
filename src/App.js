import "./App.scss";
import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminRoute from "./components/Router/AdminRoute";
import { Socket } from "./components/Socket/Socket";
import MainLayout from "./layouts/MainLayout";
import ManageUser from "./pages/ManageUser/ManageUser";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import MatchManagement from "./pages/MatchManagement/MatchManagement";
import HistoryMatch from "./pages/HistoryMatch/HistoryMatch";

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
          <Route path="/login" component={LoginScreen} />
          <Route path="/admin">
            <MainLayout component={MainLayout}>
              <Switch>
                <Route path="/admin/user-management" component={ManageUser} />
                <Route
                  path="/admin/match-management"
                  component={MatchManagement}
                />
                <Route
                  path="/admin/history/user/:id"
                  component={HistoryMatch}
                />
              </Switch>
            </MainLayout>
          </Route>
         
          <Route exact path="/">
            {!localStorage.getItem("admin-token") ? (
              <Redirect to="/login" />
            ) : (
              <Redirect to="/admin/user-management" />
            )}
          </Route>
          {/* <AdminRoute path="/home" component={Signout} /> */}
          {/* <Redirect from="/" to="/admin-login" /> */}
          {/* <Route path="/manage-user" component={ManageUser} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
