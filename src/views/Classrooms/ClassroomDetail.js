import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import {
  Breadcrumb,
  Col,
  Form,
  Row,
  Typography,
  Input,
  Radio,
  Button,
  Table,
  Tabs,
  Rate,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./Classrooms.scss";
import { ROLE_TYPE, ROUTES_PATH } from "../../common/Constants";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import StudentList from "./StudentList";
import http from "../../api";
import { NotificationSuccess } from "../../common/components/Notification";
import ClassroomActivity from "./ClassroomActivity";

export const ClassroomDetail = (props) => {
  const { currentUser } = props;

  const { TabPane } = Tabs;

  const { Text, Title } = Typography;
  const { id } = useParams();

  const [roomType, setRoomType] = useState("PRIVATE");
  const [classroomInfo, setClassroomInfo] = useState({
    // code: "JNLH9h90",
    // name: "Cấu trúc dữ liệu & giải thuật",
    // private: true,
    // classroomType: "PRIVATE",
    // password: "123123",
    // description:
    //   "Đây là mô tả về lớp Cấu trúc dữ liệu & giải thuật\nFrom UET <3",
    // responsibleName: "Vũ Văn Học",
    // responsiblePhone: "0987773399",
    // responsibleEmail: "hocvanvu1999@gmail.com",
    // rating: 6,
  });

  useEffect(() => {
    if (id) getClassroomDetail(id);
    return () => {
      setClassroomInfo({});
    };
  }, []);

  const [form] = Form.useForm();
  const getClassroomDetail = async (id) => {
    try {
      const res = await http.get(`api/classroom/detail/${id}`);
      if (res) {
        setClassroomInfo({
          ...res,
          classroomType: res.private ? "PRIVATE" : "PUBLIC",
        });
        form.setFieldsValue({
          ...res,
          classroomType: res.private ? "PRIVATE" : "PUBLIC",
        });
        setRoomType(res.private ? "PRIVATE" : "PUBLIC");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeRoomType = (e) => {
    setRoomType(e.target.value);
  };
  const submitFormUpdateClassroom = async (values) => {
    // Call api update here
    console.log(values);
    try {
      const res = await http.post(`api/classroom/update`, {
        ...values,
        id: classroomInfo.id,
      });
      if (res) {
        NotificationSuccess(null, "Cập nhật thành công");
      }
      getClassroomDetail(res.id);
    } catch (error) {
      console.log(error);
    }
  };

  const columnHistory = [
    {
      title: "STT",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Thời gian bắt đầu",
    },
    {
      title: "Thời gian kết thúc",
    },
    {
      title: "Số học sinh tham gia",
    },
  ];
  const dataHistory = [
    // {
    //   // startTime:
    // },
  ];
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={ROUTES_PATH.CLASSROOMS}>Danh sách lớp học</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết lớp học</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {/* </Affix> */}
      <Tabs type="card">
        <TabPane tab="Thông tin lớp học" key="classroomInfo">
          <Row gutter={[24, 8]}>
            <Col span={12}>
              <Title level={5}>Thông tin lớp học</Title>
              {currentUser.userType === ROLE_TYPE.TEACHER && (
                <Form
                  form={form}
                  initialValues={classroomInfo}
                  onFinish={submitFormUpdateClassroom}
                >
                  <Form.Item
                    colon={false}
                    label="Mã lớp học"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    name="code"
                  >
                    <Input readOnly type="text" />
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    label="Tên lớp học"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    name="name"
                    rules={[
                      { required: true, message: "Bạn cần nhập Tên lớp học" },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                  <Form.Item
                    colon={false}
                    label="Trạng thái"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    name="classroomType"
                    onChange={onChangeRoomType}
                  >
                    <Radio.Group>
                      <Radio value="PRIVATE">Riêng tư</Radio>
                      <Radio value="PUBLIC">
                        Cho phép học sinh tự tham gia
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                  {roomType === "PRIVATE" && (
                    <Form.Item
                      colon={false}
                      label="Mật khẩu"
                      labelCol={{ span: 6 }}
                      labelAlign="left"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Bạn cần nhập mật khẩu cho lớp học",
                        },
                      ]}
                    >
                      <Input.Password autoComplete="true" type="password" />
                    </Form.Item>
                  )}
                  <Form.Item
                    colon={false}
                    label="Mô tả"
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    name="description"
                  >
                    <TextArea rows={5} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<EditOutlined />}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      style={{ marginLeft: 8 }}
                    >
                      Xoá lớp học
                    </Button>
                  </Form.Item>
                </Form>
              )}
              {currentUser.userType === ROLE_TYPE.STUDENT && (
                <div>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Mã lớp học:</p>
                    </Col>
                    <Col>
                      <p>{classroomInfo.code}</p>
                    </Col>
                  </Row>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Tên lớp học:</p>
                    </Col>
                    <Col>
                      <p>{classroomInfo.name}</p>
                    </Col>
                  </Row>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Giáo viên:</p>
                    </Col>
                    <Col>
                      <p>{classroomInfo.responsibleName}</p>
                    </Col>
                  </Row>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Email:</p>
                    </Col>
                    <Col>
                      <a
                        href={`mailto:${classroomInfo.responsibleEmail}`}
                        target="_blank"
                      >
                        {classroomInfo.responsibleEmail}
                      </a>
                    </Col>
                  </Row>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Số điện thoại:</p>
                    </Col>
                    <Col>
                      <a href={`tel:${classroomInfo.responsiblePhone}`}>
                        {classroomInfo.responsiblePhone}
                      </a>
                    </Col>
                  </Row>
                  <Row gutter={[12]}>
                    <Col span={5}>
                      <p>Đánh giá:</p>
                    </Col>
                    <Col>
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={classroomInfo.rating}
                      />
                      <div>
                        <a>Gửi đánh giá của bạn?</a>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col span={12}>
              <div className="d-flex">
                <Title level={5}>Lịch sử học trực tuyến</Title>
                {currentUser.userType === ROLE_TYPE.TEACHER ? (
                  <Button icon={<PlayCircleOutlined />} type="primary">
                    Tạo phòng
                  </Button>
                ) : (
                  <Button icon={<PlayCircleOutlined />} type="primary">
                    Tham gia phiên học
                  </Button>
                )}
              </div>
              <Table
                size="small"
                columns={columnHistory}
                dataSource={dataHistory}
              />
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Bài tập trên lớp">
          <ClassroomActivity classroomInfo={classroomInfo} />
        </TabPane>
        {/* <TabPane tab="Danh sách học sinh" key="studentList">
          <StudentList />
        </TabPane> */}
        {/* <TabPane tab="Lịch sử học tập" key="3">
          <HistoryClassroom />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomDetail);
