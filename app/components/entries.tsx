import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Entries = ({ onWeightSubmit }) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    if (!weight) {
      alert('Please enter your weight.');
      return;
    }
    // Call parent function with weight as parameter
    onWeightSubmit(parseFloat(weight));
    // Clear input after submission
    setWeight('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default Entries;
