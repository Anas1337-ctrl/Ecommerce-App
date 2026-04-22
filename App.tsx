import { Button, StyleSheet, Text, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }
  // const [totalExpense, setTotalExpense] = useState(0);

  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("totalExpense", value);
  //   } catch (e) {}
  // };

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("totalExpense");
  //     if (value !== null) {
  //       // value previously store
  //       setTotalExpense(+value);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const deleteData = async () => {
  //   try {
  //     const val = AsyncStorage.removeItem("totalExpense");
  //   } catch (e) {}
  // };
  // const increaseTotalExpense = () => {
  //   const newExpenseAfterUpdate = totalExpense + 1;
  //   setTotalExpense(newExpenseAfterUpdate);
  //   storeData(newExpenseAfterUpdate?.toString());
  // };

  // useEffect(() => {
  //   getData();
  // });

  return (
    // <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
    //   <Text style={{ fontSize: 20 }}>Expense App</Text>
    //   <Text style={{ fontSize: 30 }}>Total Expenses = {totalExpense}</Text>

    //   <Button onPress={() => increaseTotalExpense()} title="Press"></Button>
    //   <Button onPress={() => deleteData()} title="Press to reset"></Button>
    // </View>
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
              <FlashMessage position={"top"} />
              <MainAppStack />
            </NavigationContainer>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
