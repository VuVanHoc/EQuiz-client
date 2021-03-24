import React, { Suspense } from "react";
import { connect } from "react-redux";
import Loading from "./common/components/Loading";

const Authentication = React.lazy(() => import("./views/Authentication"));
const App = React.lazy(() => import("./views/App"));

function Routes({ isLogin }) {
  return (
    <>
      <Suspense fallback={<Loading spinning={true} />}>
        {isLogin ? <App /> : <Authentication />}
      </Suspense>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
