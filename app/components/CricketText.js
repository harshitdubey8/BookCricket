import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const CricketText = ({ style, children }) => {
  return <Text style={[styles.cricketText, style]}>{children}</Text>;
};

export default CricketText;

const styles = StyleSheet.create({
  cricketText: {
    fontFamily: "roboto",
    color: Colors.text,
  },
});
