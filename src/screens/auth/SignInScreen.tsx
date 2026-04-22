import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppSafeView from "../../components/views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/image-paths";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const schema = yup
    .object({
      email: yup
        .string()
        .required(t("sign_in_email_required"))
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t("sign_in_email_invalid"))
        .min(3, "Email must be at least 3 characters"),

      password: yup
        .string()
        .required(t("sign_in_password_required"))
        .min(8, t("sign_in_password_min_length")),
    })
    .required();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  type FormData = yup.InferType<typeof schema>;

  const onSignInPress = async (formData: FormData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      // navigation.navigate("MainAppBottomTabs");  commented as it is handled dynamically in mainAppStack not needed manually
      const userDataObj = {
        uid: userCredentials.user.uid,
      };
      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/user-not-found") {
        errorMessage = t("sign_in_error_user_not_found");
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("sign_in_error_invalid_credential");
      } else {
        errorMessage = t("sign_in_error_default");
      }

      showMessage({
        type: "danger",
        message: errorMessage,
      });
    }
  };
  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController
        control={control}
        name={"email"}
        placeholder={t("sign_in_email_placeholder")}
      />
      <AppTextInputController
        control={control}
        name={"password"}
        placeholder={t("sign_in_password_placeholder")}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onSignInPress)}
      />
      <AppButton
        title={t("sign_in_signup_button")}
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SignUpScreen")}
      />
    </AppSafeView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    width: s(150),
    height: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  registerButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
