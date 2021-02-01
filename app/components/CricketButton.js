import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const CricketButton = ({ style, children, onButtonPress, ...rest }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={[styles.cricketButton, style]}>
      <TouchableComponent
        style={{ flex: 1 }}
        useForeground
        onPress={onButtonPress}
        {...rest}
      >
        <View style={styles.cricketButtonContainer}>{children}</View>
      </TouchableComponent>
    </View>
  );
};

export default CricketButton;

const styles = StyleSheet.create({
  cricketButton: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 8,
  },
  cricketButtonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
