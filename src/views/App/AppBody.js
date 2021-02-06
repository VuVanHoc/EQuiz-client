import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { Classrooms, Questions } from "./app.routes";
import Loading from "../../common/components/Loading";
function AppBody() {
  return (
    <div className="AppBody">
      <Suspense fallback={<Loading spinning={true} />}>
        <Switch>
          <Route path="/classrooms" component={Classrooms} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default AppBody;
