import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "@firebase/auth";

const Stack = createStackNavigator();

export default function MainAppStack() {
  {
    /* OLD LOGIC AUTH */
  }
  /*
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector(
    (state: RootState) => state.userSlice,
  );
  const isUserLoggedIn = async () => {
    try {
      const storeUserData = await AsyncStorage.getItem("userData");
      if (storeUserData) {
        dispatch(setUserData(JSON.parse(storeUserData)));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("Error reading stored data", error);
      dispatch(setLoading(false));
    }
  };
*/

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<object | null>(null);

  useEffect(() => {
    const state = onAuthStateChanged(auth, (userDataFromFirebase) => {
      if (userDataFromFirebase) {
        console.log("User is signed in");
        setUserData(userDataFromFirebase);
      } else {
        console.log("User is signed Out");
        setUserData(null);
      }
      setIsLoading(false);
    });

    return state;
  }, []);

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size={"large"} color={AppColors.primary} />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen
            name="MainAppBottomTabs"
            component={MainAppBottomTabs}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="MyOrdersScreen"
            component={MyOrdersScreen}
            options={{ headerShown: true, title: "My Orders" }}
          />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
