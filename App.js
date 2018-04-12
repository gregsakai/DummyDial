import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Styles from './components/scss/Styles.scss';

import Welcome from './components/Welcome';
import Home from './components/Home';
import Instant from './components/Instant';
import CallPage from './components/CallPage';
import TextBody from './components/TextBody';
import Timer from './components/Timer';
import Settings from './components/Settings';
import FAQs from './components/FAQs';
import AddContact from './components/AddContact';

/* Only Stack Navigator controls in this file */
const DummyDial = StackNavigator({
  Home: { screen: Home },
  Welcome: { screen: Welcome },
  Instant: { screen: Instant },
  CallPage: { screen: CallPage },
  TextBody: { screen: TextBody },
  Timer: { screen: Timer },
  Settings: { screen: Settings },
  FAQs: { screen: FAQs },
  AddContact: { screen: AddContact }
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      },
    }),
  });

export default class App extends React.Component {
  render() {
    return (
      <DummyDial />
    );
  }
}
