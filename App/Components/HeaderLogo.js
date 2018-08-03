import React from 'react';
import { View, Image } from 'react-native';
import { Images } from '../Themes';

export default class HeaderLogo extends React.Component {
  render() {
    return (
      <View>
        <Image source={Images.logo} style={{ width: 147 / 3.4, height: 43 / 3.4, marginBottom: 3 }} />
      </View>
    );
  }
}
