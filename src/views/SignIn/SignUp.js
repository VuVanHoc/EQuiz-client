import React, { Component } from "react";
import { connect } from "react-redux";

export const SignUp = () => {
  return <div>Sign Up form</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
