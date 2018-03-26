import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import Card from '../Themes/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from './../Themes';
import styles from './Styles/HomeScreenRequestStyles';
import { Images } from '../Themes';
import * as Animatable from 'react-native-animatable';
import RoundedButton from '../Components/RoundedButton';

export default class HomeScreenRequest extends React.Component {
  static propTypes = {
    requestername: PropTypes.string,
    handleAcceptInvitation: PropTypes.func,
    handleDeclineInvitation: PropTypes.func
  };

  render() {
    return (
      <Card>
        <View style={[styles.container]}>
        <View style={styles.content}>

          <Animatable.View
            animation='flash'
            easing='ease-in-out'
            iterationCount={20}
          >
            <Image source={Images.comments} style={[styles.image]} />
          </Animatable.View>
          <Text style={[styles.username]}>{this.props.requestername}</Text>
          <Text style={[styles.subTitle]}>wants to connect with you</Text>
          <View style={[styles.centerRow]}>
            <View>
              <Icon
                name='ios-checkmark'
                size={32}
                padding={2}
                style={{ alignSelf: 'center', marginRight: 5 }}
                color={Colors.lightMatPurple}
              />
            </View>
            <View>
              <Text style={[styles.text]}>
                you will get to see partner's questions-answers
              </Text>
            </View>
          </View>
          <View style={[styles.centerRow]}>
            <View>
              <Icon
                name='ios-checkmark'
                size={32}
                padding={2}
                style={{ alignSelf: 'center', marginRight: 5 }}
                color={Colors.lightMatPurple}
              />
            </View>
            <View>
              <Text style={[styles.text]}>
                You can create ToDos and send messages
              </Text>
            </View>
          </View>
          <View style={[styles.buttonRow]}>
            <RoundedButton
              styles={{
                width: 120,
                backgroundColor: Colors.lightMatPurple,
                marginRight: -10
              }}
              title={'Accept'}
              onPress={this.props.handleAcceptInvitation}
              buttonTextStyles={{ fontWeight: 'normal' }}
            />
            <RoundedButton
              styles={{ width: 120, backgroundColor: Colors.lightMatPurple }}
              title={'Decline'}
              onPress={this.props.handleDeclineInvitation}
              buttonTextStyles={{ fontWeight: 'normal' }}
            />
          </View>
          </View>

        </View>
      </Card>
    );
  }
}
