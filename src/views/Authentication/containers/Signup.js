import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Typography, Form, Checkbox, Dropdown } from "antd";
import { Link, useHistory } from "react-router-dom";
import "../Authentication.scss";
import OnlineLearning from "../../../assets/online_learning.svg";
import {
  ArrowRightOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  ROUTES_PATH,
  ROLE_TYPE,
  ERROR_MESSAGE,
} from "../../../common/Constants";
import LogoEquiz from "../../../assets/logoEQuiz.png";
import RoleDropdown from "../../../common/components/RoleDropdown";
import { requestSignup } from "../../../store/auth/actions";
import http from "../../../api";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../common/components/Notification";
import md5 from "md5";

export const SignUp = (props) => {
  const { Text, Title } = Typography;

  const [isSubmitting, setSubmiting] = useState(false);

  const history = useHistory();

  const onFinishSignup = async (values) => {
    setSubmiting(true);
    try {
      const res = await http.post(`/api/auth/signup`, {
        confirmPassword: md5(values.confirmPassword),
        fullname: values.fullname,
        password: md5(values.password),
        userType: values.userType,
        username: values.email,
      });
      if (res) {
        NotificationSuccess(
          `Đăng ký thành công`,
          `Vui lòng xác nhận email để kích hoạt tài khoản`
        );
        setSubmiting(false);
      }
    } catch (error) {
      setSubmiting(false);
      switch (error) {
        case ERROR_MESSAGE.USERNAME_EXISTED:
          return NotificationError("Lỗi", "Email đã tồn tại");
      }
    }
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
            Đăng ký
          </Title>
          <Form onFinish={onFinishSignup}>
            <Form.Item
              required={false}
              name="fullname"
              rules={[{ required: true, message: "Vui lòng nhập Họ và tên" }]}
            >
              <Input
                allowClear
                placeholder="Họ và tên"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              className="form-label"
              name="email"
              required={false}
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email" },
                { type: "email", message: "Email không đúng định dạng" },
              ]}
            >
              <Input
                allowClear
                placeholder="abc@gmail.com"
                type="email"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              required={false}
              tooltip="Mật khẩu tối thiểu 6 ký tự, bao gồm chữ cái a-z và số"
              className="form-label"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                allowClear
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              required={false}
              className="form-label"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
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
                allowClear
                placeholder="Xác nhận mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="userType"
              rules={[
                { required: true, message: "Vui lòng lựa chọn Loại tài khoản" },
              ]}
            >
              <RoleDropdown placeholder="Lựa chọn loại tài khoản" />
            </Form.Item>
            <Form.Item
              name="acceptTerm"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "Vui lòng xác nhận các điều khoản sử dụng trước khi đăng ký tài khoản"
                        ),
                },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với{" "}
                <Link to={ROUTES_PATH.TERM_OF_SERVICE}>
                  Các điều khoản của EQuiz.
                </Link>
              </Checkbox>
            </Form.Item>
            <Form.Item style={{ marginTop: "24px" }}>
              <Button
                loading={isSubmitting}
                type="primary"
                htmlType="submit"
                className="btnSubmit"
              >
                Đăng ký
                <ArrowRightOutlined />
              </Button>
            </Form.Item>
          </Form>
          <Text>Bạn đã có tài khoản? </Text>
          <Link to={ROUTES_PATH.LOGIN}>Đăng nhập ngay!</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSubmitting: state.auth.isSubmitting,
});

const mapDispatchToProps = {
  requestSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
