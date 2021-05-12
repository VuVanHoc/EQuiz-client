import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import http from "../../api";
import {
  ERROR_MESSAGE,
  ACTIVITY_TYPE,
  ROUTES_PATH,
} from "../../common/Constants";
import HangmanGamePlay from "../Activities/Play/Hangman";
import CrosswordGameplay from "../Activities/Play/Crossword";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import {
  NotificationError,
  NotificationSuccess,
} from "../../common/components/Notification";

export const PracticeInClassroom = (props) => {
  const [dataActivity, setDataActivity] = useState({});
  const { classroomActivityId, id } = useParams();
  const [startTime, setStartTime] = useState(new Date());

  const history = useHistory();

  useEffect(() => {
    if (classroomActivityId) {
      getDataActivity(classroomActivityId);
    }
  }, [classroomActivityId]);

  const getDataActivity = async (classroomActivityId) => {
    try {
      const res = await http.get(`api/activity/getDataFromClassroomActivity`, {
        params: {
          classroomActivityId: classroomActivityId,
        },
      });
      if (res) {
        setDataActivity(res);
        setStartTime(new Date().getTime());
      }
    } catch (error) {
      switch (error) {
        case ERROR_MESSAGE.NOT_FOUND:
          return NotificationError("Lỗi", "Không tìm thấy dữ liệu");
        case ERROR_MESSAGE.ACTIVITY_HAS_BEEN_DELETED:
          return NotificationError("Lỗi", "Hoạt động này đã bị xoá");
      }
    }
  };

  const exitGamePlay = () => {
    saveResultPractice(new Date().getTime());
  };

  const saveResultPractice = async (
    endTime,
    totalAnswerCorrect,
    totalQuestion
  ) => {
    try {
      const res = await http.post(`api/activity/saveResultPractice`, {
        activityId: dataActivity.id,
        activityType: dataActivity.type,
        dataSetup: dataActivity.dataSetup,
        endTime: endTime,
        level: dataActivity.level,
        startTime: startTime,
        studentId: props.currentUser.userId,
        totalAnswerCorrect: totalAnswerCorrect,
        totalQuestion: totalQuestion,
        classroomId: id
      });
      if (res) {
        NotificationSuccess(
          "Hoàn thành",
          "Kết quả luyện tập của bạn đã được lưu vào lịch sử học tập"
        );
        history.push(`${ROUTES_PATH.CLASSROOMS}/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const styleBtnExit = {
    backgroundColor: "orange",
    position: "absolute",
    right: 20,
    zIndex: 1,
  };
  return (
    <div>
      {dataActivity.type === ACTIVITY_TYPE.HANGMAN && (
        <>
          <Button
            style={styleBtnExit}
            icon={<LogoutOutlined />}
            type="primary"
            onClick={exitGamePlay}
          >
            Thoát
          </Button>
          <HangmanGamePlay listWord={[]} />
        </>
      )}
      {dataActivity.type === ACTIVITY_TYPE.MATRIX_WORD && (
        <>
          <Button
            style={styleBtnExit}
            icon={<LogoutOutlined />}
            type="primary"
            onClick={exitGamePlay}
          >
            Thoát
          </Button>
          <CrosswordGameplay data={JSON.parse(dataActivity.dataSetup)} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeInClassroom);
