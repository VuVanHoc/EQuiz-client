import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { Input, Form } from "antd";
import { setVisibleModal } from "../../../store/common/actions";
import http from "../../../api";
import {
  NotificationSuccess,
  NotificationError,
  NotificationWarning,
} from "../../../common/components/Notification";
import { ERROR_MESSAGE } from "../../Constants";
export const Join2Classroom = (props) => {
  const { visible, setVisibleModal, currentUser } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    setVisibleModal("join2Classroom", false);
    form.resetFields();
  };
  const onOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const res = await http.post(`api/classroom/joinToClassroom`, {
          ...values,
          studentId: currentUser.studentId,
          userId: currentUser.userId,
        });
        if (res === "SUCCESS") {
          NotificationSuccess(
            "Thành công",
            "Bạn đã tham gia vào lớp học thành công"
          );
          setVisibleModal("join2Classroom", false);
        }
      } catch (error) {
        switch (error) {
          case ERROR_MESSAGE.NOT_FOUND:
            return NotificationError("Lỗi", "Mã lớp học không tồn tại");
          case ERROR_MESSAGE.WRONG_PASSWORD_TO_JOIN:
            return NotificationError("Lỗi", "Mật khẩu bạn nhập chưa đúng");
          case ERROR_MESSAGE.ALREADY_JOINED_THIS_CLASSROOM:
            return NotificationWarning(
              "Cảnh báo",
              "Bạn đã tham gia lớp học này rồi"
            );
        }
      }
    });
  };

  return (
    <Modal
      title="Tham gia lớp học"
      cancelText="Huỷ"
      okText="Xác nhận"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form} layout="horizontal">
        <Form.Item
          colon={false}
          required
          label="Mã lớp học"
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="classCode"
          rules={[{ required: true, message: "Bạn cần nhập Mã lớp học" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Mật khẩu"
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="password"
        >
          <Input.Password autoComplete="true" type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  visible: state.common.visibleModals["join2Classroom"],
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  setVisibleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Join2Classroom);
