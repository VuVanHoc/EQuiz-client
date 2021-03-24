import React from "react";
import { connect } from "react-redux";
import { Typography, Table, Input } from "antd";
import { ROLE_TYPE } from "../../common/Constants";
import "./Question.scss";

export const QuestionList = (props) => {
  const { isFetching, currentUser } = props;
  const { Text, Title } = Typography;

  const data = [];

  const columns = [
    {
      title: "Nội dung câu hỏi",
      dataIndex: "content",
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "type",
    },
    {
      title: "Mức độ",
    },
    {
      title: "Người tạo",
      dataIndex: "",
    },
    {},
  ];
  return (
    <div>
      <div className="d-flex">
        <Title level={3} className="header-table">
          Danh sách câu hỏi
        </Title>
        <Input.Search
          allowClear
          enterButton
          placeholder="Tìm kiếm câu hỏi"
          style={{ width: 350 }}
        />
      </div>

      <Table
        // rowSelection={{ ...rowSelection }}
        // scroll={{ x: 1500 }}
        rowKey={(record) => record.id}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
