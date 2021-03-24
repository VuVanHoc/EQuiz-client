import { Row, Col, Input, Typography, Button, Progress, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { DeleteTwoTone, PlusOutlined } from "@ant-design/icons";

export const Hangman = (props) => {
  const { listWordHangman, deleteWord, addWord, updateWord } = props;

  const renderLevelForWord = (word) => {
    if (!word || word?.trim() === "") {
      return (
        <Row justify="space-between">
          <Col span={24}>
            <Progress
              strokeColor="#1890ff"
              percent={0}
              showInfo={false}
              steps={5}
            />
          </Col>
        </Row>
      );
    }
    if (word?.length <= 5) {
      return (
        <Row justify="space-between">
          <Col span={24}>
            <Tooltip title="Dễ">
              <Progress
                strokeColor="#1890ff"
                percent={30}
                showInfo={false}
                steps={5}
              />
            </Tooltip>
          </Col>
        </Row>
      );
    }
    if (word?.length <= 10) {
      return (
        <Row justify="space-between">
          <Col span={24}>
            <Tooltip title="Trung bình">
              <Progress
                strokeColor="#fa8c16"
                percent={60}
                showInfo={false}
                steps={5}
              />
            </Tooltip>
          </Col>
        </Row>
      );
    }
    return (
      <Row justify="space-between">
        <Col span={24}>
          <Tooltip title="Khó">
            <Progress
              percent={100}
              strokeColor="#f5222d"
              showInfo={false}
              steps={5}
            />
          </Tooltip>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <Typography.Text>
        Để bắt đầu, bạn cần nhập bộ từ vào danh sách
      </Typography.Text>
      {listWordHangman?.map((e, index) => {
        return (
          <Row key={index} gutter={[12, 12]} align="middle">
            <Col span={1}>{index + 1}</Col>
            <Col span={12}>
              <Input
                value={e.word}
                onChange={(event) => updateWord(event.target.value, index)}
              />
            </Col>
            <Col span={3}>{renderLevelForWord(e.word)}</Col>
            <Col>
              <DeleteTwoTone
                twoToneColor="red"
                onClick={() => deleteWord(index)}
              />
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col span={listWordHangman?.length > 0 ? 1 : 0}></Col>
        <Col span={10}>
          <Button icon={<PlusOutlined />} onClick={addWord} type="dashed">
            Thêm từ
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Hangman);
