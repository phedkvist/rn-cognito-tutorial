import React, { useState } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});


const Confirmation = ({ route, navigation }) => {
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState(' ');
  console.log('confirmation navigation: ', navigation);
  const { email } = route.params;

  const confirmSignUp = async () => {
    if (authCode.length > 0) {
      await Auth.confirmSignUp(email, authCode)
        .then(() => {
          navigation.navigate('SignIn');
        })
        .catch((err) => {
          if (!err.message) {
            setError('Something went wrong, please contact support!');
          } else {
            setError(err.message);
          }
        });
    } else {
      setError('You must enter confirmation code');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Check your email for the confirmation code.</Text>
      <Input
        value={authCode}
        placeholder="123456"
        onChange={(text) => setAuthCode(text)}
      />
      <Button onPress={() => confirmSignUp()}>Confirm Sign Up</Button>
      <Text>{error}</Text>
    </View>
  );
};

export default Confirmation;
