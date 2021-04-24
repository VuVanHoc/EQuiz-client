import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Button, Row, Col, Typography, Tag } from "antd";
import http from "../../api";
import { ACTIVITY_TYPE } from "../../common/Constants";

export const ClassroomActivity = (props) => {
  const { classroomInfo, user } = props;
  const { Title } = Typography;
  const [activities, setActivities] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const columns = [
    {
      title: "Tên hoạt động",
      dataIndex: "name",
    },
    {
      title: "Loại hoạt động",
      dataIndex: "type",
      render: (value) => {
        switch (value) {
          case ACTIVITY_TYPE.HANGMAN:
            return <p>Balloon</p>;
          case ACTIVITY_TYPE.MATRIX_WORD:
            return <p>Crossword</p>;
          case ACTIVITY_TYPE.FLASH_CARD:
            return <p>Thẻ Flashcard</p>;
        }
        return <p></p>;
      },
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      render: (level) => {
        switch (level) {
          case "EASY":
            return <Tag color="blue">Dễ</Tag>;
          case "MEDIUM":
            return <Tag color="orange">Trung bình</Tag>;
          case "HARD":
            return <Tag color="red">Khó</Tag>;
          default:
            return <Tag color="blue">Dễ</Tag>;
        }
      },
    },
    {
      title: "Thời hạn kết thúc",
      dataIndex: "endTime",
    },
    {
      title: "Hành động",
      render: () => {},
    },
  ];
  return (
    <>
      <Row>
        <Col>
          <Title level={5}>{classroomInfo?.name}</Title>
        </Col>
      </Row>
      <Table columns={columns} loading={isFetching} dataSource={activities} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomActivity);
