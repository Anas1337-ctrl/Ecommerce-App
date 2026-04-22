import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import {
  IS_Android,
  IS_IOS,
  shippingFees,
  taxes,
} from "../../constants/constants";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { emptyCart } from "../../store/reducers/cartSlice";
import { useTranslation } from "react-i18next";
const CheckoutScreen = () => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      fullName: yup
        .string()
        .required(t("checkout_name_required"))
        .min(3, t("checkout_name_min_length")),

      phoneNumber: yup
        .string()
        .required(t("checkout_phone_required"))
        .matches(/^[0-9]+$/, t("checkout_phone_digits"))
        .min(10, t("checkout_phone_min_length")),

      detailedAddress: yup
        .string()
        .required(t("checkout_address_required"))
        .min(15, t("checkout_address_min_length")),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const { userData } = useSelector((state: RootState) => state.userSlice);
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const totalPrice = totalProductsPricesSum + taxes + shippingFees;
  const dispatch = useDispatch();

  const saveOrder = async (formData: FormData) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPricesSum,
        createdAt: new Date(),
        totalPrice,
      };
      const userOrderRef = collection(doc(db, "users", userData.uid), "orders");
      await addDoc(userOrderRef, orderBody);

      const ordersRef = collection(db, "orders");
      await addDoc(ordersRef, orderBody);

      showMessage({
        type: "success",
        message: t("checkout_success_message"),
      });
      navigation.goBack();
      dispatch(emptyCart());
    } catch (error) {
      console.error("Error Saving Order", error);
      showMessage({
        type: "danger",
        message: t("checkout_error_message"),
      });
    }
  };
  return (
    <AppSafeView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder={t("checkout_fullname_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder={t("checkout_phone_placeholder")}
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder={t("checkout_address_placeholder")}
          />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <AppButton
          title={t("checkout_confirm_button")}
          onPress={handleSubmit(saveOrder)}
        />
      </View>
    </AppSafeView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  inputContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : undefined,
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_Android ? vs(15) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});
