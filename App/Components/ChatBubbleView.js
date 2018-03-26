import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Colors } from './../Themes';
import styles from './Styles/ChatBubbleViewStyles';

export default class ChatBubbleView extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    date: PropTypes.string,
    isCurrentUser: PropTypes.bool
  };

  render() {
    const alignSelf = this.props.isCurrentUser ? 'flex-end' : 'flex-start';
    const backgroundColor = this.props.isCurrentUser
      ? Colors.lighterMatBlue
      : Colors.lighterMatPurple;
    const textColor = this.props.isCurrentUser
      ? Colors.darkMatBlue2
      : Colors.darkMatPurple2;
    const borderBottomRightRadiusNone = this.props.isCurrentUser ? 0 : 10;
    const borderBottomLeftRadiusNone = this.props.isCurrentUser ? 10 : 0;
    const bubbleTriangleMarginLeft = this.props.isCurrentUser ? 0 : 10;
    const borderColor = this.props.isCurrentUser
    ? Colors.lightMatBlue2
    : Colors.lightMatPurple2;
    const bubbleTriangleColor = this.props.isCurrentUser
      ? Colors.lighterMatBlue
      : Colors.lighterMatPurple;
    const marginleft = this.props.isCurrentUser ? 30 : 0;
    const marginRight = this.props.isCurrentUser ? 5 : 30;
    const textAlign = this.props.isCurrentUser ? 'right' : 'left';
    return (
      <View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              borderBottomRightRadius: borderBottomRightRadiusNone,
              borderBottomLeftRadius: borderBottomLeftRadiusNone,
              alignSelf: alignSelf,
              marginLeft: marginleft,
              marginRight: marginRight,
              borderWidth: 1,
              borderColor: borderColor
            }
          ]}
        >
          <Text style={[styles.text, { color: textColor }]}>
            {this.props.text}
          </Text>
        </View>
        <View
          style={{ alignSelf: alignSelf, marginLeft: bubbleTriangleMarginLeft }}
        >
          <View
            style={[
              styles.triangle,
              { borderBottomColor: bubbleTriangleColor, alignSelf: alignSelf }
            ]}
          />
        </View>
        <Text style={[styles.dateText, { textAlign: textAlign }]}>
          {this.props.date}
        </Text>
      </View>
    );
  }
}
