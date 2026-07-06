import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';

import styles from './styles';

interface Props extends TextInputProps {
  error?: string;
  inputStyle?: StyleProp<TextStyle>;
}

const CustomInput = ({
  error,
  inputStyle,
  ...props
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        placeholderTextColor="#A0A0A0"
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle,
        ]}
      />

      {!!error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;