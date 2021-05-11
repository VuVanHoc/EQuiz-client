import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Button, Row, Col, Typography, Tag, Input, Tooltip } from "antd";
import http from "../../api";
import { ACTIVITY_TYPE, ROLE_TYPE } from "../../common/Constants";
import moment from "moment";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";

export const ClassroomActivity = (props) => {
  const { classroomInfo, user } = props;
  const { Title, Text } = Typography;
  const [activities, setActivities] = useState([]);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    fetchListActivities({
      pageIndex: 0,
      pageSize: 5,
      classroomId: classroomInfo.id,
    });
  }, [classroomInfo]);

  const fetchListActivities = async (data) => {
    try {
      setFetching(true);
      const res = await http.post(
        `api/activity/getActivitiesForClassroom`,
        {
          classroomId: data.classroomId,
          searchText: data.searchText,
          orderBy: data.orderBy,
          orderByAsc: data.orderByAsc,
        },
        {
          params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
          },
        }
      );
      if (res) {
        setActivities(res);
        setFetching(false);
      }
    } catch (error) {
      setFetching(false);
    }
  };
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
      render: (endTime) => {
        if (endTime && moment(endTime).isAfter(new Date())) {
          return (
            <Text type="success">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        if (endTime && moment(endTime).isBefore(new Date())) {
          return (
            <Text type="danger">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        if (endTime && moment(endTime).isSame(new Date())) {
          return (
            <Text type="warning">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        return endTime && moment(endTime).format("DD/MM/YYYY HH:mm A");
      },
    },
    {
      width: 150,
      align: "center",
      title: "Hành động",
      render: (_, record) => {
        if (user.userType === ROLE_TYPE.TEACHER) {
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title="Chi tiết hoạt động">
                <FileTextOutlined
                  style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                />
              </Tooltip>
              <Tooltip title="Thay đổi thời hạn">
                <ClockCircleOutlined
                  style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                />
              </Tooltip>
              <Tooltip title="Xoá">
                <DeleteTwoTone style={{ fontSize: 16 }} twoToneColor="red" />
              </Tooltip>
            </div>
          );
        }
        return record.endTime && moment(record.endTime).isBefore(new Date()) ? (
          <></>
        ) : (
          <Button
            icon={<PlayCircleOutlined />}
            style={{ backgroundColor: "orange", color: "#fff" }}
          >
            Làm bài
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Col>
          <Title level={5}>{classroomInfo?.name}</Title>
        </Col>
        <Col>
          <Input.Search
            allowClear
            enterButton
            placeholder="Tìm kiếm hoạt động"
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={activities.data}
        pagination={{
          total: activities.total || 0,
          onChange: (pageIndex, pageSize) => {
            fetchListActivities({ pageIndex: pageIndex - 1, pageSize });
          },
          pageSize: 5,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
        rowKey={(record) => record.classroomActivityId}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomActivity);
