import React from "react";
import { Select } from "antd";
import { QUESTION_TYPES } from "../Constants";

function QuestionTypeDropdown(props) {
  const questionType = [
    {
      text: "Trắc nghiệm - 1 đáp án đúng",
      value: QUESTION_TYPES.MULTIPLE_CHOICE,
    },
    { text: "Đúng - Sai", value: QUESTION_TYPES.TRUE_FALSE },
    {
      text: "Trắc nghiệm - nhiều đáp án đúng",
      value: QUESTION_TYPES.MULTIPLE_CORRECT,
    },
    { text: "Điền vào chỗ trống", value: QUESTION_TYPES.FILL_IN },
  ];
  return (
    <Select {...props} placeholder="Lựa chọn Loại câu hỏi">
      {questionType.map((type, index) => {
        return (
          <Select.Option value={type.value} key={index}>
            {type.text}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default QuestionTypeDropdown;
