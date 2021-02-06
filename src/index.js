import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./middleware";
import Routes from "./routes";
import "antd/dist/antd.css";

const Root = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
