import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './Styles/RoundedButtonStyles';

export default class RoundedButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    isFetching: PropTypes.bool,
    buttonTextStyles:  PropTypes.object,
    styles:  PropTypes.object
  };

  render() {
    return this.props.isFetching ? (
      <View style={styles.fetching}>
        <View style={styles.fetchingInside} />
        <View style={styles.fetchingInside} />
      </View>
    ) : (
      <TouchableOpacity style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <Text style={[styles.buttonText, this.props.buttonTextStyles]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
