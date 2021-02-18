import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import CricketButton from "../components/CricketButton";
import CricketText from "../components/CricketText";
import CricketTextBold from "../components/CricketTextBold";
import Colors from "../constants/Colors";
import {
  resetGameState,
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const playerNames = useSelector(selectPlayers);
  const currentPlayerBatting = useSelector(selectCurrentPlayer);
  const overs = useSelector(selectOvers);
  const totalPlayers = useSelector(selectNumberOfPlayers);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsButtonDisabled(true);
    const timerId = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentScore]);

  const resetGame = (score) => {
    if (innings === 0) {
      setCurrentScore(0);
      setTotalScore(0);
      setTotalOvers(0);
      setWickets(0);
    }
    setInnings((prevInnings) => prevInnings + 1);
    setMatchResult((prevMatchResult) => ({
      ...prevMatchResult,
      [currentPlayerBatting]: totalScore + score,
    }));
  };

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
      if (
        (matchResult[1] && totalScore + score > matchResult[1]) ||
        (matchResult[2] && totalScore + score > matchResult[2])
      ) {
        resetGame(score);
        return;
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
      resetGame(score);
      dispatch(setCurrentPlayerBatting(currentPlayerBatting === 1 ? 2 : 1));
      return;
    }

    setCurrentScore(score);
    setTotalScore((prevScore) => prevScore + score);
    setTotalOvers(currentOvers);
  };

  let winnerText = "";

  if (innings === 2) {
    if (matchResult[1] > matchResult[2]) {
      winnerText = playerNames?.player1 + " has Won the game";
    } else if (matchResult[1] < matchResult[2]) {
      winnerText = playerNames?.player2 + " has Won the game";
    } else {
      winnerText = "Match tied!";
    }
  }

  const resetGameHandler = () => {
    dispatch(resetGameState());
    navigation.replace("HomeScreen");
  };

  return (
    <View style={styles.gameScreen}>
      <View style={styles.gameDetails}>
        <CricketText style={styles.title}>
          {playerNames?.player1 + " VS " + playerNames?.player2}
        </CricketText>
        <View style={styles.gameDetailsBottom}>
          <View style={styles.gameDetailsScore}>
            <CricketTextBold style={styles.ballScore}>
              {!currentScore && wickets ? "Out" : currentScore}
            </CricketTextBold>
          </View>
          <View style={styles.teamScore}>
            <CricketTextBold style={styles.title}>
              {currentPlayerBatting === 1
                ? playerNames?.player1
                : playerNames?.player2}
            </CricketTextBold>
            <CricketText style={styles.title}>{totalScore} Runs</CricketText>
            <CricketText style={styles.title}>
              {innings === 0
                ? `${innings + 1}st`
                : `${innings === 2 ? innings : innings + 1}nd`}{" "}
              Innings
            </CricketText>
            <CricketText style={styles.title}>
              {innings === 1 &&
                `${
                  matchResult[1] ? matchResult[1] + 1 : matchResult[2] + 1
                } Target`}
            </CricketText>
          </View>
        </View>
      </View>
      <CricketTextBold>{innings === 2 && winnerText}</CricketTextBold>
      {innings === 2 && (
        <CricketButton
          style={styles.scoreButton}
          onButtonPress={resetGameHandler}
        >
          <CricketTextBold>RESET</CricketTextBold>
        </CricketButton>
      )}
      <View style={styles.scoreContainer}>
        <CricketTextBold style={styles.scoreContainerText}>
          {currentPlayerBatting === 1
            ? playerNames?.player1?.toUpperCase()
            : playerNames?.player2?.toUpperCase()}{" "}
          {`${totalScore} / ${wickets}`}
        </CricketTextBold>
        <CricketTextBold style={styles.scoreContainerText}>
          Overs: {`${totalOvers} (${overs})`}
        </CricketTextBold>
        <CricketButton
          style={{
            ...styles.scoreButton,
            backgroundColor: isButtonDisabled ? "red" : Colors.secondary,
          }}
          onButtonPress={scoreHandler}
          disabled={innings === 2 ? true : isButtonDisabled}
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
  gameDetails: {
    width: width * 0.95,
    height: 270,
    alignItems: "center",
    marginHorizontal: width * 0.05,
    marginBottom: 60,
    marginVertical: 10,
    backgroundColor: "#222",
    borderRadius: width * 0.13,
    paddingTop: 30,
    paddingHorizontal: 25,
  },
  gameDetailsBottom: {
    width: "90%",
    height: 150,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameDetailsScore: {
    width: "45%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  teamScore: {
    width: "45%",
    height: 100,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 23,
  },
  ballScore: {
    fontSize: 33,
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
