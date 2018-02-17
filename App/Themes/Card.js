import React from 'react'
import { View } from 'react-native'


const Card = (props) => {
	return (
		<View style={styles.containerStyle}>{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#D5DEE5',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 4,
		marginRight: 4,
		marginTop: 2,
		marginBottom: 2,
		backgroundColor: '#fff',
	}
}

export default Card
