import React from "react";
import { connect } from "react-redux";
import { Calendar } from "antd";

export const CalendarView = (props) => {
  return <Calendar size="small" />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
