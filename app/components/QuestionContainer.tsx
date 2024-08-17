import React from 'react';
import { View, Text, Button } from 'react-native';

const QuestionContainer = ({ question, answers }) => {
  const handleAnswerSelection = (selectedAnswer) => {
    // Handle logic for selecting an answer (if needed)
    console.log(`Selected answer: ${selectedAnswer}`);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{question}</Text>
      <View style={{ marginTop: 10 }}>
        {answers.map((answer, index) => (
          <Button key={index} title={answer} onPress={() => handleAnswerSelection(answer)} />
        ))}
      </View>
    </View>
  );
};

export default QuestionContainer;
