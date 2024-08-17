//this version permits storing of the user pompts

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatBot = ({ sentMessages = [], receivedMessages = [], onSendMessage }) => {
  const [messages, setMessages] = useState([...receivedMessages, ...sentMessages]);
  const [inputText, setInputText] = useState('');
  const [userPrompts, setUserPrompts] = useState([]); // State to store user prompts
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the list when a new message is received or sent
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return; // Prevent sending empty messages

    const newMessage = {
      id: messages.length,
      text: inputText,
      fromUser: true, // Marking message as from the user
    };

    const newPrompt = { // Store the user prompt in an object
      prompt: inputText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setUserPrompts([...userPrompts, newPrompt]); // Update user prompts
    setInputText('');

    // Callback to parent component with the sent message
    if (typeof onSendMessage === 'function') {
      onSendMessage(inputText);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.fromUser ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted // Ensures messages are displayed from bottom to top
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {/* Display user prompts (for demonstration purposes) */}
      <View style={styles.userPromptsContainer}>
        <Text>User Prompts:</Text>
        {userPrompts.map((prompt, index) => (
          <Text key={index}>{prompt.timestamp}: {prompt.prompt}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2ecc71',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userPromptsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginTop: 10,
  },
});

export default ChatBot;
