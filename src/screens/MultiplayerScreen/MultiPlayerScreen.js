import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Multiplayerscreen = () => {
  const handle4PlayerPress = () => {
    // Navigate to the 4-player mode screen
  };

  const handle8PlayerPress = () => {
    // Navigate to the 8-player mode screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handle4PlayerPress}>
        <Text style={styles.buttonText}>4-Player Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handle8PlayerPress}>
        <Text style={styles.buttonText}>8-Player Mode</Text>
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
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
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
});

export default Multiplayerscreen;