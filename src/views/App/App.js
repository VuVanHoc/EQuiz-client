import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, DatePicker, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
var forge = require("node-forge");
function App() {
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const handleCloseModal = () => {
    setVisible(false);
  };
  const onOk = () => {
    setSending(true);
    setTimeout(() => {
      setVisible(false);
      setSending(false);

    }, 5000);
  };
  return (
    <div>
      <Button type="dashed" onClick={() => setVisible(true)}>
        Click me
      </Button>
      <DatePicker format="DD/MM/YYYY" />
      <Modal
        title="Title modal"
        maskClosable={false}
        visible={visible}
        onOk={onOk}
        onCancel={handleCloseModal}
        confirmLoading={sending}
      >
        <TextArea rows={5} />
      </Modal>
    </div>
  );
}

export default App;
