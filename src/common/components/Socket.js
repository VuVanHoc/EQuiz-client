import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import SockJsClient from "react-stomp";
import http from "../../api";
import { BASE_URL, ROLE_TYPE } from "../../common/Constants";
import { NotificationSuccess } from "./Notification";
import NotiSound from "../../assets/audio/MessageSound.mp3";

export const Socket = (props) => {
  const ref = useRef(null);
  const NotiSoundAudio = new Audio(NotiSound);

  const [listClassroomStudent, setListClassroomStudent] = useState([]);

  const { currentUser } = props;

  useEffect(() => {
    if (currentUser.userType === ROLE_TYPE.STUDENT) {
      getListClassroomStudent();
    }
  }, []);

  const getListClassroomStudent = async () => {
    try {
      const res = await http.post(`api/classroom/getListClassroomForStudent`, {
        orderBy: "createdDate",
        orderByAsc: false,
        userId: currentUser.userId,
        searchText: "",
      });
      if (res) {
        setListClassroomStudent(res.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <SockJsClient
        url={`${BASE_URL}/ws`}
        topics={listClassroomStudent?.map((e) => {
          return `/notification/classroom/${e.id}`;
        })}
        onConnect={() => {
          console.log("Connected:");
        }}
        onDisconnect={() => {
          console.log("Disconnect:");
        }}
        onMessage={async (message) => {
          await NotiSoundAudio.play();
          NotificationSuccess("Thông báo", message);
        }}
        ref={ref}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Socket);
