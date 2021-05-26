import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Modal, Input, Form, Row, Col, Button, Checkbox, Tooltip } from "antd";
import QuestionTypeDropdown from "../QuestionTypeDropdown";
import LevelDropdown from "../LevelDropdown";
import {
  PlusOutlined,
  DeleteTwoTone,
  CheckSquareTwoTone,
  CheckCircleTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { setVisibleModal } from "../../../store/common/actions";
import Editor from "../Editor";
import { QUESTION_TYPES } from "../../Constants";
import SubjectDropdown from "../../components/SubjectDropdown";
import http from "../../../api";
import { NotificationSuccess } from "../Notification";
import { requestFetchList } from "../../../store/question/actions";

export const CreateQuestionModal = (props) => {
  const labelStyle = {
    span: 8,
  };
  const oneAnswerTemplate = {
    correct: false,
    content: "",
  };

  const { visible, setVisibleModal, currentUser, requestFetchList } = props;
  const [form] = Form.useForm();
  const [questionType, setQuestionType] = useState();
  const [listAnswer, setListAnswer] = useState([]);
  const [questionContent, setQuestionContent] = useState("");
  const [answerFillin, setAnswerFillin] = useState("");
  const [errorAnswer, setErrorAnswer] = useState(null);
  const [errorQuestion, setErrorQuestion] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setQuestionType(null);
    setListAnswer([]);
    setQuestionContent("");
    setAnswerFillin("");
    setErrorAnswer(null);
    setErrorQuestion(null);
  };
  useEffect(() => {
    visible && resetForm();
  }, [visible]);

  const onOk = () => {
    form.validateFields().then(async (values) => {
      if (
        !questionContent ||
        questionContent?.trim() === "" ||
        questionContent?.trim() === "<p></p>" ||
        questionContent?.trim() === "<p><br></p>"
      ) {
        setErrorQuestion("Bạn chưa nhập nội dung câu hỏi");
        return;
      }
      switch (questionType) {
        case QUESTION_TYPES.FILL_IN:
          if (answerFillin?.trim() === "" || !answerFillin) {
            setErrorAnswer("Bạn chưa nhập đáp án");
            return;
          }
          break;
        case QUESTION_TYPES.MULTIPLE_CHOICE:
          let a = listAnswer.find((e) => e.correct === true);
          if (!a) {
            setErrorAnswer("Bạn cần lựa chọn ít nhất 1 đáp án đúng");
            return;
          }
          break;
        case QUESTION_TYPES.MULTIPLE_CORRECT:
          let b = listAnswer.find((e) => e.correct === true);
          if (!b) {
            setErrorAnswer("Bạn cần lựa chọn ít nhất 1 đáp án đúng");
            return;
          }
          break;
        case QUESTION_TYPES.TRUE_FALSE:
          let c = listAnswer.find((e) => e.correct === true);
          if (!c) {
            setErrorAnswer("Bạn cần lựa chọn ít nhất 1 đáp án đúng");
            return;
          }
          break;
      }

      setErrorAnswer(null);
      let body = {
        questionType: values.questionType,
        level: values.level,
        hint: values.hint,
        content: questionContent,
        subject: values.subject,
        createdBy: currentUser.userId,
        answerList:
          questionType === QUESTION_TYPES.FILL_IN
            ? [{ correct: true, content: answerFillin }]
            : listAnswer,
      };
      try {
        setSubmitting(true);
        const res = await http.post(`api/question/create`, body);
        if (res) {
          setSubmitting(false);
          onCancel();
          NotificationSuccess("Tạo câu hỏi thành công");
          requestFetchList({
            pageIndex: 0,
            pageSize: 10,
          });
        }
      } catch (e) {
        setSubmitting(false);

        console.log(e);
      }
    });
  };
  const onCancel = () => {
    setVisibleModal("createQuestion", false);
    form.resetFields();
  };

  const changeQuestionType = (e, { value }) => {
    setListAnswer([]);
    setQuestionType(value);
    if (value === QUESTION_TYPES.TRUE_FALSE) {
      setListAnswer([oneAnswerTemplate, oneAnswerTemplate]);
    } else if (
      value === QUESTION_TYPES.MULTIPLE_CHOICE ||
      value === QUESTION_TYPES.MULTIPLE_CORRECT
    ) {
      setListAnswer([
        oneAnswerTemplate,
        oneAnswerTemplate,
        oneAnswerTemplate,
        oneAnswerTemplate,
      ]);
    }
  };

  const clickAddAnswer = () => {
    setListAnswer([...listAnswer, oneAnswerTemplate]);
  };
  const changeValueAnswer = (value, rowIndex) => {
    setListAnswer([
      ...listAnswer.slice(0, rowIndex),
      { ...listAnswer[rowIndex], content: value },
      ...listAnswer.slice(rowIndex + 1, listAnswer.length),
    ]);
  };
  const setCorrectAnswer = (correct, rowIndex) => {
    setListAnswer([
      ...listAnswer.slice(0, rowIndex),
      { ...listAnswer[rowIndex], correct: !correct },
      ...listAnswer.slice(rowIndex + 1, listAnswer.length),
    ]);
  };
  const deleteAnswer = (rowIndex) => {
    setListAnswer([
      ...listAnswer.slice(0, rowIndex),
      ...listAnswer.slice(rowIndex + 1, listAnswer.length),
    ]);
  };
  const renderListAnswer = (questionType) => {
    switch (questionType) {
      case QUESTION_TYPES.FILL_IN:
        return (
          <>
            <Input
              style={errorAnswer && { borderColor: "#ff4d4f" }}
              placeholder="Nhập đáp án..."
              value={answerFillin}
              onChange={(e) => {
                setAnswerFillin(e.target.value);
                setErrorAnswer(null);
              }}
            />
            {errorAnswer && <p style={{ color: "#ff4d4f" }}>{errorAnswer}</p>}
          </>
        );
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <>
            {listAnswer.map((row, rowIndex) => {
              return (
                <Row
                  key={rowIndex}
                  align="middle"
                  justify="space-between"
                  gutter={[12, 12]}
                >
                  <Col span={2}>
                    {row.correct ? (
                      <CheckCircleTwoTone
                        style={{ fontSize: 24 }}
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                      />
                    ) : (
                      <CheckCircleTwoTone
                        twoToneColor="#bfbfbf"
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                        style={{ fontSize: 24 }}
                      />
                    )}
                  </Col>
                  <Col span={21}>
                    <Input
                      value={row.content}
                      onChange={(e) =>
                        changeValueAnswer(e.target.value, rowIndex)
                      }
                    />
                  </Col>
                  <Col span={1}>
                    <DeleteTwoTone
                      style={{ fontSize: 18 }}
                      twoToneColor="red"
                      onClick={() => deleteAnswer(rowIndex)}
                    />
                  </Col>
                </Row>
              );
            })}
            {
              <Button
                icon={<PlusOutlined />}
                onClick={clickAddAnswer}
                type="dashed"
              >
                Thêm lựa chọn
              </Button>
            }
          </>
        );
      case QUESTION_TYPES.TRUE_FALSE:
        return (
          <>
            {listAnswer.map((row, rowIndex) => {
              return (
                <Row
                  key={rowIndex}
                  align="middle"
                  justify="space-between"
                  gutter={[12, 12]}
                >
                  <Col span={2}>
                    {row.correct ? (
                      <CheckCircleTwoTone
                        style={{ fontSize: 24 }}
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                      />
                    ) : (
                      <CheckCircleTwoTone
                        twoToneColor="#bfbfbf"
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                        style={{ fontSize: 24 }}
                      />
                    )}
                  </Col>
                  <Col span={22}>
                    <Input
                      value={row.content}
                      onChange={(e) =>
                        changeValueAnswer(e.target.value, rowIndex)
                      }
                    />
                  </Col>
                </Row>
              );
            })}
          </>
        );
      case QUESTION_TYPES.MULTIPLE_CORRECT:
        return (
          <>
            {listAnswer.map((row, rowIndex) => {
              return (
                <Row
                  key={rowIndex}
                  align="middle"
                  justify="space-between"
                  gutter={[12, 12]}
                >
                  <Col span={2}>
                    {row.correct ? (
                      <CheckSquareTwoTone
                        style={{ fontSize: 24 }}
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                      />
                    ) : (
                      <CheckSquareTwoTone
                        twoToneColor="#bfbfbf"
                        onClick={() => setCorrectAnswer(row.correct, rowIndex)}
                        style={{ fontSize: 24 }}
                      />
                    )}
                  </Col>
                  <Col span={21}>
                    <Input
                      value={row.content}
                      onChange={(e) =>
                        changeValueAnswer(e.target.value, rowIndex)
                      }
                    />
                  </Col>
                  <Col span={1}>
                    <DeleteTwoTone
                      style={{ fontSize: 18 }}
                      twoToneColor="red"
                      onClick={() => deleteAnswer(rowIndex)}
                    />
                  </Col>
                </Row>
              );
            })}
            {
              <Button
                icon={<PlusOutlined />}
                onClick={clickAddAnswer}
                type="dashed"
              >
                Thêm lựa chọn
              </Button>
            }
          </>
        );
      default:
        return <p>Bạn cần lựa chọn Loại câu hỏi</p>;
    }
  };
  return (
    <Modal
      width={700}
      title="Tạo câu hỏi"
      okText="Tạo"
      cancelText="Huỷ"
      onOk={onOk}
      okButtonProps={{
        loading: isSubmitting,
      }}
      onCancel={onCancel}
      visible={visible}
    >
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              colon={false}
              required
              label="Loại câu hỏi"
              labelCol={labelStyle}
              labelAlign="left"
              name="questionType"
              rules={[
                { required: true, message: "Bạn chưa lựa chọn Loại câu hỏi" },
              ]}
            >
              <QuestionTypeDropdown onChange={changeQuestionType} />
            </Form.Item>
            <Form.Item
              colon={false}
              required
              label="Chủ đề"
              labelCol={labelStyle}
              labelAlign="left"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa lựa chọn chủ đề cho câu hỏi",
                },
              ]}
            >
              <SubjectDropdown />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              colon={false}
              required
              label="Mức độ"
              labelCol={labelStyle}
              labelAlign="left"
              name="level"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa lựa chọn mức độ của câu hỏi",
                },
              ]}
            >
              <LevelDropdown />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item colon={false} label="Nội dung câu hỏi">
              <Editor
                value={questionContent}
                onChange={(value) => {
                  setQuestionContent(value);
                  setErrorQuestion(null);
                }}
              />
              {errorQuestion && (
                <p style={{ color: "#ff4d4f" }}>{errorQuestion}</p>
              )}
            </Form.Item>
            <Form.Item
              colon={false}
              label="Gợi ý"
              name="hint"
              labelAlign="left"
            >
              <Input />
            </Form.Item>
            {/* <Form.Item colon={false} label="Đáp án" labelAlign="left"> */}
            <div style={{ fontWeight: 500 }}>
              Đáp án{" "}
              <Tooltip
                placement="topLeft"
                title={`Đáp án có dấu tích xanh là đáp án đúng`}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            {renderListAnswer(questionType)}
            {questionType != QUESTION_TYPES.FILL_IN && errorAnswer && (
              <p style={{ color: "#ff4d4f" }}>{errorAnswer}</p>
            )}
            {/* </Form.Item> */}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  visible: state.common.visibleModals["createQuestion"],
  currentUser: state.auth.user,
});

const mapDispatchToProps = {
  setVisibleModal,
  requestFetchList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateQuestionModal);
