import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";
import { ROUTES_PATH } from "../../common/Constants";

export const Questions = (props) => {
  return (
    <Switch>
      <Route exact path={ROUTES_PATH.QUESTIONS} component={QuestionList} />
      <Route
        exact
        path={`${ROUTES_PATH.QUESTIONS}/:id`}
        component={QuestionDetail}
      />
    </Switch>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
