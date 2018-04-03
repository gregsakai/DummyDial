import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from "react-navigation";

export default class Menu extends React.Component {

  static navigationOptions = {
    header: null
  };

	constructor(props){
		super(props);

    this.state = {
      recipient:null
    }
	}

  componentDidMount = () => {

    // TODO: Export the value to other components OR reference it via this.props.recipient
    // Menu component retreieves phone number from AsyncStorage
		AsyncStorage.getItem("storeTheNum").then((value)=>{
      console.log("Stored number -", value);
      if (value !== null){
        console.log(value);
        this.setState({
          recipient:value
        });
      }
    }).catch((err)=>{
      console.log(err);
    });
	}

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        // After storing the phone number with AsyncStorage in Welcome.js, it will be retreived from AsyncStorage
        <Text>This is your phone number: {this.state.recipient}</Text>

        <Text>THIS IS THE MENU PAGE</Text>

        <Button onPress={()=>navigate("CallPage")} title="CALL PAGE" />
		<Text></Text>
        <Button onPress={()=>navigate("TextPage")} title="TEXT PAGE" />

      </View>
    );
  }
}
