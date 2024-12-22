import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlayerSlidePanel = ({ type,onOpenPanel, onClosePanel }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Bat');
  const [remainingPurse] = useState(50);

  const slideAnim = useState(new Animated.Value(type === 'playersList' ? -width : width))[0];

  const playerData = {
    Bat: Array(32).fill(''),
    Bowl: Array(32).fill(''),
    'A-R': Array(32).fill(''),
    WK: Array(32).fill(''),
  };

  const openPanel = () => {
    setShowPanel(true);
    if (onOpenPanel) onOpenPanel();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(slideAnim, {
      toValue: type === 'playersList' ? -width : width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowPanel(false);
      if (onClosePanel) onClosePanel();
    });
  };

  const renderTable = () => {
    return (
      <View style={styles.tableContainer}>
        <View style={styles.categoryTabs}>
          {['Bat', 'Bowl', 'A-R', 'WK'].map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.activeCategoryTab,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryTabText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}
          style={styles.scrollableTable}
          contentContainerStyle={styles.scrollableTableContent}
        >
          {playerData[selectedCategory].map((player, index) => (
            <View key={`player-${index}`} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{player}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.purseContainer}>
          <Text style={styles.purseText}>Purse Remaining: {remainingPurse} Cr</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity 
        style={[
          styles.playersListButton, 
          type === 'playersList' ? styles.playersListLeft : styles.playersListRight
        ]} 
        onPress={openPanel}
      >
        <Text style={styles.playersListText}>
          {type === 'playersList' ? 'Players List' : 'Your Players'}
        </Text>
      </TouchableOpacity>

      {showPanel && (
        <Animated.View
          pointerEvents="box-none"
          style={[
            type === 'playersList' ? styles.slidePanelLeft : styles.slidePanelRight,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.panelContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={closePanel}>
              <Icon name="times" size={25} color="white" />
            </TouchableOpacity>
            <Text style={styles.panelHeading}>
              {type === 'playersList' ? 'PLAYERS LIST' : 'YOUR PLAYERS'}
            </Text>
            {renderTable()}
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  playersListButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersListLeft: {
    position: 'absolute',
    bottom: 200,
    right: 695,
  },
  playersListRight: {
    position: 'absolute',
    bottom: 200,
    left: 695,
  },
  playersListText: {
    fontSize: 12,
    color: 'black',
  },
  slidePanelLeft: {
    position: 'absolute',
    top: 30,
    left: 0,
    height: 255,
    width: 150,
    backgroundColor: '#000000',
    zIndex: 1000,
  },
  slidePanelRight: {
    position: 'absolute',
    top: 30,
    right: 0,
    height: 255,
    width: 150,
    backgroundColor: '#000000',
    zIndex: 1000,
  },
  panelContent: {
    flex: 1,
    paddingTop: 20,
  },
  panelHeading: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableContainer: {
    flex: 1,
  },
  categoryTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  categoryTab: {
    padding: 5,
  },
  activeCategoryTab: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  categoryTabText: {
    color: 'white',
    fontSize: 10,
  },
  scrollableTable: {
    borderWidth: 1,
    borderColor: 'white',
  },
  scrollableTableContent: {
    borderColor: 'white',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 5,
  },
  tableRowText: {
    color: 'white',
    fontSize: 9,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    bottom: 230,
    right: 2,
  },
  purseContainer: {
    backgroundColor: '#FFD700',
    padding: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  purseText: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PlayerSlidePanel;