import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';
import styles from './Styles/QuestionsInputStyles';

export default class QuestionsInput extends React.Component {
  static propTypes = {
    textCounter: PropTypes.number,
    value: PropTypes.string,
    partnersAnswer: PropTypes.object,
    title: PropTypes.string,
    questionName: PropTypes.string,
    onPress: PropTypes.func,
    onBlurr: PropTypes.func,
    onFocus: PropTypes.func,
    onChangeText: PropTypes.func,
    styles: PropTypes.object
  };

  render() {
    return (
      <View style={styles.compenentContainer}>
        <Text style={[styles.titleBold, this.props.titleBoldStyle]}>
          {this.props.questionName}
        </Text>
        <View style={styles.lineBreak} />
        <Text style={[styles.title, this.props.titleStyle]}>
          {this.props.title}
        </Text>
        <TextInput
          ref={this.props.ref}
          style={[styles.textInputStyle, this.props.styles]}
          value={this.props.value}
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={600}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChangeText={this.props.onChangeText}
          underlineColorAndroid='transparent'
          placeholder='Please type your answer of 60-600 characters here'
          secureTextEntry={false}
          multiline={true}
          autoGrow={true}
        />
        <Text style={styles.textCounter}>{this.props.textCounter}</Text>
        {this.props.partnersAnswer}
      </View>
    );
  }
}
