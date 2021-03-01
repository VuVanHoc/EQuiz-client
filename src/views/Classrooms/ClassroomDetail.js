import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";

export const ClassroomDetail = (props) => {
  const { id } = useParams();
  return <div>Classroom Detail: {id}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomDetail);
