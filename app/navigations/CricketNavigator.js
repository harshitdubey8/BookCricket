import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PreMatchScreen from "../screens/PreMatchScreen";
import TossScreen from "../screens/TossScreen";
import GameScreen from "../screens/GameScreen";

// 1) Guest Entry: Player 1 and Player 2 Names can be changed..
// 2) Number of overs :  3, 5, 10
// 3) 5, 8, 11players in the team..
// 4) Toss ..
// 5) Game Screen ..  Book

const Stack = createStackNavigator();

const CricketNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.15)"
      />
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PreMatchScreen" component={PreMatchScreen} />
        <Stack.Screen name="TossScreen" component={TossScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CricketNavigator;
