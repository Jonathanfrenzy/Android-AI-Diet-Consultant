import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, ToastAndroid } from 'react-native';
import Chart from './chart';
import DropdownComponent from '@/components/dropdown2';
import { Component1, Component2, Component3, Component4, DefaultComponent } from './entries2';

export default function Tracker() {
  // external props
  const data = [
    { label: 'weight loss', value: 'Item 1' },
    { label: 'weight gain', value: 'Item 2' },
    { label: 'muscle gain', value: 'Item 3' },
    { label: 'decrease stress', value: 'Item 4' },
  ];

  //internal props

  const [selectedOption, setSelectedOption] = useState('Default');
  const [results, setResults] = useState({});
  const [resetEntries, setResetEntries] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Item 1':
        return <Component1 resetEntries={resetEntries} setResetEntries={setResetEntries} />;
      case 'Item 2':
        return <Component2 resetEntries={resetEntries} setResetEntries={setResetEntries} />;
      case 'Item 3':
        return <Component3 resetEntries={resetEntries} setResetEntries={setResetEntries} />;
      case 'Item 4':
        return <Component4 resetEntries={resetEntries} setResetEntries={setResetEntries} />;
      default:
        return <DefaultComponent />;
    }
  };

  const handleSave = () => {
    // Mocking the process of saving and displaying success message
    setResults({
      // Example structure:
      // weight: component1WeightValue,
      // circumference: component1CircumferenceValue,
      // Additional fields based on your components
    });

    // Show success message
    setShowSuccessMessage(true);

    // Reset the entries component by toggling resetEntries state
    setResetEntries((prev) => !prev);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Chart />
        
      </View>

      <View style={{flexDirection:'column', justifyContent:'flex-start', backgroundColor:'transparent',marginTop: 110,}}>
        <Text style={{ alignSelf: 'center', height: 20, width:370, fontWeight:'bold', fontSize:14, borderRadius:15 }}>Daily Entries</Text>
        <View style={styles.objectiveContainer}>
          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            <Text style={styles.objectiveText}>Objective:</Text>
          </View>
          <DropdownComponent data={data} onChange={handleDropdownChange} />
        </View>
      </View>

      <View style={styles.componentContainer}>
        {renderComponent()}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          color="#0bad7c"
          accessibilityLabel="Save Button"
          onPress={handleSave}
        />
      </View>

      {showSuccessMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Successfully saved your entry!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  objectiveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'flex-start',
  },
  objectiveText: {
    fontSize: 17,
    alignSelf: 'flex-start',
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#0bad7c',
    borderRadius: 15,
    width: 100
  },
  successMessage: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(100, 200, 100, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  successText: {
    color: 'white',
    fontSize: 16,
  },
});