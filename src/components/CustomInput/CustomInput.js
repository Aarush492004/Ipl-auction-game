import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry && !isPasswordVisible} // Toggle password visibility
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.icon}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'} // Change icon based on visibility
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row', // To align the input and icon side by side
    alignItems: 'center',
  },
  input: {
    flex: 1, // Allows input to take full width except for icon
  },
  icon: {
    paddingHorizontal: 5, // Spacing for the icon
  },
});

export default CustomInput;
