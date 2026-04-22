import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IMAGES } from "../../constants/image-paths";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: vs(10),
  },
  logo: {
    height: s(40),
    width: s(40),
    tintColor: AppColors.white,
  },
});
