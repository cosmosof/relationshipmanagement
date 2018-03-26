import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AlertIOS,
  TextInput,
  Keyboard
} from 'react-native';
import Card from '../Themes/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from './../Themes';
import styles from './Styles/HomeScreenWelcomeStyles';
import { Images } from '../Themes';
import RoundedButton from '../Components/RoundedButton';
import InputArea from '../Components/InputArea';

export default class HomeScreenWelcome extends React.Component {
  static propTypes = {
    marginBottom: PropTypes.number
  };

  render() {
    return (
      <Card>
        <View
          style={[styles.container, { marginBottom: this.props.marginBottom }]}
        >
          <View style={styles.content}>
            <Image source={Images.comments} style={[styles.image]} />
            <View>
              <Text style={styles.title}>WELCOME TO RELATE</Text>
              <Text style={styles.subTitle}>Dedicated to Couples</Text>
            </View>
            <View style={styles.centerRow}>
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
                <Text style={styles.text}>
                  Send invititation to your partner's username.
                </Text>
              </View>
            </View>
            <View style={styles.centerRow}>
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
                <Text style={styles.text}>
                  Once you connected, you can start using all the features.
                </Text>
              </View>
            </View>
            <InputArea
              placeholder="enter partner's username"
              onChangeText={this.props.handleChangeFriendname}
              styles={{
                alignSelf: 'center',
                marginTop: 20
              }}
            />
            <View style={styles.bottomWrapper}>
              <Text style={styles.warningTexInvite}>
                {this.props.peerNameFoundError}
              </Text>
              <RoundedButton
                onPress={this.props.handlePressFindFriend}
                title={'Connect'}
                styles={{
                  backgroundColor: Colors.lightMatPurple,
                  borderColor: Colors.medMatPurple
                }}
                buttonTextStyles={{ fontWeight: 'normal' }}
              />
            </View>
          </View>
        </View>
      </Card>
    );
  }
}
