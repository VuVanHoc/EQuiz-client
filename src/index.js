import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./middleware";
import Routes from "./routes";
import "antd/dist/antd.css";
import Loading from "./common/components/Loading";
import { PersistGate } from "redux-persist/lib/integration/react";
import { interceptors } from "./api";
interceptors(store);
const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading spinning={true} />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
