import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { store } from "../store/store";

export const getProductsData = async () => {
  try {
    const querySnapShot = await getDocs(collection(db, "products"));

    const list = [];
    querySnapShot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return list;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};

export const userOrders = async () => {
  try {
    const userIdFromRedux = store.getState().userSlice.userData.uid;
    const userIdFromFirebase = auth.currentUser?.uid; // same method
    const userOrder = collection(
      doc(db, "users", userIdFromFirebase),
      "orders",
    );
    const querySnapShot = await getDocs(userOrder);

    const orderList = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orderList;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
