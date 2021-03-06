import React from "react";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Photos from "./pages/Photos";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Photos} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
