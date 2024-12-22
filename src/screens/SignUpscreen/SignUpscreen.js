import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth'; // Import Firebase auth

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const SignUpscreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // Loading state

  const onRegisterPressed = async data => {
    const {username, email, password} = data;
    setLoading(true); // Start loading
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await user.sendEmailVerification(); // Send email verification
      Alert.alert(
        'Verify your email',
        'A verification link has been sent to your email address.'
      );

      auth().signOut(); // Sign out user until they verify email
      navigation.navigate('SignIn'); // Navigate to Sign In screen after registration
    } catch (e) {
      Alert.alert('Oops', e.message);
    } finally {
      setLoading(false); // Stop loading after process ends
    }
  };

  // Google Sign-Up button click handler
  const onGoogleSignInPress = () => {
    Alert.alert('Google Sign-In', 'Google Sign-In process is in progress.');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters long',
            },
          }}
        />

        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Passwords do not match',
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Register'}
          onPress={handleSubmit(onRegisterPressed)}
          disabled={loading} // Disable the button when loading
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* Red "Sign Up with Google" button */}
        <CustomButton
          text="Sign Up with Google"
          onPress={onGoogleSignInPress} // Show message when pressed
          bgColor="red" // Set the background color to red
          textColor="white" // Set the text color to white
        />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
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
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpscreen;
