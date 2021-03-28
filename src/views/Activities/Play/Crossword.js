import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
import { Col, Row, Button, Switch, Statistic } from "antd";

export const CrosswordGamePlay = (props) => {
  const { isSetupMode } = props;
  const data = {
    across: {
      1: {
        clue: "Đây là câu hỏi số 1",
        answer: "TWO",
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
    return () => {
      
    }
  }, [isSetupMode]);
  return (
    <div>
      <p>
        Bạn hãy giải ô chữ sau bằng cách điền các đáp án trả lời của các câu hỏi
        vào bảng
      </p>
      <Row gutter={[12, 12]}>
        <Col span={10}>
          <ThemeProvider
            theme={{
              columnBreakpoint: "9999px",
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
        <Col span={12}>
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
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CrosswordGamePlay);
