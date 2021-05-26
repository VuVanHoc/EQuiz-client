import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Table,
  Input,
  Popconfirm,
  Tag,
  Popover,
  Avatar,
  Tooltip,
} from "antd";
import {
  QUESTION_TYPES,
  ROLE_TYPE,
  ROUTES_PATH,
  SUBJECTS,
} from "../../common/Constants";
import "./Question.scss";
import { requestFetchList } from "../../store/question/actions.js";
import {
  DeleteTwoTone,
  ShareAltOutlined,
  MailFilled,
  PhoneFilled,
  TeamOutlined,
  GlobalOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const QuestionList = (props) => {
  const { isFetching, currentUser, dataSource, requestFetchList } = props;
  const { Text, Title } = Typography;

  useEffect(() => {
    requestFetchList({
      pageIndex: 0,
      pageSize: 10,
    });
  }, []);
  const createMarkup = (value) => {
    return {
      __html: value,
    };
  };
  const columns = [
    {
      width: 550,
      title: "Nội dung câu hỏi",
      dataIndex: "content",
      render: (content) => {
        return <div dangerouslySetInnerHTML={createMarkup(content)}></div>;
      },
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "questionType",
      render: (questionType) => {
        switch (questionType) {
          case QUESTION_TYPES.MULTIPLE_CHOICE:
            return "Chọn 1 đáp án đúng";
          case QUESTION_TYPES.MULTIPLE_CORRECT:
            return "Chọn nhiều đáp án đúng";
          case QUESTION_TYPES.TRUE_FALSE:
            return "Đúng - Sai";
          case QUESTION_TYPES.FILL_IN:
            return "Nhập đáp án";
        }
      },
    },
    {
      title: "Chủ đề",
      dataIndex: "subject",
      render: (subject) => {
        switch (subject) {
          case SUBJECTS.MATH:
            return "Toán học";
          case SUBJECTS.ENGLISH:
            return "Tiếng Anh";
          case SUBJECTS.IT:
            return "Tin học";
        }
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
      align: "center",
      title: "Người tạo",
      render: (_, record) => {
        return (
          <Popover
            placement="right"
            title={record.responsibleName}
            content={
              <div style={{ display: "block" }}>
                {record.responsibleEmail && (
                  <a href={`mailto:${record.responsibleEmail}`} target="_blank">
                    <MailFilled style={{ marginRight: 10 }} />
                    {record.responsibleEmail}
                  </a>
                )}
                <br />
                {record.responsiblePhone && (
                  <a href={`tel:${record.responsiblePhone}`} target="_blank">
                    <PhoneFilled style={{ marginRight: 10 }} />
                    {record.responsiblePhone}
                  </a>
                )}
              </div>
            }
          >
            <Avatar
              icon={<UserOutlined />}
              src={record.responsibleAvatar || currentUser?.avatar}
              style={{ backgroundColor: currentUser?.defaultColor }}
            ></Avatar>
          </Popover>
        );
      },
    },
    {
      title: "",
      dataIndex: "sharePublic",
      width: 20,
      render: (sharePublic) => {
        return sharePublic ? (
          <Tooltip title="Bạn đã chia sẻ hoạt động này cho cộng đồng">
            <GlobalOutlined style={{ fontSize: 16, color: "green" }} />
          </Tooltip>
        ) : (
          <></>
        );
      },
    },
    {
      width: 150,
      align: "center",
      title: "Hành động",
      render: (_, record) => {
        // return <ActionMenu record={record} />;
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Tooltip title="Xem chi tiết">
              <FileTextOutlined
                style={{ fontSize: 16, color: "#008DF2" }}
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Chia sẻ">
              <ShareAltOutlined style={{ fontSize: 16, color: "#008DF2" }} />
            </Tooltip>
            <Tooltip title="Xoá">
              <Popconfirm
                width={150}
                title="Bạn chắc chắn muốn xoá câu hỏi này không?"
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
            </Tooltip>
          </div>
        );
      },
    },
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
        rowSelection={{
          preserveSelectedRowKeys: true,
        }}
        rowKey={(record) => record.id}
        loading={isFetching}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: props.totalResult || 0,
          onChange: (pageIndex, pageSize) => {
            requestFetchList({ pageIndex: pageIndex - 1, pageSize });
          },
          pageSize: 10,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
  dataSource: state.question.dataSource,
  totalResult: state.question.totalResult,
  isFetching: state.question.isFetching,
});

const mapDispatchToProps = {
  requestFetchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
