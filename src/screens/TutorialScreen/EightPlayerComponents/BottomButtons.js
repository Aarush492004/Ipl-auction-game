import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomButtons = () => {
  return (
    <View style={styles.container}>
      {/* Right bottom icons */}
      <TouchableOpacity style={[styles.iconButton, styles.microphoneIcon]}>
        <Icon name="microphone" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconButton, styles.volumeIcon]}>
        <Icon name="volume-up" size={20} color="white" />
      </TouchableOpacity>

      {/* Bid and Fastbid buttons */}
      <TouchableOpacity style={[styles.bidButton, styles.bidButtonLeft]}>
        <Text style={styles.bidText}>Bid</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.bidButton, styles.bidButtonRight]}>
        <Text style={styles.bidText}>Fastbid</Text>
        <MaterialIcons name="keyboard-arrow-up" size={20} color="#333" style={styles.fastbidArrowInside} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconButton: {
    marginBottom: 10,
    backgroundColor: '#00000080',
    padding: 10,
    borderRadius: 50,
  },
  microphoneIcon: {
    position: 'absolute',
    top: -25,
    left: 660,
  },
  volumeIcon: {
    position: 'absolute',
    top: -25,
    left: 710,
  },
  bidButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidButtonLeft: {
    position: 'absolute',
    bottom: 5,
    left: 300,
  },
  bidButtonRight: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 220,
    width: 120,
  },
  fastbidArrow: {
    position: 'absolute',
    top: -5,
    right: -15,
  },
  bidText: {
    fontSize: 14,
    color: 'black',
    marginRight: 5,
  },
});

export default BottomButtons;