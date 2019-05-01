import React from 'react';
import { Text, TextInput, View, StyleSheet, Image, AppRegistry,
	  Animated,
	  TouchableWithoutFeedback, Linking } from 'react-native';
import { Button, Container, Content } from 'native-base'
import * as firebase from 'firebase';


var ACTION_TIMER = 2000;
var COLORS = ['rgb(255,255,255)', 'rgb(111,235,62)'];
const url = `tel:${3049891098}`;

export default class Alert extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
				pressAction: new Animated.Value(0),
				textComplete: '',
				buttonWidth: 0,
		        buttonHeight: 0,
		        timer : 15,
		        check: 0,
		}
		
		this.interval = setInterval(() => {
			if(this.state.check == 0){
				if (this.state.timer == 0) {
					Linking.canOpenURL(url)
					.then((supported) => {
						if (supported) {
							return Linking.openURL(url)
								.catch(() => null);
						}
					});
					
					check = 1;
					
					this.props.navigation.navigate('Main', { name : 'John Doe' , caretaker: this.state.caretaker} ); 
				}
					
			      this.setState(previousState => (
			        { timer: previousState.timer - 1 }
			      ))
			      
			}      
		}, 1000);
	}
	
	componentWillMount = () =>{
	    this._value = 0;
	    this.state.pressAction.addListener((v) => this._value = v.value);
	}
	
	componentWillUnmount = () =>{
		clearInterval(this.interval)
	}
	
	static navigationOptions = {
		title: 'Alert',
		headerLeft:null,
	};
	
	getProgressStyles = () => {
	    var width = this.state.pressAction.interpolate({
	        inputRange: [0, 1],
	        outputRange: [0, this.state.buttonWidth]
	    });
	    var bgColor = this.state.pressAction.interpolate({
	        inputRange: [0, 1],
	        outputRange: COLORS
	    })
	    return {
	        width: width,
	        height: this.state.buttonHeight,
	        backgroundColor: bgColor
	    }
	  }
	
	getButtonWidthLayout = (e) => {
	    this.setState({
	        buttonWidth: e.nativeEvent.layout.width - 6,
	        buttonHeight: e.nativeEvent.layout.height - 6
	    });
	  }
	
	handlePressIn = () => {
		 this.state.check = 1
	    Animated.timing(this.state.pressAction, {
	        duration: ACTION_TIMER,
	        toValue: 1
	    }).start(this.animationActionComplete);
	}
	
	handlePressOut = () => {
		   this.state.check = 0
	    Animated.timing(this.state.pressAction, {
	        duration: this._value * ACTION_TIMER,
	        toValue: 0
	    }).start();
	}
	
	animationActionComplete = () => {
	    var message = '';
	    if (this._value === 1) {
	        message = 'You held it long enough to fire the action!';
	        check = 1;
		
				this.props.navigation.navigate('Main', { name : 'John Doe' , caretaker: this.state.caretaker} ); 
			
		
	    }
	    this.setState({
	        textComplete: message
	    });
	}

	render() {
	    return (
	       <View style={styles.container}>
	       <View>
           <Text style = {styles.text3}>ALERT!</Text>
           </View>
           <Text style = {styles.text3}>FALL DETECTED!</Text>
           <View>
           <Text style = {styles.text2}>Countdown to EMS:</Text>
           </View>
           <View>
           <Text></Text>
           </View>
           <View>
           <Text style = {styles.text4}>{this.state.timer}</Text>
           </View>
           <View>
           <Text></Text>
           </View>
	            <TouchableWithoutFeedback
	            	onPressIn={this.handlePressIn} 
                	onPressOut={this.handlePressOut}
	            >
	                <View style={styles.button} onLayout={this.getButtonWidthLayout} >
	                    <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
	                    <Text></Text>
	                    <Text style={styles.text}> HOLD ME</Text>
	                    <Text style={styles.text}>FOR OKAY!</Text>
	                </View>
	            </TouchableWithoutFeedback>
	       </View>
	    );
	  }
}
	

	var styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    flexDirection: 'column',
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
	  text3: {
			 color: 'black',
			    fontWeight: 'bold',
			    fontSize: 30,
		},
		text2: {
			 color: 'black',
			    fontWeight: 'bold',
			    fontSize: 25,
		},
		text4: {
			 color: 'black',
			    fontWeight: 'bold',
			    fontSize: 50,
		},
	  button: {
	    padding: 20,
	    borderWidth: 5,
	    height: 200,
	    color: 'red',
	    borderColor: '#111'
	  },
	  text: {
	    backgroundColor: 'transparent',
	    color: 'red',
	    	fontWeight: 'bold',
	    	fontSize: 40
	  },
	  bgFill: {
	    position: 'absolute',
	    top: 0,
	    left: 0
	  }
	});
