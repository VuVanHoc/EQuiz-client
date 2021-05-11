import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Tooltip,
  Input,
  Row,
  Col,
  Typography,
  Tab,
  Form,
  Card,
  DatePicker,
  Radio,
} from "antd";
import {
  CameraOutlined,
  UserOutlined,
  SettingOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import { ERROR_MESSAGE } from "../../common/Constants";
import RoleDropdown from "../../common/components/RoleDropdown";
import UploadAvatarModal from "../../common/components/modals/UploadAvatarModal";
import http from "../../api";
import moment from "moment";
import { updateUserInfoSuccess } from "../../store/auth/actions";
import { NotificationSuccess } from "../../common/components/Notification";
import md5 from "md5";

export const Profile = (props) => {
  const { Text, Title } = Typography;
  const { currentUser, updateUserInfoSuccess } = props;

  const [userInfoForm] = Form.useForm();
  const [updatePWForm] = Form.useForm();

  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [submittingUserInfo, setSubmittingUserInfo] = useState(false);
  const [submitingChangePw, setSubmittingChangePw] = useState(false);

  useEffect(() => {
    if (currentUser.userId) {
      getUserInfo(currentUser.userId);
    }
  }, []);

  const getUserInfo = async (userId) => {
    const res = await http.get(`api/user/getInfo/${userId}`);
    if (res) {
      userInfoForm.setFieldsValue({
        fullName: res.fullName,
        userType: res.userType,
        email: res.email || res.username,
        phone: res.phone,
        address: res.address,
        gender: res.gender,
        birthday: res.birthday ? moment(res.birthday) : null,
      });
    }
  };
  const onOkUploadModal = (avatarUrl) => {
    setVisibleUploadModal(false);
    updateUserInfo(avatarUrl);
  };

  const updateUserInfo = (avatar) => {
    userInfoForm.validateFields().then(async (values) => {
      try {
        setSubmittingUserInfo(true);
        const res = await http.post(`api/user/updateUserInfo`, {
          ...values,
          avatar: avatar || currentUser.avatar,
          birthday: values.birthday
            ? moment(values.birthday).format("DD/MM/YYYY")
            : null,
          userId: currentUser.userId,
        });
        if (res) {
          updateUserInfoSuccess({ userDTO: res });
          NotificationSuccess("Thành công", "Cập nhật thông tin thành công");
          setSubmittingUserInfo(false);
        }
      } catch (e) {
        setSubmittingUserInfo(false);
        console.log(e);
      }
    });
  };

  const submitUpdatePassword = () => {
    updatePWForm.validateFields().then(async (values) => {
      try {
        setSubmittingChangePw(true);
        console.log(values);
        const res = await http.post(`api/user/changePassword`, {
          oldPassword: md5(values.oldPassword),
          newPassword: md5(values.newPassword),
          confirmNewPassword: md5(values.confirmNewPassword),
          userId: currentUser.userId,
        });
        if (res) {
          NotificationSuccess("Thành công", "Thay đổi mật khẩu thành công");
          setSubmittingChangePw(false);
          updatePWForm.resetFields();
        }
      } catch (error) {
        setSubmittingChangePw(false);
        switch (error) {
          case ERROR_MESSAGE.USER_NOT_FOUND:
            return NotificationError("Lỗi", "Tài khoản không tồn tại");
          case ERROR_MESSAGE.OLD_PASSWORD_NOT_CORRECT:
            updatePWForm.setFields([
              { name: "oldPassword", errors: ["Mật khẩu hiện tại không đúng"] },
            ]);
            break;
        }
      }
    });
  };
  return (
    <>
      <Row gutter={12}>
        <Col span={12}>
          <Card
            headStyle={{ background: "#40a9ff70" }}
            title={
              <div>
                <UserOutlined className="icon-title" />
                Thông tin cá nhân
              </div>
            }
            size="small"
          >
            <Row gutter={0}>
              <Col span={4}>
                <div>
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: currentUser?.defaultColor }}
                    src={currentUser.avatar}
                    shape="circle"
                    size={100}
                  />
                  <div
                    className="upload-photo"
                    onClick={() => setVisibleUploadModal(true)}
                  >
                    <CameraOutlined />
                  </div>
                </div>
              </Col>
              <Col span={20} style={{ paddingLeft: 12 }}>
                <Form layout="vertical" form={userInfoForm}>
                  <Row gutter={12}>
                    <Col span={16}>
                      <Form.Item label="Họ tên" name="fullName">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="userType" label="Loại tài khoản">
                        <RoleDropdown placeholder="Loại tài khoản" disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item label="Email" name="email">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Số điện thoại" name="phone">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item label="Ngày sinh" name="birthday">
                        <DatePicker
                          disabledDate={(current) => {
                            return current && current > moment().endOf("day");
                          }}
                          style={{ width: "100%" }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Giới tính" name="gender">
                        <Radio.Group>
                          <Radio value="MALE">Nam</Radio>
                          <Radio value="FEMALE">Nữ</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                </Form>
                <Button
                  type="primary"
                  onClick={() => updateUserInfo(null)}
                  loading={submittingUserInfo}
                >
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            headStyle={{ background: "#40a9ff70" }}
            style={{ marginBottom: 12 }}
            title={
              <div>
                <LockOutlined className="icon-title" />
                Thay đổi mật khẩu
              </div>
            }
            size="small"
          >
            <Form layout="vertical" form={updatePWForm}>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Mật khẩu hiện tại"
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập mật khẩu hiện tại",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa nhập mật khẩu mới",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmNewPassword"
                    rules={[
                      {
                        required: true,
                        message: "Bạn chưa xác nhận mật khẩu mới",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Xác nhận mật khẩu chưa đúng");
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                onClick={submitUpdatePassword}
                loading={submitingChangePw}
              >
                Cập nhật
              </Button>
            </Form>
          </Card>
          <Card
            headStyle={{ background: "#40a9ff70" }}
            title={
              <div>
                <SettingOutlined className="icon-title" />
                Cài đặt
              </div>
            }
            size="small"
          ></Card>
        </Col>
      </Row>

      <UploadAvatarModal
        title="Ảnh đại diện"
        visible={visibleUploadModal}
        okText="Cập nhật"
        cancelText="Huỷ"
        onOkUploadModal={onOkUploadModal}
        onCancel={() => {
          setVisibleUploadModal(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  updateUserInfoSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
