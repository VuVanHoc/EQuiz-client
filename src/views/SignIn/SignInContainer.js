import React, { Component, useState } from "react";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./SignIn.scss";

export const SignInContainer = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="container">{isLoginForm ? <SignIn /> : <SignUp />}</div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
