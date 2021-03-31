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
        clue: "Dark purplish-red",
        answer: "CRIMSON",
        row: 0,
        col: 2,
      },
      4: {
        clue: "Use a spade to make a hole",
        answer: "DIG",
        row: 2,
        col: 0,
      },
      6: {
        clue: "Painting, sculpture or drawing",
        answer: "ART",
        row: 2,
        col: 8,
      },
      8: {
        clue: "Something you wear on your head to protect you from the sun",
        answer: "HAT",
        row: 3,
        col: 4,
      },
      9: {
        clue: "A wobby coloured dessert. It's yummy with ice cream",
        answer: "JELLY",
        row: 4,
        col: 0,
      },
      11: {
        clue: "Elegant birds with long necks",
        answer: "SWANS",
        row: 4,
        col: 6,
      },
      13: {
        clue: "What you do if someone tell you something funny",
        answer: "LAUGH",
        row: 6,
        col: 0,
      },
      16: {
        clue: "A book with maps of different countries",
        answer: "ATLAS",
        row: 6,
        col: 6,
      },
      18: {
        clue: "1, 3, 5, 7, 9 are all this kind of number (they are not even)",
        answer: "ODD",
        row: 7,
        col: 4,
      },
      19: {
        clue: "A small green vegetable that comes in a pod with others",
        answer: "PEA",
        row: 8,
        col: 0,
      },
      20: {
        clue: "An enclose for pigs to live in",
        answer: "STY",
        row: 8,
        col: 8,
      },
      21: {
        clue: "A kind of very high-quality glass",
        answer: "CRYSTAL",
        row: 10,
        col: 2,
      },
    },
    down: {
      2: {
        clue:
          "A mosquito bite can be very _____ and make you want to scartch it",
        answer: "ITCHY",
        row: 0,
        col: 4,
      },
      3: {
        clue: "Dots",
        answer: "SPOTS",
        row: 0,
        col: 6,
      },
      5: {
        clue: "Small blocks of this are good to make a drink cold",
        answer: "ICE",
        row: 2,
        col: 1,
      },
      7: {
        clue: "Sprint or jog",
        answer: "RUN",
        row: 2,
        col: 9,
      },
      10: {
        clue: "The part of your body from your hip to your ankle",
        answer: "LEG",
        row: 4,
        col: 3,
      },
      12: {
        clue: "Soaked with water",
        answer: "LEG",
        row: 4,
        col: 7,
      },
      14: {
        clue: "The number of years since you were born is your ____",
        answer: "AGE",
        row: 7,
        col: 1,
      },
      15: {
        clue: "Sweet substance made by bees",
        answer: "HONEY",
        row: 6,
        col: 4,
      },
      16: {
        clue: "Another word for a grown-up",
        answer: "ADULT",
        row: 6,
        col: 6,
      },
      17: {
        clue: "A small often black insect that lives in a colony",
        answer: "ANT",
        row: 6,
        col: 9,
      },
    },
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
