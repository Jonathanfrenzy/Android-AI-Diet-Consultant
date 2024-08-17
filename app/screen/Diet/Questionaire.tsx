import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Modal } from 'react-native';
import SurveyModal from './SurveyModal';  // Ensure this import path is correct
import { useNavigation } from '@react-navigation/native';  // Update this import based on your navigation setup

const Questionaire = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null); // To store survey results
  const [processingVisible, setProcessingVisible] = useState(false); // State to control the processing modal
  const navigation = useNavigation();

  const questions = [
    {
      question: 'objective',
      answers: ['weight loss', 'weight gain', 'muscle gain', 'live healthy']
    },
    {
      question: 'What is your gender',
      answers: ['Male', 'Female']
    },
    {
      question: 'what is your age',
      answers: ['<21', '21 -35', '35-50', '50-65']
    },
    {
      question: 'How would you describe your activity level?',
      answers: ['Sedentary', 'Lightly active', 'Moderately active', 'Highly active']
    },
    {
      question: 'What is your gender?',
      answers: ['Male', 'Female']
    },
    {
      question: 'How many meals do you typically consume per day',
      answers: ['2', '3', '4', '>5']
    },
    {
      question: 'How often do you exercise',
      answers: ['rarily', 'Once in a while', 'Often', 'regularyly']
    },
    // Add more questions as needed
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveSurvey = (results) => {
    setSurveyResults(results);
    console.log('Survey results:', results);

    // Show the processing modal
    setProcessingVisible(true);

    // Delay for 4 to 6 seconds before navigating
    setTimeout(() => {
      setProcessingVisible(false); // Hide the processing modal
      Alert.alert(
        "Survey Saved",
        "Your survey responses have been successfully saved.",
        [{ text: "OK", onPress: () => navigation.navigate('Food', { surveyResults: results }) }]
      );
    }, 4000); // Adjust the delay time as needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey</Text>
      <Button title="Start Survey" onPress={openModal} />
      <SurveyModal
        visible={modalVisible}
        closeModal={closeModal}
        questions={questions}
        onSave={handleSaveSurvey}
      />

      {surveyResults && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>Survey Results:</Text>
          <Text>{JSON.stringify(surveyResults, null, 2)}</Text>
        </View>
      )}

      {/* Processing Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={processingVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.processingContainer}>
          <View style={styles.processingContent}>
            <Text style={styles.processingText}>Processing your request...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultsContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '80%',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  processingContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  processingText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Questionaire;