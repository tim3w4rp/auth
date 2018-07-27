import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAWHj6e_xVkuwVPLFsF9HouDMo8g8wmNGI',
      authDomain: 'authentication-17523.firebaseapp.com',
      databaseURL: 'https://authentication-17523.firebaseio.com',
      projectId: 'authentication-17523',
      storageBucket: 'authentication-17523.appspot.com',
      messagingSenderId: '953078450439'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
};


export default App;
