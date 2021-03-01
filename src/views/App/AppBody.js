import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Classrooms,
  Questions,
  Activities,
  Notifications,
  Settings,
  Profile,
  Documents,
  Calendar,
  Imports,
} from "./app.routes";

import Loading from "../../common/components/Loading";
import { ROUTES_PATH } from "../../common/Constants";
function AppBody() {
  return (
    <div className="AppBody">
      <Suspense fallback={<Loading spinning={true} />}>
        <Switch>
          <Route path={ROUTES_PATH.CLASSROOMS} component={Classrooms} />
          <Route path={ROUTES_PATH.QUESTIONS} component={Questions} />
          <Route path={ROUTES_PATH.ACTIVITIES} component={Activities} />
          <Route path={ROUTES_PATH.DOCUMENTS} component={Documents} />
          <Route path={ROUTES_PATH.CALENDAR} component={Calendar} />
          <Route path={ROUTES_PATH.IMPORT} component={Imports} />
          <Route path={ROUTES_PATH.SETTINGS} component={Settings} />
          <Route path={ROUTES_PATH.NOTIFICATIONS} component={Notifications} />
          <Route path={ROUTES_PATH.PROFILE} component={Profile} />

          <Redirect path="/*" exact to={ROUTES_PATH.CLASSROOMS} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default AppBody;
