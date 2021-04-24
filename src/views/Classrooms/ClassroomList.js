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
  Input,
  Card,
  Row,
  Col,
  Empty,
  Tooltip,
} from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  MailFilled,
  PhoneFilled,
  DeleteTwoTone,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { requestFetchList } from "../../store/classroom/actions";
import http from "../../api";

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
      align: "center",
      title: "Quản lý",
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
            {record.responsibleAvatar ? (
              <Avatar>{record.responsibleAvatar}</Avatar>
            ) : (
              <Avatar
                icon={<UserOutlined />}
                src={currentUser?.avatar}
                style={{ backgroundColor: currentUser?.defaultColor }}
              ></Avatar>
            )}
          </Popover>
        );
      },
    },
    {
      align: "center",
      title: "Thao tác",
      render: (_, record) => {
        // return <ActionMenu record={record} />;
        return (
          <div>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                onClick={() => {
                  history.push(`${ROUTES_PATH.CLASSROOMS}/${record.id}`);
                }}
              />
            </Tooltip>
            <Tooltip title="Xoá">
              <Popconfirm
                width={150}
                title="Bạn chắc chắn muốn xoá lớp học này không?"
                okText="Xoá"
                cancelText="Huỷ"
                placement="topRight"
                onConfirm={(e) => deleteClassroom(e, record.id)}
                onCancel={(e) => e.stopPropagation()}
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

  const [listClassroomStudent, setListClassroomStudent] = useState([]);
  const deleteClassroom = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await http.delete(`api/classroom/delete/${id}`);
      if (res) {
        props.requestFetchList({ pageSize: 5 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangePaging = (pageIndex, pageSize) => {
    props.requestFetchList({ pageIndex: pageIndex - 1, pageSize });
  };

  const getListClassroomStudent = async () => {
    try {
      const res = await http.post(`api/classroom/getListClassroomForStudent`, {
        orderBy: "createdDate",
        orderByAsc: false,
        userId: currentUser.userId,
        searchText: "",
      });
      if (res) {
        setListClassroomStudent(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (currentUser.userType === ROLE_TYPE.TEACHER) {
      props.requestFetchList({ pageSize: 5 });
    } else {
      getListClassroomStudent();
    }
  }, [currentUser]);
  return (
    <div>
      <div className="d-flex">
        <Title level={3} className="header-table">
          {currentUser?.userType === ROLE_TYPE.TEACHER
            ? "Danh sách lớp học"
            : "Lớp học của tôi"}
        </Title>
        <Input.Search
          allowClear
          enterButton
          placeholder="Tìm kiếm lớp học"
          style={{ width: 350 }}
        />
      </div>

      {currentUser.userType === ROLE_TYPE.TEACHER && (
        <Table
          // rowSelection={{ ...rowSelection }}
          // scroll={{ x: 1500 }}
          loading={isFetching}
          // onRow={(record, index) => {
          //   return {
          //     onClick: () =>
          //       history.push(`${ROUTES_PATH.CLASSROOMS}/${record.id}`),
          //   };
          // }}
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
      )}
      <Row gutter={[12, 12]}>
        {currentUser.userType === ROLE_TYPE.STUDENT &&
        listClassroomStudent.length > 0
          ? listClassroomStudent.map((classroom, index) => {
              return (
                <Col key={classroom.id}>
                  <Card
                    onClick={() =>
                      history.push(`${ROUTES_PATH.CLASSROOMS}/${classroom.id}`)
                    }
                    hoverable
                    style={{ width: 300 }}
                    cover={
                      <img src="https://picsum.photos/350/150" height={150} />
                    }
                  >
                    <Card.Meta
                      title={classroom.name}
                      description={`Mã lớp học: ${classroom.code}`}
                      avatar={
                        <Avatar src="https://picsum.photos/64/64" size={64} />
                      }
                    ></Card.Meta>
                  </Card>
                </Col>
              );
            })
          : currentUser.userType === ROLE_TYPE.STUDENT && (
              <Row
                justify="center"
                align="middle"
                style={{ width: "100%", height: 300 }}
              >
                <Col span={24}>
                  <Empty description="Không có lớp học nào" />
                </Col>
              </Row>
            )}
      </Row>
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
