import React from 'react';
import { Text, TextInput, View, StyleSheet, Image} from 'react-native';
import { Button, Container, Content } from 'native-base'
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { setPersonType } from '../../reducers/index'
import { setCountdown } from '../../reducers/index'

const mapStateToProps = (state) => {
	return {
		countdown: state.countdown,
		personType: state.personType,
	};
}

const mapDispatchToProps = (dispatch) => {
	return { 
		setCountdown: (text) => { dispatch(setCountdown(text))},
		setPersonType: (text) => { dispatch(setPersonType(text))},
	};
}

class Main extends React.Component {
	constructor(props) {
	    super(props);
	    
	    this.state = {
	    	numFalls: "0",
	    }

	}
	
	componentDidMount = () => {
	    var count = 0
	    
		const user = firebase.auth().currentUser.uid
		firebase.database().ref(`users/${user}/numberOfFalls`).on('value', (snapshot) => { 
		
			this.setState({ numFalls: snapshot.val() }) 
			if (count > 0){
				this.props.navigation.navigate('Alert')
			}
			count++
			});
	}
	
	
	static navigationOptions = ({navigation, navigationOptions }) => {
		const { navigate } = navigation;
		return {
			title: navigation.getParam('name', 'Error') ,
			headerLeft: null,
			headerRight: (
				<Content style={{right: 10}}>
					<Button style={{padding:5}}
						transparent
						onPress={ () => {
								firebase.auth().signOut().then(() => { 
									navigate('Home'); },
									(error) => { Alert.alert(error.message); 
								});
							}
						}
					>
						<Text style={{color:'green'}}>Log Out</Text>
					</Button>
				</Content>
			),
		}
	}
		
	render() {
		return (
			<View style={styles.container}>
				<Text style = {styles.text}>Status: Connected</Text>
					<Text style = {styles.text}>Number of Falls: {this.state.numFalls}</Text>
				<View style={styles.footer}>
					<Button bordered light style={styles.bluetooth}>
						<Text style={{color:'#62B1F6'}}>Config BT</Text>
					</Button>
				</View>
			</View>
			);
		}
}

const styles = StyleSheet.create({
	text: {
		 color: 'black',
		    fontWeight: 'bold',
		    fontSize: 25,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	footer: {
		position: 'absolute',
		left:0,
		right:0,
		bottom:0,
		padding: 10,
	},
	bluetooth: {
		padding: 5,
		borderStyle: 'solid',
		borderColor: '#62B1F6',
		borderRadius: 5,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
