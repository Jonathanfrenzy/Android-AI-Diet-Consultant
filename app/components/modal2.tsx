import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';


import Questionaire from '@/screen/Diet/Questionaire'
import ChatBot from './chatbotv3';

const ModalComponent = ({ visible, closeModal }) => {
  const navigation = useNavigation();

  // Define options in an array of objects
  const options = [
    { id: 1, name: 'Weight Loss', screen: 'Questionaire' },
    { id: 2, name: 'Weight Gain', screen: 'Questionaire' },
    { id: 3, name: 'Muscle Gain', screen: 'Questionaire' },
    { id: 4, name: 'Decrease Stress', screen: 'Questionaire' },
    { id: 5, name: 'Talk with AI Chatbot', screen: 'ChatBot' },
    // Add more options as needed
  ];

  const handleOptionPress = (option) => {
    navigation.navigate(option.screen); // Navigate dynamically based on option.screen
    closeModal(); // Close the modal after navigation
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerText}>
              <Text style={styles.modalText}>Select an Option:</Text>
              <TouchableOpacity
                onPress={closeModal}
                style={{ alignSelf: 'flex-end', marginBottom: 10 }}
              >
                <AntDesign name="closecircleo" size={20} color="#0bad7c" />
              </TouchableOpacity>
            </View>

            {/* Map over options array to render TouchableOpacity dynamically */}
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionButton}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxHeight: 400,
    width: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  headerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  },
  optionButton: {
    backgroundColor: '#0bad7c',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalComponent;
