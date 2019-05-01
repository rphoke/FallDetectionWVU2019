import React from 'react';
import { Text, TextInput, View, StyleSheet, Image, Alert } from 'react-native';
import { Button, Container, Content } from 'native-base'
import * as firebase from 'firebase';
import { connect } from 'react-redux';

export default class SignUp extends React.Component {	
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			phoneNumber: '',
			careTaker:'',
		};
	}
	
	static navigationOptions = {
		title: `SignUp`,
	};
	
	onSignupPress = async() => {
		
		if (this.state.password !== this.state.passwordConfirm) {
			Alert.alert("Passwords do not match");
            return;
        }
		var flag = true;
        await firebase.database().ref().child('users').orderByChild("displayName").equalTo(this.state.careTaker).once('value', snapshot => {
			if (!snapshot.exists()) {
				Alert.alert("Enter A Valid and Recognized Caretaker");
				flag = false;
			}
		});
		if (flag){
			await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((res) => { 
					var uid = firebase.auth().currentUser.uid;
					firebase.database().ref().child('users/' + uid).set({
						displayName: this.state.name,
						email: this.state.email,
						Password: this.state.password,
						PhoneNumber: this.state.phoneNumber,
						careTaker: this.state.careTaker,
						numberOfFalls: 0,
					})
				}, (error) => { Alert.alert(error.message); });
		} else {
			return;
		}
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { this.props.navigation.navigate('Main', { name : this.state.name }); }, (error) => { Alert.alert(error.message); });
    }

	
	render() {
	return (
		<Container style={styles.container}>
		<View>
        <Text style = {styles.text}>Welcome to LineLife!</Text>
        </View>
        <View>
        <Text></Text>
        </View>
        <View>
        <Text style = {styles.text}>Please fill out the following</Text>
        </View>
        <View>
        <Text style = {styles.text}>forms to register.</Text>
        </View>
        <View>
        <Text></Text>
        </View>
        <View>
        <Text></Text>
        </View>

			<TextInput style={styles.input}
				value={this.state.name}
				onChangeText={(text) => { this.setState({name: text}) }}
				placeholder="Name"
				autoCapitalize="none"
				autoCorrect={false}
			/>
			
			<View style={{paddingTop:10}} />
			
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

			<View style={{paddingTop:10}} />

			<TextInput style={styles.input}
				value={this.state.passwordConfirm}
				onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
				placeholder="Password (confirm)"
				secureTextEntry={true}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			
			<View style={{paddingTop:10}} />
			
			<TextInput style={styles.input}
				value={this.state.phoneNumber}
				onChangeText={(text) => { this.setState({phoneNumber: text}) }}
				placeholder="Phone Number"
				autoCapitalize="none"
				autoCorrect={false}
			/>
            
            <View style={{paddingTop:10}} />

			<TextInput style={styles.input}
				value={this.state.careTaker}
				onChangeText={(text) => { this.setState({careTaker: text}) }}
				placeholder="Care Taker Name"
				autoCapitalize="none"
				autoCorrect={false}
			/>
            
			<View style={{paddingTop:10}} />
			
			<Content style={{width:100}}>
				<Button style={{marginTop: 10}}
					full
					rounded 
					success
					onPress={this.onSignupPress} 
				>
					<Text style={{color:'white'}}>Sign Up</Text>
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
		    fontSize: 15,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ecf0f1',
		padding: 50,
	},
	input: {
		width: 200, 
		height: 40, 
		borderWidth: 1, 
		padding: 4,
	}
});
