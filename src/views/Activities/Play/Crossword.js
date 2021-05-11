import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
import { Col, Row, Button, Switch, Statistic, Tooltip, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import TadaSound from "../../../assets/audio/TadaSound.mp3";
import WrongAnswer from "../../../assets/audio/WrongAnswer.wav";
// import winnerImg from "../../../assets/winner.png";
export const CrosswordGamePlay = (props) => {
  const WrongAnswerAudio = new Audio(WrongAnswer);
  const WinnerSoundAudio = new Audio(TadaSound);

  const { isSetupMode, data, saveActivity } = props;

  const [totalCorrect, setTotalCorrect] = useState(0);
  const [correct, setCorrect] = useState(false);

  const refCrossword = useRef(null);
  useEffect(() => {
    if (refCrossword && isSetupMode) {
      refCrossword.current.fillAllAnswers();
    } else if (!isSetupMode) {
      refCrossword.current.reset();
    }
    return () => {};
  }, [isSetupMode]);

  const [visibleDeleteAnswered, setVisibleDeleteAnswered] = useState(false);
  const [
    visibleModalConfirmFinishExam,
    setvisibleModalConfirmFinishExam,
  ] = useState(false);
  const [visisbleModalSummary, setVisibleModalSummary] = useState(false);

  const finishPractice = () => {
    const totalQuestion =
      Object.keys(data.across).length + Object.keys(data.down).length;

    console.log("Total question:", totalQuestion, totalCorrect);

    setvisibleModalConfirmFinishExam(false);
    if (refCrossword.current.isCrosswordCorrect()) {
      console.log("Correct");
      WinnerSoundAudio.play();
      setCorrect(true);
    } else {
      console.log("Not correct");
      WrongAnswerAudio.play();
      setCorrect(false);
    }
    setVisibleModalSummary(true);
  };
  const onCorrect = (direction, number, answer) => {
    // setTotalCorrect(totalCorrect + 1);
  };
  const onCrosswordCorrect = (value) => {
    // console.log(value);
  };
  const onCellChange = (a, b) => {
    console.log(a, b);
    // setTotalCorrect(totalCorrect - 1 >= 0 ? totalCorrect - 1 : 0);
  };
  return (
    <div>
      <Typography.Text>
        Bạn hãy giải ô chữ sau bằng cách điền các đáp án trả lời của các câu hỏi
        vào bảng
      </Typography.Text>
      <br />
      {/* <Typography.Text type="danger">
        Các đáp án cần nhập không dấu và không chứa khoảng trắng
      </Typography.Text> */}
      <Row gutter={[12, 12]}>
        <Col span={16}>
          <ThemeProvider
            theme={{
              columnBreakpoint: "768px",
              gridBackground: "#acf",
              cellBackground: "#ffe",
              cellBorder: "#fca",
              textColor: "#0f4c81",
              focusBackground: "#fff566",
              highlightBackground: "#fffb8f",
            }}
          >
            <Crossword
              ref={refCrossword}
              data={data}
              id="CrosswordPlay"
              onCorrect={onCorrect}
              onCrosswordCorrect={onCrosswordCorrect}
              onCellChange={onCellChange}
            />
          </ThemeProvider>
        </Col>
        <Col span={8}>
          {isSetupMode ? (
            <>
              <Row>
                <Col span={10}>
                  <h5>Hiện đáp án đúng</h5>
                </Col>
                <Col>
                  <Switch
                    defaultChecked={true}
                    onChange={(checked) => {
                      if (checked) {
                        refCrossword.current.fillAllAnswers();
                      } else {
                        refCrossword.current.reset();
                      }
                    }}
                  />
                </Col>
              </Row>
              <Button type="primary" onClick={() => saveActivity()}>
                Lưu hoạt động
              </Button>
            </>
          ) : (
            <>
              {/* <Statistic.Countdown
                title="Thời gian"
                value={props.deadline}
                onFinish={() => {}}
              ></Statistic.Countdown> */}
              {/* <TickingClock /> */}
              <Button
                style={{ width: 100 }}
                danger
                type="primary"
                onClick={() => setVisibleDeleteAnswered(true)}
              >
                Xoá tất cả
              </Button>

              <Button
                style={{ width: 100 }}
                type="primary"
                onClick={() => setvisibleModalConfirmFinishExam(true)}
              >
                Nộp bài
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Modal
        visible={visibleDeleteAnswered}
        title="Xác nhận"
        cancelText="Huỷ"
        onCancel={() => setVisibleDeleteAnswered(false)}
        okText="Xác nhận"
        onOk={() => {
          refCrossword.current.reset();
          setVisibleDeleteAnswered(false);
        }}
      >
        Bạn có chắc chắn muốn xoá tất cả các đáp án đã nhập không?
      </Modal>
      <Modal
        visible={visibleModalConfirmFinishExam}
        title="Xác nhận"
        cancelText="Huỷ"
        onCancel={() => setvisibleModalConfirmFinishExam(false)}
        okText="Xác nhận"
        onOk={finishPractice}
      >
        Bạn có chắc chắn muốn nộp bài cho hoạt động này không?
      </Modal>
      <Modal
        visible={visisbleModalSummary}
        title="Kết quả"
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setVisibleModalSummary(false);
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        {correct ? (
          <div>
            <p>
              Chúc mừng
              <br />
              Bạn đã trả lời đúng tất cả các ô chữ!
            </p>
          </div>
        ) : (
          <div>
            <p>
              Rất tiếc
              <br />
              Bạn chưa giải đúng các ô chữ!
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CrosswordGamePlay);
