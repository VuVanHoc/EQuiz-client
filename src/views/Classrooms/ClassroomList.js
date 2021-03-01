import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ROLE_TYPE } from "../../common/Constants";
import { Table, Tag, Typography, Avatar, Skeleton } from "antd";
import ActionMenu from "./ActionMenu";
import { useHistory, useRouteMatch } from "react-router-dom";

export const ClassroomList = (props) => {
  const { currentUser } = props;
  let history = useHistory();
  let { path, url } = useRouteMatch();

  const { Text, Title } = Typography;
  const [isFetching, setFetching] = useState(false);
  const columns = [
    { title: "Mã lớp học", dataIndex: "code", fixed: "left" },
    {
      title: "Tên lớp học",
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 400,
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
      id: "123124hjkhkj12124124",
      key: "1",
      name: "Cấu trúc dữ liệu & giải thuật",
      description:
        "Đây là mô tả vài dòng về lớp học Đây là mô tả vài dòng về lớp học Đây là mô tả vài dòng về lớp học",
      code: "INT 2107 9",
      totalStudent: 90,
      isPrivate: true,
      responsible: {
        avatar: "",
        name: "",
      },
    },
    {
      id: "nknckjanskcnajkca",
      key: "2",
      name: "Giải tích 2",
      code: "MAT 3029",
      totalStudent: 45,
      isPrivate: false,
    },
  ];

  const onRowClick = (event, record) => {
    history.push(`${path}/${record.id}`);
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
        loading={isFetching}
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => onRowClick(event, record),
          };
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomList);
