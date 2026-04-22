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
import { showMessage } from "react-native-flash-message";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be 5 characters long"),

    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .min(3, "Email must be at least 3 characters"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const saveOrder = (formData: FormData) => {};
  const onSignUpPress = async (formData: FormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      showMessage({
        type: "success",
        message: "Account created successfully",
      });
      navigation.navigate("MainAppBottomTabs");
      const userDataObj = {
        uid: userCredentials.user.uid,
      };
      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak";
      } else {
        errorMessage = "An error occurred during sign-up";
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
        name={"userName"}
        placeholder="Enter Username"
      />
      <AppTextInputController
        control={control}
        name={"email"}
        placeholder="Enter Email"
      />
      <AppTextInputController
        control={control}
        name={"password"}
        placeholder="Enter Password"
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={"Create Account"}
        onPress={handleSubmit(onSignUpPress)}
      />
      <AppButton
        title={"Go To Sign In"}
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.popToTop()} // instead of creating stack I used dismiss logic
      />
    </AppSafeView>
  );
};

export default SignUpScreen;

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
  signInButton: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    marginTop: vs(15),
    borderColor: AppColors.primary,
  },
});
