import React, { useState } from "react";
import { connect } from "react-redux";
import { setVisibleModal } from "../../../store/common/actions";
import { Form, Modal, Input, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";

export const CreateClassroomModal = (props) => {
  const { visible, setVisibleModal } = props;
  const [roomType, setRoomType] = useState("PRIVATE");
  const [form] = Form.useForm();
  const onCancel = () => {
    setVisibleModal("createClassroom", false);
    form.resetFields();
    setRoomType("PRIVATE");
  };
  const onOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  const onChangeRoomType = (e) => {
    setRoomType(e.target.value);
  };
  return (
    <Modal
      title="Tạo lớp học"
      cancelText="Huỷ"
      okText="Tạo"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={{ classroomType: "PRIVATE" }}
      >
        <Form.Item
          colon={false}
          required
          label="Tên lớp học"
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="name"
          rules={[{ required: true, message: "Bạn cần nhập Tên lớp học" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Trạng thái"
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="classroomType"
          onChange={onChangeRoomType}
        >
          <Radio.Group>
            <Radio value="PRIVATE">Riêng tư</Radio>
            <Radio value="PUBLIC">Cho phép học sinh tự tham gia</Radio>
          </Radio.Group>
        </Form.Item>
        {roomType === "PRIVATE" && (
          <Form.Item
            colon={false}
            label="Mật khẩu"
            labelCol={{ span: 6 }}
            labelAlign="left"
            name="password"
            rules={[
              { required: true, message: "Bạn cần nhập mật khẩu cho lớp học" },
            ]}
          >
            <Input.Password autoComplete="true" type="password" />
          </Form.Item>
        )}
        <Form.Item
          colon={false}
          label="Mô tả"
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="description"
        >
          <TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  visible: state.common.visibleModals["createClassroom"],
});

const mapDispatchToProps = {
  setVisibleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateClassroomModal);
