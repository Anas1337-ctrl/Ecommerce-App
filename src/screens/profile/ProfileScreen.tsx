import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";

// type ProfileScreenNavigationProp =
//   NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <AppSafeView>
      <HomeHeader />

      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={t("profile_my_orders")}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton
          title={t("profile_language")}
          onPress={() => SheetManager.show("LANG_SHEET")}
        />
        <LanguageBottomSheet />
        <ProfileSectionButton
          title={t("profile_logout")}
          onPress={handleLogout}
        />
      </View>
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
