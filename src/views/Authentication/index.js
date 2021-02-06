import React, { Component } from "react";
import { Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loading from "../../common/components/Loading";
import { Login, Signup, ForgotPassword } from "./auth.routes";
export const Authentication = () => {
  return (
    <Suspense fallback={<Loading spinning={true} />}>
      <div className="Authentication">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Redirect path="/*" exact to="/login" />
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
