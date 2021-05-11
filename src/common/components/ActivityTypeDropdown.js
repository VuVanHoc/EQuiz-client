import React from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { ACTIVITY_TYPE } from "../Constants";
export const ActivityTypeDropdown = (props) => {
  const activityType = [
    {
      text: "Đoán từ với Balloon",
      value: ACTIVITY_TYPE.HANGMAN,
    },
    {
      text: "Thẻ Flashcard",
      value: ACTIVITY_TYPE.FLASH_CARD,
    },
    {
      text: "Crossword",
      value: ACTIVITY_TYPE.MATRIX_WORD,
    },
  ];
  return (
    <Select placeholder="Lựa chọn loại hoạt động - trò chơi" {...props}>
      {activityType.map((e) => (
        <Select.Option value={e.value} key={e.value}>
          {e.text}
        </Select.Option>
      ))}
    </Select>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTypeDropdown);
