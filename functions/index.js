'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendFollowerNotification = functions.database.ref('/matchrequest/{followedUid}/{followerUid}').onWrite(event => {
  const followerUid = event.params.followerUid;
  const followedUid = event.params.followedUid;
  // If un-follow we exit the function.
  if (!event.data.val()) {
    return console.log('User ', followerUid, 'un-followed user', followedUid);
  }
  console.log('We have a new follower UID:', followerUid, 'for user:', followedUid);

  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/users/${followedUid}/notificationTokens`).once('value');

  // Get the follower profile.
  const getFollowerProfilePromise = admin.auth().getUser(followerUid);

  return Promise.all([getDeviceTokensPromise, getFollowerProfilePromise]).then(results => {
    const tokensSnapshot = results[0];
    const follower = results[1];
    console.log(follower.email);
    console.log(tokensSnapshot.val());

    // Check if there are any device tokens.
    if (!tokensSnapshot.val()) {
      return console.log('There are no notification tokens to send to.');
    }
    console.log('Fetched follower profile', follower.email);

    // Notification details.
    const payload = {
      notification: {
        title: 'You have a new follower!',
        body: `${follower.email} is now following you.`
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