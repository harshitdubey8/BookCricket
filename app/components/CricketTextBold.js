import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const CricketTextBold = ({ style, children }) => {
  return <Text style={[styles.cricketTextBold, style]}>{children}</Text>;
};

export default CricketTextBold;

const styles = StyleSheet.create({
  cricketTextBold: {
    fontFamily: "roboto-bold",
    color: Colors.text,
  },
});
