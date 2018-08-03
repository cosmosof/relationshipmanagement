import { put, call, take, select } from 'redux-saga/effects';
import ToDoActions from '../Redux/ToDoRedux';
import { eventChannel, buffers, delay } from 'redux-saga';
import firebase from 'react-native-firebase';

export const selectchatId = state => state.homescreen.chatId;
export const selectUserId = state => state.login.userId; 

/*
  SAVE USER  TODO  
*/
export function* saveusertodos({ usermessage, userId, isPriority }) {
  yield call(delay, 1000);
  const chatId = yield select(selectchatId);
  if(chatId){
    let createdAt = new Date().getTime()
    let todoObj = {
        isPriority,
        todo: usermessage,
        createdAt: createdAt,
        userId: userId,
        isCompleted: false 
    }
      const firebaseSaveUserMessage = () => 
        firebase
          .database()
          .ref(`/todos/${chatId}`)
          .push()  
          .set(todoObj)
          .then(response => ({ response }))
          .catch(error => ({ error }));
      try {
      const { response, error } = yield call(firebaseSaveUserMessage);
      if(!error){ 
        yield put(ToDoActions.saveTodoSuccess());
      }
    } catch(error){
      yield put(ToDoActions.saveTodoFailure());
    }  
  } else {
    yield put(ToDoActions.saveTodoFailure());
  }  
}

/*
  FETCH USER TODO
*/

//Ref.orderByKey().startAt(“5”).limitToFirst(3): returns keys 5, 6, 7

export function* fetchusertodos() {
  console.log('fetchusertodos')
  const userId = yield select(selectUserId);
  
  yield call(delay, 1000);

  const chatId = yield select(selectchatId);
  const ref = firebase.database().ref(`/todos/${chatId}/`);

  console.log(userId)
  console.log(chatId)

  function createChannel(chatId) {
    const ref = firebase.database().ref(`/todos/${chatId}/`);
    const channel = eventChannel(emit => {
      ref.limitToLast(100).on('value', snapshot => {
        let todos = [];
        snapshot.forEach(function(el) {
          let obj = el.val();
          let objPlusKey = {...obj, nodekey: el.key}
          todos.push(objPlusKey);
      });
      console.log(todos)
      console.log(`fetchusertodos/ ${snapshot}`)
        snapshot.val() ? emit(todos) : emit({ false: 'false' });
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
      console.log('empty todos');
      let todos = [];

      let createdAt = new Date().getTime()
      let newMessage = {
        todo: "These are examples",
        createdAt: createdAt,
        userId: userId,
        nodekey: 'example',
        isCompleted: false
    }
     todos.push(newMessage);
     console.log(todos) 

      yield put(ToDoActions.fetchUserTodosSuccess(todos));
      yield call(delay, 1000);
      let createdAt2 = new Date().getTime()
      let newMessage2 = {
        todo: "You need to add a partner to be able to use 'to-do'",
        createdAt: createdAt2,
        userId: userId,
        nodekey: 'example',
        isCompleted: true

    }
     todos.push(newMessage2);
      let todos2 = todos.reverse()
      yield put(ToDoActions.fetchUserTodosSuccess(todos2));

    } else {
      console.log('todos found');
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
        yield put(ToDoActions.fetchUserTodosSuccess(newData));
      } else {
        yield put(ToDoActions.fetchUserTodosFailure());
      }
    }  
  }  
} 

/*
  UPDATE/DELETE USER TODO
*/

export function * updatetodonode({ todonode, nodestatus, index }){
  console.log(`updatetodonode saga: ${todonode} : ${nodestatus}`)
  const userId = yield select(selectUserId);
  const chatId = yield select(selectchatId);
  if(todonode !== 'example'){
    firebase
    .database()
    .ref(`/todos/${chatId}/${todonode}/isCompleted`)
    .set(nodestatus)
  } 
}

export function * deletetodonode({ todonode, index }){
  console.log(`deletetodonode saga: ${todonode}`)
  const chatId = yield select(selectchatId);
  if(todonode !== 'example'){
    firebase
    .database()
    .ref(`/todos/${chatId}`)
    .child(todonode)
    .remove();
  }
}