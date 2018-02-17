import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  parapraph: {
    fontSize: 14,
    color: Colors.coal,
    paddingBottom: 15,
    lineHeight: 24
  },
  title: {
    fontSize: 18,
    color: Colors.coal,
    paddingBottom: 5,
    lineHeight: 28
  },
  lineBreak: {
    borderWidth: 0.5,
    borderColor: Colors.steel,
    marginBottom: 10
  },
  loginButtonWrapper: {
    flex: 1,
    minWidth: 160
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightSalmonPink,
    backgroundColor: Colors.pastelRed,
    padding: 6,
    justifyContent: 'center'
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  buttonStyle: {
    backgroundColor: Colors.grayBlue,
    borderColor: Colors.grayBlue,
    borderRadius: 2,
    marginTop: 10
  }
})
