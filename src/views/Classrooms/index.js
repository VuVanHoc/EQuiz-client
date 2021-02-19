import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { ROLE_TYPE } from "../../common/Constants";
import { Table, Tag, Typography, Avatar } from "antd";
import ActionMenu from "./ActionMenu";
import { UserOutlined } from "@ant-design/icons";

export const Classrooms = (props) => {
  const { currentUser } = props;
  useEffect(() => {
    console.log("COME TO CLASS");
  }, []);
  const { Text, Title } = Typography;
  const columns = [
    { title: "Mã lớp học", dataIndex: "code", fixed: "left" },
    {
      title: "Tên lớp học",
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Sĩ số",
      dataIndex: "totalStudent",
      // sorter: (a, b) => a.totalStudent - b.totalStudent,
    },
    {
      title: "Trạng thái",
      dataIndex: "isPrivate",
      render: (isPrivate) => {
        if (isPrivate) {
          return <Tag color="red">Private</Tag>;
        }
        return <Tag color="green">Public</Tag>;
      },
    },
    {
      title: "Người quản lý",
      dataIndex: "responsible",
      render: (_, record) => {
        return <Avatar>H</Avatar>;
      },
    },
    {
      render: (_, record) => {
        return <ActionMenu record={record} />;
      },
    },
  ];
  const data = [
    {
      key: "1",
      name: "Cấu trúc dữ liệu & giải thuật",
      code: "INT 2107 9",
      totalStudent: 90,
      isPrivate: true,
      responsible: {
        avatar: "",
        name: "",
      },
    },
    {
      key: "2",
      name: "Giải tích 2",
      code: "MAT 3029",
      totalStudent: 45,
      isPrivate: false,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <div>
      <Title level={3} className="header-table">
        {currentUser?.userType === ROLE_TYPE.TEACHER
          ? "Danh sách lớp học"
          : "Lớp học của tôi"}
      </Title>
      <Table
        // rowSelection={{ ...rowSelection }}
        // scroll={{ x: 1500 }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Classrooms);
