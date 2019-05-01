import React from 'react';
import { Text, TextInput, View, StyleSheet, Image,
											Alert } from 'react-native';
import { Button, Container, Content } from 'native-base'
import * as firebase from 'firebase';
import stil from '../../assets/styles/main.js'
import { connect } from 'react-redux';

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			name: '',
			caretaker: '',
		};
	}
	
	
	static navigationOptions = {
		title: `Login`,
	};
	
	onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( async(user) => { 
				
				await firebase.database().ref(`users/${user.user.uid}/displayName`).once('value', 
					(snapshot) => { this.setState({ name: snapshot.val() }) });
			
				await firebase.database().ref(`users/${user.user.uid}/careTaker`).once('value', 
					(snapshot) => { this.setState({ caretaker: snapshot.val() }) });
					
				this.props.navigation.navigate('Main', { name : this.state.name , caretaker: this.state.caretaker} ); 
			}, (error) => { Alert.alert(error.message); });
    }
    
    render() {
        return (
			<Container style={styles.container}>
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
	        <Text style = {styles.text}>Welcome back!</Text>
	        </View>
	        <View>
	        <Text></Text>
	        </View>
				<TextInput style={styles.input}
					value={this.state.email}
					onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
				/>
				
				<View style={{paddingTop:10}} />
				
				<TextInput style={styles.input}
					value={this.state.password}
					onChangeText={(text) => { this.setState({password: text}) }}
					placeholder="Password"
					secureTextEntry={true}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<Content style={{width:200, height: 500,}}>
					<Button style={{marginTop: 10}}
						full
						rounded 
						success
						onPress={this.onLoginPress} 
					 >
						<Text style={{color:'white'}}>Login</Text>
					</Button>
				</Content>
			</Container>
        );
    }
}


const styles = StyleSheet.create({
	text: {
		 color: 'black',
		    fontWeight: 'bold',
		    fontSize: 20,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ecf0f1',
		padding: 50,
	},
	input: {
		width: 250, 
		height: 60, 
		borderWidth: 1, 
		padding: 4,
	}
});
