import "react-native-gesture-handler";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

import CricketNavigator from "./app/navigations/CricketNavigator";
import store from "./app/features/store";

enableScreens();

const fetchFonts = () =>
  Font.loadAsync({
    roboto: require("./app/assets/fonts/RobotoCondensed-Regular.ttf"),
    "roboto-bold": require("./app/assets/fonts/RobotoCondensed-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(error) => console.log(error)}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <CricketNavigator />
    </Provider>
  );
}
