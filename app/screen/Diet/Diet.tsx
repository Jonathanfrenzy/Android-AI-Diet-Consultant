import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import PieChart from './piechart';
import MealPlan from './mealplan';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications'; // Import Expo Notifications

const Diet = ({ route }) => {
  const { selectedFoodItems, surveyResults } = route.params || {}; // Get selected food items and survey results from route params
  const navigation = useNavigation(); // Initialize navigation

  const TotalCalories = 3000;

  // Initial meals object
  const initialMeals = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack1: [],
    snack2: [],
  };

  // State for meal plan and chart visibility
  const [mealPlan, setMealPlan] = useState(initialMeals);
  const [isVisible, setIsVisible] = useState(true); // Default visibility of PieChart
  const [isExpanded, setIsExpanded] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages

  // Randomly assign food items to meal categories
  useEffect(() => {
    if (selectedFoodItems && selectedFoodItems.length > 0) {
      const shuffledItems = selectedFoodItems.sort(() => 0.5 - Math.random());
      const newMealPlan = { ...initialMeals };

      shuffledItems.forEach((item, index) => {
        const mealKeys = Object.keys(newMealPlan);
        const meal = mealKeys[index % mealKeys.length]; // Cycle through meal categories
        newMealPlan[meal].push(item);
      });

      setMealPlan(newMealPlan);
      setAlertMessage('Meal successfully created!');
      
      // Send push notification
      sendPushNotification('A new meal plan has been created.');
    } else {
      setAlertMessage('No food items selected.');
    }
  }, [selectedFoodItems]);

  const sendPushNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Meal Plan',
        body: message,
        sound: 'default',
      },
      trigger: null,
    });
  };

  // Display alert if there's a message
  useEffect(() => {
    if (alertMessage) {
      Alert.alert('Meal Status', alertMessage, [{ text: 'OK' }]);
      setAlertMessage(''); // Reset the alert message
    }
  }, [alertMessage]);

  // Prepare data for PieChart
  const mealColors = {
    breakfast: '#0bad7c',
    lunch: '#34a5a0',
    dinner: '#5eb3a7',
    snack1: '#88c1ff',
    snack2: '#b2d0ff',
  };

  const data = Object.keys(mealPlan).map((meal) => {
    const totalCalories = mealPlan[meal].reduce((acc, item) => acc + (item.calories || 0), 0);
    return {
      name: meal.charAt(0).toUpperCase() + meal.slice(1), // Capitalize first letter
      calories: totalCalories,
      color: mealColors[meal],
    };
  });

  const handleChartToggle = () => {
    setIsVisible(!isVisible); // Toggle visibility of PieChart
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Navigate to Food screen with surveyResults
  const handleUpdatePress = () => {
    navigation.navigate('Food', { surveyResults }); // Pass surveyResults to Food screen
  };

  const renderMealPlanItem = ({ item }) => (
    <MealPlan
      title={item.title}
      items={item.items}
      isExpanded={isExpanded}
      toggleExpand={toggleExpand}
      onUpdatePress={handleUpdatePress} // Pass the update handler to MealPlan
    />
  );

  return (
    <View style={styles.container}>
      {/* Conditional rendering based on isVisible state */}
      {isVisible && <PieChart data={data} totalCalories={TotalCalories} />}

      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <View style={styles.cont12}>
          <TouchableOpacity onPress={handleChartToggle} style={styles.chartButton}>
            <Text style={styles.chartButtonText}>Meal Plan</Text>
          </TouchableOpacity>
          <FlatList
            style={styles.cont1}
            data={[
              { key: 'breakfast', title: 'Breakfast', items: mealPlan.breakfast },
              { key: 'lunch', title: 'Lunch', items: mealPlan.lunch },
              { key: 'dinner', title: 'Dinner', items: mealPlan.dinner },
              { key: 'snack1', title: 'Snack 1', items: mealPlan.snack1 },
              { key: 'snack2', title: 'Snack 2', items: mealPlan.snack2 },
            ]}
            renderItem={renderMealPlanItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  cont12: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden', // Ensure contents don't overflow when shrinking
  },
  cont1: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: Dimensions.get('window').height * 0.8, // Maximum height for the meal plan list
  },
  chartButton: {
    padding: 10,
    backgroundColor: "#0bad7c",
    borderRadius: 10,
    width: 350,
    alignSelf: "center"
  },
  chartButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  }
});

export default Diet;