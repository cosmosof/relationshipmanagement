import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './Styles/PhoneIllustrationStyles';
import RoundedButton from '../Components/RoundedButton';
import { Colors, Images } from '../Themes';

export default class PhoneIllustration extends React.Component {
  render() {
    return (
      <View>
        <View style={this.props.contentStyle}>
          <Image
            source={this.props.imageSource}
            style={{ width: 670 / 2.5, height: 450 / 2.5, alignSelf: 'center' }}
          />
          <Text style={styles.sectionTitle}>{this.props.title}</Text>
          <Text style={styles.sectionText}>{this.props.text}</Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <View style={styles.row}>
            <View style={[styles.circle, this.props.circle1]} />
            <View style={[styles.circle, this.props.circle2]} />
            <View style={[styles.circle, this.props.circle3]} />
          </View>
          <RoundedButton
            styles={{
              borderRadius: 50,
              padding: 2,
              backgroundColor: Colors.lightMatPurple
            }}
            title={this.props.buttonTitle}
            onPress={this.props.onPress}
          />
          {this.props.navigationHandle ? (
            <TouchableOpacity
              onPress={this.props.navigationHandle}
              style={{ width: 50, alignSelf: 'center', marginTop: 20 }}
            >
              <Text style={styles.sectionText}>Skip</Text>
            </TouchableOpacity>
          ) : null}
          {this.props.children}
        </View>
      </View>
    );
  }
}
