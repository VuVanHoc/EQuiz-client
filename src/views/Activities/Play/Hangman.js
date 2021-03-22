import { Button } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import theme1 from "../../../assets/Hangman/theme-balloon1.png";
import theme2 from "../../../assets/Hangman/theme-balloon2.png";
import theme3 from "../../../assets/Hangman/theme-balloon3.png";
import theme4 from "../../../assets/Hangman/theme-balloon4.png";
import theme5 from "../../../assets/Hangman/theme-balloon5.png";
import theme6 from "../../../assets/Hangman/theme-balloon6.png";
import theme7 from "../../../assets/Hangman/theme-balloon7.png";

export const HangmanGamePlay = (props) => {
  const { listWord } = props;
  const [characters, setCharacters] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    U: false,
    V: false,
    W: false,
    X: false,
    Y: false,
    Z: false,
  });

  const arrayImg = [theme1, theme2, theme3, theme4, theme5, theme6, theme7];
  const [numberWrong, setNumberWrong] = useState(0);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  return (
    <div>
      <p
        style={{
          position: "absolute",
          top: "45px",
          left: "35px",
          fontSize: 20,
          color: "#fff",
        }}
      >{`${currentWordIndex + 1}/${listWord?.length}`}</p>
      <img src={arrayImg[numberWrong]} width={600} />
      <div
        style={{
          width: 600,
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Object.keys(characters)?.map((c) => {
          return (
            <Button
              key={c}
              onClick={() => setCharacters({ ...characters, [c]: true })}
              style={{ width: 40, margin: 2 }}
              type={characters[c] ? "dashed" : "primary"}
            >
              {c}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HangmanGamePlay);
