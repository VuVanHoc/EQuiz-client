import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ActivityDetail from "./ActivityDetail";
import ActivityList from "./ActivityList";
import CreateActivity from "./CreateActivity";
import PracticeActivity from "./PracticeActivity";
import HistoryPracticeActivity from "./HistoryPracticeActivity";

import { ROUTES_PATH } from "../../common/Constants";

export const Activities = (props) => {
  return (
    <Switch>
      <Route exact path={ROUTES_PATH.ACTIVITIES} component={ActivityList} />
      <Route
        exact
        path={`${ROUTES_PATH.ACTIVITIES}/create-activity`}
        component={CreateActivity}
      />
      <Route
        exact
        path={`${ROUTES_PATH.ACTIVITIES}/practice`}
        component={PracticeActivity}
      />
      <Route
        exact
        path={`${ROUTES_PATH.ACTIVITIES}/history`}
        component={HistoryPracticeActivity}
      />
      <Route
        exact
        path={`${ROUTES_PATH.ACTIVITIES}/:id`}
        component={CreateActivity}
      />
    </Switch>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
