import React from "react";
import { connect } from "react-redux";
import { Typography, Table, Tag, Input, Popconfirm } from "antd";
import { ROLE_TYPE } from "../../common/Constants";
import "./Activity.scss";
import Avatar from "antd/lib/avatar/avatar";
import { DeleteTwoTone } from "@ant-design/icons";

export const ActivityList = (props) => {
  const { isFetching, currentUser } = props;
  const { Text, Title } = Typography;

  const data = [
    {
      name: "Từ vựng chủ đề Học tập",
      type: "HANGMAN",
      createdDate: "04/04/2021 17:00 PM",
    },
    {
      name: "Từ vựng chủ đề Trái cây",
      type: "HANGMAN",
      createdDate: "04/04/2021 17:00 PM",
      level: "MEDIUM",
    },
    {
      name: "Từ vựng chủ đề Môi trường",
      type: "HANGMAN",
      createdDate: "04/04/2021 17:00 PM",
    },
    {
      name: "Đoán ô chữ",
      type: "MATRIX_WORD",
      createdDate: "04/04/2021 17:00 PM",
      level: "HARD",
    },
    {
      name: "Từ vựng chủ đề Học tập",
      type: "HANGMAN",
      createdDate: "04/04/2021 17:00 PM",
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
    },
    {
      align: "center",
      title: "Người tạo",
      render: () => {
        return <Avatar>H</Avatar>;
      },
    },
    {
      title: "Hành động",
      render: (_, record) => {
        // return <ActionMenu record={record} />;
        return (
          <>
            <Popconfirm
              width={150}
              title="Bạn chắc chắn muốn xoá lớp học này không?"
              okText="Xoá"
              cancelText="Huỷ"
              placement="topRight"
              // onConfirm={(e) => deleteClassroom(e, record.id)}
              // onCancel={(e) => e.stopPropagation()}
            >
              <DeleteTwoTone
                style={{ fontSize: 16 }}
                twoToneColor="red"
                onClick={(e) => e.stopPropagation()}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <div className="d-flex">
        <Title level={3} className="header-table">
          {currentUser?.userType === ROLE_TYPE.TEACHER
            ? "Danh sách hoạt động"
            : "Hoạt động của tôi"}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
