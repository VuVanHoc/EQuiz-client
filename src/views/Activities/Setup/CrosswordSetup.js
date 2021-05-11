import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import Crossword, { ThemeProvider } from "@jaredreisinger/react-crossword";
import { Row, Col, Button, Input } from "antd";
import "./CrosswordSetup.scss";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
export const CrosswordSetup = (props) => {
  const {
    data,
    deleteQuestion,
    addQuestionCrossword,
    updateDataQuestionCrossword,
  } = props;

  const refCrossword = useRef(null);

  useEffect(() => {
    refCrossword.current.fillAllAnswers();
  }, [data]);
  return (
    <Row gutter={[12]}>
      <Col span={16}>
        <p style={{ fontWeight: "bold" }}>Hàng ngang (Across)</p>
        <Row align="middle" justify="space-between">
          <Col span={2} style={{ fontWeight: "bold" }}>
            STT
          </Col>
          <Col span={11} style={{ fontWeight: "bold" }}>
            Câu hỏi
          </Col>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Đáp án
          </Col>
          <Col span={2} style={{ fontWeight: "bold" }}>
            Hàng
          </Col>
          <Col span={2} style={{ fontWeight: "bold" }}>
            Cột
          </Col>
          <Col span={1} style={{ fontWeight: "bold" }}></Col>
        </Row>
        {data.across &&
          Object.keys(data.across).map((e, index) => {
            return (
              <Row
                key={`${index}-across`}
                gutter={[0, 6]}
                align="middle"
                justify="space-between"
              >
                <Col span={2}>
                  <Input type="number" value={e} readOnly />
                </Col>
                <Col span={11}>
                  <Input
                    value={data.across[e].clue}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "across",
                        e,
                        "clue",
                        event.target.value
                      )
                    }
                  />
                </Col>
                <Col span={6}>
                  <Input
                    value={data.across[e].answer}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "across",
                        e,
                        "answer",
                        event.target.value
                      )
                    }
                  />
                </Col>
                <Col span={2}>
                  <Input
                    type="number"
                    value={data.across[e].row}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "across",
                        e,
                        "row",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </Col>
                <Col span={2}>
                  <Input
                    type="number"
                    value={data.across[e].col}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "across",
                        e,
                        "col",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone
                    twoToneColor="red"
                    onClick={() => {
                      deleteQuestion("across", parseInt(e));
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addQuestionCrossword("across")}
        >
          Thêm hàng
        </Button>
        <p style={{ fontWeight: "bold" }}>Cột dọc (Down)</p>
        <Row align="middle" justify="space-between">
          <Col span={2} style={{ fontWeight: "bold" }}>
            STT
          </Col>
          <Col span={11} style={{ fontWeight: "bold" }}>
            Câu hỏi
          </Col>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Đáp án
          </Col>
          <Col span={2} style={{ fontWeight: "bold" }}>
            Hàng
          </Col>
          <Col span={2} style={{ fontWeight: "bold" }}>
            Cột
          </Col>
          <Col span={1} style={{ fontWeight: "bold" }}></Col>
        </Row>
        {data.down &&
          Object.keys(data.down).map((e, index) => {
            return (
              <Row
                key={`${index}-down`}
                gutter={[0, 6]}
                align="middle"
                justify="space-between"
              >
                <Col span={2}>
                  <Input type="number" value={e} readOnly />
                </Col>
                <Col span={11}>
                  <Input
                    value={data.down[e].clue}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "down",
                        e,
                        "clue",
                        event.target.value
                      )
                    }
                  />
                </Col>
                <Col span={6}>
                  <Input
                    value={data.down[e].answer}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "down",
                        e,
                        "answer",
                        event.target.value
                      )
                    }
                  />
                </Col>
                <Col span={2}>
                  <Input
                    type="number"
                    value={data.down[e].row}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "down",
                        e,
                        "row",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </Col>
                <Col span={2}>
                  <Input
                    type="number"
                    value={data.down[e].col}
                    onChange={(event) =>
                      updateDataQuestionCrossword(
                        "down",
                        e,
                        "col",
                        parseInt(event.target.value)
                      )
                    }
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone
                    twoToneColor="red"
                    onClick={() => {
                      deleteQuestion("down", e);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addQuestionCrossword("down")}
        >
          Thêm hàng
        </Button>
      </Col>
      <Col span={6} id="colCroswordSetup">
        <ThemeProvider
          id="CrosswordSetup"
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
          <Crossword ref={refCrossword} data={data} />
        </ThemeProvider>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CrosswordSetup);
