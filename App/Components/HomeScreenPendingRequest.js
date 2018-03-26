import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Card from '../Themes/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from './../Themes';
import styles from './Styles/HomeScreenPendingRequestStyles';
import { Images } from '../Themes';

export default class HomeScreenPendingRequest extends React.Component {
  static propTypes = {
    requestername: PropTypes.string,
    handleAcceptInvitation: PropTypes.func,
    handleDeclineInvitation: PropTypes.func
  };

  render() {
    return (
      <Card>
        <View style={[styles.container]}>
          <Image source={Images.clock} style={[styles.image]} />
          <Text style={[styles.subTitle]}>waiting for</Text>
          <Text style={[styles.title]}>
            {this.props.friendname
              ? this.props.friendname
              : this.props.approvedUsername}'s approval
          </Text>
          <TouchableOpacity onPress={this.props.handleDeclineInvitation}>
            <Text style={[styles.deleteText]}>Cancel this request</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}
