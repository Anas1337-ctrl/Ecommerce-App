import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppSafeView from "../../components/views/AppSafeView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyCart from "./EmptyCart";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { products } from "../../data/products";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";
import { shippingFees, taxes } from "../../constants/constants";

const CartScreen = () => {
  const navigation = useNavigation();
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const dispatch = useDispatch();
  const totalProductsPriceSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductsPriceSum + taxes + shippingFees;
  return (
    <AppSafeView>
      <HomeHeader />
      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <CartItem
                  {...item}
                  price={item.sum}
                  onReducePress={() => dispatch(removeItemFromCart(item))}
                  onDeletePress={() => dispatch(removeProductFromCart(item))}
                  onIncreasePress={() => dispatch(addItemToCart(item))}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <TotalsView
            itemsPrice={totalProductsPriceSum}
            orderTotal={orderTotal}
          />
          <AppButton
            title="Continue"
            onPress={() => navigation.navigate("CheckoutScreen")}
          />
        </View>
      ) : (
        <EmptyCart />
      )}
    </AppSafeView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
