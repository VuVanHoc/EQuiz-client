import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import http from "../../api";

export const ClassroomDropdown = (props) => {
  const { Option } = Select;

  const { currentuser } = props;

  useEffect(() => {
    fetchListClassroom();
  }, []);
  const fetchListClassroom = async () => {
    try {
      const res = await http.post(
        `api/classroom/getList`,
        {
          orderBy: "createdDate",
          orderByAsc: false,
          responsibleId: currentuser.userId,
          searchText: "",
        },
        {
          params: {
            pageIndex: 0,
            pageSize: 100,
          },
        }
      );
      if (res) {
        setClassrooms(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [classrooms, setClassrooms] = useState([]);
  return (
    <Select placeholder="Lựa chọn lớp học" {...props} >
      {classrooms.map((e) => {
        return (
          <Option value={e.id} key={e.id}>
            {e.name}
          </Option>
        );
      })}
    </Select>
  );
};

const mapStateToProps = (state) => ({
  currentuser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomDropdown);
