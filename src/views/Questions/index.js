import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

export const index = () => {
  useEffect(() => {
    console.log("COME TO QUESTIONS");
  }, []);
  return <div>Question</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
