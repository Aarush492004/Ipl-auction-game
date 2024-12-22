import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (e) {
      console.error('Error signing out: ', e);
    }
  };

  const handleSettingsPress = () => {
    Alert.alert('Settings', 'Settings functionality goes here');
  };

  const handleMultiplayerPress = () => {
    navigation.navigate('MultiPlayerScreen');
  };

  const handleTutorialPress = () => {
    navigation.navigate('Tutorialscreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/Images/Ipl.png')} style={styles.logo} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handleTutorialPress}>
          <Text style={styles.buttonText}>Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonShadow]}>
          <Text style={styles.buttonText}>Play With Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handleMultiplayerPress}>
          <Text style={styles.buttonText}>Multiplayer</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.settingsIcon, styles.iconShadow]}
        onPress={handleSettingsPress}
      >
        <Icon name="settings-outline" size={32} color="#2196F3" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.signOutButton, styles.buttonShadow]}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  buttonsContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  iconShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signOutButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 40,
    width: '80%',
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;


