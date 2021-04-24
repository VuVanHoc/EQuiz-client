import { Button, Row, Typography, Col, Modal, Carousel } from "antd";
import React, { useState, useEffect, useRef } from "react";
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
import TadaSound from "../../../assets/audio/TadaSound.mp3";
import BalloonPopping from "../../../assets/audio/BalloonPopping.mp3";

import ShowHint from "../../../assets/audio/SelectHint.wav";

import axios from "axios";
import http from "../../../api";
import { SoundOutlined, StarFilled, StarTwoTone } from "@ant-design/icons";
import guide1 from "../../../assets/Hangman/guide1.png";
import guide2 from "../../../assets/Hangman/guide2.png";
import guide3 from "../../../assets/Hangman/guide3.png";
import guide4 from "../../../assets/Hangman/guide4.png";
import guide5 from "../../../assets/Hangman/guide5.png";
import guide6 from "../../../assets/Hangman/guide6.png";

export const HangmanGamePlay = (props) => {
  const audio = new Audio(HangmanAudio);
  const WrongAnswerAudio = new Audio(WrongAnswer);
  const CorrectAnswerAudio = new Audio(CorrectAnswer);
  const WinnerSoundAudio = new Audio(TadaSound);
  const ShowHintAudio = new Audio(ShowHint);
  const BalloonPoppingAudio = new Audio(BalloonPopping);
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
  const refCarosel = useRef(null);
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
      return { character: e, correct: false };
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
  const [totalHint, setTotalHint] = useState([
    { used: false },
    { used: false },
    { used: false },
    { used: false },
    { used: false },
  ]);

  const onClickACharacter = (character) => {
    console.log(character);
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
      } else {
        BalloonPoppingAudio.play();
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
    setCurrentWord(listWord[0]);
    setWordInfo(null);
    setTotalHint([
      { used: false },
      { used: false },
      { used: false },
      { used: false },
      { used: false },
    ]);
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

  const showHint = (index) => {
    ShowHintAudio.play();
    let a = [...totalHint];
    a[index].used = true;
    setTotalHint(a);
    for (let i = 0; i < arrayCharacterOfWord.length; i++) {
      if (arrayCharacterOfWord[i].correct === false) {
        onClickACharacter(arrayCharacterOfWord[i].character.toUpperCase());
        return;
      }
    }
  };

  const [visibleGuide, setvisibleGuide] = useState(true);

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
          <>
            <div style={{ position: "absolute", top: 33, fontSize: 26 }}>
              {totalHint.map((e, index) => {
                return !e.used ? (
                  <StarFilled
                    key={index}
                    style={{ color: "yellow", cursor: "pointer" }}
                    onClick={() => showHint(index)}
                  />
                ) : null;
              })}
            </div>

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
          </>
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
        key="summary"
        title="Tổng kết"
        okText="Đóng"
        cancelText="Huỷ"
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
                  (e?.valueFromWordAPI &&
                    JSON.parse(e?.valueFromWordAPI)?.pronunciation?.all)}
              </Col>
              <Col span={9}>{e?.meaning}</Col>
            </Row>
          );
        })}
      </Modal>
      <Modal
        key="guide"
        title="Hướng dẫn chơi Ballon"
        okText="Bắt đầu ngay"
        visible={visibleGuide}
        footer={[
          <Button onClick={() => refCarosel.current.next()}>Tiếp theo</Button>,
          <Button
            onClick={() => {
              setvisibleGuide(false);
            }}
            type="primary"
          >
            Bắt đầu ngay
          </Button>,
        ]}
        onCancel={() => {
          setvisibleGuide(false);
        }}
      >
        <Carousel dotPosition="top" ref={refCarosel}>
          <img key="guide1" alt="guide1" src={guide1} />
          <img key="guide2" alt="guide2" src={guide2} />
          <img key="guide3" alt="guide3" src={guide3} />
          <img key="guide4" alt="guide4" src={guide4} />
          <img key="guide5" alt="guide5" src={guide5} />
          <img key="guide6" alt="guide6" src={guide6} />
        </Carousel>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HangmanGamePlay);
