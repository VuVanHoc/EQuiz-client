import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ClassroomList from "./ClassroomList";
import ClassroomDetail from "./ClassroomDetail";
import PracticeInClassroom from "./PracticeInClassroom";

import { ROUTES_PATH } from "../../common/Constants";

export const Classrooms = (props) => {
  return (
    <Switch>
      <Route exact path={ROUTES_PATH.CLASSROOMS} component={ClassroomList} />
      <Route
        exact
        path={`${ROUTES_PATH.CLASSROOMS}/:id`}
        component={ClassroomDetail}
      />
      <Route
        exact
        path={`${ROUTES_PATH.CLASSROOMS}/:id/:classroomActivityId`}
        component={PracticeInClassroom}
      />
    </Switch>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Classrooms);
