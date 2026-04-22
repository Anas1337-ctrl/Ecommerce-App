import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { AppColors } from "../../styles/colors";
import { shippingFees, taxes } from "../../constants/constants";
import { useTranslation } from "react-i18next";

interface TotalsViewProps {
  itemsPrice: number;
  orderTotal: number;
}

const TotalsView: FC<TotalsViewProps> = ({ itemsPrice, orderTotal }) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_items_price")}</AppText>
        <AppText style={styles.textPrice}>
          {t("totals_currency")} {itemsPrice}
        </AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_taxes")}</AppText>
        <AppText style={styles.textPrice}>
          {t("totals_currency")} {taxes}
        </AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_shipping_fee")}</AppText>
        <AppText style={styles.textPrice}>
          {t("totals_currency")} {shippingFees}
        </AppText>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <AppText style={styles.textTitle}>{t("totals_order_total")}</AppText>
        <AppText style={styles.textPrice}>
          {t("totals_currency")} {orderTotal}
        </AppText>
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
