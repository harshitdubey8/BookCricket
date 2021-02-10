import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import CricketButton from "../components/CricketButton";
import CricketTextBold from "../components/CricketTextBold";
import Colors from "../constants/Colors";
import { selectPlayers, setOvers } from "../features/gameSlice";
import CricketText from "../components/CricketText";

const rules = [
  "A player will be considered out if 0 appears on the book, (OUT).",
  "Scores will vary from 0 - 6 per ball.",
  "You don't need to be a cricket fan to play this game.",
  "Playing this game won't cost you anything other than time 😜.",
  "Deleting or uninstalling the game after losing isn't an option.",
  "This game is made for fun, try not finding vulnarabilities!",
];

const { height } = Dimensions.get("window");

const PreMatchScreen = ({ navigation }) => {
  const [selectedOvers, setSelectedOvers] = useState(3);
  const playerNames = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const getActiveOver = (over) =>
    over === selectedOvers ? styles.numberOfOverActive : {};

  const continueToTossHandler = () => {
    dispatch(setOvers(selectedOvers));
    navigation.replace("TossScreen");
  };

  return (
    <View style={styles.preMatchScreen}>
      <ScrollView contentContainerStyle={styles.preMatchContainer}>
        <View style={styles.playerContainer}>
          <CricketTextBold style={styles.playerContainerText}>
            {playerNames?.player1}
          </CricketTextBold>
          <CricketTextBold style={styles.playerContainerText}>
            VS
          </CricketTextBold>
          <CricketTextBold style={styles.playerContainerText}>
            {playerNames?.player2}
          </CricketTextBold>
        </View>
        <Ionicons name="md-trophy" size={40} color="#fff" />
        <CricketTextBold style={styles.title}>Select Overs</CricketTextBold>
        <View style={styles.matchOvers}>
          <CricketButton
            style={{ ...styles.numberOfOver, ...getActiveOver(3) }}
            onButtonPress={() => setSelectedOvers(3)}
          >
            <CricketTextBold style={styles.overText}>3</CricketTextBold>
          </CricketButton>
          <CricketButton
            style={{ ...styles.numberOfOver, ...getActiveOver(5) }}
            onButtonPress={() => setSelectedOvers(5)}
          >
            <CricketTextBold style={styles.overText}>5</CricketTextBold>
          </CricketButton>
          <CricketButton
            style={{ ...styles.numberOfOver, ...getActiveOver(10) }}
            onButtonPress={() => setSelectedOvers(10)}
          >
            <CricketTextBold style={styles.overText}>10</CricketTextBold>
          </CricketButton>
        </View>
        <CricketTextBold style={styles.title}>
          Number Of Players
        </CricketTextBold>
        <View style={styles.matchOvers}>
          <CricketButton
            style={{
              ...styles.numberOfOver,
              ...styles.numberOfPlayers,
              ...getActiveOver(3),
            }}
            onButtonPress={() => {}}
          >
            <CricketTextBold style={styles.overText}>5</CricketTextBold>
          </CricketButton>
          <CricketButton
            style={{
              ...styles.numberOfOver,
              ...styles.numberOfPlayers,
              ...getActiveOver(5),
            }}
            onButtonPress={() => {}}
          >
            <CricketTextBold style={styles.overText}>8</CricketTextBold>
          </CricketButton>
          <CricketButton
            style={{
              ...styles.numberOfOver,
              ...styles.numberOfPlayers,
              ...getActiveOver(10),
            }}
            onButtonPress={() => {}}
          >
            <CricketTextBold style={styles.overText}>11</CricketTextBold>
          </CricketButton>
        </View>
        <CricketTextBold style={styles.title}>Honest Rules</CricketTextBold>
        <View style={styles.rulesContainer}>
          {rules.map((rule, index) => (
            <CricketText key={index} style={styles.overText}>
              {index + 1}. {rule}
            </CricketText>
          ))}
        </View>
        <CricketButton
          style={styles.tossButton}
          onButtonPress={continueToTossHandler}
        >
          <CricketTextBold>CONTINUE TO TOSS</CricketTextBold>
        </CricketButton>
      </ScrollView>
    </View>
  );
};

export default PreMatchScreen;

const styles = StyleSheet.create({
  preMatchScreen: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: StatusBar.currentHeight + 20,
  },
  preMatchContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    marginTop: height > 800 ? height * 0.06 : 0,
    marginBottom: 20,
  },
  playerContainerText: {
    fontSize: 23,
  },
  title: {
    fontSize: 19,
    marginTop: 18,
  },
  matchOvers: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  numberOfOver: {
    backgroundColor: Colors.secondary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  numberOfOverActive: {
    borderWidth: 4,
    borderColor: "#fff",
  },
  overText: {
    fontSize: 17,
  },
  numberOfPlayers: {
    backgroundColor: Colors.primary,
    borderWidth: 4,
    borderColor: Colors.secondary,
  },
  rulesContainer: {
    width: "80%",
    marginVertical: 12,
  },
  tossButton: {
    backgroundColor: Colors.secondary,
    width: 200,
    height: 40,
    marginTop: 16,
  },
});
