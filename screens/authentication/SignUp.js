/* eslint-disable no-console */
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
});

export default function SignUp({ navigation }) {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [repeatPassword, onChangeRepeatPassword] = useState('');

  const [invalidMessage, setInvalidMessage] = useState(null);

  const signUp = async () => {
    const validPassword = password.length > 5 && (password === repeatPassword);
    if (validPassword) {
      setInvalidMessage(null);
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          name,
        },
        validationData: [], // optional
      })
        .then((data) => {
          console.log(data);
          console.log('navigation: ', navigation);
          navigation.navigate('Confirmation', { email });
        })
        .catch((err) => {
          if (err.message) {
            setInvalidMessage(err.message);
          }
          console.log(err);
        });
    } else {
      setInvalidMessage('Password must be equal and have greater lenght than 6.');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={name}
        placeholder="Name"
        onChange={(text) => onChangeName(text)}
        autoFocus
      />
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={(text) => onChangeEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <Input
        value={password}
        placeholder="password"
        onChange={(text) => onChangePassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Input
        value={repeatPassword}
        placeholder="Repeat password"
        onChange={(text) => onChangeRepeatPassword(text)}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button
        onPress={() => signUp()}
      >
        Sign Up
      </Button>
      <Text>
        {invalidMessage}
      </Text>
    </View>
  );
}
