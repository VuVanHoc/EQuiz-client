import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import {
  Table,
  Button,
  Row,
  Col,
  Typography,
  Tag,
  Input,
  Tooltip,
  Modal,
  Form,
  DatePicker,
  Popconfirm,
} from "antd";
import http from "../../api";
import { ACTIVITY_TYPE, ROLE_TYPE, ROUTES_PATH } from "../../common/Constants";
import moment from "moment";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router";

export const ClassroomActivity = (props) => {
  const { classroomInfo, user } = props;
  const { Title, Text } = Typography;
  const [activities, setActivities] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [showFormChangeDeadline, setShowFormChangeDeadline] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [formChangeDeadline] = Form.useForm();
  const { id } = useParams();

  const history = useHistory();
  useEffect(() => {
    fetchListActivities({
      pageIndex: 0,
      pageSize: 5,
      classroomId: classroomInfo.id,
    });
  }, [classroomInfo]);

  const fetchListActivities = async (data) => {
    try {
      setFetching(true);
      const res = await http.post(
        `api/activity/getActivitiesForClassroom`,
        {
          classroomId: data.classroomId,
          searchText: data.searchText,
          orderBy: data.orderBy,
          orderByAsc: data.orderByAsc,
        },
        {
          params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
          },
        }
      );
      if (res) {
        setActivities(res);
        setFetching(false);
      }
    } catch (error) {
      setFetching(false);
    }
  };

  const submitFormChangeDeadline = () => {
    try {
      formChangeDeadline.validateFields().then(async (values) => {
        const res = await http.post(
          `api/activity/updateDeadlineActivity`,
          {},
          {
            params: {
              id: values.classroomActivityId,
              endTime: values.endTime
                ? new Date(values.endTime.format("YYYY-MM-DD HH:mm")).getTime()
                : null,
            },
          }
        );
        if (res) {
          setShowFormChangeDeadline(false);
          formChangeDeadline.resetFields();
          fetchListActivities({
            pageIndex: 0,
            pageSize: 5,
            classroomId: classroomInfo.id,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteClassroomActivity = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await http.delete(`api/activity/deleteClassroomActivity`, {
        params: {
          id: id,
        },
      });
      if (res) {
        fetchListActivities({
          pageIndex: 0,
          pageSize: 5,
          classroomId: classroomInfo.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dataPieChart = {
    labels: ["Chưa làm bài", "Hoàn thành"],
    datasets: [
      {
        label: "# of Votes",
        data: [2, 1],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Số học sinh",
        data: [1, 3, 2, 8, 10, 16, 2, 3, 0, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
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
      title: "Thời hạn kết thúc",
      dataIndex: "endTime",
      render: (endTime) => {
        if (endTime && moment(endTime).isAfter(new Date())) {
          return (
            <Text type="success">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        if (endTime && moment(endTime).isBefore(new Date())) {
          return (
            <Text type="danger">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        if (endTime && moment(endTime).isSame(new Date())) {
          return (
            <Text type="warning">
              {moment(endTime).format("DD/MM/YYYY HH:mm A")}
            </Text>
          );
        }
        return endTime && moment(endTime).format("DD/MM/YYYY HH:mm A");
      },
    },
    {
      width: 150,
      align: "center",
      title: "Hành động",
      render: (_, record) => {
        if (user.userType === ROLE_TYPE.TEACHER) {
          return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title="Thống kê kết quả">
                <AreaChartOutlined
                  onClick={() => setShowAnalysis(true)}
                  style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                />
              </Tooltip>
              <Tooltip title="Chi tiết hoạt động">
                <FileTextOutlined
                  style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                  onClick={() => {
                    history.push(`${ROUTES_PATH.ACTIVITIES}/${record.id}`);
                  }}
                />
              </Tooltip>
              <Tooltip title="Thay đổi thời hạn">
                <ClockCircleOutlined
                  style={{ fontSize: 16, color: "#008DF2", marginRight: 10 }}
                  onClick={() => {
                    formChangeDeadline.setFieldsValue({
                      classroomActivityId: record.classroomActivityId,
                      activityName: record.name,
                      endTime: record.endTime ? moment(record.endTime) : null,
                    });
                    setShowFormChangeDeadline(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Xoá">
                <Popconfirm
                  width={150}
                  title="Bạn muốn xoá hoạt động này?"
                  okText="Xoá"
                  cancelText="Huỷ"
                  placement="topRight"
                  onConfirm={(e) =>
                    deleteClassroomActivity(e, record.classroomActivityId)
                  }
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
        }
        return record.endTime && moment(record.endTime).isBefore(new Date()) ? (
          <></>
        ) : (
          <Button
            icon={<PlayCircleOutlined />}
            style={{ backgroundColor: "orange", color: "#fff" }}
            onClick={() =>
              history.push(
                `${ROUTES_PATH.CLASSROOMS}/${id}/${record.classroomActivityId}`
              )
            }
          >
            Làm bài
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 10 }}>
        <Col>
          <Title level={5}>{classroomInfo?.name}</Title>
        </Col>
        <Col>
          <Input.Search
            allowClear
            enterButton
            placeholder="Tìm kiếm hoạt động"
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={activities.data}
        pagination={{
          total: activities.total || 0,
          onChange: (pageIndex, pageSize) => {
            fetchListActivities({
              pageIndex: pageIndex - 1,
              pageSize,
              classroomId: classroomInfo.id,
            });
          },
          pageSize: 5,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
        rowKey={(record) => record.classroomActivityId}
      />

      <Modal
        cancelText="Huỷ"
        okText="Xác nhận"
        visible={showFormChangeDeadline}
        title="Thay đổi thời hạn nộp bài"
        onCancel={() => {
          setShowFormChangeDeadline(false);
        }}
        onOk={submitFormChangeDeadline}
      >
        <Form form={formChangeDeadline}>
          <Form.Item name="classroomActivityId" label="ID" hidden>
            <Input readOnly />
          </Form.Item>
          <Form.Item name="activityName" label="Tên hoạt động">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="endTime" label="Thời hạn kết thúc">
            <DatePicker
              disabledDate={(current) => {
                return current && current < moment().endOf("day");
              }}
              style={{ width: "100%" }}
              format="DD/MM/YYYY HH:mm"
              showTime
              showSecond={false}
              placeholder="Lựa chọn thời gian"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={660}
        title="Thống kê kết quả"
        onCancel={() => setShowAnalysis(false)}
        onOk={() => setShowAnalysis(false)}
        visible={showAnalysis}
      >
        <Row align="bottom" justify="space-between">
          <Col>
            <Pie data={dataPieChart} />
          </Col>
          <Col>
            <Bar data={data} options={options} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomActivity);
