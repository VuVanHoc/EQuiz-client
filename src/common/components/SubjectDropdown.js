import React from "react";
import { Select } from "antd";
import { SUBJECTS } from "../Constants";

function SubjectDropdown(props) {
  const { hasOptionRandom } = props;

  const subjects = [
    { text: "Tiếng Anh", value: SUBJECTS.ENGLISH },
    { text: "Toán học", value: SUBJECTS.MATH },
    { text: "Máy tính & tin học", value: SUBJECTS.IT },
  ];
  return (
    <Select {...props} placeholder="Lựa chọn chủ đề">
      {hasOptionRandom && (
        <Select.Option value="ALL" key="ALL">
          Chủ đề ngẫu nhiên
        </Select.Option>
      )}
      {subjects.map((type, index) => {
        return (
          <Select.Option value={type.value} key={index}>
            {type.text}
          </Select.Option>
        );
      })}
    </Select>
  );
}

export default SubjectDropdown;
