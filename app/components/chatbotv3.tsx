import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';




const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userPrompts, setUserPrompts] = useState([]);
  const [botResponses, setBotResponses] = useState([]);
  const flatListRef = useRef(null);
  const responseIndexRef = useRef(0); // To keep track of the current response index

  useEffect(() => {
    // Scroll to the bottom of the list when a new message is received or sent
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const responses = [
    'Hello. I am alyia, an AI chatbot designed by the nexus team, to help you customize your diet. How may i help you today?',
    'A weight loss diet is fully within the range of my capabilities, will you like to proceed to the survey?',
    'Proceeding to Survey......',
    // Add more responses as needed
  ];

  const handleSend = () => {
    if (inputText.trim() === '') return; // Prevent sending empty messages

    const newMessage = {
      id: messages.length,
      text: inputText,
      fromUser: true, // Marking message as from the user
    };

    const newPrompt = {
      prompt: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    const botResponse = {
      id: messages.length + 1,
      text: responses[responseIndexRef.current],
      fromUser: false,
    };

    // Update state
    setMessages([...messages, newMessage, botResponse]);
    setUserPrompts([...userPrompts, newPrompt]);
    setInputText('');

    // Increment response index for the next bot response
    responseIndexRef.current = (responseIndexRef.current + 1) % responses.length;
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
        data={messages.reverse()}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted // Reverse the order to display latest messages at the bottom
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
          <EvilIcons name="arrow-right" size={28} color="black" />

        </TouchableOpacity>
      </View>
      {/* Display user prompts (for demonstration purposes) */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end', // Align messages to the bottom of the container
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#0bad7c',
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
    backgroundColor: '#AFE3E0',
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
