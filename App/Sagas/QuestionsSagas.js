import { put, call, take } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga';
import QuestionsActions from '../Redux/questionsRedux'
import firebase from 'firebase'

// attempts to write
export function * answer ({ question1, question2, question3, userId }) {
  console.log('answer saga')

  //const userId = firebase.auth().currentUser.uid;

  const firebaseSaveAnswers = ({ question1, question2, question3 }) => 
      firebase.database().ref(`/users/${userId}/answers/`)
        .set({ question1, question2, question3 })
        .then(response => ({ response }))
        .catch(error => ({ error }))
  
  const firebaseUpdateAnswers = ({ question1, question2, question3 }) => { 
    const data = { question1, question2, question3 }
    firebase.database().ref(`users/${userId}/answers/`)
    .set(data)
  }

  function connect() {
    return new Promise(resolve => {
      const database = firebase.database();
      const connectionRef = database.ref('/users/' + userId);
      connectionRef.once('value', resolve);
    });
  }
 
  const snapshot = yield call(connect);

  if (snapshot.val() === null) {
    try {
      const { response, error } = yield call(firebaseSaveAnswers, { question1, question2, question3 })
      if (response) {
        yield put(QuestionsActions.saveAnswersSuccess('true', `${response.key}`))
      } else { 
        yield put(QuestionsActions.saveAnswersFailure(`${error.message}`))
      }
    } catch (e) {
      yield put(QuestionsActions.saveAnswersFailure(`'${e.message}'`))
    }      
  } else {
    if (userId === Object.keys(snapshot.val().answers)[0]) {
      console.log(userId)
      try {
        yield call(firebaseUpdateAnswers, { question1, question2, question3 })
        yield put(QuestionsActions.saveAnswersSuccess('true', `${userId}`))
      } catch (e) {
        yield put(QuestionsActions.saveAnswersFailure(`'${e.message}'`))
      } 
    } else {
      const userId = Object.keys(snapshot.val().answers)[0];
      console.log(userId)
      try {
        yield call(firebaseUpdateAnswers, { question1, question2, question3 })
        yield put(QuestionsActions.saveAnswersSuccess('true', `${userId}`))
      } catch (e) {
        yield put(QuestionsActions.saveAnswersFailure(`'${e.message}'`))
      } 
    }  
  }           
}



// fetchanswers saga's helper function
function createChannel (userId) {
  const ref = firebase.database().ref(`/users/${userId}/answers/`)
  const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        console.log(Object.keys(snapshot.val()))
        snapshot.val() ? emit(snapshot.val()) : 'false'
      });
      return () => ref.off();
    }, buffers.expanding())	
  return channel; 
};

// Fetch answers 
export function * fetchanswers ({ userId }) {
  console.log('fetching answers saga')
  console.log(userId)

  const channel = createChannel(userId);
  while(true) {
    const item = yield take(channel);
    console.log(item)
    if(item === 'false') {
      console.log('requestRevoke')
      //yield put(HomeScreenActions.requestRevoke()) 
    } else {
      console.log('requestexist')
      console.log(item)
      const val1 = item.question1;
      const val2 = item.question2;
      const val3 = item.question3;
      console.log(val1)

      yield put(QuestionsActions.fetchSuccess(val1, val2, val3));
    }
  }   
}