import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import CricketButton from "../components/CricketButton";
import CricketTextBold from "../components/CricketTextBold";
import Colors from "../constants/Colors";
import {
  selectCurrentPlayer,
  selectNumberOfPlayers,
  selectOvers,
  selectPlayers,
  setCurrentPlayerBatting,
} from "../features/gameSlice";

const { width } = Dimensions.get("window");

const generateScore = () => Math.floor(Math.random() * 7);

const GameScreen = ({ navigation }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [totalOvers, setTotalOvers] = useState(0.0);
  const [innings, setInnings] = useState(0);
  const [matchResult, setMatchResult] = useState({});

  const playerNames = useSelector(selectPlayers);
  const currentPlayerBatting = useSelector(selectCurrentPlayer);
  const overs = useSelector(selectOvers);
  const totalPlayers = useSelector(selectNumberOfPlayers);

  const dispatch = useDispatch();

  const scoreHandler = () => {
    const score = generateScore();
    const currentOvers =
      (totalOvers * 10) % 10 === 5
        ? Math.ceil(totalOvers)
        : parseFloat((totalOvers + 0.1).toFixed(1));

    if (!score) {
      setWickets((prevWickets) => prevWickets + 1);
    }

    if (innings === 1) {
      if (matchResult[1] && totalScore + score > matchResult[1]) {
        setCurrentScore(0);
        setTotalScore(0);
        setTotalOvers(0);
        setWickets(0);
        setInnings((prevInnings) => prevInnings + 1);
        setMatchResult((prevMatchResult) => ({
          ...prevMatchResult,
          [currentPlayerBatting]: totalScore + score,
        }));
      }
      if (matchResult[2] && totalScore + score > matchResult[2]) {
        setCurrentScore(0);
        setTotalScore(0);
        setTotalOvers(0);
        setWickets(0);
        setInnings((prevInnings) => prevInnings + 1);
        setMatchResult((prevMatchResult) => ({
          ...prevMatchResult,
          [currentPlayerBatting]: totalScore + score,
        }));
      }
    }

    if (wickets + 1 === totalPlayers || overs === currentOvers) {
      Alert.alert(
        "Innings Break",
        `Total Score: ${
          totalScore + score
        }\nPress Ok to continue to second innings`,
        [{ text: "Ok" }]
      );
      setCurrentScore(0);
      setTotalScore(0);
      setTotalOvers(0);
      setWickets(0);
      setInnings((prevInnings) => prevInnings + 1);
      setMatchResult((prevMatchResult) => ({
        ...prevMatchResult,
        [currentPlayerBatting]: totalScore + score,
      }));
      dispatch(setCurrentPlayerBatting(currentPlayerBatting === 1 ? 2 : 1));
      return;
    }

    setCurrentScore(score);
    setTotalScore((prevScore) => prevScore + score);
    setTotalOvers(currentOvers);
  };

  return (
    <View style={styles.gameScreen}>
      <ImageBackground
        source={require("../assets/images/book.png")}
        style={styles.bookContainer}
        resizeMode="contain"
      >
        <CricketTextBold style={styles.title}>
          {playerNames?.player1 + " VS " + playerNames?.player2}
        </CricketTextBold>
        <CricketTextBold style={styles.ballScore}>
          {!currentScore ? "Out" : currentScore}
        </CricketTextBold>
        <CricketTextBold style={styles.title}>
          {currentPlayerBatting === 1
            ? playerNames?.player1
            : playerNames?.player2}{" "}
          is batting
        </CricketTextBold>
      </ImageBackground>
      <CricketTextBold>
        {JSON.stringify(matchResult)}{" "}
        {innings === 2
          ? matchResult[1] > matchResult[2]
            ? playerNames.player1 + " has Won the game"
            : playerNames.player2 + " has won the game"
          : ""}
      </CricketTextBold>
      <View style={styles.scoreContainer}>
        <CricketTextBold style={styles.scoreContainerText}>
          {currentPlayerBatting === 1
            ? playerNames?.player1
            : playerNames?.player2}{" "}
          {`${totalScore} / ${wickets}`}
        </CricketTextBold>
        <CricketTextBold style={styles.scoreContainerText}>
          Overs: {`${totalOvers} (${overs})`}
        </CricketTextBold>
        <CricketButton
          style={styles.scoreButton}
          onButtonPress={scoreHandler}
          disabled={innings === 2 ? true : false}
        >
          <MaterialCommunityIcons size={30} color="#fff" name="cricket" />
        </CricketButton>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
  },
  bookContainer: {
    width,
    maxWidth: 380,
    height: 400,
    marginTop: 25,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 90,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    color: "#000",
    fontSize: 23,
  },
  ballScore: {
    alignSelf: "flex-start",
    fontSize: 23,
    marginLeft: width * 0.22,
  },
  scoreContainer: {
    position: "absolute",
    bottom: 0,
    width,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 10,
  },
  scoreContainerText: {
    fontSize: 17,
  },
  scoreButton: {
    width: 80,
    height: 40,
    backgroundColor: Colors.secondary,
  },
});
