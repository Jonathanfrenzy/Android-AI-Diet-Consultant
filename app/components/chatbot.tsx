import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Chatbot = ({ messages: initialMessages = [], onSend }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    // Simulate receiving a bot message after sending a user message
    if (messages.length > 0 && messages[messages.length - 1].fromUser) {
      setTimeout(() => {
        receiveMessage('Hello! This is a bot response.');
      }, 1000);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return; // Prevent sending empty messages

    const newMessage = {
      id: messages.length,
      text: inputText,
      fromUser: true, // Marking message as from the user
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Callback to parent component
    if (typeof onSend === 'function') {
      onSend(inputText);
    }
  };

  const receiveMessage = (text) => {
    const newMessage = {
      id: messages.length,
      text,
      fromUser: false, // Marking message as from the bot
    };

    setMessages([...messages, newMessage]);

    // Scroll to the bottom of the list when a new message is received
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.fromUser ? styles.userMessage : styles.botMessage]}>
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
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
  },
  botMessage: {
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
});

export default Chatbot;