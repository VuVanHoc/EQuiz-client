import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Typography, Table, Tag, Input } from "antd";
import { ROLE_TYPE, MAP_ACTIVITY_NAME } from "../../common/Constants";
import "./Activity.scss";
import http from "../../api";
import moment from "moment";

export const HistoryPracticeActivity = (props) => {
  const { currentUser } = props;
  const { Text, Title } = Typography;
  const [historyPractice, setHistoryPractice] = useState({});

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchHistoryPractice({ pageIndex: 0, pageSize: 5 });
  }, []);

  const fetchHistoryPractice = async (data) => {
    try {
      setIsFetching(true);

      const res = await http.post(
        `api/activity/getListHistoryPractice?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,
        {
          orderBy: "createdDate",
          orderByAsc: data.orderByAsc,
          userId: currentUser.userId,
          responsibleId: currentUser.userId,
          searchText: data.searchText || "",
        }
      );
      if (res) {
        setHistoryPractice(res);
        setIsFetching(false);
      }
    } catch (error) {
      console.log(error);
      setIsFetching(true);
    }
  };

  const columns = [
    {
      title: "Tên hoạt động",
      dataIndex: "name",
      render: (name, record) => {
        return name ? name : MAP_ACTIVITY_NAME[record.type];
      },
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
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      render: (startTime) => {
        return startTime ? moment(startTime).format("DD/MM/YYYY HH:mm A") : "";
      },
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      render: (endTime) => {
        return endTime ? moment(endTime).format("DD/MM/YYYY HH:mm A") : "";
      },
    },
    {
      title: "Kết quả",
      dataIndex: "result",
    },
  ];
  return (
    <div>
      <div className="d-flex">
        <Title level={3} className="header-table">
          Lịch sử học tập
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
        dataSource={historyPractice.data}
        pagination={{
          total: historyPractice.total || 0,
          onChange: (pageIndex, pageSize) => {
            fetchHistoryPractice({ pageIndex, pageSize });
          },
          pageSize: 5,
          showTotal: (total) => {
            return `Tổng số: ${total} kết quả`;
          },
        }}
        rowKey={(record) => record.historyActivityId}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPracticeActivity);
