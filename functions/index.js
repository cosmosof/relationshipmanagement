'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{requested}/{requester}`.
 * Users save their device notification tokens to `/users/{requested}/notificationTokens/{notificationToken}`.
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
        body: `${usernameOremail} wants to connect with you!`
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