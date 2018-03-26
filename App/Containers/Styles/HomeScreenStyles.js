import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
    minWidth: 320,
    borderWidth: 1,
		borderRadius: 2,
		borderColor: Colors.steel,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2
  },
  row: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  titleRow: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  formLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: Metrics.doubleBaseMargin
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.charcoal
  },
  rowLabel: {
    color: Colors.charcoal
  },
  boxShadow: {
    borderColor: Colors.lightMatBlue,
    shadowColor: Colors.medMatBlue,
		shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
		shadowRadius: 3,
    elevation: 1
  }
})
