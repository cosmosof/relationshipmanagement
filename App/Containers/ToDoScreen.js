import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Images, Metrics, Colors } from '../Themes';
import TodoCard from '../Components/TodoCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ToDoActions from '../Redux/ToDoRedux';
import styles from './Styles/ToDoScreenStyle';

const ITEM_HEIGHT = 50;

class ToDoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
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
      ),
      headerRight: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Icon
            name='ios-chatbubbles-outline'
            size={20}
            padding={20}
            style={{ padding: 20, color: Colors.darkMatBlue2 }}
            onPress={() => navigation.navigate('Chat')}
          />
        </TouchableWithoutFeedback>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      placeholder: 'make it happen...'
    };
    this.props.updateTodoStatus = this.props.updateTodoStatus.bind(this);
    this.props.deleteTodo = this.props.deleteTodo.bind(this);

    this.renderItem = ({ item, index }) => {
      var dateCreated = new Date(item.createdAt);
      var date = dateCreated.toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      const isCurrentUser = this.props.userId == item.userId;
      return (
        <TodoCard
          isCurrentUser={isCurrentUser}
          item={item}
          date={date}
          updateTodoStatus={this.props.updateTodoStatus}
          deleteTodo={this.props.deleteTodo}
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
    if (this.props.usermesssagedata) {
      if (this.props.usermesssagedata.length) {
        if(this.props.index){
          this.flatList.scrollToIndex({ animated: true, index: this.props.index });
        }
      }
    }
  }
  componentDidMount() {
    this.props.fetchUserMessages();
  }

  saveUserMessageHandler = () => {
    let currentMessage = this.state.text;
    const userId = this.props.userId;

    if (currentMessage) {
      this.props.saveUserMessage(currentMessage, userId);
      this.setState({ text: null, placeholder: 'make it happen...' });
    } else {
      this.setState({ placeholder: 'To-Do is empty!' });
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
        <View style={styles.typeMessage}>
          <TextInput
            ref='username'
            style={[styles.textInput]}
            value={this.state.text}
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
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
              color={Colors.ember}
            />
          ) : (
            <TouchableOpacity onPress={this.saveUserMessageHandler}>
              <Icon
                name='ios-add-outline'
                size={28}
                padding={2}
                style={{ padding: 2, alignSelf: 'center' }}
                color={Colors.matBlue}
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
    savemessagefetching,
    savemessagesuccess,
    savemessagefailure,
    usermesssagedata,
    index
  } = state.todoscreen;
  const { userId } = state.login;
  return {
    savemessagefetching,
    savemessagesuccess,
    savemessagefailure,
    usermesssagedata,
    userId,
    index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserMessage: (usermessage, userId) =>
      dispatch(ToDoActions.saveUserTodos(usermessage, userId)),
    fetchUserMessages: () => dispatch(ToDoActions.fetchUserTodos()),
    updateTodoStatus: (todonode, status, index) =>
      dispatch(ToDoActions.updateTodoStatus(todonode, status, index)),
    deleteTodo: (todonode, index) => dispatch(ToDoActions.deleteTodo(todonode, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoScreen);
