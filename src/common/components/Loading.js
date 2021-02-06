import React from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import "../styles/common.scss";

export const Loading = (props) => {
  return (
    <div className="loading">
      <Spin {...props} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
