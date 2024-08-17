import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button, Modal, TouchableHighlight } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import MyCheckbox from '@/components/Checkbox';

function Fooditem({ item, onChecked }) {
  const fallbackImageSource = require('@/assets/images/no-image.png');
  const imageUrl = item.image ? { uri: item.image } : fallbackImageSource;

  const [checked, setChecked] = useState(false);

  const onChange = () => {
    setChecked(!checked);
    onChecked(item, !checked); // Notify parent component about the change
  };

  return (
    <View style={styles.fooditem}>
      <View style={styles.imageContainer}>
        <Image
          source={imageUrl}
          defaultSource={fallbackImageSource}
          style={styles.image}
        />
      </View>
      <View style={{ flexDirection: 'column', gap: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15 }}>{item.name}</Text>
          <View style={{ alignSelf: 'flex-end' }}>
            <MyCheckbox checked={checked} onChange={onChange} />
          </View>
        </View>
        <Text style={{ fontSize: 13.5 }}>Category: {item.category}</Text>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={styles.nutritionalText}>Carbs(g): {item.carbs}</Text>
          <Text style={styles.nutritionalText}>Protein(g): {item.protein}</Text>
          <Text style={styles.nutritionalText}>Fat(g): {item.fat}</Text>
          <Text style={styles.nutritionalText}>cals(kcal): {item.cals}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Food() {
  const [checkedItems, setCheckedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  // Get survey results from route params
  const surveyResults = route.params?.surveyResults || {};

  // Define food data for different objectives
  const weightLossFoodData = [
    {
      name: 'Grilled Chicken Salad',
      category: 'Salad',
      carbs: 10,
      protein: 30,
      fat: 5,
      cals: 200,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
     {
      name: 'Plantains',
      category: ' ',
      carbs: 31,
      protein: 1.3,
      fat: 0.4,
      cals: 122,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
    // Add more weight loss food items
    {
      name: 'Waterleaf',
      category: 'vegetable',
      carbs: 3.2,
      protein: 0.2,
      fat: 2.4,
      cals: 22,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
  ]; 

  const weightGainFoodData = [
    {
      name: 'Peanut Butter Smoothie',
      category: 'Smoothie',
      carbs: 30,
      protein: 20,
      fat: 15,
      cals: 400,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
    // Add more weight gain food items
     {
      name: 'Peanuts (Roasted)',
      category: 'grains',
      carbs: 16,
      protein: 49,
      fat: 26,
      cals: 567,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
     {
      name: 'Rice',
      category: 'grain',
      carbs: 28,
      protein: 0.4,
      fat: 2.7,
      cals: 130,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
     {
      name: 'Coconut (grated)',
      category: '',
      carbs: 15,
      protein: 33,
      fat: 3,
      cals: 354,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
     {
      name: 'Dried fish (smoked)',
      category: 'other produce',
      carbs: 0,
      protein: 80,
      fat: 15,
      cals: 380,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
     {
      name: 'Sardines (Canned)',
      category: 'Other produce',
      carbs: 0,
      protein: 25,
      fat: 11,
      cals: 170,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
     {
      name: 'Fufu (Corn or Cassava)',
      category: 'Other produce',
      carbs: 28,
      protein: 0.6,
      fat: 0.1,
      cals: 120,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
  ];

  
  const decreaseStressFoodData = [
    {
      name: 'Dark Chocolate',
      category: 'other produce',
      carbs: 47,
      protein: 11,
      fat: 30,
      cals: 598,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
    // Add more weight loss food items
     {
      name: 'Green Tea',
      category: 'other produce',
      carbs: 0.2,
      protein: 0,
      fat: 0,
      cals: 1,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
     {
      name: 'Bananas',
      category: 'fruit',
      carbs: 23,
      protein: 1.1,
      fat: 0.3,
      cals: 89,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
     {
      name: 'Pineapple',
      category: 'fruit',
      carbs: 13,
      protein: 0.5,
      fat: 0.1,
      cals: 50,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
     {
      name: 'papayas',
      category: 'fruit',
      carbs: 10,
      protein:0.5,
      fat: 0.3,
      cals: 43,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
     {
      name: 'Coconut Water',
      category: 'other produce',
      carbs: 3.7,
      protein: 0.2,
      fat: 0.7,
      cals: 19,
      image: 'https://example.com/grilled-chicken-salad.jpg',
    },
  ];
  const generalFoodData = [
    {
      name: 'Peanut Butter Smoothie',
      category: 'Smoothie',
      carbs: 30,
      protein: 20,
      fat: 15,
      cals: 400,
      image: 'https://example.com/peanut-butter-smoothie.jpg',
    },
    // Add more general food items
  ];

  useEffect(() => {
    if (!surveyResults[0]) {
      setModalMessage('There was an issue with the survey. Please try again.');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        // Navigate to a fallback screen if there's no history to go back
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('Home'); // Replace 'Home' with a default fallback route
        }
      }, 3000); // Show error message for 3 seconds before navigating
    }
  }, [surveyResults, navigation]);

  const handleCheckboxChange = (item, isChecked) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [item.name]: isChecked ? item : undefined,
    }));
  };

  const createMeal = () => {
    if (Object.keys(checkedItems).length === 0) {
      setModalMessage('No food items selected for the meal.');
      setModalVisible(true);
      return;
    }

    setModalMessage('Creating meal...');
    setModalVisible(true);

    setTimeout(() => {
      setModalMessage('Meal created successfully!');
      setTimeout(() => {
        setModalVisible(false);
        const selectedItems = Object.values(checkedItems).filter(item => item !== undefined);

        // Navigate to the Diet tab with a reset navigation state
        navigation.navigate('Diet', { selectedFoodItems: selectedItems });
       {/* navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'DietStack', // This should match the name in TabLayout
                state: {
                  routes: [
                    {
                      name: 'Diet Plan', // This should match the name of the Diet tab
                      state: {
                        routes: [
                          {
                            name: 'Diet', // Ensure this is correctly set
                            params: { selectedFoodItems: selectedItems },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          })
        ); */}
      }, 2000); // Hide modal after 2 seconds
    }, 2000); // Show "Creating meal..." message for 2 seconds
  };

  const objective = surveyResults[0];
  let foodDataToDisplay = [];

  if (objective === 'weight loss') {
    foodDataToDisplay = weightLossFoodData;
  } else if (objective === 'weight gain') {
    foodDataToDisplay = weightGainFoodData;
  } else if (objective === 'decrease stress') {
    foodDataToDisplay = decreaseStressFoodData;
  } 
  else {
    foodDataToDisplay = generalFoodData;
  }

  return (
    <View style={styles.container}>
      {foodDataToDisplay.length > 0 ? (
        <View style={styles.viewcontainer}>
          <FlatList
            data={foodDataToDisplay}
            renderItem={({ item }) => <Fooditem item={item} onChecked={handleCheckboxChange} />}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      ) : (
        <Text>No food items available for the selected objective.</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Create Meal"
          color="#000000"
          accessibilityLabel="CreateMeal Button"
          onPress={createMeal}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableHighlight
              style={styles.modalButton}
              underlayColor="#8DEEEE"
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const imageSize = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'space-between',
  },
  viewcontainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8.5,
    marginBottom: 20,
  },
  fooditem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'lightgreen',
    gap: 8,
    padding: 9,
    borderRadius: 10,
  },
  nutritionalText: {
    fontSize: 11.2,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flatList: {
    flexGrow: 0,
    maxHeight: 300,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  buttonContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 15,
    width: 225,
    alignSelf: 'center',
    marginBottom: 100,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'lightgreen',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Android shadow
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});