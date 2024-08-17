import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SurveyModal = ({ visible, closeModal, questions, onSave }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerSelection = (selectedAnswer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedAnswer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSave = () => {
    onSave(selectedAnswers);
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{flexDirection:'row', gap:15}}>
            <Text style={styles.modalText}>{questions[currentQuestionIndex].question}</Text>
            <TouchableOpacity
              onPress={closeModal}
              style={{ alignSelf: 'flex-end', marginBottom:20}}
            >
                    <AntDesign name="closecircleo" size={20} color="#0bad7c" />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ marginBottom: 20 }}>
          
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <TouchableHighlight
                key={index}
                style={[styles.answerBox, { backgroundColor: selectedAnswers[currentQuestionIndex] === answer ? '#e0e0e0' : '#ffffff' }]}
                onPress={() => handleAnswerSelection(answer)}
                underlayColor="lightgreen"
              >
                <Text style={styles.answerText}>{answer}</Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const Survey = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null); // To store survey results

  const questions = [
    {
      question: 'What is your favorite color?',
      answers: ['Red', 'Blue', 'Green', 'Yellow']
    },
    {
      question: 'Which programming language do you prefer?',
      answers: ['JavaScript', 'Python', 'Java', 'C++']
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
    // You can further process or save the survey results as needed
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerBox: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  answerText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
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
});

export default Survey;
