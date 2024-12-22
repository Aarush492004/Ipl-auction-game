import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView } from 'react-native';

const ChatBox = ({isPanelOpen}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatScrollViewRef = useRef(null);

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory((prevHistory) => [...prevHistory, { text: chatMessage, sender: 'You' }]);
      setChatMessage('');
      setTimeout(() => {
        if (chatScrollViewRef.current) {
          chatScrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  return (
    <View style={styles.chatBoxContainer}
    pointerEvents={isPanelOpen ? "none" : "auto"}
    >
      <ScrollView
        ref={chatScrollViewRef}
        style={styles.chatHistory}
        contentContainerStyle={styles.chatHistoryContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        nestedScrollEnabled={true}
        bounces={true}
        scrollEventThrottle={16}
      >
        {chatHistory.map((message, index) => (
          <Text key={`message-${index}`} style={styles.chatMessage}>
            {message.sender}: {message.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.chatInputFull}
        placeholder="Type a message..."
        placeholderTextColor="#888"
        value={chatMessage}
        onChangeText={setChatMessage}
        onSubmitEditing={sendChatMessage}
        returnKeyType="send"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatBoxContainer: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    width: 145,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatHistory: {
    flex: 1,
    padding: 10,
  },
  chatMessage: {
    color: 'black',
    marginBottom: 5,
    fontSize: 10,
  },
  chatInputFull: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 10,
    fontSize: 10,
    height: 30,
    width: '90%',
    alignSelf: 'center',
  },
});

export default ChatBox;