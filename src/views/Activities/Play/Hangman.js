import { Button, Row, Typography, Col, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import theme1 from "../../../assets/Hangman/theme-balloon1.png";
import theme2 from "../../../assets/Hangman/theme-balloon2.png";
import theme3 from "../../../assets/Hangman/theme-balloon3.png";
import theme4 from "../../../assets/Hangman/theme-balloon4.png";
import theme5 from "../../../assets/Hangman/theme-balloon5.png";
import theme6 from "../../../assets/Hangman/theme-balloon6.png";
import theme7 from "../../../assets/Hangman/theme-balloon7.png";
import HangmanAudio from "../../../assets/audio/wonOpp.mp3";
import WrongAnswer from "../../../assets/audio/WrongAnswer.wav";
import CorrectAnswer from "../../../assets/audio/CorrectAnswer.wav";
import WinnerSoundClapping from "../../../assets/audio/WinnerSoundClapping.wav";
import axios from "axios";
import http from "../../../api";
import { SoundOutlined } from "@ant-design/icons";

export const HangmanGamePlay = (props) => {
  const audio = new Audio(HangmanAudio);
  const WrongAnswerAudio = new Audio(WrongAnswer);
  const CorrectAnswerAudio = new Audio(CorrectAnswer);
  const WinnerSoundAudio = new Audio(WinnerSoundClapping);

  const defaultListCharacter = {
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
  };
  const { listWord } = props;
  const [characters, setCharacters] = useState(defaultListCharacter);

  const [winner, setWinner] = useState(false);
  useEffect(() => {
    initWorkingData(0);
    // audio.play();
    return () => {
      audio.pause();
      setWordInfo(null);
    };
  }, [listWord]);

  const initWorkingData = (index) => {
    console.log("=======", index);
    let a = listWord[index]?.word?.split("")?.map((e) => {
      return { character: e, show: false };
    });
    console.log("aaaa:", a);
    setArrayCharacterOfWord(a);
    setCurrentWord(listWord[index]);
    if (!listWord[index]?.valueFromWordAPI) {
      getDataFromWordsAPI(listWord[index]?.word);
    } else {
      setWordInfo(JSON.parse(listWord[index]?.valueFromWordAPI));
    }
  };
  const arrayImg = [theme1, theme2, theme3, theme4, theme5, theme6, theme7];

  const [numberWrong, setNumberWrong] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [arrayCharacterOfWord, setArrayCharacterOfWord] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordInfo, setWordInfo] = useState(null);
  const [visibleSumary, setVisibleSumary] = useState(false);

  const onClickACharacter = (character) => {
    setCharacters({ ...characters, [character]: true });
    let currentWord = listWord[currentWordIndex];
    if (currentWord.word.toUpperCase().includes(character)) {
      let newArr = [...arrayCharacterOfWord];
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i].character.toUpperCase() === character) {
          newArr[i].correct = true;
        }
      }
      setArrayCharacterOfWord(newArr);
      if (!arrayCharacterOfWord.find((e) => e.correct === false)) {
        CorrectAnswerAudio.play();
      }
    } else {
      if (numberWrong >= 5) {
        WrongAnswerAudio.play();
      }
      setNumberWrong(numberWrong + 1);
    }
  };

  const nextWord = () => {
    if (currentWordIndex >= listWord.length - 1) {
      setWinner(true);
      WinnerSoundAudio.play();
      setVisibleSumary(true);
    } else {
      setNumberWrong(0);
      initWorkingData(currentWordIndex + 1);
      setCharacters(defaultListCharacter);
      setWordInfo(null);
      setCurrentWord(listWord[currentWordIndex + 1]);
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };
  const playAgain = () => {
    setNumberWrong(0);
    setCurrentWordIndex(0);
    initWorkingData(0);
    setCharacters(defaultListCharacter);
  };

  const getDataFromWordsAPI = async (word) => {
    try {
      if (word) {
        const res = await axios.get(
          `https://wordsapiv1.p.rapidapi.com/words/${word}`,
          {
            headers: {
              "x-rapidapi-key":
                "66aab5f297mshd92e6e321b191a3p170f88jsn4bdb55ab07c3",
              "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            },
          }
        );
        if (res) {
          setWordInfo(res.data);
          saveDataFromWordAPI(word, res.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveDataFromWordAPI = async (word, data) => {
    try {
      console.log(word, data);

      const res = await http.post(`api/word/saveDataFromWordAPI`, {
        word: word,
        data: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <p
          style={{
            position: "absolute",
            top: "10px",
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
            bottom: 200,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {arrayCharacterOfWord?.map((c, index) => {
            return c?.correct === true ? (
              <Button
                key={index}
                disabled
                style={{ width: 40, margin: 2, fontWeight: 900, color: "red" }}
              >
                {c.character.toUpperCase()}
              </Button>
            ) : (
              <Button
                key={index}
                disabled
                type="dashed"
                style={{
                  width: 40,
                  margin: 2,
                  backgroundColor: "#fff",
                  color: "#fff",
                }}
              >{`c`}</Button>
            );
          })}
        </div>
        {arrayCharacterOfWord?.find((e) => e.correct !== true) &&
        numberWrong < 6 ? (
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
                  disabled={characters[c]}
                  onClick={() => onClickACharacter(c)}
                  style={{ width: 40, margin: 2, fontWeight: 900 }}
                  type={characters[c] ? "dashed" : "primary"}
                >
                  {c}
                </Button>
              );
            })}
          </div>
        ) : arrayCharacterOfWord?.find((e) => e.correct !== true) &&
          numberWrong >= 6 ? (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={3} style={{ color: "red" }}>
              Tiếc quá! Bạn thua rồi!!!
            </Typography.Title>
            <Button
              onClick={playAgain}
              style={{
                backgroundColor: "orange",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Chơi lại
            </Button>
          </div>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                bottom: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={nextWord}
                style={{
                  backgroundColor: "orange",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Tiếp theo
              </Button>
            </div>
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 620,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography.Title level={5}>
                {wordInfo?.word || currentWord?.word}
                <SoundOutlined style={{ marginLeft: 10 }} />
              </Typography.Title>
              <Typography.Text>
                {wordInfo?.pronunciation?.all &&
                  `/${wordInfo?.pronunciation?.all}/`}
              </Typography.Text>
            </div>
          </>
        )}
      </div>
      <Modal
        title="Tổng kết"
        okText="Đóng"
        onOk={() => setVisibleSumary(false)}
        onCancel={() => setVisibleSumary(false)}
        visible={visibleSumary}
      >
        <p
          style={{ marginBottom: 10 }}
        >{`Chúc mừng bạn đã học được thêm ${listWord.length} từ mới hôm nay. Cùng ôn tập lại nhé`}</p>
        {listWord?.map((e, index) => {
          return (
            <Row key={index} justify="space-between">
              <Col span={2}>{index + 1}</Col>
              <Col span={8}>{e?.word}</Col>
              <Col span={5}>
                {e?.pronunciation ||
                  JSON.parse(e?.valueFromWordAPI)?.pronunciation?.all}
              </Col>
              <Col span={9}>{e?.meaning}</Col>
            </Row>
          );
        })}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HangmanGamePlay);
