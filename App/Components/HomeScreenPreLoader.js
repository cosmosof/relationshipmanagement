import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { Colors } from "./../Themes";
import styles from "./Styles/HomeScreenPreLoaderStyles";
import Card from "../Themes/Card";

export default class HomeScreenPreLoader extends React.Component {
  static propTypes = {
    marginBottom: PropTypes.number
  };

  render() {
    return (
      <Card>
        <View style={[styles.container]}>
          <View style={styles.width10Style} />
          <View style={styles.width40Style} />
          <View style={styles.width40Style} />
          <View style={styles.width70Style} />
          <View style={styles.width50Style} />
          <View style={styles.width50Style} />
        </View>
      </Card>
    );
  }
}
