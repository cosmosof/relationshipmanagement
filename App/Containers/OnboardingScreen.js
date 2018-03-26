import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Colors, Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import styles from './Styles/OnboardingScreenStyles';
import { NavigationActions } from 'react-navigation';
import OnboardingActions from '../Redux/OnboardingRedux';
import PhoneIllustration from '../Components/PhoneIllustration';
import RoundedButton from '../Components/RoundedButton';

class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      illustration1: true,
      illustration2: false,
      illustration3: false,
      circleColor1: { backgroundColor: Colors.medMatPurple },
      marginBottom:
        Metrics.screenHeight < 800
          ? Metrics.screenHeight / 9
          : Metrics.screenHeight / 3
    };
  }
  handleonPress1 = () => {
    this.setState({
      illustration1: false,
      illustration2: true,
      illustration3: false,
      circleColor1: { backgroundColor: Colors.lighterMatPurple },
      circleColor2: { backgroundColor: Colors.medMatPurple }
    });
  };
  handleonPress2 = () => {
    this.setState({
      illustration1: false,
      illustration2: false,
      illustration3: true,
      circleColor2: { backgroundColor: Colors.lighterMatPurple },
      circleColor3: { backgroundColor: Colors.medMatPurple }
    });
  };
  handleonPress3 = () => {
    this.setState({});
    this.props.navigatetoSignin();
  };
  navigationHandle = () => {
    this.props.navigatetoSignin();
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.illustration1 ? (
          <PhoneIllustration
            onPress={this.handleonPress1}
            buttonTitle={'NEXT'}
            navigationHandle={this.navigationHandle}
            imageSource={Images.illustration1}
            contentStyle={{ marginBottom: this.state.marginBottom }}
            circle1={this.state.circleColor1}
            title={'JUST YOU AND YOUR PARTNER'}
            text={
              'This app is all about you and your partner. Find and connect with your partner first!'
            }
          />
        ) : this.state.illustration2 ? (
          <PhoneIllustration
            onPress={this.handleonPress2}
            buttonTitle={'NEXT'}
            navigationHandle={this.navigationHandle}
            imageSource={Images.illustration2}
            contentStyle={{ marginBottom: this.state.marginBottom }}
            circle2={this.state.circleColor2}
            title={'WE GOT BUNCH OF STAFF FOR YOU'}
            text={'Now it is time to focus yourself and your partner!'}
          />
        ) : (
          <PhoneIllustration
            onPress={this.handleonPress3}
            buttonTitle={'GET STARTED'}
            imageSource={Images.illustration3}
            contentStyle={{ marginBottom: this.state.marginBottom }}
            circle3={this.state.circleColor3}
            title={'ENJOY IT!'}
            text={'Hope this app help you get the better!'}
          >
            <Text style={styles.sectionTextLast}>
              Congratulation! You are ready to start!
            </Text>
          </PhoneIllustration>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    navigatetoSignin: () => dispatch(OnboardingActions.onboardingtoSignin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
