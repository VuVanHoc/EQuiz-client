import React, { useState, useEffect } from "react";
import SignIn from "../SignIn/SignInContainer";
import "./App.scss";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="app">
      <SignIn />
    </div>
  );
}

export default App;
