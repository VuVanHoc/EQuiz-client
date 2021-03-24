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

export const ForgotPassword = (props) => {
  const { Text, Title } = Typography;

  const onFinishForgotPassword = (values) => {
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
            Quên mật khẩu
          </Title>
          <Form layout="vertical" onFinish={onFinishForgotPassword}>
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
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              className="form-label"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
              ]}
            >
              <Input.Password
                autoComplete="true"
                placeholder="Mật khẩu mới"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              className="form-label"
              name="cfPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Xác nhận mật khẩu chưa đúng");
                  },
                }),
              ]}
            >
              <Input.Password
                autoComplete="true"
                placeholder="Xác nhận mật khẩu mới"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "24px" }}>
              <Button type="primary" htmlType="submit" className="btnSubmit">
                Xác nhận
                <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>
          <Text>Quay trở lại </Text>
          <Link to={ROUTES_PATH.LOGIN}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
