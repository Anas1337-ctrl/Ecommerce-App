import moment from "moment";

export const getDateFromFireStoreTimeStampObject = (fireStoreDataObject) => {
  const date = new Date(fireStoreDataObject.seconds * 1000);
  return moment(date).format("MMMM Do, hh:mm A");
};
