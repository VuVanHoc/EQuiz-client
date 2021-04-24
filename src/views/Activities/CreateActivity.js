import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Typography, Form, Steps, Input, Button } from "antd";
import {
  ROUTES_PATH,
  MAP_ACTIVITY_NAME,
  MAP_LEVEL_LABEL,
  ACTIVITY_TYPE,
} from "../../common/Constants";
import "./Activity.scss";
import { ActivityTypeDropdown } from "../../common/components/ActivityTypeDropdown";
import LevelDropdown from "../../common/components/LevelDropdown";
import SubjectDropdown from "../../common/components/SubjectDropdown";

import TextArea from "antd/lib/input/TextArea";
import { SettingOutlined } from "@ant-design/icons";
import { Flashcard } from "./Setup/Flashcard";
import { Hangman } from "./Setup/Hangman";
import { CrosswordGamePlay } from "./Play/Crossword";
import { HangmanGamePlay } from "./Play/Hangman";
import { CrosswordSetup } from "./Setup/CrosswordSetup";
import { NotificationSuccess } from "../../common/components/Notification";
import { useHistory } from "react-router";
import http from "../../api";

export const CreateActivity = (props) => {
  const { Title, Text } = Typography;
  const { Step } = Steps;
  const { currentUser } = props;

  const history = useHistory();
  // TEMPLATE ENTITY HERE
  const templateWordmap = {
    text1: "",
    text2: "",
  };

  const templateHangman = {
    word: "",
  };

  // STATE HERE
  const [currentStep, setCurrentStep] = useState(0);
  const [basicInfoActivity, setBasicInfoActivity] = useState({});
  const [listWordFlashcard, setListwordFlascard] = useState([
    templateWordmap,
    templateWordmap,
  ]);
  const [listWordHangman, setListwordHangman] = useState([templateHangman]);
  const [form] = Form.useForm();
  const [dataCrossword, setDataCrossword] = useState({
    across: {},
    down: {},
  });
  // FUNCTION, ACTION HERE
  const changeStep = (current) => {
    if (currentStep === 0) {
      form.validateFields().then((values) => {
        setCurrentStep(current);
        setBasicInfoActivity(values);
      });
    } else {
      setCurrentStep(current);
    }
  };
  const onClickStep1 = () => {
    form.validateFields().then((values) => {
      setCurrentStep(1);
      setBasicInfoActivity(values);
    });
  };
  // ACTION FOR FLASHCARD GAME
  const deleteWordMapByIndex = (index) => {
    setListwordFlascard([
      ...listWordFlashcard.slice(0, index),
      ...listWordFlashcard.slice(index + 1, listWordFlashcard.length),
    ]);
  };
  const addWordMap = () => {
    setListwordFlascard([...listWordFlashcard, templateWordmap]);
  };
  const updateWordMap = (value, field, index) => {
    setListwordFlascard([
      ...listWordFlashcard.slice(0, index),
      { ...listWordFlashcard[index], [field]: value },
      ...listWordFlashcard.slice(index + 1, listWordFlashcard.length),
    ]);
  };
  // ACTION FOR HANGMAN GAME
  const deleteWord = (index) => {
    setListwordHangman([
      ...listWordHangman.slice(0, index),
      ...listWordHangman.slice(index + 1, listWordHangman.length),
    ]);
  };
  const addWord = () => {
    setListwordHangman([...listWordHangman, templateHangman]);
  };
  const updateWord = (value, index) => {
    setListwordHangman([
      ...listWordHangman.slice(0, index),
      { ...listWordHangman[index], word: value },
      ...listWordHangman.slice(index + 1, listWordHangman.length),
    ]);
  };

  // ACTION FOR CROSSWORD
  const deleteQuestion = (type, key) => {
    let newData = { ...dataCrossword };
    let lastKey = null;
    let totalQuestionByType = Object.keys(dataCrossword[type]).length;

    if (key === totalQuestionByType) {
      delete newData[type][key];
      setDataCrossword(newData);
      return;
    }
    Object.keys(newData[type]).forEach((k) => {
      // if(k < key) {
      //   continue;
      // }
      if (k === key) {
        lastKey = k;
      }
      if (k > key) {
        newData[type][k - 1] = { ...newData[type][k] };
        lastKey = k;
      }
    });
    delete newData[type][lastKey];
    setDataCrossword(newData);
  };
  const addQuestionCrossword = (type) => {
    let totalQuestionByType = Object.keys(dataCrossword[type]).length;

    let currentData = { ...dataCrossword[type] };
    currentData = {
      ...currentData,
      [totalQuestionByType + 1]: {
        clue: "",
        answer: "",
        row: 0,
        col: 0,
      },
    };
    let newData = { ...dataCrossword, [type]: currentData };
    setDataCrossword(newData);
  };
  const updateDataQuestionCrossword = (type, index, key, value) => {
    let newData = { ...dataCrossword };
    if ((key === "row" || key === "col") && value < 0) {
      return;
    }
    if (key === "row" || key === "col") {
    }

    if (key === "answer") {
      value = value.toUpperCase();
    }
    newData[type][index][key] = value;
    setDataCrossword(newData);
  };

  const saveActivity = async () => {
    try {
      let dataSetup = "";
      switch (basicInfoActivity.type) {
        case ACTIVITY_TYPE.FLASH_CARD:
        case ACTIVITY_TYPE.HANGMAN:
        case ACTIVITY_TYPE.MATRIX_WORD:
          dataSetup = JSON.stringify(dataCrossword);
          break;
      }
      const res = await http.post(`api/activity/create`, {
        ...basicInfoActivity,
        dataSetup,
        responsibleId: currentUser.userId,
      });
      if (res) {
        console.log(res);
        NotificationSuccess("", "Tạo hoạt động thành công");
        history.push(`${ROUTES_PATH.ACTIVITIES}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // RENDER FUNCTION HERE
  const renderByStep = (step) => {
    if (step === 0) {
      return (
        <Form form={form} layout="vertical">
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                colon={false}
                required
                name="name"
                label="Tên hoạt động"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa đặt tên cho hoạt động",
                  },
                ]}
              >
                <Input placeholder="Tên hoạt động" />
              </Form.Item>
              <Form.Item
                colon={false}
                required
                name="level"
                label="Mức độ"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa đánh giá mức độ cho hoạt động",
                  },
                ]}
              >
                <LevelDropdown />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                colon={false}
                required
                name="type"
                label="Loại hoạt động"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa lựa chọn loại hoạt động",
                  },
                ]}
              >
                <ActivityTypeDropdown />
              </Form.Item>
              <Form.Item
                colon={false}
                required
                name="subject"
                label="Chủ đề"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa lựa chọn chủ đề cho hoạt động",
                  },
                ]}
              >
                <SubjectDropdown />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="description" label="Mô tả/ Ghi chú">
                <TextArea rows={5} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item>
              <Button
                type="primary"
                onClick={onClickStep1}
                icon={<SettingOutlined />}
              >
                Cài đặt
              </Button>
            </Form.Item>
          </Row>
        </Form>
      );
    } else if (step === 1) {
      return (
        <div>
          <Title level={4}>{`${basicInfoActivity.name} - ${
            MAP_LEVEL_LABEL[basicInfoActivity.level]
          }-  ${MAP_ACTIVITY_NAME[basicInfoActivity.type]}`}</Title>
          {basicInfoActivity.type === ACTIVITY_TYPE.FLASH_CARD && (
            <Flashcard
              listWordFlashcard={listWordFlashcard}
              deleteWordMapByIndex={deleteWordMapByIndex}
              addWordMap={addWordMap}
              updateWordMap={updateWordMap}
            />
          )}
          {basicInfoActivity.type === ACTIVITY_TYPE.HANGMAN && (
            <Hangman
              listWordHangman={listWordHangman}
              deleteWord={deleteWord}
              addWord={addWord}
              updateWord={updateWord}
            />
          )}
          {basicInfoActivity.type === ACTIVITY_TYPE.MATRIX_WORD && (
            <CrosswordSetup
              data={dataCrossword}
              deleteQuestion={deleteQuestion}
              addQuestionCrossword={addQuestionCrossword}
              updateDataQuestionCrossword={updateDataQuestionCrossword}
            />
          )}
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <Title level={4}>{`${basicInfoActivity.name} - ${
            MAP_ACTIVITY_NAME[basicInfoActivity.type]
          }`}</Title>
          {basicInfoActivity.type === ACTIVITY_TYPE.MATRIX_WORD && (
            <CrosswordGamePlay
              isSetupMode={true}
              data={dataCrossword}
              saveActivity={saveActivity}
            />
          )}
          {basicInfoActivity.type === ACTIVITY_TYPE.HANGMAN && (
            <HangmanGamePlay listWord={listWordHangman} isSetupMode={true} />
          )}
        </div>
      );
    }
  };
  return (
    <div>
      <Title level={3} className="header-table">
        Tạo hoạt động
      </Title>
      <Row gutter={[12]}>
        <Col span={4}>
          <Steps
            size="default"
            onChange={changeStep}
            current={currentStep}
            direction="vertical"
          >
            <Step
              title="Thông tin chung"
              description="Điền tên và mô tả cho hoạt động"
            ></Step>
            <Step
              title="Cài đặt"
              description="Cài đặt chi tiết nội dung cho hoạt động"
            ></Step>
            <Step
              title="Chơi thử"
              description="Thử nghiệm và Lưu hoạt động"
            ></Step>
          </Steps>
        </Col>

        <Col span={20}>
          <div className="right-content">{renderByStep(currentStep)} </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
