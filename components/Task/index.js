import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

const Task = ({ props }) => {
  console.log(props);
  return (
    <TouchableOpacity onPress={props.onDeleteTask}>
      <View style={styles.item}>
        <View style={[styles.square, colorBg]}>
          <Text style={styles.number}>{numberTest}</Text>
        </View>
        <Text style={styles.content}>{props}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Task;
