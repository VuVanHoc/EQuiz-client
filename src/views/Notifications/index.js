import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Badge,
  Avatar,
  Typography,
  Tag,
  Dropdown,
  Menu,
  Empty,
} from "antd";
import "./Notifications.scss";
import { MoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import cx from "classnames";
import {
  DeleteTwoTone,
  InfoCircleTwoTone,
  CheckCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import http from "../../api";
import { NOTIFICATION_TYPES, ROUTES_PATH } from "../../common/Constants";
import { useHistory } from "react-router";

export const Notifications = (props) => {
  const { Title, Text } = Typography;
  const { currentUser } = props;

  const [isFetching, setFetching] = useState(false);

  const [notis, setNotis] = useState([]);

  useEffect(() => {
    getListNotification();
  }, []);
  const getListNotification = async () => {
    try {
      setFetching(true);

      const res = await http.get(`api/user/getNotifications`, {
        params: {
          userId: currentUser.userId,
          pageIndex: 0,
          pageSize: 1000,
        },
      });
      if (res) {
        setFetching(false);
        setNotis(res.data);
      }
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  };

  const updateOneNotification = (id, read, event) => {
    event.domEvent.stopPropagation();
    updateNotifications(id, false, read);
  };
  const updateAllNotifications = () => {
    updateNotifications(null, true, null);
  };
  const updateNotifications = async (notificationId, updateAll, read) => {
    try {
      const res = await http.post(
        `api/user/updateNotifications`,
        {},
        {
          params: {
            userId: currentUser.userId,
            notificationId,
            updateAll,
            read,
          },
        }
      );
      if (res) {
        getListNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createMarkup = (value) => {
    return {
      __html: value,
    };
  };

  const history = useHistory();

  const gotoNotiDetail = (type, id) => {
    switch (type) {
      case NOTIFICATION_TYPES.ASSIGNMENT:
        history.push(`${ROUTES_PATH.CLASSROOMS}/${id}`);
        break;
    }
  };
  return (
    <div className="container-noti">
      <Row>
        <Col>
          <Title level={3} className="header-table">
            Thông báo
          </Title>
        </Col>
        <Col>
          <Badge count={notis?.filter((noti) => !noti.read)?.length}></Badge>
        </Col>
      </Row>

      {notis?.map((noti) => {
        let type = "Bài tập";
        let color = "#FFA500";
        switch (noti.type) {
          case NOTIFICATION_TYPES.CHAT:
          case NOTIFICATION_TYPES.ASSIGNMENT:
            type = "Bài tập";
            color = "#FFA500";
            break;
        }
        return (
          <Row
            onClick={() => gotoNotiDetail(noti.type, noti.objectId)}
            align="middle"
            key={noti.id}
            className={cx({
              item: true,
              "item-read": noti.read,
            })}
            justify="space-between"
          >
            <Col>
              <Avatar size={64} icon={<UserOutlined />} src={noti.image} />
            </Col>
            <Col span={20}>
              <Row justify="space-between">
                <Col>
                  <Tag color={color}>{type}</Tag>
                </Col>
                <Col>
                  <Text type={noti.read ? "secondary" : ""}>
                    <ClockCircleOutlined style={{ marginRight: 10 }} />
                    {moment(noti.createdDate).format("DD/MM/YYYY HH:mm A")}
                  </Text>
                </Col>
              </Row>
              <p dangerouslySetInnerHTML={createMarkup(noti.content)} />
            </Col>
            <Col span={1} justify="center">
              <Dropdown
                trigger="click"
                overlay={
                  <Menu>
                    {noti.read ? (
                      <Menu.Item
                        onClick={(e) =>
                          updateOneNotification(noti.id, false, e)
                        }
                        icon={
                          <InfoCircleTwoTone
                            className="icon"
                            style={{ fontSize: 14 }}
                          />
                        }
                      >
                        Đánh dấu chưa đọc
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        onClick={(e) => updateOneNotification(noti.id, true, e)}
                        icon={
                          <CheckCircleTwoTone
                            twoToneColor="#52c41a"
                            className="icon"
                            style={{ fontSize: 14 }}
                          />
                        }
                      >
                        Đánh dấu đã đọc
                      </Menu.Item>
                    )}

                    <Menu.Item
                      icon={
                        <DeleteTwoTone
                          twoToneColor="red"
                          className="icon"
                          style={{ fontSize: 14 }}
                        />
                      }
                    >
                      Xoá thông báo
                    </Menu.Item>
                  </Menu>
                }
              >
                <MoreOutlined
                  className="icon-more-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(e);
                  }}
                />
              </Dropdown>
            </Col>
          </Row>
        );
      })}
      {notis?.length == 0 && (
        <Empty description="Bạn không có thông báo nào!" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
