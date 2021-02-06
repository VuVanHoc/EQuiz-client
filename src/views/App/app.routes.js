import React from "react";

const Classrooms = React.lazy(() => import("../Classrooms"));
const Questions = React.lazy(() => import("../Questions"));

export { Classrooms, Questions };
