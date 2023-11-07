import {StyleSheet} from "react-native";

const createStyle = ({height}: {height: number}) => {
  return StyleSheet.create({
    container: {
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      height: height,
      alignContent: "center",
    },
    item: {
      fontSize: height * 0.1,
      color: "gray",
      fontWeight: "900",
      textAlign: "center",
    },
  });
};
export default createStyle;
