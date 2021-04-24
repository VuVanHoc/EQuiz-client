import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Table,
  Tag,
  Input,
  Popconfirm,
  Tooltip,
  Form,
  Modal,
  Radio,
  DatePicker,
} from "antd";
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
import { NotificationSuccess } from "../../common/components/Notification";
import ClassroomDropdown from "../../common/components/ClassroomDropdown";

export const ActivityList = (props) => {
  const { currentUser } = props;
  const { Text, Title } = Typography;

  const [isFetching, setIsFetching] = useState(false);
  const [dataListActivity, setDataListActivity] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareActivityForm] = Form.useForm();
  const [assignActivityForm] = Form.useForm();
  const [shareType, setShareType] = useState("PERSONAL");
  const [showAssignModal, setShowAssignModal] = useState(false);

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

  const shareActivity = (activity) => {
    shareActivityForm.setFieldsValue({
      activityName: activity.name,
      activityId: activity.id,
      type: "PERSONAL",
    });
    setShowShareModal(true);
  };

  const onChangeShareType = (e) => {
    setShareType(e.target.value);
  };
  const submitModalShareActivivty = () => {
    shareActivityForm.validateFields().then(async (values) => {
      try {
        const res = await http.post(`api/activity/share`, { ...values });
        if (res) {
          NotificationSuccess("Thành công");
          setShowShareModal(false);
          shareActivityForm.resetFields();
          setShareType("PERSONAL");
        }
      } catch (error) {}
    });
  };
  const assignForClassroom = (activity) => {
    assignActivityForm.setFieldsValue({
      activityName: activity.name,
      activityId: activity.id,
    });
    setShowAssignModal(true);
  };
  const submitModalAssignActivity = () => {
    assignActivityForm.validateFields().then(async (values) => {
      let body = {
        ...values,
        endTime: values.endTime
          ? new Date(values.endTime.format("YYYY-MM-DD HH:mm")).getTime()
          : null,
      };
      try {
        const res = await http.post(`api/activity/assignForClassroom`, body);
        if (res) {
          NotificationSuccess("Thành công");
          setShowAssignModal(false);
          assignActivityForm.resetFields();
        }
      } catch (error) {}
    });
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
              <ShareAltOutlined
                style={{ fontSize: 16, color: "#008DF2" }}
                onClick={() => shareActivity(record)}
              />
            </Tooltip>
            <Tooltip title="Gửi cho lớp">
              <TeamOutlined
                style={{ fontSize: 16, color: "#008DF2" }}
                onClick={() => assignForClassroom(record)}
              />
            </Tooltip>

            <Tooltip title="Xoá">
              <Popconfirm
                width={150}
                title="Bạn chắc chắn muốn xoá hoạt động này không?"
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

      <Modal
        title="Chia sẻ hoạt động"
        okText="Chia sẻ"
        cancelText="Huỷ"
        visible={showShareModal}
        onOk={submitModalShareActivivty}
        onCancel={() => {
          setShowShareModal(false);
          shareActivityForm.resetFields();
          setShareType("PERSONAL");
        }}
      >
        <Form form={shareActivityForm}>
          <Form.Item
            hidden
            name="activityId"
            colon={false}
            labelCol={{ span: 6 }}
            label="ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activityName"
            colon={false}
            labelCol={{ span: 6 }}
            label="Tên hoạt động"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="type"
            label="Đối tượng"
            colon={false}
            labelCol={{ span: 6 }}
            labelAlign="left"
            onChange={onChangeShareType}
          >
            <Radio.Group>
              <Radio value="PERSONAL">Cá nhân</Radio>
              <Radio value="PUBLIC">Tất cả mọi người</Radio>
            </Radio.Group>
          </Form.Item>
          {shareType === "PERSONAL" && (
            <Form.Item
              name="email"
              label="Email"
              colon={false}
              labelCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                  message: "Bạn cần nhập email của người nhận",
                },
                {
                  type: "email",
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title="Giao bài tập cho lớp"
        okText="Hoàn thành"
        cancelText="Huỷ"
        visible={showAssignModal}
        onOk={submitModalAssignActivity}
        onCancel={() => {
          assignActivityForm.resetFields();
          setShowAssignModal(false);
        }}
      >
        <Form form={assignActivityForm}>
          <Form.Item
            hidden
            name="activityId"
            colon={false}
            labelCol={{ span: 6 }}
            label="ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="activityName"
            colon={false}
            labelCol={{ span: 6 }}
            label="Tên hoạt động"
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            colon={false}
            labelCol={{ span: 6 }}
            label="Lớp học"
            name="classroomIds"
            rules={[
              {
                required: true,
                message: "Bạn chưa lựa chọn lớp học nào",
              },
            ]}
          >
            <ClassroomDropdown mode="multiple" />
          </Form.Item>
          <Form.Item
            colon={false}
            labelCol={{ span: 6 }}
            label="Thời hạn kết thúc"
            name="endTime"
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm"
              showTime
              showSecond={false}
              placeholder="Lựa chọn ngày"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
