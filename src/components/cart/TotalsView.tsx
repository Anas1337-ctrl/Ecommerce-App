import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { shippingFees, taxes } from "../../constants/constants";

interface TotalsViewProps {
  itemsPrice: number;
  orderTotal: number;
}

const TotalsView: FC<TotalsViewProps> = ({ itemsPrice, orderTotal }) => {
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Items Price:</AppText>
        <AppText style={styles.textPrice}>$ {itemsPrice}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Taxes:</AppText>
        <AppText style={styles.textPrice}>$ {taxes}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Shipping Fee:</AppText>
        <AppText style={styles.textPrice}>$ {shippingFees}</AppText>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AppText style={styles.textTitle}>Order Total:</AppText>
        <AppText style={styles.textPrice}>$ {orderTotal}</AppText>
      </View>
    </View>
  );
};

export default TotalsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: vs(10),
  },
  textTitle: {
    fontSize: s(16),
    flex: 1,
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(5),
    width: "100%",
  },
});
