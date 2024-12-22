import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const PLAYER_CONFIG = {
  aiPlayers: [
    {
      id: 1,
      name: 'AI Player 1',
      position: { bottom: 270, left: 300 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 2,
      name: 'AI Player 2',
      position: { bottom: 270, left: 450 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 3,
      name: 'AI Player 3',
      position: { bottom: 210, left: 565 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 4,
      name: 'AI Player 4',
      position: { bottom: 120, left: 565 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 5,
      name: 'AI Player 5',
      position: { top: 225, left: 450 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 6,
      name: 'AI Player 7',
      position: { bottom: 120, right: 565 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 7,
      name: 'AI Player 8',
      position: { bottom: 210, right: 565 },
      profileSize: 70,
      labelSize: 12,
    },
    {
      id: 8,
      name: 'You',
      position: { top: 225, left: 300 },
      profileSize: 70,
      labelSize: 12,
    },
  ],
};

const PlayerSlot = ({ player, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.playerSlot,
        {
          ...player.position,
          width: player.profileSize,
          height: player.profileSize,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.profileContainer,
          {
            width: player.profileSize * 0.7,
            height: player.profileSize * 0.7,
            borderRadius: (player.profileSize * 0.7) / 2,
          },
        ]}
      >
        <Image
          source={require('../../../../assets/Images/Profile_picture.jpeg')}
          style={[
            styles.profileImage,
            {
              borderRadius: (player.profileSize * 0.7) / 2,
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.playerLabel,
          {
            fontSize: player.labelSize,
            color: 'white',
          },
        ]}
      >
        {player.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    playerSlot: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      margin: 5,
      position: 'absolute',
    },
    profileContainer: {
      width: 50,
      height: 50,
      borderRadius: 25, // Make it a circle
      borderWidth: 2,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5, // Add some space between the profile picture and the label
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: 25, // Make it a circle
    },
    playerLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
    },
});

export { PLAYER_CONFIG, PlayerSlot };