import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import CricketButton from "../components/CricketButton";
import CricketText from "../components/CricketText";
import CricketTextBold from "../components/CricketTextBold";
import Colors from "../constants/Colors";
import { addPlayers } from "../features/gameSlice";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const playerInput2 = useRef(null);
  const dispatch = useDispatch();

  const playHandler = () => {
    if (!player1 || !player2) {
      Alert.alert("Game Warning!", "Player names can't be empty", [
        { text: "Ok" },
      ]);
      return;
    }
    dispatch(addPlayers({ player1, player2 }));
    navigation.replace("PreMatchScreen");
  };

  return (
    <KeyboardAvoidingView
      style={styles.homeScreen}
      behavior={Platform.OS === "ios" ? "padding" : ""}
    >
      <ScrollView>
        <CricketText style={styles.title}>Welcome to Book Cricket</CricketText>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/app-logo.png")}
            style={styles.appLogo}
          />
        </View>
        <View style={styles.inputContainer}>
          <CricketTextBold style={styles.inputTitle}>
            Enter player names
          </CricketTextBold>
          <TextInput
            placeholder="Player 1"
            placeholderTextColor="#888"
            style={styles.playerInput}
            value={player1}
            onChangeText={(text) => setPlayer1(text)}
            onSubmitEditing={() => playerInput2.current.focus()}
          />
          <TextInput
            ref={playerInput2}
            placeholder="Player 2"
            placeholderTextColor="#888"
            style={styles.playerInput}
            value={player2}
            onChangeText={(text) => setPlayer2(text)}
            onSubmitEditing={playHandler}
          />
          <CricketButton onButtonPress={playHandler} style={styles.playButton}>
            <CricketTextBold>Play</CricketTextBold>
          </CricketButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  logoContainer: {
    width,
    height: height * 0.36,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  appLogo: {
    resizeMode: "contain",
    width: "100%",
  },
  inputContainer: {
    width,
    marginVertical: 20,
    alignItems: "center",
  },
  inputTitle: {
    fontSize: 17,
  },
  playerInput: {
    marginTop: 12,
    fontSize: 17,
    fontFamily: "roboto",
    borderWidth: 2,
    borderColor: Colors.secondary,
    width: width * 0.5,
    height: 40,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
    color: "#fff",
  },
  playButton: {
    width: width * 0.5,
    height: 40,
    backgroundColor: Colors.secondary,
    marginTop: 20,
  },
});
