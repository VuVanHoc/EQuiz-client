import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
import { Col, Row, Button, Switch, Statistic, Tooltip, Typography } from "antd";
import { IconMap } from "antd/lib/result";
import Modal from "antd/lib/modal/Modal";

export const CrosswordGamePlay = (props) => {
  const { isSetupMode } = props;
  const data = {
    across: {
      1: {
        clue: "Lục địa nào được phát hiện gần đây nhất",
        answer: "chauuc",
        row: 0,
        col: 0,
      },
      2: {
        clue: "Đây là nội dung câu hỏi số 2",
        answer: "2021",
        row: 1,
        col: 2,
      },
      3: {
        clue: "Câu hỏi số 3: Đây là gì?",
        answer: "1234567",
        row: 2,
        col: 0,
      },
      4: {
        clue: "Đây là câu hỏi số 1",
        answer: "TWO",
        row: 3,
        col: 1,
      },
      5: {
        clue: "Đây là nội dung câu hỏi số 2",
        answer: "2021",
        row: 4,
        col: 2,
      },
      6: {
        clue: "Câu hỏi số 3: Đây là gì?",
        answer: "1234567",
        row: 5,
        col: 3,
      },
      7: {
        clue: "Lục địa nào được phát hiện gần đây nhất",
        answer: "chauuc",
        row: 6,
        col: 0,
      },
      8: {
        clue: "Đây là nội dung câu hỏi số 2",
        answer: "2021",
        row: 7,
        col: 2,
      },
      9: {
        clue: "Câu hỏi số 3: Đây là gì?",
        answer: "1234567",
        row: 8,
        col: 0,
      },
      10: {
        clue: "Đây là câu hỏi số 1",
        answer: "TWO",
        row: 9,
        col: 1,
      },
      11: {
        clue: "Đây là nội dung câu hỏi số 2",
        answer: "2021",
        row: 10,
        col: 2,
      },
      12: {
        clue: "Câu hỏi số 3: Đây là gì?",
        answer: "1234567",
        row: 11,
        col: 3,
      },
    },
    down: {},
  };
  const onCorrect = (direction, number, answer) => {
    console.log(direction, number, answer);
  };
  const onCrosswordCorrect = (value) => {
    console.log(value);
  };
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
  return (
    <div>
      <Typography.Text>
        Bạn hãy giải ô chữ sau bằng cách điền các đáp án trả lời của các câu hỏi
        vào bảng
      </Typography.Text>
      <br />
      <Typography.Text type="danger">
        Các đáp án cần nhập không dấu và không chứa khoảng trắng
      </Typography.Text>
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
              id="CrosswordSetup"
              onCorrect={onCorrect}
              onCrosswordCorrect={onCrosswordCorrect}
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
              <Button type="primary">Lưu hoạt động</Button>
            </>
          ) : (
            <>
              <Statistic.Countdown
                title="Thời gian"
                value={props.deadline}
                onFinish={() => {}}
              ></Statistic.Countdown>
              <Button
                style={{ width: 100 }}
                danger
                type="primary"
                onClick={() => setVisibleDeleteAnswered(true)}
              >
                Xoá tất cả
              </Button>

              <Button style={{ width: 100 }} type="primary">
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
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CrosswordGamePlay);
