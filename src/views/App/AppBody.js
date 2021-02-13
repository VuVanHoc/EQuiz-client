import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import { Classrooms, Questions } from "./app.routes";
import Loading from "../../common/components/Loading";
import { ROUTES_PATH } from "../../common/Constants";
function AppBody() {
  return (
    <div className="AppBody">
      <Suspense fallback={<Loading spinning={true} />}>
        <Switch>
          <Route path={ROUTES_PATH.CLASSROOMS} component={Classrooms} />
          <Route path={ROUTES_PATH.QUESTIONS} component={Questions} />
          <Redirect path="/*" exact to={ROUTES_PATH.CLASSROOMS} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default AppBody;
