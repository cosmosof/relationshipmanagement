import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Colors } from './../Themes';
import styles from './Styles/TodoCardStyles';

export default class TodoCard extends React.Component {
  static propTypes = {
    isCurrentUser: PropTypes.bool,
    item: PropTypes.object,
    date: PropTypes.string,
    updateTodoStatus: PropTypes.func,
    deleteTodo: PropTypes.func
  };

  render() {
    const alignSelf = this.props.isCurrentUser ? 'flex-end' : 'flex-start';
    const backgroundColor = this.props.isCurrentUser
      ? Colors.lighterMatBlue
      : Colors.lighterMatPurple;
    const borderColor = this.props.isCurrentUser
      ? Colors.lightMatBlue2
      : Colors.lightMatPurple2;
    const textColor = this.props.isCurrentUser
      ? Colors.darkMatBlue2
      : Colors.darkMatPurple2;
    const marginleft = this.props.isCurrentUser ? 30 : 0;
    const marginRight = this.props.isCurrentUser ? 0 : 30;
    const textAlign = this.props.isCurrentUser ? 'right' : 'left';

    const checkmarkColor = this.props.isCurrentUser
      ? Colors.medMatBlue2
      : Colors.medMatPurple2;

    const isCompletedTextDec = this.props.item.isCompleted
      ? 'line-through'
      : 'none';

    return (
      <TouchableOpacity
        onLongPress={event => this.deleteToDoHandler(this.props.item.nodekey)}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              alignSelf: alignSelf,
              marginLeft: marginleft,
              marginRight: marginRight,
              borderWidth: 1,
              borderColor: borderColor
            }
          ]}
        >
          <View style={[styles.row, { alignSelf: 'center' }]}>
            <View style={[styles.paperHoles]} />
            <View style={[styles.paperHoles]} />
            <View style={[styles.paperHoles]} />
            <View style={[styles.paperHoles]} />
            <View style={[styles.paperHoles]} />
          </View>
          <View style={[styles.row, { marginTop: 10, marginBottom: 10 }]}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={event =>
                this.updateToDoHandle(
                  this.props.item.nodekey,
                  this.props.item.isCompleted,
                  this.props.index
                )
              }
            >
              {this.checkmark(this.props.item.isCompleted, checkmarkColor)}
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { textDecorationLine: isCompletedTextDec, color: textColor }
              ]}
            >
              {this.props.item.todo}
            </Text>
          </View>
          <Text style={[styles.dateText]}>{this.props.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  checkmark = (val, checkmarkColor) => {
    if (val == true) {
      return (
        <View style={[styles.checkmarkCirc, { borderColor: checkmarkColor }]}>
          <View
            style={[
              styles.checkmarkCircFilling,
              { backgroundColor: checkmarkColor }
            ]}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.checkmarkCirc, { borderColor: checkmarkColor }]} />
      );
    }
  };
  updateToDoHandle(val, status, index) {
    if (status === false) {
      this.props.updateTodoStatus(val, true, index);
    } else {
      this.props.updateTodoStatus(val, false, index);
    }
  }
  deleteToDoHandle(val, index) {
    this.props.deleteTodo(val, index);
  }
  deleteToDoHandler(nodekey, index) {
    Alert.alert('Delete ToDo', 'Are you sure you want to delete this ToDo?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        onPress: () => this.props.deleteTodo(nodekey, index)
      }
    ]);
  }
}
