import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Card, Typography, Row, Col } from "antd";
import { ACTIVITY_TYPE, ROUTES_PATH } from "../../common/Constants";
import hangmanPicture from "../../assets/introduce-hangman.png";
import crosswordPicture from "../../assets/introduce-crossword.png";
import HangmanGamePlay from "./Play/Hangman";
import CrosswordGameplay from "./Play/Crossword";
import http from "../../api";
import { LogoutOutlined } from "@ant-design/icons";

export const PracticeActivity = (props) => {
  const styleBtnExit = {
    backgroundColor: "orange",
    position: "absolute",
    right: 20,
    zIndex: 1,
  };
  const { Text, Title } = Typography;

  const [activityType, setActivityType] = useState(null);
  useEffect(() => {
    setActivityType(null);

    return () => {
      setActivityType(null);
    };
  }, []);

  const [listWordHangman, setListwordHangman] = useState([]);
  const selectHangman = () => {
    setActivityType(ACTIVITY_TYPE.HANGMAN);
    getListWordForHangman();
  };
  const getListWordForHangman = async () => {
    try {
      const res = await http.get(`api/word/randomWords?number=1`);
      if (res) {
        setListwordHangman(
          res.map((word) => {
            return {
              word: word.value,
              valueFromWordAPI: word.valueFromWordAPI,
            };
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Data setting for Crossword
  const [deadline, setDeadline] = useState(Date.now() + 15 * 60 * 1000);
  const selectCrossword = () => {
    setDeadline(Date.now() + 15 * 60 * 1000);
    setActivityType(ACTIVITY_TYPE.MATRIX_WORD);
  };
  const exitGamePlay = () => {
    setActivityType(null);
  };
  return (
    <div>
      {!activityType && (
        <>
          <Title level={4}>
            Chào mừng bạn đến với không gian tự học của EQuiz!
          </Title>
          <Text>Để bắt đầu, hãy lựa chọn hoạt động bạn muốn luyện tập.</Text>
          <Row gutter={[12]} style={{ marginTop: "1rem" }}>
            <Col>
              <Card
                onClick={selectHangman}
                hoverable
                style={{ width: 300 }}
                cover={<img src={hangmanPicture} height={150} />}
              >
                <Card.Meta
                  title={`Học từ vựng tiếng Anh với Ballon`}
                  description={`Một phiên bản trò chơi của Hangman giúp bạn học từ vựng Tiếng Anh thật hiệu quả.`}
                ></Card.Meta>
              </Card>
            </Col>
            <Col>
              <Card
                onClick={selectCrossword}
                hoverable
                style={{ width: 300 }}
                cover={<img src={crosswordPicture} height={150} />}
              >
                <Card.Meta
                  title={`Cross word`}
                  description={`Cùng tìm hiểu thật nhiều kiến thức thông qua những câu hỏi vô cùng phong phú.`}
                ></Card.Meta>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {activityType === ACTIVITY_TYPE.HANGMAN && (
        <>
          <Button
            style={styleBtnExit}
            icon={<LogoutOutlined />}
            type="primary"
            onClick={exitGamePlay}
          >
            Thoát
          </Button>
          <HangmanGamePlay listWord={listWordHangman} />
        </>
      )}
      {activityType === ACTIVITY_TYPE.MATRIX_WORD && (
        <>
          <Button
            style={styleBtnExit}
            icon={<LogoutOutlined />}
            type="primary"
            onClick={exitGamePlay}
          >
            Thoát
          </Button>
          <CrosswordGameplay deadline={deadline} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeActivity);
