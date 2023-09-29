import React from "react";
import { View, Image, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const Carousel = ({ data }) => {
  return (
    <PagerView style={styles.carousel} initialPage={0}>
      {data.map((item, index) => (
        <View key={index} style={styles.page}>
          <Image source={item.imageSource} style={styles.image} />
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default Carousel;
