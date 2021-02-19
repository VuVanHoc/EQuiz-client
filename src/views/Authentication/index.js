import React, { Component } from "react";
import { Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ROUTES_PATH } from "../../common/Constants";
import Loading from "../../common/components/Loading";
import { Login, Signup, ForgotPassword } from "./auth.routes";
import history from "../../utils/history";
export const Authentication = () => {
  return (
    <Suspense fallback={<Loading spinning={true} />}>
      <div className="Authentication">
        <Router>
          <Switch>
            <Route path={ROUTES_PATH.LOGIN} component={Login} />
            <Route path={ROUTES_PATH.SIGNUP} component={Signup} />
            <Route
              path={ROUTES_PATH.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
            <Redirect path="/*" exact to={ROUTES_PATH.LOGIN} />
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
