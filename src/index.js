import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App/App";
import { Provider } from "react-redux";
import { store } from "./middleware";

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
