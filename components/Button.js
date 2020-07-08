import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: '#2a6bcc',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,

  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },
});

const Button = ({ onPress, children, backgroundColor }) => {
  const btnStyle = backgroundColor ? [styles.buttonStyle, { backgroundColor }] : styles.buttonStyle;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={btnStyle}
    >
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
