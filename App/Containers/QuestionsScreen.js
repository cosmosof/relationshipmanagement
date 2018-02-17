// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import QuestionsActions from '../Redux/questionsRedux';
import {Images, Metrics} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
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
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: <View style={{ width: 79, height: 22}}>
        <Image source={Images.peerler} style={{width: 79, height: 22}} />
      </View>,
      //headerTitleStyle: { color: Colors.ricePaper },
      headerLeft: (
        <Icon
          name= "ios-information-circle-outline"
          size={20}
          padding= {20}
          style={{padding: 20}}
          //color= {Colors.ricePaper}
          onPress={() => navigation.navigate('InfoScreen')
          }
        />
        ),
        headerRight: (
          <Icon
            name= "ios-person-outline"
            size={20}
            padding= {20}
            style={{padding: 20}}
            //color= {Colors.ricePaper}
            onPress={() => navigation.navigate('ProfileScreen')
            }
          />
          ),
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
      invAccepted: this.props.invAccepted,
      isUsersAnswersSubmittedandUsersMatched: false
    }
  }
  componentDidMount(){
    console.log('questionscreen componentDidMount');
    this.props.fetchAnswerstoScreen(this.props.userId);
  }
  
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.setState({ value1Index: nextProps.question1});
    this.setState({ value2Index: nextProps.question2 });
    this.setState({ value3Index: nextProps.question3 });
    
    if((nextProps.saveanswerssuccess === true && nextProps.connectionSucceed === true) || (nextProps.fetchusersanswerssuccess === true && nextProps.connectionSucceed === true)) {
      console.log('user answered questions')
      this.setState({ isUsersAnswersSubmittedandUsersMatched: true });
    }
    if(nextProps.connectionSucceed === false){
      console.log('connection deleted')
      this.setState({ isUsersAnswersSubmittedandUsersMatched: false });
    }
  }
 
  saveUsersAnswersHandler() {
    const { question1, question2, question3, userId } = this.props;
    this.props.saveUsersAnswers(question1, question2, question3, userId);
  }

  getPartnersAnswers = (val) =>  { 
    console.log(this.props.answers)
    console.log(this.props.connectionSucceed)

    if(this.props.answers && this.props.connectionSucceed){
      console.log(this.props.answers)
      if(this.state.isUsersAnswersSubmittedandUsersMatched === true){
        const obj = this.props.answers;
        console.log(obj) 
        if(obj.hasOwnProperty(val)) {
          switch (obj[val]) {
            case 0: return (
              <Text>
              your partner's answer: A
              </Text>
            );
            case 1: return (
              <Text>
              your partner's answer: B
              </Text>
            );
            case 2: return (
              <Text>
              your partner's answer: C
              </Text>
            );
            case 3: return (
              <Text>
              your partner's answer: D
              </Text>
            );
          }
        } 
      }    
    }
  }

  render() {   
    return (
      <ScrollView>
        <Card>
          <View style={styles.container}>
            <View>
        {/*     <Text>partners ques fetch succeed {this.props.fecthpartnersanswerssucceed?'true':'false'}</Text>
            <Text>answers fetced from peer {this.props.answers?'exist':'not'}</Text>
            <Text>value1Index {this.state.value1Index}</Text>
            <Text>value2Index {this.state.value2Index}</Text>
            <Text>value3Index {this.state.value3Index}</Text>
            <Text>props.question1:{this.props.question1}</Text> */}
              <Text>
                {
                  this.props.connectionSucceed ? 
                    (
                      this.state.isUsersAnswersSubmittedandUsersMatched ? 
                      '' 
                        : 
                      'To see partner answers, submit your all answers!'
                    )
                      :
                    (
                      false
                    )
                }
              </Text>
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
                  formHorizontal={true}
                  animation={true}
                >
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
                          buttonColor={'#6F7C8A'}
                          labelColor={'#6F7C8A'}
                          style={[i !== this.state.types1.length-1 && styles.radioStyle]}
                          onPress={(value, index) => {
                            this.props.questionUpdates('question1', value)
                            this.setState({value1: value})
                            this.setState({value1Index: index})
                          }}
                        />
                      </View>
                    )
                  })}
                </RadioForm>
                {this.getPartnersAnswers('question1')}
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
                  formHorizontal={true}
                  animation={true}
                >
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
                          buttonColor={'#6F7C8A'}
                          labelColor={'#6F7C8A'}
                          style={[i !== this.state.types1.length-1 && styles.radioStyle]}
                          onPress={(value, index) => {
                            this.props.questionUpdates('question2', value)
                            this.setState({value2: value})
                            this.setState({value2Index: index})
                          }}
                        />
                      </View>
                    )
                  })}
                </RadioForm>   
                  {this.getPartnersAnswers('question2')}

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
                  do eiusmod tempor incididuntmmn
                </Text>
                <Text style={styles.parapraph}>
                  <Text style={{ color: '#30a2f2' }}>D) {'  '}</Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
              <RadioForm
                  formHorizontal={true}
                  animation={true}
                >
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
                          buttonColor={'#6F7C8A'}
                          labelColor={'#6F7C8A'}
                          style={[i !== this.state.types1.length-1 && styles.radioStyle]}
                          onPress={(value, index) => {
                            this.props.questionUpdates('question3', value)
                            this.setState({value3: value})
                            this.setState({value3Index: index})
                          }}
                        />
                      </View>
                    )
                  })}
                </RadioForm>   
                {this.getPartnersAnswers('question3')}

              </View>
            </View>
          </View>
        </Card>
        <Card>
          <View style={styles.container}>
            <Text>
              {this.props.error}
            </Text>
             <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.saveUsersAnswersHandler.bind(this)}>
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
  const { question1, question2, question3, fetching, error, 
    answers, saveanswerssuccess, fetchusersanswerssuccess
  } = state.questions;
  const { userId } = state.login;
  const { connectionSucceed } = state.homescreen;

  return { 
    question1, question2, question3, fetching, answers, 
    error, userId, connectionSucceed, saveanswerssuccess, fetchusersanswerssuccess
  };
};
const mapDispatchToProps = dispatch => {
  return {
    questionUpdates: (prop, value) =>
      dispatch(QuestionsActions.questionUpdate(prop, value)),
    saveUsersAnswers: (question1, question2, question3, userId) =>
      dispatch(QuestionsActions.saveUsersAnswers(question1, question2, question3, userId)),
    fetchAnswerstoScreen: (userId) =>
      dispatch(QuestionsActions.fetchUsersAnswers(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);

