import React, { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  resetGameState,
  selectCurrentPlayer,
  selectNumberOfPlayers,
  selectOvers,
  selectPlayers,
  setCurrentPlayerBatting,
} from "../features/gameSlice";
import GameDetailsCard from "../components/GameDetailsCard";
import Summary from "../components/Summary";
import GameScoreBottom from "../components/GameScoreBottom";

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
    Alert.alert(
      innings ? "Game Over" : "Innings Break",
      `Total Score: ${totalScore + score}\nPress Ok to ${
        innings ? "view game result" : "continue to second innings"
      }`,
      [{ text: "Ok" }]
    );
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
      }
    }

    if (wickets + 1 === totalPlayers || overs === currentOvers) {
      resetGame(score);
      if (!innings) {
        dispatch(setCurrentPlayerBatting(currentPlayerBatting === 1 ? 2 : 1));
        return;
      }
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
      <GameDetailsCard
        currentPlayerBatting={currentPlayerBatting}
        currentScore={currentScore}
        innings={innings}
        matchResult={matchResult}
        playerNames={playerNames}
        totalScore={totalScore}
        wickets={wickets}
      />
      {innings === 2 && (
        <Summary resetGameHandler={resetGameHandler} winnerText={winnerText} />
      )}
      <GameScoreBottom
        currentPlayerBatting={currentPlayerBatting}
        innings={innings}
        isButtonDisabled={isButtonDisabled}
        overs={overs}
        playerNames={playerNames}
        scoreHandler={scoreHandler}
        totalOvers={totalOvers}
        totalScore={totalScore}
        wickets={wickets}
      />
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
});
