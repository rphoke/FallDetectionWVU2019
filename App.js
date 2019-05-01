import React from 'react';
import ApiKeys from './components/Auth/ApiKeys.js';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input,
		 Item, Button, Label } from 'native-base';
		 
import { AppLoading, Asset, Font } from 'expo';
import { Provider, connect } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from './components/Screens/Login';
import SignUpScreen from './components/Screens/SignUp';
import MainScreen from './components/Screens/Main';
import AlertScreen from './components/Screens/Alert';
import { store } from './reducers/index';


class Home extends React.Component {
	static navigationOptions = {
		title: 'LineLife',
	};

	render() {
		return (
			<Container style={styles.container}>
			<View>
	           <Text style = {styles.text}>LineLife</Text>
	           </View>
	           <View>
	           <Text style = {styles.text2}>Fall Detection</Text>
	           </View>
				<Button style={{marginTop: 10}}
					full
					rounded
					success
					onPress={() => this.props.navigation.navigate('Login')}
				> 
				<Text style={{color:'white'}}>Login</Text>
				</Button>
				<Button style={{marginTop: 10}}
					full
					rounded
					success
					onPress={() => this.props.navigation.navigate('SignUp')}
				> 
					<Text style={{color:'white'}}>Sign Up</Text>
				</Button>
				<View>
		           <Text></Text>
		           </View>
		           <View>
		           <Text></Text>
		           </View>
		           <View>
		           <Text></Text>
		           </View>
		           <View>
		           <Text></Text>
		           </View>

		           <View>
		           <Text></Text>
		           </View>

			</Container>
		);
	}
}

// Connect the screens to Redux
let HomeContainer = connect(state => ({ count: state.count }))(Home);

// Create our stack navigator
const RootStack = createStackNavigator({
	Home: {screen: HomeContainer },
	Login: {screen: LoginScreen },
	SignUp: {screen: SignUpScreen },
	Main: {screen: MainScreen },
	Alert: {screen: AlertScreen},
});

// And the app container
const Navigation = createAppContainer(RootStack);

// Render the app container component with the provider around it
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoadingComplete: false,
		  isAuthenticationReady: false,
		  isAuthenticated: false,
		};

		// Initialize firebase...
		if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.firebaseConfig); }
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
	}

	onAuthStateChanged = (user) => {
		this.setState({isAuthenticationReady: true});
		this.setState({isAuthenticated: !!user});
	}
	render() {
		return (
		  <Provider store={store}>
			<Navigation />
		  </Provider>
		);
	}

}

const styles = StyleSheet.create({
	text: {
		 color: 'black',
		    fontWeight: 'bold',
		    fontSize: 45,
	},
	text2: {
		 color: 'black',
		    fontWeight: 'bold',
		    fontSize: 30,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
