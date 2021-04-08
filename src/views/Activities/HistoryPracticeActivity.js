import React from "react";
import { connect } from "react-redux";
import { Typography, Table, Tag, Input } from "antd";
import { ROLE_TYPE } from "../../common/Constants";
import "./Activity.scss";

export const HistoryPracticeActivity = (props) => {
  const { isFetching, currentUser } = props;
  const { Text, Title } = Typography;

  const data = [
    {
      name: "Học từ vựng Tiếng Anh với Balloon",
      startTime: "05/04/2021 20:09 PM",
      endTime: "05/04/2021 20:45 PM",
      result: "7/10",
      type: "HANGMAN",
      level: "HARD",
    },
    {
      name: "Học từ vựng Tiếng Anh với Balloon",
      startTime: "04/04/2021 23:09 PM",
      endTime: "04/04/2021 23:30 PM",
      result: "7/10",
      type: "HANGMAN",
    },
    {
      name: "Ô chữ chủ đề Học tập",
      startTime: "04/04/2021 23:09 PM",
      endTime: "04/04/2021 23:30 PM",
      result: "15/20",
      type: "MATRIX_WORD",
      level: "MEDIUM",
    },
  ];

  const columns = [
    {
      title: "Tên hoạt động",
      dataIndex: "name",
    },
    {
      title: "Loại hoạt động",
      dataIndex: "type",
      render: (value) => {
        return <p>{value === "HANGMAN" ? `Ballon` : "Crossword"}</p>;
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
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
    },
    {
      title: "Kết quả",
      dataIndex: "result",
    },
  ];
  return (
    <div>
      <div className="d-flex">
        <Title level={3} className="header-table">
          Lịch sử học tập
        </Title>
        <Input.Search
          allowClear
          enterButton
          placeholder="Tìm kiếm hoạt động"
          style={{ width: 350 }}
        />
      </div>

      <Table
        // rowSelection={{ ...rowSelection }}
        // scroll={{ x: 1500 }}
        // rowKey={(record) => record.id}
        loading={isFetching}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPracticeActivity);
