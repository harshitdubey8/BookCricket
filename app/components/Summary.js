import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import CricketButton from "./CricketButton";
import CricketTextBold from "./CricketTextBold";

const { width } = Dimensions.get("window");

const Summary = ({ winnerText, resetGameHandler }) => {
  return (
    <View style={styles.summaryContainer}>
      <CricketTextBold style={styles.title}>{winnerText}</CricketTextBold>
      <CricketButton
        style={styles.resetGameButton}
        onButtonPress={resetGameHandler}
      >
        <CricketTextBold>RESET</CricketTextBold>
      </CricketButton>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  summaryContainer: {
    width,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    height: 90,
  },
  resetGameButton: {
    width: width * 0.8,
    height: 40,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  title: {
    fontSize: 23,
  },
});
