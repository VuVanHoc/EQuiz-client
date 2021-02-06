import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

export const Classroom = () => {
  useEffect(() => {
    console.log("COME TO CLASS");
  }, []);
  return <div>Class room</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
