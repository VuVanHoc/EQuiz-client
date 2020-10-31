import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App/App";

const Root = () => {
  return (
    <>
      <App />
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
