import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Text,
  Linking,
  View,
  Image,
  TouchableHighlight
} from "react-native";
import { Colors, Images } from "../Themes";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import styles from "./Styles/InfoScreenStyle";

class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, goBack } = navigation;
    return {
      headerLeft: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Icon
            name="ios-arrow-back"
            size={20}
            padding={20}
            style={{ padding: 20, color: Colors.medMatBlue2 }}
            onPress={() => goBack()}
          />
        </TouchableWithoutFeedback>
      )
    };
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center"
        }}
      >
        <View style={styles.container}>
       
          <Text style={styles.sectionTitle}>
            This is a Beta release, we look forward to hearing
            your suggestions and opinions. Please drops us an email below!
          </Text>
          <TouchableHighlight
            onPress={() =>
              Linking.openURL(
                "mailto:support@foodonchart.com?subject=Feedback&body=body"
              )
            }
          >
            <Image source={Images.note} style={[styles.image]} />
          </TouchableHighlight>
          <Text style={styles.sectionTitle}>
            Thanks for taking time and trying out 'Relate' app!
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);
