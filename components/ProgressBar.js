import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";

const ProgressBar = ({ progress, width, height }) => {
  const percentage = progress * 100;

  return (
    <View>
      <Svg width={width} height={height}>
        <Rect x="0" y="0" width={width} height={height} fill="#fff" />
        <Rect
          x="0"
          y="0"
          width={width * progress}
          height={height}
          fill="#ffa800"
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          top: height / 2 - 10,
          left: width / 2 - 10,
          fontWeight: "bold",
        }}
      >
        {`${percentage.toFixed(0)}%`}
      </Text>
    </View>
  );
};

export default ProgressBar;
