import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Table, Tag, Input, Popconfirm, Tooltip } from "antd";
import { ROLE_TYPE, ACTIVITY_TYPE } from "../../common/Constants";
import "./Activity.scss";
import Avatar from "antd/lib/avatar/avatar";
import {
  DeleteTwoTone,
  ShareAltOutlined,
  EditOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import http from "../../api";
import moment from "moment";

export const ActivityList = (props) => {
  const { currentUser } = props;
  const { Text, Title } = Typography;

  const [isFetching, setIsFetching] = useState(false);
  const [dataListActivity, setDataListActivity] = useState({});

  useEffect(() => {
    requestFetchList({ pageIndex: 0, pageSize: 5 });
  }, []);

  const requestFetchList = async (data) => {
    try {
      setIsFetching(true);
      const res = await http.post(
        `api/activity/getList?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
        {
          orderBy: "createdDate",
          orderByAsc: data.orderByAsc,
          userId: currentUser.userId,
          responsibleId: currentUser.userId,
          searchText: data.searchText || "",
        }
      );
      if (res) {
        setIsFetching(false);
        setDataListActivity(res);
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
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
      title: "Ngày tạo",
      dataIndex: "createdDate",
      render: (createdDate) => {
        return moment(createdDate).format("DD/MM/YYYY HH:mm A");
      },
    },
    {
      align: "center",
      title: "Người tạo",
      render: () => {
        return <Avatar>H</Avatar>;
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
      align: "center",
      title: "Hành động",
      render: (_, record) => {
        // return <ActionMenu record={record} />;
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined style={{ fontSize: 16, color: "#008DF2" }} />
            </Tooltip>
            <Tooltip title="Chia sẻ">
              <ShareAltOutlined style={{ fontSize: 16, color: "#008DF2" }} />
            </Tooltip>
            <Tooltip title="Gửi cho lớp">
              <TeamOutlined style={{ fontSize: 16, color: "#008DF2" }} />
            </Tooltip>

            <Tooltip title="Xoá">
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
        dataSource={dataListActivity.data}
        pagination={{
          total: dataListActivity.total || 0,
          onChange: (pageIndex, pageSize) => {
            requestFetchList({ pageIndex, pageSize });
          },
          pageSize: 5,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
