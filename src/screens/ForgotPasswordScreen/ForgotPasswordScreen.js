import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth'; // Firebase for sending password reset email

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSendPressed = async data => {
    if (loading) return;
    setLoading(true);

    try {
      // Send password reset email using Firebase Auth
      await auth().sendPasswordResetEmail(data.email);

      // Show success message and navigate to SignInScreen
      Alert.alert('Check your email', 'A password reset link has been sent to your email.');
      navigation.navigate('SignIn');
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Email not registered');
      } else {
        Alert.alert('Oops', e.message);
      }
    }
    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="email"
          control={control}
          placeholder="Enter your email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Sending...' : 'Send Reset Link'}
          onPress={handleSubmit(onSendPressed)}
        />

        <CustomButton
          text="Back to Sign in"
          onPress={() => navigation.navigate('SignIn')}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
});

export default ForgotPasswordScreen;
