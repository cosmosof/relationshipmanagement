import { put, call, take, select } from 'redux-saga/effects';
import { eventChannel, buffers, delay } from 'redux-saga';
import QuestionsActions from '../Redux/questionsRedux';
import firebase from 'react-native-firebase';


export const selectPartnersId = state => state.homescreen.approvedPeerId;

//*********************************** Save users's answers ********************************************//

export function* saveuseranswer({ question1, question2, question3, question4, question5, question4Text, question5Text, question6Text, question7Text, question8Text, question9Text, question10Text, userId }) {
  console.log(`saving answer saga: ${question1} / ${question2} / ${question3} / ${userId} / ${question4Text}`);

  const firebaseSaveAnswers = () =>
    firebase
      .database()
      .ref(`/users/${userId}/answers/`)
      .set({ question1, question2, question3, question4, question5, question4Text, question5Text, question6Text, question7Text, question8Text, question9Text, question10Text })
      .then(response => ({ response }))
      .catch(error => ({ error }));

  if (userId) {
    try {
      const { response, error } = yield call(firebaseSaveAnswers);
      console.log(response);
      if (!error) {
        yield call(delay, 1000);
        yield put(
          QuestionsActions.saveAnswersSuccess(true)
        );
        yield call(delay, 2000);
        yield put(
          QuestionsActions.saveAnswersSuccess(false)
        );
      } else if(error) {
        console.log(error);
        yield put(QuestionsActions.saveAnswersFailure('something went wrong, could not be saved!'));
      }
    } catch (e) {
      console.log(e);
      yield put(QuestionsActions.saveAnswersFailure('something went wrong, could not be saved!'));
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
    const val4 = item.question4;
    const val5 = item.question5;
    const val6 = item.question4Text;
    const val7 = item.question5Text;
    const val8 = item.question6Text;
    const val9 = item.question7Text;
    const val10 = item.question8Text;
    const val11 = item.question9Text;
    const val12 = item.question10Text;

    console.log(`Users Answers: ${val1} / ${val2} / ${val3} / ${val4}` );
  
    yield put(QuestionsActions.fetchUsersAnswersSuccess(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12));
  } else {
    // new user might not save answer yet, first time signing
    yield put(QuestionsActions.fetchUsersAnswersFailure(error));
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
