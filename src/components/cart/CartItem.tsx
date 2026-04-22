import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { s, vs } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface CartItemsProps {
  price: number;
  title: string;
  imageURL: string | number;
  qty: string;
  onDeletePress: () => void;
  onIncreasePress: () => void;
  onReducePress: () => void;
}

const CartItem: FC<CartItemsProps> = ({
  price,
  title,
  imageURL,
  qty,
  onDeletePress,
  onIncreasePress,
  onReducePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageURL }} style={styles.image} />
      </View>
      {/* Detail Container */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.textTitle}>{title}</AppText>
        <AppText style={styles.textPrice}>{price}</AppText>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={onIncreasePress} style={styles.iconButton}>
            <FontAwesome name="plus" size={s(10)} color={AppColors.primary} />
          </TouchableOpacity>
          <AppText style={styles.textQty}>{qty}</AppText>
          <TouchableOpacity onPress={onReducePress} style={styles.iconButton}>
            <FontAwesome name="minus" size={s(10)} color={AppColors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Delete Button Container */}
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
          <MaterialIcons
            name="delete-outline"
            size={s(14)}
            color={AppColors.red}
          />
          <AppText style={styles.deleteText}>Delete</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    paddingBottom: vs(4),
    borderColor: AppColors.lightGray,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 3.5,
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingEnd: s(12),
  },
  image: {
    height: s(80),
    width: s(80),
  },
  textTitle: {
    fontSize: s(14),
    color: AppColors.primary,
    fontFamily: AppFonts.Medium,
    marginTop: vs(5),
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
    fontFamily: AppFonts.Bold,
    marginVertical: vs(5),
  },
  deleteText: {
    marginLeft: 7,
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    fontSize: s(12),
    marginTop: 3,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: s(5),
    borderRadius: s(30),
    borderWidth: s(1),
    borderColor: AppColors.blueGray,
    width: s(80),
    paddingVertical: vs(5),
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.lightGray,
    padding: s(5),
    height: s(20),
    width: s(20),
    borderRadius: s(10),
  },
  textQty: {
    flex: 1,
    textAlign: "center",
    color: AppColors.primary,
  },
});
