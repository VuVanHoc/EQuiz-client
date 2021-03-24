import React from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { Input, Form } from "antd";
import { setVisibleModal } from "../../../store/common/actions";

export const Join2Classroom = (props) => {
  const { visible, setVisibleModal } = props;

  const [form] = Form.useForm();

  const onCancel = () => {
    setVisibleModal("join2Classroom", false);
    form.resetFields();
  };
  const onOk = () => {
    form.validateFields().then((values) => {});
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
});

const mapDispatchToProps = {
  setVisibleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Join2Classroom);
