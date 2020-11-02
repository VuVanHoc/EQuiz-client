import { Button, Checkbox, Row, Col, Form, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignIn.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
export const SignIn = (props) => {
  const {} = props;

  const onFinish = () => {};
  return (
    <div className="SignIn">
      <Row style={{ height: "100%" }}>
        <Col span={14} className="LeftColumn"></Col>
        <Col span={10} className="RightColumn">
          <div>
            <h2 style={{ marginBottom: 0 }}>Chào mừng bạn quay trở lại!</h2>
            <h4>Đăng nhập để tiếp tục</h4>
            <br />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined color="grey" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Nhớ tài khoản</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng nhập
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
