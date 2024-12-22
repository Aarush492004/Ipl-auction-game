import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity,PanResponder, ScrollView, Animated } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import ChatBox from './EightPlayerComponents/ChatBox';
import BottomButtons from './EightPlayerComponents/BottomButtons';
import PlayerSlidePanel from './EightPlayerComponents/PlayerSlidePanel';
import { PLAYER_CONFIG, PlayerSlot } from './EightPlayerComponents/PlayerSlot';

const { width, height } = Dimensions.get('window');

const Eightplayermode = () => {
  const [isPlayersListPanelOpen, setIsPlayersListPanelOpen] = useState(false);
  const [isYourPlayersPanelOpen, setIsYourPlayersPanelOpen] = useState(false);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.blueBackground} />
      <View
        style={[
          styles.greenBackground,
          {
            top: height * 0.22,
            left: width * 0.3,
          },
        ]}
      />
      <View style={styles.mainContent}>
        <View style={styles.playersContainer}>
          {PLAYER_CONFIG.aiPlayers.map((player) => (
            <PlayerSlot
            key={`ai-player-${player.id}`}
            player={player}
            />
          ))}
        </View>
        <PlayerSlidePanel 
        type="playersList"
        onOpenPanel={() => setIsPlayersListPanelOpen(true)}
        onClosePanel={() => setIsPlayersListPanelOpen(false)}
        />
        <PlayerSlidePanel 
        type="yourPlayers"
        onOpenPanel={() => setIsYourPlayersPanelOpen(true)}
        onClosePanel={() => setIsYourPlayersPanelOpen(false)}
        />
      </View>
      <ChatBox
      isPanelOpen={isPlayersListPanelOpen || isYourPlayersPanelOpen}
      />
      <BottomButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blueBackground: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBackground: {
    position: 'absolute',
    height: height * 0.35,
    width: width * 0.4,
    backgroundColor: '#228B22',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'darkgreen',
    zIndex: 1,  // Ensure it's behind other components
  },
  mainContent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  playersContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
  
export default Eightplayermode;






