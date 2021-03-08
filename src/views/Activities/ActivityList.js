import React from "react";
import { connect } from "react-redux";
import { Typography, Table, Tag } from "antd";
import { ROLE_TYPE } from "../../common/Constants";

export const ActivityList = (props) => {
  const { isFetching, currentUser } = props;
  const { Text, Title } = Typography;

  const data = [];

  const columns = [
    {
      title: "Tên hoạt động",
      dataIndex: "name",
    },
    {
      title: "Loại hoạt động",
      dataIndex: "type",
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      render: (level) => {
        switch (level) {
          case 1:
            return <Tag color="blue">Dễ</Tag>;
          case 2:
            return <Tag color="orange">Trung bình</Tag>;
          case 3:
            return <Tag color="red">Khó</Tag>;
          default:
            return <Tag color="blue">Dễ</Tag>;
        }
      },
    },
    {
      title: "Từ khoá",
      dataIndex: "tags",
      render: (_, record) => {
        return record?.tags?.map((e, index) => (
          <Tag key={index} color="">
            {e}
          </Tag>
        ));
      },
    },
    {
      title: "Người tạo",
    },
  ];
  return (
    <div>
      <Title level={3} className="header-table">
        {currentUser?.userType === ROLE_TYPE.TEACHER
          ? "Danh sách hoạt động"
          : "Hoạt động của tôi"}
      </Title>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
