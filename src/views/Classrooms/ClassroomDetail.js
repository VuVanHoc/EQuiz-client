import React, { useState } from "react";
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
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./Classrooms.scss";
import { ROUTES_PATH } from "../../common/Constants";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
export const ClassroomDetail = (props) => {
  const { TabPane } = Tabs;

  const { Text, Title } = Typography;
  const { id } = useParams();

  const [roomType, setRoomType] = useState("PRIVATE");
  const [classroomInfo, setClassroomInfo] = useState({
    code: "JNLH9h90",
    name: "Cấu trúc dữ liệu & giải thuật",
    isPrivate: true,
    classroomType: "PRIVATE",
    password: "123123",
    description:
      "Đây là mô tả về lớp Cấu trúc dữ liệu & giải thuật\nFrom UET <3",
  });

  const onChangeRoomType = (e) => {
    setRoomType(e.target.value);
  };
  const submitFormUpdateClassroom = (values) => {
    // Call api update here
    console.log(values);
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
      {/* <Affix offsetTop={84}> */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={ROUTES_PATH.CLASSROOMS}>Danh sách lớp học</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết lớp học</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {/* </Affix> */}
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Thông tin lớp học" key="1">
          <Row gutter={[24, 8]}>
            <Col span={12}>
              <Title level={5}>Thông tin lớp học</Title>
              <Form
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
                  <Input disabled type="text" />
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
                    <Radio value="PUBLIC">Cho phép học sinh tự tham gia</Radio>
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
              {/* <Title level={5} >
            Cài đặt cho lớp học
          </Title> */}
            </Col>
            <Col span={12}>
              <div className="d-flex">
                <Title level={5}>Lịch sử học trực tuyến</Title>
                <Button icon={<PlayCircleOutlined />} type="primary">
                  Tạo phòng
                </Button>
              </div>
              <Table
                size="small"
                columns={columnHistory}
                dataSource={dataHistory}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Danh sách học sinh" key="2"></TabPane>
        <TabPane tab="Lịch sử học tập" key="3"></TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomDetail);
