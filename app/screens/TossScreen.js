import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOvers,
  selectNumberOfPlayers,
  selectPlayers,
  setCurrentPlayerBatting,
  selectCurrentPlayer,
} from "../features/gameSlice";
import * as Animatable from "react-native-animatable";

import CricketTextBold from "../components/CricketTextBold";
import CricketText from "../components/CricketText";
import Colors from "../constants/Colors";
import CricketButton from "../components/CricketButton";
import Teams from "../data/dummyData";

const { width } = Dimensions.get("window");

const TossScreen = ({ navigation }) => {
  const [toss, setToss] = useState(false);
  const playerNames = useSelector(selectPlayers);
  const overs = useSelector(selectOvers);
  const players = useSelector(selectNumberOfPlayers);
  const isDecisionTaken = useSelector(selectCurrentPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    setToss(Math.round(Math.random() * 10) < 5 ? true : false);
  }, [setToss]);

  const decisionHandler = (decision) => {
    const playerToBat = toss
      ? decision === "bat"
        ? 1
        : 2
      : decision === "bat"
      ? 2
      : 1;
    dispatch(setCurrentPlayerBatting(playerToBat));
  };

  return (
    <View style={styles.tossScreen}>
      <Animatable.View
        style={styles.coin}
        animation="bounceInDown"
        duration={2000}
      >
        <CricketTextBold style={styles.coinText} numberOfLines={1}>
          {toss ? playerNames?.player1 : playerNames?.player2}
        </CricketTextBold>
      </Animatable.View>
      <CricketTextBold style={styles.topSectionText}>
        {toss ? playerNames?.player1 : playerNames?.player2} won the toss!
      </CricketTextBold>
      <CricketTextBold
        style={styles.topSectionText}
      >{`Overs: ${overs}, Players: ${players}`}</CricketTextBold>
      {isDecisionTaken ? (
        <View style={styles.middleSection}>
          <CricketTextBold style={styles.quesText}>
            {toss
              ? `${playerNames?.player1} has elected to ${
                  isDecisionTaken === 1 ? "bat" : "ball"
                }`
              : `${playerNames?.player2} has elected to ${
                  isDecisionTaken === 2 ? "bat" : "ball"
                }`}
          </CricketTextBold>
          <View style={styles.teamsContainer}>
            <View style={styles.playersContainer}>
              <CricketTextBold style={styles.topSectionText}>
                {playerNames?.player1}'s Team
              </CricketTextBold>
              {Teams[0].slice(0, players).map((player) => (
                <CricketText key={player}>{player}</CricketText>
              ))}
            </View>
            <View style={styles.versusContainer}>
              <CricketTextBold style={styles.versusText}>VS</CricketTextBold>
            </View>
            <View style={styles.playersContainer}>
              <CricketTextBold
                style={[styles.playerTextRight, styles.topSectionText]}
              >
                {playerNames?.player2}'s Team
              </CricketTextBold>
              {Teams[1].slice(0, players).map((player) => (
                <CricketText key={player} style={styles.playerTextRight}>
                  {player}
                </CricketText>
              ))}
            </View>
          </View>
          <CricketButton
            style={{ ...styles.actionButton, ...styles.startGameButton }}
            onButtonPress={() => navigation.replace("GameScreen")}
          >
            <CricketTextBold>Start Game</CricketTextBold>
          </CricketButton>
        </View>
      ) : (
        <View style={styles.middleSection}>
          <CricketTextBold style={styles.quesText}>
            {toss ? playerNames?.player1 : playerNames?.player2} what would you
            like to do?
          </CricketTextBold>
          <View style={styles.action}>
            <CricketButton
              style={styles.actionButton}
              onButtonPress={() => decisionHandler("bat")}
            >
              <CricketTextBold>BAT</CricketTextBold>
            </CricketButton>
            <CricketButton
              style={styles.actionButton}
              onButtonPress={() => decisionHandler("ball")}
            >
              <CricketTextBold>BALL</CricketTextBold>
            </CricketButton>
          </View>
        </View>
      )}
    </View>
  );
};

export default TossScreen;

const styles = StyleSheet.create({
  tossScreen: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: StatusBar.currentHeight + 10,
    alignItems: "center",
  },
  coin: {
    width: 60,
    height: 60,
    marginVertical: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderRadius: 30,
    borderColor: "#fff",
    overflow: "hidden",
  },
  coinText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  topSectionText: {
    fontSize: 17,
  },
  quesText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
  middleSection: {
    width,
    alignItems: "center",
  },
  action: {
    width,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  actionButton: {
    width: width * 0.26,
    height: 40,
    backgroundColor: Colors.secondary,
  },
  startGameButton: {
    marginTop: 20,
  },
  teamsContainer: {
    width,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  playersContainer: {
    width: width * 0.35,
  },
  versusContainer: {
    justifyContent: "center",
  },
  versusText: {
    color: Colors.secondary,
    fontSize: 22,
  },
  playerTextRight: {
    textAlign: "right",
  },
});
