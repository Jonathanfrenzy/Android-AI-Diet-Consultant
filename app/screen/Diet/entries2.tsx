import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import DropdownComponent from '@/components/dropdown3';

function Weightmeasure() {
  const [number, onChangeNumber] = useState('');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{fontSize:16}}>Enter today's weight</Text>
      <TextInput
        style={styles.input1}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="enter weight"
        keyboardType="numeric"
      />
    </View>
  );
}

function Circumference({data}) {
  const [number, onChangeNumber] = useState('');
   return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{fontSize:16}}>Enter {data} circumference</Text>
      <TextInput
        style={styles.input1}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="enter weight"
        keyboardType="numeric"
      />
    </View>
   )
}

function Wellbeing() {
  const stress = [
    { label: 'lightly stressed', value: 'Item 1' },
    { label: 'normal', value: 'Item 2' },
    { label: 'anxious', value: 'Item 3' },
    { label: 'heavily stressed', value: 'Item 4' },
  ];

  const sleep = [
    { label: 'Terrible', value: 'Item 1' },
    { label: 'bad', value: 'Item 2' },
    { label: 'average', value: 'Item 3' },
    { label: 'good', value: 'Item 4' },
    { label: 'better', value: 'Item 5' },
  ];

  const rating = [
    { label: '1', value: 'Item 1' },
    { label: '2', value: 'Item 2' },
    { label: '3', value: 'Item 3' },
    { label: '4', value: 'Item 4' },
    { label: '5', value: 'Item 5' },
    { label: '6', value: 'Item 6' },
    { label: '7', value: 'Item 7' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.questionContainer}>
        <Text style={{fontSize:16}}>How are you feeling today</Text>
        <DropdownComponent data={stress} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={{fontSize:16}}>How would you rate your sleep quality</Text>
        <DropdownComponent data={sleep} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={{fontSize:16}}>How would you rate your energy levels on a scale of 1 to 7</Text>
        <DropdownComponent data={rating} />
      </View>
    </ScrollView>
  );
}

const Component1 = () => {
{/** this is the weight loss component */}
  const [number, onChangeNumber] = useState('');
  return (
    <View>
      <Weightmeasure />
      <Circumference data={'Waist'}/>
    </View>
  );
};

const Component2 = () => {
  {/** this is the weight gain component */}
  return (
    <View>
      <Weightmeasure />
      <Circumference data={'waist'} />
    </View>
  );
};

const Component3 = () => {
  {/** this is the muscle gain component */}
  return (
    <View>
      <Weightmeasure />
      <Circumference data={'muscle'} />
    </View>
  );
};

const Component4 = () => {
  {/** this is the decrease stress component */}
  return (
    <View>
      <Wellbeing />
    </View>
  );
};

const DefaultComponent = () => (
  <View>
  </View>
);

const styles = StyleSheet.create({
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export { Component1, Component2, Component3, Component4, DefaultComponent };