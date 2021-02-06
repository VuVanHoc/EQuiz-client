import React from "react";
import { connect } from "react-redux";
import { Button, Input, Typography, Form, Checkbox } from "antd";
import { Link } from "react-router-dom";
import "../Authentication.scss";
import OnlineLearning from "../../../assets/online_learning.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
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
          <Title level={4}>Đăng nhập</Title>
          <Form layout="vertical" onFinish={onFinishLogin}>
            <Form.Item
              className="form-label"
              required={false}
              label="Email"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              className="form-label"
              required={false}
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Checkbox />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btnSubmit">
                Đăng nhập
                <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>
          <Text>Bạn chưa có tài khoản?</Text>
          <Link to="/sign-up">
            <Button type="link">Đăng ký ngay</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
