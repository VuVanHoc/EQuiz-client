import React from "react";
import { Modal } from "antd";

function ModalCommon(props) {
  const { onOk, onCancel, visible, title, ...other } = props;

  return (
    <Modal
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      visible={visible}
      
      {...other}
    >
      {props.children}
    </Modal>
  );
}

export default ModalCommon;
