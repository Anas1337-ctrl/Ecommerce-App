import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../../styles/colors";
import { vs, s } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { commonStyles } from "../../styles/sharedStyles";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  onAddToCartPress: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  image,
  title,
  price,
  onAddToCartPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onAddToCartPress}
      >
        <Ionicons name="cart" color={AppColors.white} size={s(15)} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>{price} $</AppText>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    height: vs(190),
    width: s(160),
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  buttonContainer: {
    position: "absolute",
    backgroundColor: AppColors.primary,
    borderRadius: s(14),
    padding: 3,
    height: s(28),
    width: s(28),
    left: s(5),
    top: s(5),
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: s(8),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(7),
  },
});
