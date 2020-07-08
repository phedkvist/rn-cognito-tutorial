import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Auth from '@aws-amplify/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
});

function ForgetPassword({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [editableInput, setEditableInput] = useState(true);
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getConfirmationCode = async () => {
    if (email.length > 4) {
      Auth.forgotPassword(email)
        .then(() => {
          setEditableInput(true);
          setConfirmationStep(true);
          setErrorMessage('');
        })
        .catch((err) => {
          if (err.message) {
            setErrorMessage(err.message);
          }
        });
    } else {
      setErrorMessage('Provide a valid email');
    }
  };

  const postNewPassword = async () => {
    Auth.forgotPasswordSubmit(email, code, newPassword)
      .then(() => {
        setErrorMessage('');
        navigation.navigate('SignIn');
      })
      .catch((err) => {
        if (err.message) {
          setErrorMessage(err.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder="email@example.com"
        onChange={(text) => onChangeEmail(text)}
        editable={editableInput}
        autoCompleteType="email"
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
      />
      <Button
        onPress={() => getConfirmationCode()}
      >
        Reset password via email
      </Button>
      {confirmationStep && (
        <>
          <Text>Check your email for the confirmation code.</Text>
          <Input
            value={code}
            placeholder="123456"
            onChange={(text) => setCode(text)}
          />
          <Text>New password</Text>
          <Input
            value={newPassword}
            placeholder="password"
            onChange={(text) => setNewPassword(text)}
            secureTextEntry
            autoCompleteType="password"
          />
          <Button
            onPress={() => postNewPassword()}
          >
            Submit new password
          </Button>
        </>
      )}
      <Text>{errorMessage}</Text>
    </View>
  );
}

export default ForgetPassword;
