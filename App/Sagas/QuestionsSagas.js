import { put, call, take, select } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import QuestionsActions from '../Redux/questionsRedux';
import firebase from 'react-native-firebase';


export const selectPartnersId = state => state.homescreen.approvedPeerId;

//*********************************** Save users's answers ********************************************//

export function* saveuseranswer({ question1, question2, question3, userId }) {
  console.log(`saving answer saga: ${question1} / ${question2} / ${question3} / ${userId}`);

  const firebaseSaveAnswers = () =>
    firebase
      .database()
      .ref(`/users/${userId}/answers/`)
      .set({ question1, question2, question3 })
      .then(response => ({ response }))
      .catch(error => ({ error }));

  if (userId) {
    try {
      const { response, error } = yield call(firebaseSaveAnswers);
      console.log(response);
      if (!error) {
        yield put(
          QuestionsActions.saveAnswersSuccess(true)
        );
      } else if(error) {
        console.log(error);
        yield put(QuestionsActions.saveAnswersFailure(`${error.message}`));
      }
    } catch (e) {
      console.log(e);
      yield put(QuestionsActions.saveAnswersFailure(`'${e.message}'`));
    }
  }
}

//*********************************** Fetch users's answers ********************************************//

export function* fetchuseranswers({ userId }) {
  console.log(`fetching ${userId} answers`);

  const firebaseGetUserAnswers = () =>
  firebase
    .database()
    .ref(`/users/${userId}/answers/`)
    .once('value')
    .then(response => ({ response }))
    .catch(error => ({ error }));

  const { response, error } = yield call(firebaseGetUserAnswers);
  console.log(response);
  console.log(response.val());
  if(response.val()) {
    const item = response.val();
    const val1 = item.question1;
    const val2 = item.question2;
    const val3 = item.question3;
    console.log(`Users Answers: ${val1} / ${val2} / ${val3}` );
  
    yield put(QuestionsActions.fetchUsersAnswersSuccess(val1, val2, val3));
  } else {
    // new user might not save answer yet, first time signing
    console.log(error)
  } 
}

//*********************************** Fetch partner's answers ********************************************//

export function* fetchpartnersanswers() {
  const partnerId = yield select(selectPartnersId);

  console.log(`fetching partner : ${partnerId} answers`);

  function createChannel(partnerId) {
    const ref = firebase.database().ref(`/users/${partnerId}/answers/`);
    const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        snapshot.val() ? emit(snapshot.val()) : emit({ false: 'false' });
      });
      return () => ref.off();
    }, buffers.expanding());
    return channel;
  }
  console.log('CONNECTION_SUCCEED');

  const channel = createChannel(partnerId);
 
  while (true) {
    const item = yield take(channel);
    if (Object.keys(item)[0] === 'false') {
      console.log('empty answers');
      yield put(QuestionsActions.fetchPartnersAnswersFailure(false));

    } else {
      console.log(item);
      const answers = item;
      console.log(`${answers.question1} / ${answers.question2} / ${answers.question3}`);
      yield put(QuestionsActions.fetchPartnersAnswersSuccess(answers, true));
    }
  } 
}
