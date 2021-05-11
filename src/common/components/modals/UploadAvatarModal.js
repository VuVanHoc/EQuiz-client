import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Avatar } from "antd";
import { LIST_AVATAR } from "../../Constants";
import cx from "classnames";
import "../../styles/common.scss";

export const UploadAvatarModal = (props) => {
  const { visible } = props;

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleOk = () => {
    props.onOkUploadModal(selectedAvatar);
  };
  return (
    <Modal onOk={handleOk} {...props}>
      <Row justify="center" gutter={[0, 12]}>
        {LIST_AVATAR.map((e, index) => {
          return (
            <Col
              onClick={() => setSelectedAvatar(e.url)}
              span={8}
              key={index}
              className={cx("item-avatar")}
            >
              <Avatar
                src={e.url}
                size={100}
                className={cx({
                  "item-avatar-focus": selectedAvatar === e.url,
                })}
              />
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatarModal);
