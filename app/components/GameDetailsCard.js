import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import CricketText from "./CricketText";
import CricketTextBold from "./CricketTextBold";

const { width } = Dimensions.get("window");

const GameDetailsCard = ({
  playerNames,
  currentPlayerBatting,
  currentScore,
  wickets,
  totalScore,
  innings,
  matchResult,
}) => {
  return (
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
  );
};

export default GameDetailsCard;

const styles = StyleSheet.create({
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
});
