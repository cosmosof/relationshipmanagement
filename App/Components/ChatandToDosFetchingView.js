import React from 'react';
import { View } from 'react-native';
import styles from './Styles/ChatandToDosFetchingViewStyles';
import { Colors } from './../Themes';

export default class ChatandToDosFetchingView extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-end', marginRight: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-start', marginLeft: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-end', marginRight: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-start', marginLeft: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-end', marginRight: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-start', marginLeft: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-end', marginRight: 5 }]}/>
        <View style={[styles.lightGrayBox, { alignSelf: 'flex-start', marginLeft: 5 }]}/>
      </View>
    
    );
  }
}
