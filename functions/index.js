'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


/**
 * 
 * Triggers when a user gets a match  request and sends a notification.
 * 
 */
exports.sendFollowerNotification = functions.database.ref('/matchrequest/{requested}/requester/{requester}').onCreate(event => {
  const requester = event.params.requester;
  const requested = event.params.requested;
  // If un-follow we exit the function.
  if (!event.data.val()) {
    return console.log('User ', requester, 'un-followed user', requested);
  }
  console.log('We have a new match request:', requester, 'for user:', requested);

  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/users/${requested}/notificationTokens`).once('value');

  // Get the follower profile.
  const getRequesterProfilePromise = admin.auth().getUser(requester);

  return Promise.all([getDeviceTokensPromise, getRequesterProfilePromise]).then(results => {
    const tokensSnapshot = results[0];
    const requester = results[1];
    console.log(requester.displayName);
    console.log(requester.email);
    console.log(tokensSnapshot.val());

    // Check if there are any device tokens.
    if (!tokensSnapshot.val()) {
      return console.log('There are no notification tokens to send to.');
    }
    console.log('Fetched requester profile', `${requester.displayName} / ${requester.email}`);
    const usernameOremail = requester.displayName ? requester.displayName : requester.email
    console.log(usernameOremail);

    // Notification details.
    const payload = {
      notification: {
        title: 'You have a new connection request!',
        body: `${usernameOremail} wants to connect with you!`,
        sound: 'default',
        vibrate: 'true'
      }
    };

    // Listing all tokens.
    const tokens = tokensSnapshot.val();
    console.log(tokens);

    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
});

/**
 * 
 * Send notification to user when partner created new ToDos
 * 
 */
exports.sendToDoNotification = functions.database.ref('/todos/{chatId}/{values}').onWrite(event => {
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    return;
  }
  const newtodo = event.params.values;
  const chatId = event.params.chatId;
  console.log('ChatId:' + chatId);
  console.log('newtodo:' + newtodo);

  console.log('newtodo2:' + event.data.val().todo);

  const userId1 = chatId.slice(0, 28)
  const userId2 = chatId.slice(28, 56)
  const userIdCreatedTodo = event.data.val().userId

  console.log(`userIdCreatedTodo : ${userIdCreatedTodo}`);

  if (userId1 === userIdCreatedTodo) {
    let friendId = userId2;
    console.log(`friendId: ${friendId}`);
    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/users/${friendId}/notificationTokens`).once('value');
    // Get the follower profile.
    const getTodoCreatorProfilePromise = admin.auth().getUser(userIdCreatedTodo);

    return Promise.all([getDeviceTokensPromise, getTodoCreatorProfilePromise]).then(results => {
      const tokensSnapshot = results[0];
      const requester = results[1];
      console.log(requester.displayName);
      console.log(requester.email);
      console.log(tokensSnapshot.val());

      // Check if there are any device tokens.
      if (!tokensSnapshot.val()) {
        return console.log('There are no notification tokens to send to.');
      }
      console.log('Fetched requester profile', `${requester.displayName} / ${requester.email}`);
      const usernameOremail = requester.displayName ? requester.displayName : requester.email
      console.log(usernameOremail);

      const todo = event.data.val().todo
      const todoShort = todo.slice(0, 36)
      const messageToDo = `${todoShort}...`
      console.log(`short message : ${messageToDo}`);

      // Notification details.
      const payload = {
        notification: {
          title: `${usernameOremail} created a new list!`,
          body: messageToDo,
          sound: 'default',
          vibrate: 'true'
        }
      };

      // Listing all tokens.
      const tokens = tokensSnapshot.val();
      console.log(tokens);

      // Set the message as high priority and have it expire after 24 hours.
      var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };


      // Send notifications to all tokens.
      return admin.messaging().sendToDevice(tokens, payload, options).then(response => {
        console.log(tokens);

        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.log(error);
            console.error('Failure sending notification to', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    });
  } else {
    let friendId = userId1;
    console.log(`friendId: ${friendId}`);
    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/users/${friendId}/notificationTokens`).once('value');
    // Get the follower profile.
    const getTodoCreatorProfilePromise = admin.auth().getUser(userIdCreatedTodo);

    return Promise.all([getDeviceTokensPromise, getTodoCreatorProfilePromise]).then(results => {
      const tokensSnapshot = results[0];
      const requester = results[1];
      console.log(requester.displayName);
      console.log(requester.email);
      console.log(tokensSnapshot.val());

      // Check if there are any device tokens.
      if (!tokensSnapshot.val()) {
        return console.log('There are no notification tokens to send to.');
      }
      console.log('Fetched requester profile', `${requester.displayName} / ${requester.email}`);
      const usernameOremail = requester.displayName ? requester.displayName : requester.email
      console.log(usernameOremail);

      const todo = event.data.val().todo
      const todoShort = todo.slice(0, 36)
      const messageToDo = `${todoShort}...`
      console.log(`short message : ${messageToDo}`);

      // Notification details.
      const payload = {
        notification: {
          title: `${usernameOremail} created a new list!`,
          body: messageToDo,
          sound: 'default',
          vibrate: 'true'
        }
      };

      // Listing all tokens.
      const tokens = tokensSnapshot.val();
      console.log(tokens);

      // Send notifications to all tokens.
      return admin.messaging().sendToDevice(tokens, payload).then(response => {
        console.log(tokens);

        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {

          const error = result.error;
          console.log(error);

          if (error) {
            console.error('Failure sending notification to', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    });
  }
});

/**
 * 
 * Send notification to user when partner created new message
 * 
 */
exports.sendChatMessageNotification = functions.database.ref('/messages/{chatId}/').onWrite(event => {
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    return;
  }
  const chatId = event.params.chatId;
  console.log('ChatId:' + chatId);
  const chats = event.data
  console.log('chats:' + chats);

  let messages = [];
  chats.forEach(function(el) {
    messages.push(el.val());
  });
  console.log(messages)
  console.log(messages[messages.length-1].createdAt)
  console.log(messages[messages.length-2].createdAt)
  const lastMessageTimestamp = messages[messages.length-1].createdAt
  const previousMessageTimestamp = messages[messages.length-2].createdAt
  const timeDifferences = (lastMessageTimestamp-previousMessageTimestamp)/60000
  console.log(timeDifferences)

  if(timeDifferences>5){
    const userId1 = chatId.slice(0, 28)
    const userId2 = chatId.slice(28, 56)
    const userIdCreatedTodo = messages[messages.length-1].userId
    
    console.log(`userId1: ${userId1}`)
    console.log(`userId2: ${userId2}`)
    console.log(`userIdCreatedTodo : ${userIdCreatedTodo}`);

    if (userId1 === userIdCreatedTodo) {
      let friendId = userId2;
      console.log(`friendId: ${friendId}`);
      // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.database().ref(`/users/${friendId}/notificationTokens`).once('value');
      // Get the follower profile.
      const getTodoCreatorProfilePromise = admin.auth().getUser(userIdCreatedTodo);
  
      return Promise.all([getDeviceTokensPromise, getTodoCreatorProfilePromise]).then(results => {
        const tokensSnapshot = results[0];
        const requester = results[1];
        console.log(requester.displayName);
        console.log(requester.email);
        console.log(tokensSnapshot.val());
  
        // Check if there are any device tokens.
        if (!tokensSnapshot.val()) {
          return console.log('There are no notification tokens to send to.');
        }
        console.log('Fetched requester profile', `${requester.displayName} / ${requester.email}`);
        const usernameOremail = requester.displayName ? requester.displayName : requester.email
        console.log(usernameOremail);
  
  
        // Notification details.
        const payload = {
          notification: {
            title: `${usernameOremail} sent you a new message`,
            body: 'Please touch to open your app!',
            sound: 'default',
            vibrate: 'true'
          }
        };
  
        // Listing all tokens.
        const tokens = tokensSnapshot.val();
        console.log(tokens);
  
        // Set the message as high priority and have it expire after 24 hours.
        var options = {
          priority: "high",
          timeToLive: 60
        };
  
  
        // Send notifications to all tokens.
        return admin.messaging().sendToDevice(tokens, payload, options).then(response => {
          console.log(tokens);

          // For each message check if there was an error.
          const tokensToRemove = [];
          response.results.forEach((result, index) => {
            const error = result.error;
            console.log(error);

            if (error) {
              console.error('Failure sending notification to', tokens[index], error);
              // Cleanup the tokens who are not registered anymore.
              if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
                tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
              }
            }
          });
          return Promise.all(tokensToRemove);
        });
      });
    } else {
      let friendId = userId1;
      console.log(`friendId: ${friendId}`);
      // Get the list of device notification tokens.
      const getDeviceTokensPromise = admin.database().ref(`/users/${friendId}/notificationTokens`).once('value');
      // Get the follower profile.
      const getTodoCreatorProfilePromise = admin.auth().getUser(userIdCreatedTodo);
  
      return Promise.all([getDeviceTokensPromise, getTodoCreatorProfilePromise]).then(results => {
        const tokensSnapshot = results[0];
        const requester = results[1];
        console.log(requester.displayName);
        console.log(requester.email);
        console.log(tokensSnapshot.val());
  
        // Check if there are any device tokens.
        if (!tokensSnapshot.val()) {
          return console.log('There are no notification tokens to send to.');
        }
        console.log('Fetched requester profile', `${requester.displayName} / ${requester.email}`);
        const usernameOremail = requester.displayName ? requester.displayName : requester.email
        console.log(usernameOremail);
        
        // Notification details.
        const payload = {
          notification: {
            title: `${usernameOremail} sent you a new message`,
            body: 'Please touch to open your app!',
            sound: 'default',
            vibrate: 'true'
          }
        };

        // Set the message as high priority and have it expire after 24 hours.
        var options = {
          priority: "high",
          timeToLive: 60
        };
  
        // Listing all tokens.
        const tokens = tokensSnapshot.val();
        console.log(tokens);
  
        // Send notifications to all tokens.
        return admin.messaging().sendToDevice(tokens, payload).then(response => {
          console.log(tokens);

          // For each message check if there was an error.
          const tokensToRemove = [];
          response.results.forEach((result, index) => {
            const error = result.error;
            console.log(error);

            if (error) {
              console.error('Failure sending notification to', tokens[index], error);
              // Cleanup the tokens who are not registered anymore.
              if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
                tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
              }
            }
          });
          return Promise.all(tokensToRemove);
        });
      });
    }
  } else {
    return
  }

});


