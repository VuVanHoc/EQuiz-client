import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

export const TickingClock = (props) => {
  const [time, setTime] = useState(10000);
  let timer = null;

  useEffect(() => {
    timer = setInterval(() => {
      setTime(time + 1000);
    }, 1000);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);
  return <div>{time}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TickingClock);
