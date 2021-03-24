import React from "react";

const Classrooms = React.lazy(() => import("../Classrooms"));
const Questions = React.lazy(() => import("../Questions"));
const Activities = React.lazy(() => import("../Activities"));
const Notifications = React.lazy(() => import("../Notifications"));
const Settings = React.lazy(() => import("../Settings"));
const Profile = React.lazy(() => import("../Profile"));
const Documents = React.lazy(() => import("../Documents"));
const Calendar = React.lazy(() => import("../Calendar"));
const Imports = React.lazy(() => import("../Imports"));
const ClassroomDetail = React.lazy(() =>
  import("../Classrooms/ClassroomDetail")
);

export {
  Classrooms,
  Questions,
  Activities,
  Notifications,
  Settings,
  Profile,
  Documents,
  Calendar,
  Imports,
  ClassroomDetail,
};
