import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    AsyncStorage,
    TouchableOpacity,
    Image,
    Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import FadeView from "react-native-fade-view";
import Styles from "./scss/Styles.scss";

export default class TextBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipient: this.props.navigation.state.params.recipient,
            myMsg: "",
            defaultMsg: "Emergency, come now!",
            behavior: "position",
            active: true
        };
    }

    componentDidMount = () => {
        // Retrieves the stored message
        AsyncStorage.getItem("storeTheMsg")
            .then(value => {
                if (value !== null) {
                    // Logs out the current message if there is one
                    console.log("Current stored text body:", value);
                    this.setState({
                        myMsg: value
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    flashCheckMark = () => {
        this.setState({
            active: false
        });
        this.fadeCheckMark = setTimeout(() => {
            this.setState({
                active: true
            });
        }, 1000);
    };
	
    saveText = () => {
        Keyboard.dismiss();
        // saving text message to AsyncStorage
        if (this.state.myMsg.length > 0) {
            AsyncStorage.setItem("storeTheMsg", this.state.myMsg).catch(err => {
                console.log(err);
            });
        }
    };

    sendText = () => {
        Keyboard.dismiss();
        // If there is a message, save it, otherwise, send the default.
        // This only applies if the input is edited.
        // Otherwise, the previously saved message will be sent
        if (this.state.myMsg.length > 0) {
            // Included in both saveText() and sendText() so that either can be clicked, and the message body will save
            this.saveText();
            fetch(
                "https://quiet-fortress-33478.herokuapp.com/" +
                    this.state.recipient +
                    "/" +
                    this.state.myMsg
            );
        } else {
            fetch(
                "https://quiet-fortress-33478.herokuapp.com/" +
                    this.state.recipient +
                    "/" +
                    this.state.defaultMsg
            );
        }
    };

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this._keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide() {
        Keyboard.dismiss();
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={Styles.all}>
                <View style={Styles.tBan}>
                    <Text>{"\n"}</Text>
                    <Text style={Styles.tBanTitle}>Text Body</Text>
                </View>

                <View behavior={this.state.behavior}>
                    <View>
                        <Text>
                            {"\n"}
                            {"\n"}
                            {"\n"}
                        </Text>

                        <View style={Styles.txtMsgInpCont}>
                            <Text style={Styles.steps}>
                                Enter text message content below
                            </Text>

                            <View style={Styles.smBreak2} />

                            <TextInput
                                style={Styles.inptTxtMsg}
                                multiline={true}
                                numberOfLines={4}
                                blurOnSubmit={true}
                                underlineColorAndroid="transparent"
                                returnKeyType={"default"}
                                placeholder="eg. &quot;Emergency, come now!&quot; "
                                ref={el => {
                                    this.myMsg = el;
                                }}
                                onChangeText={myMsg => {
                                    this.setState({ myMsg });
                                    console.log(this.state.myMsg.length);
                                }}
                                value={this.state.myMsg}
                                onSubmitEditing={this.saveText}
                            />
                        </View>

                        <Text>{"\n"}</Text>

                        <View style={Styles.BtnCont}>
                            <TouchableOpacity
                                style={Styles.btn}
                                onPress={() => {
                                    this.flashCheckMark();
                                    this.saveText();
                                }}
                            >
                                <Image
                                    source={require("./imgs/savew.png")}
                                    style={{ width: 21, height: 21 }}
                                />
                                <Text style={Styles.btnTTxt}>Save</Text>
                                <FadeView
                                    active={this.state.active}
                                    style={Styles.checkTxtBodCont}
                                >
                                    <Image
                                        source={require("./imgs/checkW.png")}
                                        style={Styles.checkTxtBod}
                                    />
                                </FadeView>
                            </TouchableOpacity>

                            <View style={Styles.smBreak3} />

                            <TouchableOpacity
                                style={Styles.btn}
                                onPress={this.sendText}
                            >
                                <Image
                                    source={require("./imgs/textw.png")}
                                    style={{ width: 27, height: 21 }}
                                />
                                <Text style={Styles.btnTTxt}>Text Now</Text>
                            </TouchableOpacity>

                            <Text>{"\n"}</Text>
                        </View>
                    </View>
                </View>

                <View style={Styles.navBar}>
                    <TouchableOpacity
                        onPress={() =>
                            navigate("Home", {
                                recipient: this.state.recipient
                            })
                        }
                    >
                        <View style={Styles.navBarBtn}>
                            <Image
                                style={Styles.instantNav}
                                source={require("./imgs/sphone.png")}
                            />
                            <Text style={Styles.navTxt}>Instant</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigate("Timer", {
                                recipient: this.state.recipient
                            })
                        }
                    >
                        <View style={Styles.navBarBtn}>
                            <Image
                                style={Styles.timerNav}
                                source={require("./imgs/stime.png")}
                            />
                            <Text style={Styles.navTxt}>Timer</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigate("TextBody", {
                                recipient: this.state.recipient
                            })
                        }
                    >
                        <View style={Styles.navBarBtn}>
                            <Image
                                style={Styles.textNav}
                                source={require("./imgs/stextb.png")}
                            />
                            <Text style={Styles.navTxtB}>Text Body</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigate("Settings", {
                                recipient: this.state.recipient
                            })
                        }
                    >
                        <View style={Styles.navBarBtn}>
                            <Image
                                style={Styles.settingsNav}
                                source={require("./imgs/sgear.png")}
                            />
                            <Text style={Styles.navTxt}>Settings</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
