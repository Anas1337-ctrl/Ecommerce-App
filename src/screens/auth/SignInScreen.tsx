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

const schema = yup
  .object({
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

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const onSignInPress = async (formData: FormData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      navigation.navigate("MainAppBottomTabs");
      const userDataObj = {
        uid: userCredentials.user.uid,
      };
      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials";
      } else {
        errorMessage = "An error occurred during sign-in";
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
        placeholder="Email"
      />
      <AppTextInputController
        control={control}
        name={"password"}
        placeholder="Password"
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton title={"Login"} onPress={handleSubmit(onSignInPress)} />
      <AppButton
        title={"Sign Up"}
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
