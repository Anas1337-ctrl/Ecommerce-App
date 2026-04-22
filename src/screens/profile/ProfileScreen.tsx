import { StyleSheet, Text, View } from "react-native";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { useNavigation } from "@react-navigation/native";
import { SheetManager } from "react-native-actions-sheet";
import LanguageBottomSheet from "../../components/language/LanguageBottomSheet";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../config/firebase";
import { signOut } from "@firebase/auth";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userData");
    await signOut(auth);
    // navigation.navigate("AuthStack");   commented as it is handled dynamically in mainAppStack not needed manually
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
