import React from "react";
import { connect } from "react-redux";
import { Button, Input, Typography, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import "../Authentication.scss";
import OnlineLearning from "../../../assets/online_learning.svg";
import {
  ArrowRightOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { ROUTES_PATH } from "../../../common/Constants";
import LogoEquiz from "../../../assets/logoEQuiz.png";

export const Login = (props) => {
  const { Text, Title } = Typography;

  const onFinishLogin = (values) => {
    console.log(values);
  };
  return (
    <div className="bg">
      <div className="container">
        <div className="left">
          <img src={OnlineLearning} width={500} />
        </div>
        <div className="right">
          <div className="logo">
            <img src={LogoEquiz} width={100} />
          </div>
          <Title level={2} className="title">
            Đăng nhập
          </Title>
          <Form layout="vertical" onFinish={onFinishLogin}>
            <Form.Item
              className="form-label"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email" },
                { type: "email", message: "Email không đúng định dạng" },
              ]}
            >
              <Input
                placeholder="Email"
                type="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              className="form-label"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <div className="d-flex">
              <Checkbox>Duy trì đăng nhập?</Checkbox>
              <Link to={ROUTES_PATH.FORGOT_PASSWORD}>Quên mật khẩu</Link>
            </div>

            <Form.Item style={{ marginTop: "24px" }}>
              <Button type="primary" htmlType="submit" className="btnSubmit">
                Đăng nhập
                <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>
          <Text>Bạn chưa có tài khoản? </Text>
          <Link to={ROUTES_PATH.SIGNUP}>Đăng ký ngay!</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
