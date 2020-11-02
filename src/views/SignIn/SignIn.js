import { Button, DatePicker, Image } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import image1 from "../../assets/image1.jpg";
import myStar from "../../assets/myStar.svg";

export const SignIn = (props) => {
  return (
    <div>
      Login Form
      <Button type="primary">Click me</Button>
      <DatePicker />
      <div>
        <Image src={image1} width={100} />
        <Image src={myStar} width={100} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
