import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AntDesign from '@expo/vector-icons/AntDesign';

const Chart = () => {
  // Example data with dates and corresponding weights
  const chartData = [
    { date: '07-10', weight: 70 },
    { date: '07-11', weight: 69.5 },
    { date: '07-12', weight: 0 },
    { date: '07-13', weight: 69.5 },
    { date: '07-14', weight: 68 },
    { date: '07-15', weight: 67.5 },
    { date: '07-16', weight: 67 },
    { date: '07-17', weight: 70 },
    { date: '07-18', weight: 69.5 },
    { date: '07-19', weight: 69 },
    { date: '07-20', weight: 69 },
    { date: '07-21', weight: 69 },
    { date: '07-22', weight: 69 },
    { date: '07-23', weight: 67 },
  ];

  // State variables for managing date range
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 7; // Display 7 items per page

  // Calculate end index based on start index
  const endIndex = startIndex + itemsPerPage;

  // Filter chartData based on startIndex and endIndex
  const filteredData = chartData.slice(startIndex, endIndex);

  // Extract dates and weights from filteredData
  const labels = filteredData.map(item => item.date);
  const data = filteredData.map(item => item.weight);

  // Format date to display only day and month
  const formatDate = (date) => {
    const [month, day] = date.split('-');
    return `${day}/${month}`;
  };

  // Function to handle navigation to previous page
  const goToPreviousPage = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  // Function to handle navigation to next page
  const goToNextPage = () => {
    if (startIndex + itemsPerPage < chartData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={goToPreviousPage}>
          {/*<Text style={styles.navigationText}>{'<'}</Text>*/}
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navigationText}>
          {`${formatDate(labels[0])} - ${formatDate(labels[labels.length - 1])}`}
        </Text>
        <TouchableOpacity onPress={goToNextPage}>
          {/*<Text style={styles.navigationText}>{'>'}</Text>*/}
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: data }]
        }}
        width={350} // from react-native-chart-kit docs, ideally this should be the same as container width
        height={200}
        yAxisLabel="kg"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#7fe5a3',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1, // number of decimal places for values on Y-axis
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier // enable a smooth line chart
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  navigationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Chart;