import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Table, Typography, Col, Input } from "antd";

export const StudentList = (props) => {
  const { Title, Text } = Typography;
  const { currentUser, totalStudent } = props;
  const [isFetching, setIsFetching] = useState(false);
  const [listStudent, setListStudent] = useState([]);

  useEffect(() => {
    setListStudent([
      { name: "Vũ Văn Học", birthday: "01/01/1999", gender: "MALE", key: 1 },
      {
        name: "Nguyễn Văn Hùng",
        birthday: "10/10/1999",
        gender: "MALE",
        key: 2,
      },
      { name: "Lê Văn Hưng", birthday: "23/01/1999", gender: "MALE", key: 3 },
      { name: "Phạm Hà Mi", birthday: "04/11/1999", gender: "FEMALE", key: 4 },
    ]);
  }, []);
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    { title: "Họ và tên", dataIndex: "name" },
    {
      title: "Giới tính",
      dataIndex: "gender",
      render: (data) => {
        if (data === "MALE") return "Nam";
        return "Nữ";
      },
    },
    { title: "Ngày sinh", dataIndex: "birthday" },
    { title: "Bảng điểm" },
  ];
  return (
    <Row gutter={12}>
      {/* <Col span={6}>
        <Card title={"Cấu trúc dữ liệu & giải thuật"} size="small">
          <p>Giáo viên: {`${currentUser.fullName}`}</p>
          <p>{currentUser.email && `Email: ${currentUser.email}`}</p>
          <p>{currentUser.phone && `SĐT: ${currentUser.phone}`}</p>
          <p>Tổng số học sinh: {`${listStudent.length} `}</p>
        </Card>
      </Col> */}
      <Col span={24}>
        <Row justify="space-between" style={{ marginBottom: 10 }}>
          <Col>
            <Title level={5}>Cấu trúc dữ liệu & giải thuật</Title>
          </Col>
          <Col>
            <Input.Search
              allowClear
              enterButton
              placeholder="Tìm kiếm học sinh"
            />
          </Col>
        </Row>
        <Table
          loading={isFetching}
          size="small"
          pagination={false}
          columns={columns}
          dataSource={listStudent}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
