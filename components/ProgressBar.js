import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";

const ProgressBar = ({ progress, width, height }) => {
  const percentage = progress * 100;
  const isGoalCompleted = !isFinite(percentage);
  const progressColor = isGoalCompleted ? "#00ff00" : "#ffa800";

  return (
    <View>
      <Svg width={width} height={height}>
        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#e0e0e0"
          rx="10"
          ry="10"
        />
        <Rect
          x="0"
          y="0"
          width={isGoalCompleted ? width : width * progress}
          height={height}
          fill={progressColor}
          rx="10"
          ry="10"
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          top: height / 2 - 10,
          left: 0,
          right: 0,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {isGoalCompleted ? "Goal Achieved" : `${percentage.toFixed(0)}%`}
      </Text>
    </View>
  );
};

export default ProgressBar;
