import React from "react";
import { connect } from "react-redux";
import { Col, Input, Row, Typography, Button } from "antd";
import { PlusOutlined, DeleteTwoTone, MinusOutlined } from "@ant-design/icons";
export const Flashcard = (props) => {
  const {
    listWordFlashcard,
    deleteWordMapByIndex,
    addWordMap,
    updateWordMap,
  } = props;
  const deleteWordMap = (index) => {
    deleteWordMapByIndex(index);
  };
  return (
    <div>
      <Typography.Text>
        Để bắt đầu, bạn cần nhập các cặp từ vào danh sách
      </Typography.Text>
      {listWordFlashcard?.map((wordMap, index) => {
        return (
          <Row key={index} gutter={[12, 12]} align="middle">
            <Col span={1}>{index + 1}</Col>
            <Col span={10}>
              <Input
                value={wordMap.text1}
                onChange={(e) => updateWordMap(e.target.value, "text1", index)}
              />
            </Col>
            <Col span={1}>
              <MinusOutlined />
            </Col>
            <Col span={10}>
              <Input
                value={wordMap.text2}
                onChange={(e) => updateWordMap(e.target.value, "text2", index)}
              />
            </Col>
            <Col>
              <DeleteTwoTone
                style={{ fontSize: 18 }}
                twoToneColor="red"
                onClick={() => deleteWordMap(index)}
              />
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col span={listWordFlashcard?.length > 0 ? 1 : 0}></Col>
        <Col span={10}>
          <Button icon={<PlusOutlined />} onClick={addWordMap} type="dashed">
            Thêm cặp từ
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
