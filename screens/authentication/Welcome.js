import React from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import BackgroundImage from '../../components/BackgroundImage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    margin: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    padding: 15,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    marginTop: 10,
  },
});

const Welcome = ({ navigation }) => (
  <View style={styles.container}>
    <BackgroundImage>
      <View style={styles.content}>
        <Text
          style={styles.title}
        >
          React Native Authentication using AWS Cogntio & Amplify
        </Text>
        <View>
          <Button onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </Button>
        </View>
        <View style={styles.button}>
          <Button onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Button>
        </View>
      </View>
    </BackgroundImage>
  </View>
);

export default Welcome;
