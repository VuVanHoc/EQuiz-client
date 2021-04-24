import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Card, Typography, Row, Col, Form, Tooltip } from "antd";
import { ACTIVITY_TYPE, ROUTES_PATH } from "../../common/Constants";
import hangmanPicture from "../../assets/introduce-hangman.png";
import crosswordPicture from "../../assets/introduce-crossword.png";
import HangmanGamePlay from "./Play/Hangman";
import CrosswordGameplay from "./Play/Crossword";
import http from "../../api";
import { LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import LevelDropdown from "../../common/components/LevelDropdown";
import SubjectDropdown from "../../common/components/SubjectDropdown";
import { NotificationSuccess } from "../../common/components/Notification";

export const PracticeActivity = (props) => {
  const styleBtnExit = {
    backgroundColor: "orange",
    position: "absolute",
    right: 20,
    zIndex: 1,
  };
  const { Text, Title } = Typography;

  const [activityType, setActivityType] = useState(null);
  const [visibleLevelHangman, setVisibleLevelHangman] = useState(false);
  const [levelSelected, setLevelSelected] = useState("EASY");
  const [startTimePractice, setStartTimePractice] = useState(
    new Date().getTime()
  );

  // const [historyMode, setHistoryMode] = useState(false);

  const [form] = Form.useForm();
  const [formStartCrossword] = Form.useForm();

  useEffect(() => {
    setActivityType(null);
    return () => {
      setActivityType(null);
    };
  }, []);

  const [listWordHangman, setListwordHangman] = useState([]);
  const selectHangman = () => {
    setVisibleLevelHangman(true);
    // setActivityType(ACTIVITY_TYPE.HANGMAN);
    // getListWordForHangman();
  };
  const getListWordForHangman = async (number, level) => {
    try {
      const res = await http.get(
        `api/word/randomWords?number=${number}&level=${level}`
      );
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
  const [deadline, setDeadline] = useState(Date.now() + 20 * 60 * 1000);
  const [visibleModalStartCrossword, setvisibleModalStartCrossword] = useState(
    false
  );
  const [dataCrossword, setDataCrossword] = useState({});

  const selectCrossword = () => {
    setvisibleModalStartCrossword(true);
    // setDeadline(Date.now() + 20 * 60 * 1000);
    // setActivityType(ACTIVITY_TYPE.MATRIX_WORD);
  };

  const onOkStartCrossword = () => {
    formStartCrossword.validateFields().then((values) => {
      console.log(values);
      getRandomCrossword(values.level, values.subject);
    });
  };

  const getRandomCrossword = async (level, subject) => {
    try {
      const res = await http.get(
        `api/activity/getRandomCrossword?level=${level}&subject=${subject}`
      );
      if (res) {
        setDataCrossword(res);
        setActivityType(ACTIVITY_TYPE.MATRIX_WORD);
        setStartTimePractice(new Date().getTime());
        setvisibleModalStartCrossword(false);
        formStartCrossword.resetFields();
      }
    } catch (error) {}
  };
  const exitGamePlay = () => {
    saveResultPractice(new Date().getTime());
  };

  const saveResultPractice = async (
    endTime,
    totalAnswerCorrect,
    totalQuestion
  ) => {
    try {
      let dataSetup = "";
      let activityId = null;
      switch (activityType) {
        case ACTIVITY_TYPE.HANGMAN:
          dataSetup = JSON.stringify(listWordHangman);
          break;
        case ACTIVITY_TYPE.MATRIX_WORD:
          dataSetup = dataCrossword.dataSetup;
          activityId = dataCrossword.id;
          break;
      }
      const res = await http.post(`api/activity/saveResultPractice`, {
        activityId: activityId,
        activityType: activityType,
        dataSetup: dataSetup,
        endTime: endTime,
        level: levelSelected,
        startTime: startTimePractice,
        studentId: props.currentUser.userId,
        totalAnswerCorrect: totalAnswerCorrect,
        totalQuestion: totalQuestion,
      });
      if (res) {
        console.log("Saved", res);
        NotificationSuccess(
          "Hoàn thành",
          "Kết quả luyện tập của bạn đã được lưu vào lịch sử học tập"
        );
        setActivityType(null);
      }
    } catch (error) {
      console.log(error);
      setActivityType(null);
    }
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
                  title={`Học từ vựng tiếng Anh với Balloon`}
                  description={`Giúp ghi nhớ và học từ vựng tiếng Anh hiệu quả hơn.`}
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
                  title={`Crossword`}
                  description={`Giải mã những ô chữ với chủ đề Toán và Tiếng Anh siêu thú vị.`}
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
          <CrosswordGameplay data={JSON.parse(dataCrossword.dataSetup)} />
        </>
      )}

      <Modal
        key="modalStartBalloon"
        title="Chọn mức độ"
        visible={visibleLevelHangman}
        onCancel={() => {
          setVisibleLevelHangman(false);
          form.resetFields();
          setLevelSelected("EASY");
        }}
        onOk={() => {
          form.validateFields().then((values) => {
            console.log(values);
            setActivityType(ACTIVITY_TYPE.HANGMAN);
            setStartTimePractice(new Date().getTime());
            getListWordForHangman(10, values.level);
            setVisibleLevelHangman(false);
            form.resetFields();
            // setLevelSelected("EASY");
          });
        }}
        okText="Xác nhận"
        cancelText="Huỷ"
        forceRender
      >
        <Form initialValues={{ level: "EASY" }} form={form}>
          <Form.Item label="Lựa chọn mức độ" name="level">
            <LevelDropdown
              style={{ width: "100%" }}
              onChange={(value) => {
                setLevelSelected(value);
              }}
            />
          </Form.Item>
          {form.getFieldValue("level") === "EASY" ? (
            <p>Bộ từ sẽ gồm các từ có 3-5 ký tự</p>
          ) : form.getFieldValue("level") === "MEDIUM" ? (
            <p>Bộ từ sẽ gồm các từ có 6-10 ký tự</p>
          ) : (
            <p>Bộ từ sẽ gồm các từ có trên 10 ký tự</p>
          )}
        </Form>
      </Modal>

      <Modal
        key="modalStartCrossword"
        visible={visibleModalStartCrossword}
        title="Chọn chủ đề Crossword"
        okText="Bắt đầu"
        cancelText="Huỷ"
        onCancel={() => {
          setvisibleModalStartCrossword(false);
          formStartCrossword.resetFields();
        }}
        onOk={onOkStartCrossword}
        forceRender
      >
        <Form initialValues={{ level: "EASY" }} form={formStartCrossword}>
          <Form.Item
            label="Chủ đề"
            name="subject"
            rules={[
              {
                required: true,
                message: "Bạn chưa lựa chọn chủ đề cho bộ ô chữ",
              },
            ]}
          >
            <SubjectDropdown style={{ width: "100%" }} hasOptionRandom />
          </Form.Item>
          <Form.Item label="Mức độ" name="level">
            <LevelDropdown style={{ width: "100%" }} onChange={(value) => {}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PracticeActivity);
