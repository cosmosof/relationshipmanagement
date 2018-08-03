import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Colors } from '../Themes';
import ChatBubbleView from '../Components/ChatBubbleView';
import ChatandToDosFetchingView from '../Components/ChatandToDosFetchingView';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ChatActions from '../Redux/ChatRedux';
import styles from './Styles/ChatScreenStyle';

const ITEM_HEIGHT = 50;

class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;
    return {
      headerLeft: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Icon
            name='ios-arrow-back'
            size={20}
            padding={20}
            style={{ padding: 20, color: Colors.darkMatBlue2 }}
            onPress={() => goBack()}
          />
        </TouchableWithoutFeedback>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      placeholder: 'type something...'
    };

    this.renderItem = ({ item }) => {
      var dateCreated = new Date(item.createdAt);
      var date = dateCreated.toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      const isCurrentUser = this.props.userId == item.userId ? true : false;
      return (
        <ChatBubbleView
          isCurrentUser={isCurrentUser}
          text={item.text}
          date={date}
        />
      );
    };

    this.itemLayout = (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index
    });
  }

   componentDidUpdate() {
    console.log('componentDidUpdate');

    if (this.props.usermesssagedata&&!this.props.fetchingmessages) {
      if (this.props.usermesssagedata.length) {
        this.flatList.scrollToIndex({ animated: true, index: 0 });
      }
    }
  } 
  componentDidMount() {
    console.log('profileScreen componentDidMount');
    this.props.fetchUserMessages();
  }

  saveUserMessageHandler = () => {
    let currentMessage = this.state.text;
    const userId = this.props.userId;
    if(currentMessage){
      this.props.saveUserMessage(currentMessage, userId);
      this.setState({ text: null, placeholder: 'type something...' });
    } else {
      this.setState({ placeholder: 'empty message!' });
    }
  };

  render() {
    const { newusername } = this.state;
    const { newpassword } = this.state;
    const contentContainerStyle = this.props.usermesssagedata
      ? this.props.usermesssagedata.length
        ? null
        : styles.flatlistContainerStyle
      : null;

    return (
      <KeyboardAvoidingView
        keyboardShouldPersistTaps='always'
        keyboardVerticalOffset={64}
        behavior={'padding'}
        style={{
          flex: 1,
          justifyContent: 'flex-end'
        }}
      >
       {this.props.fetchingmessages ? 
              <ChatandToDosFetchingView />
            :
        <FlatList
          ref={c => {
            this.flatList = c;
          }}
          style={[styles.container]}
          contentContainerStyle={[contentContainerStyle]}
          data={this.props.usermesssagedata}
          keyExtractor={item => item.createdAt}
          renderItem={this.renderItem}
          getItemLayout={this.itemLayout}
          inverted
        />
        }
        <View style={styles.typeMessage}>
          <TextInput
            ref='username'
            style={[styles.textInput]}
            value={this.state.text}
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={true}
            onChangeText={text => this.setState({ text })}
            underlineColorAndroid='transparent'
            placeholder={this.state.placeholder}
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
              color={Colors.medMatBlue2}
            />
          ) : (
            <TouchableOpacity onPress={this.saveUserMessageHandler}>
              <Icon
                name='ios-send-outline'
                size={28}
                padding={2}
                style={{ padding: 2, alignSelf: 'center' }}
                color={Colors.medMatPurple2}
              />
            </TouchableOpacity>
          )}
        </View>
      
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const {
    fetchingmessages,
    savemessagefetching,
    savemessagesuccess,
    savemessagefailure,
    usermesssagedata
  } = state.chatscreen;
  const { userId } = state.login;
  return {
    fetchingmessages,
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
    fetchUserMessages: () => dispatch(ChatActions.fetchUserMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
