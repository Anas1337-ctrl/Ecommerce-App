import AsyncStorage from "@react-native-async-storage/async-storage";
import cartSlice from "../reducers/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whitelist: ["items"],
};

export const persistedCartSlice = persistReducer(persistConfig, cartSlice);
