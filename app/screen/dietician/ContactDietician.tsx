import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, ScrollView, Button } from 'react-native';

const ContactDietician = () => {
  const navigation = useNavigation()
  
  const [purpose, setPurpose] = useState('');
  const [surveyOption, setSurveyOption] = useState('');
  const [description, setDescription] = useState('');

  const handlePurposeChange = (value) => {
    setPurpose(value);
  };

  const handleSurveyOptionChange = (value) => {
    setSurveyOption(value);
  };

  const handleSubmit = () => {
    // Handle submission logic here (e.g., API calls, form validation)
    console.log('Purpose:', purpose);
    console.log('Survey Option:', surveyOption);
    console.log('Description:', description);
    // Clear form fields if needed
    setPurpose('');
    setSurveyOption('');
    setDescription('');
    // Navigate to another screen or perform any other action after submission
  };

  const handleCancel = () => {
    // Navigate back or perform any other action when cancel button is pressed
    navigation.goBack(); // Example: Go back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Purpose of Contact:</Text>
        <Picker
          selectedValue={purpose}
          onValueChange={handlePurposeChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Purpose" value="" />
          <Picker.Item label="Appointment" value="Appointment" />
          <Picker.Item label="General Inquiry" value="General Inquiry" />
          <Picker.Item label="Feedback" value="Feedback" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Survey Option:</Text>
        <Picker
          selectedValue={surveyOption}
          onValueChange={handleSurveyOptionChange}
          style={styles.picker}
        >
          <Picker.Item label="Select Option" value="" />
          <Picker.Item label="Online Survey" value="Online Survey" />
          <Picker.Item label="Phone Survey" value="Phone Survey" />
          <Picker.Item label="In-person Survey" value="In-person Survey" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter your message or description"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={handleCancel} color="red" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    height: 100,
    textAlignVertical: 'top', // to ensure multiline TextInput starts from the top
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ContactDietician;
