import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CricketButton from "./CricketButton";
import CricketTextBold from "./CricketTextBold";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

const GameScoreBottom = ({
  currentPlayerBatting,
  playerNames,
  totalScore,
  wickets,
  totalOvers,
  overs,
  isButtonDisabled,
  scoreHandler,
  innings,
}) => {
  return (
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
  );
};

export default GameScoreBottom;

const styles = StyleSheet.create({
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
