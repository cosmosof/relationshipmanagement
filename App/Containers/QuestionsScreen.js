import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Keyboard,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import QuestionsActions from '../Redux/questionsRedux';
import { Images, Metrics } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../Themes/Colors';
import Card from '../Themes/Card';
import QuestionsInput from '../Components/QuestionsInput';
import RoundedButton from '../Components/RoundedButton';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

// Styles
import styles from './Styles/QuestionsScreenStyle';

class QuestionsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: (
        <View style={{ width: 79, height: 22 }}>
          <Image source={Images.peerler} style={{ width: 79, height: 22 }} />
        </View>
      ),
      headerLeft: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Icon
            name='ios-arrow-back'
            size={20}
            padding={20}
            style={{ padding: 20, color: Colors.darkMatBlue2 }}
            onPress={() => navigation.navigate('Home')}
          />
        </TouchableWithoutFeedback>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      types1: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 },
        { label: 'C', value: 2 },
        { label: 'D', value: 3 }
      ],
      value1: this.props.question1,
      value1Index: this.props.question1,
      value2: this.props.question2,
      value2Index: this.props.question2,
      value3: this.props.question3,
      value3Index: this.props.question3,
      value4: this.props.question4,
      value4Index: this.props.question4,
      value5: this.props.question5,
      value5Index: this.props.question5,
      invAccepted: this.props.invAccepted,
      isUsersAnswersSubmittedandUsersMatched: false,
      error: null,
      question4Text: null,
      question5Text: null,
      question6Text: null,
      question7Text: null,
      question8Text: null,
      question9Text: null,
      question10Text: null,
      question4TextStyle: null,
      question5TextStyle: null,
      question6TextStyle: null,
      question7TextStyle: null,
      question8TextStyle: null,
      question9TextStyle: null,
      question10TextStyle: null
    };
  }
  componentDidMount() {
    console.log('questionscreen componentDidMount');
    this.props.fetchAnswerstoScreen(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps  ${nextProps.question9Text}`);
    if (
      this.state.question4Text == null &&
      this.state.question5Text == null &&
      this.state.question6Text == null &&
      this.state.question7Tex == null &&
      this.state.question8Text == null &&
      this.state.question9Text == null &&
      this.state.question10Text == null
    ) {
      this.setState({ question4Text: nextProps.question4Text });
      this.setState({ question5Text: nextProps.question5Text });
      this.setState({ question6Text: nextProps.question6Text });
      this.setState({ question7Text: nextProps.question7Text });
      this.setState({ question8Text: nextProps.question8Text });
      this.setState({ question9Text: nextProps.question9Text });
      this.setState({ question10Text: nextProps.question10Text });
    } else if (
      this.state.question4Text == nextProps.question4Text &&
      this.state.question5Text == nextProps.question5Text &&
      this.state.question6Text == nextProps.question6Text &&
      this.state.question7Text == nextProps.question7Text &&
      this.state.question8Text == nextProps.question8Text &&
      this.state.question9Text == nextProps.question9Text &&
      this.state.question10Text == nextProps.question10Text
    ) {
      this.setState({ question4Text: nextProps.question4Text });
      this.setState({ question5Text: nextProps.question5Text });
      this.setState({ question6Text: nextProps.question6Text });
      this.setState({ question7Text: nextProps.question7Text });
      this.setState({ question8Text: nextProps.question8Text });
      this.setState({ question9Text: nextProps.question9Text });
      this.setState({ question10Text: nextProps.question10Text });
    }
    this.setState({ value1Index: nextProps.question1 });
    this.setState({ value2Index: nextProps.question2 });
    this.setState({ value3Index: nextProps.question3 });
    this.setState({ value4Index: nextProps.question4 });
    this.setState({ value5Index: nextProps.question5 });

    if (
      (nextProps.saveanswerssuccess === true &&
        nextProps.connectionSucceed === true) ||
      (nextProps.fetchusersanswerssuccess === true &&
        nextProps.connectionSucceed === true)
    ) {
      console.log('user answered questions');
      this.setState({ isUsersAnswersSubmittedandUsersMatched: true });
    }
    if (nextProps.connectionSucceed === false) {
      console.log('connection deleted');
      this.setState({ isUsersAnswersSubmittedandUsersMatched: false });
    }
  }

  saveUsersAnswersHandler() {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
      userId
    } = this.props;
    let question4Text = this.state.question4Text;
    let question5Text = this.state.question5Text;
    let question6Text = this.state.question6Text;
    let question7Text = this.state.question7Text;
    let question8Text = this.state.question8Text;
    let question9Text = this.state.question9Text;
    let question10Text = this.state.question10Text;

    if (
      (this.props.question1 == 0 || this.props.question1) &&
      (this.props.question2 == 0 || this.props.question2) &&
      (this.props.question3 == 0 || this.props.question3) &&
      (this.props.question4 == 0 || this.props.question4) &&
      (this.props.question5 == 0 || this.props.question5)
    ) {
      console.log(this.state.value5);
      this.setState({ error: '' });
      if (
        this.state.question4Text.length > 59 &&
        this.state.question5Text.length > 59 &&
        this.state.question6Text.length > 59 &&
        this.state.question7Text.length > 59 &&
        this.state.question8Text.length > 59 &&
        this.state.question9Text.length > 59 &&
        this.state.question10Text.length > 59
      ) {
        this.setState({ error: '' });
        this.props.saveUsersAnswers(
          question1,
          question2,
          question3,
          question4,
          question5,
          question4Text,
          question5Text,
          question6Text,
          question7Text,
          question8Text,
          question9Text,
          question10Text,
          userId
        );
      } else {
        this.setState({
          error: 'Your answers must be between 60-600 characters long!'
        });
      }
    } else {
      this.setState({ error: 'Please answer all the questions!' });
    }
  }
  checkColor = (val, question) => {
    console.log(` testit ${val} /` + this.props[`${question}`]);
    if (val === this.props[`${question}`]) {
      return Colors.medGray;
    }
  };

  textInputonFocusStyleHandle(val) {
    console.log('textInputFocusStyleHandle called');
    switch (val) {
      case 'question4Text':
        this.setState({ question4TextStyle: styles.boxShadow });
        break;
      case 'question5Text':
        this.setState({ question5TextStyle: styles.boxShadow });
        break;
      case 'question6Text':
        this.setState({ question6TextStyle: styles.boxShadow });
        break;
      case 'question7Text':
        this.setState({ question7TextStyle: styles.boxShadow });
        break;
      case 'question8Text':
        this.setState({ question8TextStyle: styles.boxShadow });
        break;
      case 'question9Text':
        this.setState({ question9TextStyle: styles.boxShadow });
        break;
      case 'question10Text':
        this.setState({ question10TextStyle: styles.boxShadow });
        break;
    }
  }
  textInputValidator(val) {
    console.log('textInputValidator called');
    switch (val) {
      case 'question4Text':
        return this.state.question4Text
          ? this.state.question4Text.length < 60
            ? this.state.question4Text.length +
              ' / 60-600 characters are required'
            : this.state.question4Text.length
          : null;
      case 'question5Text':
        return this.state.question5Text
          ? this.state.question5Text.length < 60
            ? this.state.question5Text.length +
              ' / 60-600 characters are required'
            : this.state.question5Text.length
          : null;
      case 'question6Text':
        return this.state.question6Text
          ? this.state.question6Text.length < 60
            ? this.state.question6Text.length +
              ' / 60-600 characters are required'
            : this.state.question6Text.length
          : null;
      case 'question7Text':
        return this.state.question7Text
          ? this.state.question7Text.length < 60
            ? this.state.question7Text.length +
              ' / 60-600 characters are required'
            : this.state.question7Text.length
          : null;
      case 'question8Text':
        return this.state.question8Text
          ? this.state.question8Text.length < 60
            ? this.state.question8Text.length +
              ' / 60-600 characters are required'
            : this.state.question8Text.length
          : null;
      case 'question9Text':
        return this.state.question9Text
          ? this.state.question9Text.length < 60
            ? this.state.question9Text.length +
              ' / 60-600 characters are required'
            : this.state.question9Text.length
          : null;
      case 'question10Text':
        return this.state.question10Text
          ? this.state.question10Text.length < 60
            ? this.state.question10Text.length +
              ' / 60-600 characters are required'
            : this.state.question10Text.length
          : null;
    }
  }
  textInputonBlurStyleHandle(val) {
    console.log('textInputFocusStyleHandle called');
    this.setState({
      question4TextStyle: null,
      question5TextStyle: null,
      question6TextStyle: null,
      question7TextStyle: null,
      question8TextStyle: null,
      question9TextStyle: null,
      question10TextStyle: null
    });
  }

  getPartnersAnswers = val => {
    console.log(this.props.answers);
    console.log(this.props.connectionSucceed);

    if (this.props.answers && this.props.connectionSucceed) {
      console.log(this.props.answers);
      if (this.state.isUsersAnswersSubmittedandUsersMatched === true) {
        const obj = this.props.answers;
        console.log(obj);
        if (obj.hasOwnProperty(val)) {
          console.log(obj[val]);
          switch (obj[val]) {
            case 0:
              if (this.props[`${val}`] !== 0) {
                return (
                  <Text style={styles.partnerAnswerTextWarning}>
                    Your partner's answer: A
                  </Text>
                );
              } else {
                return (
                  <Text style={styles.partnerAnswerText}>
                    Your partner's answer: A
                  </Text>
                );
              }

            case 1:
              if (this.props[`${val}`] !== 1) {
                return (
                  <Text style={styles.partnerAnswerTextWarning}>
                    Your partner's answer: B
                  </Text>
                );
              } else {
                return (
                  <Text style={styles.partnerAnswerText}>
                    Your partner's answer: B
                  </Text>
                );
              }
            case 2:
              if (this.props[`${val}`] !== 2) {
                return (
                  <Text style={styles.partnerAnswerTextWarning}>
                    Your partner's answer: C
                  </Text>
                );
              } else {
                return (
                  <Text style={styles.partnerAnswerText}>
                    Your partner's answer: C
                  </Text>
                );
              }
            case 3:
              if (this.props[`${val}`] !== 3) {
                return (
                  <Text style={styles.partnerAnswerTextWarning}>
                    Your partner's answer: D
                  </Text>
                );
              } else {
                return (
                  <Text style={styles.partnerAnswerText}>
                    Your partner's answer: D
                  </Text>
                );
              }
            default:
              return (
                <View>
                  <Text style={styles.partnerAnswerTextTitle}>
                    Your partner's answer:
                  </Text>
                  <Text style={styles.partnerAnswerText}>{obj[val]}</Text>
                </View>
              );
          }
        }
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='position'
        keyboardShouldPersistTaps='always'
        keyboardVerticalOffset={64}
      >
        <ScrollView>
          <Card>
            <View style={[styles.container]}>
              <View>
                <Text style={styles.topWarning}>
                  {this.props.connectionSucceed
                    ? this.state.isUsersAnswersSubmittedandUsersMatched
                      ? ''
                      : "To see partner's answers, you must submit your all answers!"
                    : false}
                </Text>
                <Text style={styles.titleBold}>Question 1</Text>
                <View style={styles.lineBreak} />
                <Text style={styles.title}>
                  Do you have trouble opening up and talking to me about
                  anything?
                </Text>
                <View>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(0, 'question1') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>A) {'  '}</Text>
                    Yes, I do!
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(1, 'question1') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>B) {'  '}</Text>
                    Yes, But it's my preference
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(2, 'question1') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>C) {'  '}</Text>
                    No, I am comfortable talking to you about anything!
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(3, 'question1') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>D) {'  '}</Text>
                    Yes and No, some subjects makes me feel uncomfortable.
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <RadioForm formHorizontal={true} animation={true}>
                    {this.state.types1.map((obj, i) => {
                      var that = this;
                      var is_selected = this.state.value1Index == i;
                      return (
                        <View key={i} style={styles.radioButtonWrap}>
                          <RadioButton
                            labelStyle={{ fontSize: 20, marginRight: 20 }}
                            isSelected={is_selected}
                            obj={obj}
                            index={i}
                            borderWidth={1}
                            labelHorizontal={true}
                            buttonSize={16}
                            buttonOuterSize={22}
                            buttonColor={Colors.medGray}
                            labelColor={Colors.charcoal}
                            style={[
                              i !== this.state.types1.length - 1 &&
                                styles.radioStyle
                            ]}
                            onPress={(value, index) => {
                              this.props.questionUpdates('question1', value);
                              this.setState({ value1: value });
                              this.setState({ value1Index: index });
                            }}
                          />
                        </View>
                      );
                    })}
                  </RadioForm>
                  {this.getPartnersAnswers('question1')}
                </View>
              </View>

              <View>
                <View>
                  <Text style={styles.titleBold}>Question 2</Text>
                  <View style={styles.lineBreak} />
                  <Text style={styles.title}>
                    Can you think of a time you lost your patience with me?
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.parapraph,
                        { color: this.checkColor(0, 'question2') }
                      ]}
                    >
                      <Text style={{ color: Colors.medGray }}>A) {'  '}</Text>
                      No, I did not!
                    </Text>
                    <Text
                      style={[
                        styles.parapraph,
                        { color: this.checkColor(1, 'question2') }
                      ]}
                    >
                      <Text style={{ color: Colors.medGray }}>B) {'  '}</Text>
                      Yes, a few times!
                    </Text>
                    <Text
                      style={[
                        styles.parapraph,
                        { color: this.checkColor(2, 'question2') }
                      ]}
                    >
                      <Text style={{ color: Colors.medGray }}>C) {'  '}</Text>
                      Yes, often times!
                    </Text>
                    <Text
                      style={[
                        styles.parapraph,
                        { color: this.checkColor(3, 'question2') }
                      ]}
                    >
                      <Text style={{ color: Colors.medGray }}>D) {'  '}</Text>
                      Yes, but I don't lose control
                    </Text>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <RadioForm formHorizontal={true} animation={true}>
                      {this.state.types1.map((obj, i) => {
                        var that = this;
                        var is_selected = this.state.value2Index == i;
                        return (
                          <View key={i} style={styles.radioButtonWrap}>
                            <RadioButton
                              labelStyle={{ fontSize: 20, marginRight: 20 }}
                              isSelected={is_selected}
                              obj={obj}
                              index={i}
                              borderWidth={1}
                              labelHorizontal={true}
                              buttonSize={16}
                              buttonOuterSize={22}
                              buttonColor={Colors.medGray}
                              labelColor={Colors.charcoal}
                              style={[
                                i !== this.state.types1.length - 1 &&
                                  styles.radioStyle
                              ]}
                              onPress={(value, index) => {
                                this.props.questionUpdates('question2', value);
                                this.setState({ value2: value });
                                this.setState({ value2Index: index });
                              }}
                            />
                          </View>
                        );
                      })}
                    </RadioForm>
                    {this.getPartnersAnswers('question2')}
                  </View>
                </View>
              </View>

              <View>
                <Text style={styles.titleBold}>Question 3</Text>
                <View style={styles.lineBreak} />
                <Text style={styles.title}>Do you feel unworthy of love?</Text>
                <View>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(0, 'question3') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>A) {'  '}</Text>
                    Yes, occationally
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(1, 'question3') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>B) {'  '}</Text>
                    Yes, frequently
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(2, 'question3') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>C) {'  '}</Text>
                    No, never ever!
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(3, 'question3') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>D) {'  '}</Text>
                    No, thanks to you!
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <RadioForm formHorizontal={true} animation={true}>
                    {this.state.types1.map((obj, i) => {
                      var that = this;
                      var is_selected = this.state.value3Index == i;
                      return (
                        <View key={i} style={styles.radioButtonWrap}>
                          <RadioButton
                            labelStyle={{ fontSize: 20, marginRight: 20 }}
                            isSelected={is_selected}
                            obj={obj}
                            index={i}
                            borderWidth={1}
                            labelHorizontal={true}
                            buttonSize={16}
                            buttonOuterSize={22}
                            buttonColor={Colors.medGray}
                            labelColor={Colors.charcoal}
                            style={[
                              i !== this.state.types1.length - 1 &&
                                styles.radioStyle
                            ]}
                            onPress={(value, index) => {
                              this.props.questionUpdates('question3', value);
                              this.setState({ value3: value });
                              this.setState({ value3Index: index });
                            }}
                          />
                        </View>
                      );
                    })}
                  </RadioForm>
                  {this.getPartnersAnswers('question4')}
                </View>
              </View>
              <View>
                <Text style={styles.titleBold}>Question 4</Text>
                <View style={styles.lineBreak} />
                <Text style={styles.title}>
                  Do you feel I am there for you when you need me?
                </Text>
                <View>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(0, 'question4') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>A) {'  '}</Text>
                    Yes, sometimes
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(1, 'question4') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>B) {'  '}</Text>
                    Yes, always
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(2, 'question4') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>C) {'  '}</Text>
                    No, not lately
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(3, 'question4') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>D) {'  '}</Text>
                    No, never ever!
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <RadioForm formHorizontal={true} animation={true}>
                    {this.state.types1.map((obj, i) => {
                      var that = this;
                      var is_selected = this.state.value4Index == i;
                      return (
                        <View key={i} style={styles.radioButtonWrap}>
                          <RadioButton
                            labelStyle={{ fontSize: 20, marginRight: 20 }}
                            isSelected={is_selected}
                            obj={obj}
                            index={i}
                            borderWidth={1}
                            labelHorizontal={true}
                            buttonSize={16}
                            buttonOuterSize={22}
                            buttonColor={Colors.medGray}
                            labelColor={Colors.charcoal}
                            style={[
                              i !== this.state.types1.length - 1 &&
                                styles.radioStyle
                            ]}
                            onPress={(value, index) => {
                              this.props.questionUpdates('question4', value);
                              this.setState({ value4: value });
                              this.setState({ value4Index: index });
                            }}
                          />
                        </View>
                      );
                    })}
                  </RadioForm>
                  {this.getPartnersAnswers('question4')}
                </View>
              </View>
              <View>
                <Text style={styles.titleBold}>Question 5</Text>
                <View style={styles.lineBreak} />
                <Text style={styles.title}>
                  Have you ever felt rejected by me?
                </Text>
                <View>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(0, 'question5') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>A) {'  '}</Text>
                    Yes, sometimes
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(1, 'question5') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>B) {'  '}</Text>
                    Yes, always
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(2, 'question5') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>C) {'  '}</Text>
                    No, not lately
                  </Text>
                  <Text
                    style={[
                      styles.parapraph,
                      { color: this.checkColor(3, 'question5') }
                    ]}
                  >
                    <Text style={{ color: Colors.medGray }}>D) {'  '}</Text>
                    No, never ever!
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <RadioForm formHorizontal={true} animation={true}>
                    {this.state.types1.map((obj, i) => {
                      var that = this;
                      var is_selected = this.state.value5Index == i;
                      return (
                        <View key={i} style={styles.radioButtonWrap}>
                          <RadioButton
                            labelStyle={{ fontSize: 20, marginRight: 20 }}
                            isSelected={is_selected}
                            obj={obj}
                            index={i}
                            borderWidth={1}
                            labelHorizontal={true}
                            buttonSize={16}
                            buttonOuterSize={22}
                            buttonColor={Colors.medGray}
                            labelColor={Colors.charcoal}
                            style={[
                              i !== this.state.types1.length - 1 &&
                                styles.radioStyle
                            ]}
                            onPress={(value, index) => {
                              this.props.questionUpdates('question5', value);
                              this.setState({ value5: value });
                              this.setState({ value5Index: index });
                            }}
                          />
                        </View>
                      );
                    })}
                  </RadioForm>
                  {this.getPartnersAnswers('question5')}
                </View>
              </View>
              <QuestionsInput
                textCounter={this.textInputValidator('question4Text')}
                partnersAnswer={this.getPartnersAnswers('question4Text')}
                questionName='Question 6'
                title='What brings you the most joy in our relationship?'
                styles={this.state.question4TextStyle}
                value={this.state.question4Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question4Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question4Text')}
                onChangeText={question4Text => this.setState({ question4Text })}
              />
              <QuestionsInput
                textCounter={this.textInputValidator('question5Text')}
                partnersAnswer={this.getPartnersAnswers('question5Text')}
                questionName='Question 7'
                title='What is something I do that makes you feel loved the most?'
                styles={this.state.question5TextStyle}
                value={this.state.question5Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question5Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question5Text')}
                onChangeText={question5Text => this.setState({ question5Text })}
              />

              <QuestionsInput
                textCounter={this.textInputValidator('question6Text')}
                partnersAnswer={this.getPartnersAnswers('question6Text')}
                questionName='Question 8'
                title='What is something you have struggled with your entire life?'
                styles={this.state.question6TextStyle}
                value={this.state.question6Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question6Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question6Text')}
                onChangeText={question6Text => this.setState({ question6Text })}
              />
              <QuestionsInput
                textCounter={this.textInputValidator('question7Text')}
                partnersAnswer={this.getPartnersAnswers('question7Text')}
                questionName='Question 9'
                title='How would you describe our relationship?'
                styles={this.state.question7TextStyle}
                value={this.state.question7Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question7Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question7Text')}
                onChangeText={question7Text => this.setState({ question7Text })}
              />
              <QuestionsInput
                textCounter={this.textInputValidator('question8Text')}
                partnersAnswer={this.getPartnersAnswers('question8Text')}
                questionName='Question 10'
                title='What is a question about life that you wish you had the answer to?'
                styles={this.state.question8TextStyle}
                value={this.state.question8Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question8Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question8Text')}
                onChangeText={question8Text => this.setState({ question8Text })}
              />
              <QuestionsInput
                textCounter={this.textInputValidator('question9Text')}
                partnersAnswer={this.getPartnersAnswers('question9Text')}
                questionName='Question 11'
                title='When you talk about me with someone, do you have positive, negative, or neutral things to say?'
                styles={this.state.question9TextStyle}
                value={this.state.question9Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question9Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question9Text')}
                onChangeText={question9Text => this.setState({ question9Text })}
              />
              <QuestionsInput
                textCounter={this.textInputValidator('question10Text')}
                partnersAnswer={this.getPartnersAnswers('question10Text')}
                questionName='Question 12'
                title='How can we communicate better?'
                styles={this.state.question10TextStyle}
                value={this.state.question10Text}
                onFocus={() =>
                  this.textInputonFocusStyleHandle('question10Text')
                }
                onBlur={() => this.textInputonBlurStyleHandle('question10Text')}
                onChangeText={question10Text =>
                  this.setState({ question10Text })
                }
              />
              <Text style={styles.submitAnswersWarningText}>
                {this.props.error || this.state.error
                  ? this.props.error || this.state.error
                  : this.props.saveanswerssuccess
                    ? 'successfully saved!'
                    : null}
              </Text>

              <RoundedButton
                isFetching={this.props.fetching}
                title='Submit'
                onPress={this.saveUsersAnswersHandler.bind(this)}
              />
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question4Text,
    question5Text,
    question6Text,
    question7Text,
    question8Text,
    question9Text,
    question10Text,
    fetching,
    error,
    answers,
    saveanswerssuccess,
    fetchusersanswerssuccess
  } = state.questions;
  const { userId } = state.login;
  const { connectionSucceed } = state.homescreen;

  return {
    question1,
    question2,
    question3,
    question4,
    question5,
    question4Text,
    question5Text,
    question6Text,
    question7Text,
    question8Text,
    question9Text,
    question10Text,
    fetching,
    answers,
    error,
    userId,
    connectionSucceed,
    saveanswerssuccess,
    fetchusersanswerssuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    questionUpdates: (prop, value) =>
      dispatch(QuestionsActions.questionUpdate(prop, value)),
    saveUsersAnswers: (
      question1,
      question2,
      question3,
      question4,
      question5,
      question4Text,
      question5Text,
      question6Text,
      question7Text,
      question8Text,
      question9Text,
      question10Text,
      userId
    ) =>
      dispatch(
        QuestionsActions.saveUsersAnswers(
          question1,
          question2,
          question3,
          question4,
          question5,
          question4Text,
          question5Text,
          question6Text,
          question7Text,
          question8Text,
          question9Text,
          question10Text,
          userId
        )
      ),
    fetchAnswerstoScreen: userId =>
      dispatch(QuestionsActions.fetchUsersAnswers(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);
