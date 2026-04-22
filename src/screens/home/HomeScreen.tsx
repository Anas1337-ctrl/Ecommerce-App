import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../../components/headers/HomeHeader";
import AppSafeView from "../../components/views/AppSafeView";
import ProductCard from "../../components/cards/ProductCard";
import { products } from "../../data/products";
import { vs, s } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { getProductsData } from "../../config/dataServices";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const data = await getProductsData();
    setProducts(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const dispatch = useDispatch();
  return (
    <AppSafeView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            image={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCartPress={() => {
              dispatch(addItemToCart(item));
            }}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
        }}
        contentContainerStyle={{
          paddingHorizontal: s(10),
        }}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
