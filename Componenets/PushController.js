import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

  componentDidMount() {
    PushNotification.configure({
      onRegister: function(token) {
        console.log( 'TOKEN:', token );
      },
      senderID: "YOUR GCM SENDER ID",
      onNotification: function(notification) {
        console.log('NOTIFICATION: ', notification);
      },
      popInitialNotification: true,
    });
  }
  
  render() {
    return null;
  }
}