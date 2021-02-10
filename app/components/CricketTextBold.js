import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

const CricketTextBold = ({ style, children, ...rest }) => {
  return (
    <Text {...rest} style={[styles.cricketTextBold, style]}>
      {children}
    </Text>
  );
};

export default CricketTextBold;

const styles = StyleSheet.create({
  cricketTextBold: {
    fontFamily: "roboto-bold",
    color: Colors.text,
  },
});
