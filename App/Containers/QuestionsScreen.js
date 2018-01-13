// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import ValuesActions from '../Redux/questionsRedux';

import Colors from '../Themes/Colors';
import Card from '../Themes/Card';
import FullButton from '../Components/FullButton';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

// Styles
import styles from './Styles/QuestionsScreenStyle'

class QuestionsScreen extends Component {
  static navigationOptions = {
    title: 'Sorular',
    headerTintColor: Colors.ricePaper,
    headerTitleStyle: { color: Colors.ricePaper },
    headerBackTitleStyle: { color: Colors.ricePaper }
  };
  constructor() {
    super();
    this.state = {
      types1: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 },
        { label: 'C', value: 2 },
        { label: 'D', value: 3 }
      ],
      value1: 0,
      value1Index: 0,
      value1_1: 0,
      value1_1Index: 0,
      question1: null,
      question2: null,
      question3: null,

    };
  }
  componentWillMount(){
    this.props.fetchAnswerstoScreen(this.props.userId);
    this.setState({ question1: this.props.question1 });
    this.setState({ question2: this.props.question2 });
    this.setState({ question3: this.props.question3 });
    //this.setState({ selectedGenderIndex: (this.props.question3!==null) ? true : false });

  }
  onButtonPress() {
    const { question1, question2, question3, userId } = this.props;
    this.props.questionsAnswersSaveRequest(question1, question2, question3, userId);
  }
 
  render() {
   
    return (
      <ScrollView>
        <Card>
          <View style={styles.container}>
            <View>
              <Text>{this.props.userId}</Text>
              <Text>Answers from {this.props.invitation}</Text>
              <Text>{this.props.question1}</Text>
              <Text>{this.state.question1}</Text>
              <Text style={styles.title}>Soru 1</Text>
              <View style={styles.lineBreak} />
              <View>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>A) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>B) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>C) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>D) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <RadioForm
                  labelStyle={{ fontSize: 20, marginRight: 10 }}
                  ref='radioForm1'
                  radio_props={this.state.types1}
                  initial={this.state.question1}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  labelColor={'#000'}
                  animation={true}
                  buttonSize={12}
                  buttonOuterSize={22}
                  onPress={value => {
                    this.props.questionUpdates('question1', value);
                  }}
                />
                <Text>selected value : {this.props.question1}</Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View style={styles.container}>
            <View>
              <View>
                <Text style={styles.title}>Soru 2</Text>
                <View style={styles.lineBreak} />
                <View>
                  <Text style={styles.parapraph}>
                    <Text style={{ color: '#30a2f2' }}>A) {'  '}</Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </Text>
                  <Text style={styles.parapraph}>
                    <Text style={{ color: '#30a2f2' }}>B) {'  '}</Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </Text>
                  <Text style={styles.parapraph}>
                    <Text style={{ color: '#30a2f2' }}>C) {'  '}</Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </Text>
                  <Text style={styles.parapraph}>
                    <Text style={{ color: '#30a2f2' }}>D) {'  '}</Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <RadioForm
                    labelStyle={{ fontSize: 20, marginRight: 10 }}
                    ref='radioForm2'
                    radio_props={this.state.types1}
                    initial={this.state.question2}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={'#2196f3'}
                    labelColor={'#000'}
                    animation={true}
                    buttonSize={12}
                    buttonOuterSize={22}
                    onPress={value => {
                      this.props.questionUpdates('question2', value);
                    }}
                  />
                  <Text>selected value : {this.props.question2}</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Soru 3</Text>
              <View style={styles.lineBreak} />
              <View>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>A) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>B) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>C) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>D) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <RadioForm
                  labelStyle={{ fontSize: 20, marginRight: 10 }}
                  ref='radioForm3'
                  radio_props={this.state.types1}
                  initial={this.state.question3}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  labelColor={'#000'}
                  animation={true}
                  buttonSize={12}
                  buttonOuterSize={22}
                  onPress={value => {
                    this.props.questionUpdates('question3', value);
                  }}
                />
                <Text>selected value : {this.props.question3}</Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View style={styles.container}>
            <Text>
              {this.props.error}
            </Text>
             <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.onButtonPress.bind(this)}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Submit</Text>                  
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    );
  }
}



const mapStateToProps = state => {
  const { question1, question2, question3, fetching, error } = state.questions;
  const { userId } = state.login;
  const { invitation } = state.homescreen;


  return { question1, question2, question3, fetching, error, userId, invitation };
  
};
const mapDispatchToProps = dispatch => {
  return {
    questionUpdates: (prop, value) =>
      dispatch(ValuesActions.questionUpdate(prop, value)),
    questionsAnswersSaveRequest: (question1, question2, question3, userId) =>
      dispatch(ValuesActions.saveAnswers(question1, question2, question3, userId)),
    fetchAnswerstoScreen: (userId) =>
      dispatch(ValuesActions.fetchAnswers(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);

