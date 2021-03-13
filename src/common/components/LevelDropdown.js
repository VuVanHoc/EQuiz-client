import React from "react";
import { Select } from "antd";

function LevelDropdown(props) {
  const levels = [
    { text: "Dễ", value: "EASY" },
    { text: "Trung bình", value: "MEDIUM" },
    { text: "Khó", value: "HARD" },
  ];
  return (
    <Select {...props} placeholder="Lựa chọn mức độ">
      {levels.map((type, index) => {
        return (
          <Select.Option value={type.value} key={index}>
            {type.text}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default LevelDropdown;
