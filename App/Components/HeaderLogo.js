import React from 'react';
import { View, Image } from 'react-native';
import { Images } from '../Themes';

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <View style={{ width: 79, height: 22 }}>
        <Image source={Images.logo} style={{ width: 147/2.4, height: 43/2.4}} />
      </View>
    );
  }
}
