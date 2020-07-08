import React from 'react';
import {
  StyleSheet, View, ActivityIndicator,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AuthLoadingScreen extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { initialFetch } = state;
    const { isFetchingUserSettings, isFetchingWorkouts } = props;
    if (!initialFetch && !isFetchingUserSettings && !isFetchingWorkouts) {
      return {
        initialFetch: true,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      initialFetch: false,
      loading: true,
    };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async componentDidMount() {
    await this.loadApp();
  }

  async loadApp() {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        this.signIn(user);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('err signing in');
      });
    this.setState({
      loading: false,
    });
  }

  async signOut() {
    await Auth.signOut()
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('ERROR: ', err);
      });
    this.setState({ userToken: null, initialFetch: false });
  }

  async signIn(user) {
    this.setState({
      userToken: user.signInUserSession.accessToken.jwtToken,
      initialFetch: false,
    });
  }

  render() {
    const { userToken, initialFetch, loading } = this.state;
    const showLoadingSpinner = (!userToken && loading) || (userToken && !initialFetch);
    let view = '';
    if (showLoadingSpinner) {
      view = (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      );
    } else if (!userToken) {
      view = <AuthNavigator signIn={this.signIn} />;
    } else if (userToken && initialFetch) {
      view = <AppNavigator signOut={this.signOut} />;
    }
    return (
      <NavigationContainer>
        {view}
      </NavigationContainer>
    );
  }
}


export default AuthLoadingScreen;
