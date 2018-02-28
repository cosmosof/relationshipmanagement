import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  AppState,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import { Images, Metrics, Colors } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ChatActions from '../Redux/ChatRedux';
import firebase from 'react-native-firebase';


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChatScreenStyle';
const ITEM_HEIGHT = 50

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      headerLeft: (
        <Icon
          name='ios-arrow-back'
          size={20}
          padding={20}
          style={{ padding: 20 }}
          onPress={() => navigation.navigate('Home')}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      text: null
    };
    this.renderItem = ({item}) => {
      var dateCreated = new Date(item.createdAt);
      var date = dateCreated.toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }) 
      console.log(date);
      console.log(item.userId);
      const isCurrentUser = this.props.userId == item.userId;
      console.log(isCurrentUser);
      const alignSelf = isCurrentUser ? 'flex-end' : 'flex-start'
      const backgroundColor = isCurrentUser ? Colors.lightMatBlue : Colors.lightMatPurple
      const textColor = isCurrentUser ? Colors.matBlue : Colors.coal
      const borderBottomRightRadiusNone = isCurrentUser ? 0 : 5
      const borderBottomLeftRadiusNone = isCurrentUser ? 5 : 0
      const marginleft = isCurrentUser ? 30 : 0
      const marginRight = isCurrentUser ? 0 : 30
      const textAlign = isCurrentUser ? 'right' : 'left'
       
      return (
        <View>
        <View style={{
          backgroundColor: backgroundColor, borderBottomRightRadius: borderBottomRightRadiusNone,
          borderBottomLeftRadius: borderBottomLeftRadiusNone,
          borderRadius: 5, padding:8,  margin: 3, alignSelf: alignSelf, 
          marginLeft: marginleft, marginRight: marginRight, minWidth: 100
        }}>
          <Text style={{color: textColor, fontSize: 12}}>
            {item.text}
          </Text>   
        </View>
         <Text style={{color: Colors.charcoal, fontSize: 6, textAlign: textAlign}}>
         {date}
       </Text>
       </View>
      )
    }
    this.itemLayout = (data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');

    if (this.props.usermesssagedata) {
      if (this.props.usermesssagedata.length) {
        this.flatList.scrollToIndex({animated: true, index: 0});
      }
    }  
  }
  componentDidMount() {
    console.log('profileScreen componentDidMount');
    this.props.fetchUserMessages();
  }

  saveUserMessageHandler = () => {
    let currentMessage = this.state.text;
    const userId = this.props.userId
    this.props.saveUserMessage(currentMessage, userId);
    this.setState({ text: null });
  };
 
  render() {
    const { newusername } = this.state;
    const { newpassword } = this.state;
    const contentContainerStyle = this.props.usermesssagedata ? 
    (this.props.usermesssagedata.length ? null : styles.flatlistContainerStyle) : null


    return (

      <KeyboardAvoidingView
      keyboardShouldPersistTaps='always'

      keyboardVerticalOffset={64}
      behavior={'padding'}
      style={{ flex: 1, justifyContent: 'flex-end'
    }}
    >    
      <FlatList
        ref={(c) => { this.flatList = c }}
        style={[styles.container]}
        contentContainerStyle={[contentContainerStyle]}
        data={this.props.usermesssagedata}
        keyExtractor={item => item.createdAt}
        renderItem={this.renderItem}
        getItemLayout={this.itemLayout}
        inverted 
      />
      <View style={styles.typeMessage}>
        <TextInput
          ref='username'
          style={[
            styles.textInput
          ]}
          value={this.state.text}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={text => this.setState({ text })}
          underlineColorAndroid='transparent'
          placeholder='...type something'
          secureTextEntry={false}
          multiline={true}
          autoGrow={true}
        />
        {this.props.savemessagefetching ? (
          <Icon
            name='ios-send-outline'
            size={28}
            padding={2}
            style={{ padding: 2, alignSelf: 'center' }}
            color={Colors.ember}
          />
        ) : (
          <Icon
            name='ios-send-outline'
            size={28}
            padding={2}
            style={{ padding: 2, alignSelf: 'center' }}
            color={Colors.matBlue}
            onPress={this.saveUserMessageHandler}
          />
        )}
      </View>
    </KeyboardAvoidingView>  
    );
  }
}

const mapStateToProps = state => {
  const {
    savemessagefetching,
    savemessagesuccess,
    savemessagefailure,
    usermesssagedata
  } = state.chatscreen;
  const {
    userId
  } = state.login;
  return {
    savemessagefetching,
    savemessagesuccess,
    savemessagefailure,
    usermesssagedata,
    userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserMessage: (usermessage, userId) =>
      dispatch(ChatActions.saveUserMessage(usermessage, userId)), 
    fetchUserMessages: () =>
      dispatch(ChatActions.fetchUserMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
