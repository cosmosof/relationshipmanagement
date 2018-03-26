import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Card from '../Themes/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from './../Themes';
import styles from './Styles/HomeScreenMatchedStyles';
import { Images } from '../Themes';

export default class HomeScreenMatched extends React.Component {
  static propTypes = {
    approvedPeerName: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    return (
      <Card>
        <View style={[styles.container]}>
          <Image source={Images.comments} style={[styles.image]} />
          <Text style={[styles.username]}>{this.props.approvedPeerName}</Text>
          <Text style={[styles.subTitle]}>connected with you</Text>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={[styles.deleteText]}>Delete this connection</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}
