import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import firebase from '@react-native-firebase/app'; // Import Firebase
import auth from '@react-native-firebase/auth'; // Firebase Auth import



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYYbOFhMQloDzzeYVuvTOeu6ItSNdIRDY",
  authDomain: "loginscreen-9d491.firebaseapp.com",
  projectId: "loginscreen-9d491",
  storageBucket: "loginscreen-9d491.appspot.com",
  messagingSenderId: "990847466202",
  appId: "1:990847466202:android:7920be9581c343ed2083e3",
};

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig); // Initialize Firebase
    }
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
