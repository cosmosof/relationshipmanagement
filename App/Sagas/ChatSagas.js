import { put, call, take, select } from 'redux-saga/effects';
import ChatActions from '../Redux/ChatRedux';
import { eventChannel, buffers, delay } from 'redux-saga';
import firebase from 'react-native-firebase';
export const selectPartnersId = state => state.homescreen.approvedPeerId;
export const selectchatId = state => state.homescreen.chatId;
export const selectUserId = state => state.login.userId;

/************************** SAVE USER  MESSAGE SAGA ******************************/

export function* saveusermessage({ usermessage, userId }) {
  yield call(delay, 1000);
  const chatId = yield select(selectchatId);

  console.log(`saveusermessage saga / ${usermessage} / ${userId} / ${chatId}`)

  let createdAt = new Date().getTime()
  let chatMessage = {
      text: usermessage,
      createdAt: createdAt,
      userId: userId 
  }
    const firebaseSaveUserMessage = () => 
      firebase
        .database()
        .ref(`/messages/${chatId}`)
        .push()  
        .set(chatMessage)
        .then(response => ({ response }))
        .catch(error => ({ error }));
    try {
    const { response, error } = yield call(firebaseSaveUserMessage);
    console.log(response)
    if(!error){ 
      yield put(ChatActions.saveMessageSuccess());
    }
  } catch(error){
    console.log(error)
    yield put(ChatActions.saveMessageFailure());
  }  
}

/************************** FETCH USER MESSAGE SAGA ******************************/



//fruitRef.orderByKey().startAt(“5”).limitToFirst(3): returns keys 5, 6, 7

export function* fetchusermessages() {
  console.log('fetchusermessages')
  const userId = yield select(selectUserId);

  const chatId = yield select(selectchatId);
  const ref = firebase.database().ref(`/messages/${chatId}/`);

  console.log(chatId)

  function createChannel(chatId) {
    const ref = firebase.database().ref(`/messages/${chatId}/`);
    const channel = eventChannel(emit => {
      ref.limitToLast(100).on('value', snapshot => {
        let messages = [];
        snapshot.forEach(function(el) {
          messages.push(el.val());
      });
      console.log(messages)
        snapshot.val() ? emit(messages) : emit({ false: 'false' });
      });
      return () => ref.off();
    }, buffers.expanding());
    return channel;
  }

  const channel = createChannel(chatId);
  while (true) {
    const item = yield take(channel);
    console.log(item) 
    
    if (Object.keys(item)[0] === 'false') {
      console.log('empty chat');
      let messages = [];

      let createdAt = new Date().getTime()
      let newMessage = {
        text: "Hi there! How are you doing? I am Peerler",
        createdAt: createdAt,
        userId: userId 
    }
     messages.push(newMessage);
     console.log(messages) 

      yield put(ChatActions.fetchUserMessagesSuccess(messages));
      yield call(delay, 1000);
      let createdAt2 = new Date().getTime()
      let newMessage2 = {
        text: "Please connect with your peer!",
        createdAt: createdAt2,
        userId: userId 
    }
     messages.push(newMessage2);
      let messages2 = messages.reverse()
      yield put(ChatActions.fetchUserMessagesSuccess(messages2));

    } else {
      console.log(Object.values(item)) 
      console.log(Object.values(item)[0]) 
      console.log(Object.values(item)[1])
      const data = item;

      if(data) {
        console.log(data)
        console.log(Object.keys(data)) 
        console.log(Object.values(data)) 
        console.log(Object.entries(data))
        const usermesssagedata = Object.keys(data).map(key => data[key]);
        console.log(usermesssagedata) 
        const newData = usermesssagedata.reverse()
        console.log(newData) 
        yield put(ChatActions.fetchUserMessagesSuccess(newData));
      } else {
        yield put(ChatActions.fetchUserMessagesFailure());
      }
    }  
  }  
} 