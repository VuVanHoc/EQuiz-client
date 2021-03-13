import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ROLE_TYPE, ROUTES_PATH } from "../../common/Constants";
import {
  Table,
  Tag,
  Typography,
  Avatar,
  Button,
  Badge,
  Popover,
  Pagination,
  Popconfirm,
  Tooltip,
} from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  MailFilled,
  PhoneFilled,
  DeleteTwoTone,
  EditTwoTone,
  Icon,
} from "@ant-design/icons";
import DocumentSvg from "../../assets/Document.svg";
import { requestFetchList } from "../../store/classroom/actions";

export const ClassroomList = (props) => {
  const { currentUser, isFetching, totalResult, dataSource } = props;
  let history = useHistory();

  const { Text, Title } = Typography;
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
      width: 300,
    },
    {
      title: "Sĩ số",
      dataIndex: "totalStudent",
      // sorter: (a, b) => a.totalStudent - b.totalStudent,
    },
    {
      title: "Hình thức",
      dataIndex: "private",
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
        return (
          <Popover
            placement="right"
            title={record.responsibleName}
            content={
              <div style={{ display: "block" }}>
                {record.responsibleEmail && (
                  <a href={`mailto:${record.responsibleEmail}`} target="_blank">
                    <MailFilled />
                    {record.responsibleEmail}
                  </a>
                )}
                {record.responsiblePhone && (
                  <a href={`tel:${record.responsiblePhone}`} target="_blank">
                    <PhoneFilled />
                    {record.responsiblePhone}
                  </a>
                )}
              </div>
            }
          >
            <Avatar>H</Avatar>
          </Popover>
        );
      },
    },
    {
      title: "Thao tác",
      render: (_, record) => {
        // return <ActionMenu record={record} />;
        return (
          <>
            <EditTwoTone
              style={{ fontSize: 16, marginRight: 16 }}
              twoToneColor="#6AC3E8"
            />
            <Popconfirm
              width={150}
              title="Bạn chắc chắn muốn xoá lớp học này không?"
              okText="Xoá"
              cancelText="Huỷ"
              placement="topRight"
              onConfirm={deleteClassroom}
              onCancel={(e) => e.stopPropagation()}
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

  const deleteClassroom = (e, id) => {
    e.stopPropagation();
  };

  const onChangePaging = (pageIndex, pageSize) => {
    props.requestFetchList({ pageIndex: pageIndex - 1, pageSize });
  };
  useEffect(() => {
    props.requestFetchList({ pageSize: 5 });
  }, []);
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
        onRow={(record, index) => {
          return {
            onClick: () =>
              history.push(`${ROUTES_PATH.CLASSROOMS}/${record.id}`),
          };
        }}
        columns={columns}
        pagination={{
          total: totalResult,
          onChange: (pageIndex, pageSize) => {
            onChangePaging(pageIndex, pageSize);
          },
          pageSize: 5,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
        rowKey={(record) => record.id}
        dataSource={dataSource}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    totalResult: state.classroom.totalResult,
    dataSource: state.classroom.dataSource,
    isFetching: state.classroom.isFetching,
  };
};

const mapDispatchToProps = {
  requestFetchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomList);
