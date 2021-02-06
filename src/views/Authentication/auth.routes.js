import React from "react";

const Login = React.lazy(() => import("./containers/Login"));
const Signup = React.lazy(() => import("./containers/Signup"));
const ForgotPassword = React.lazy(() => import("./containers/ForgotPassword"));

export { Login, Signup, ForgotPassword };
