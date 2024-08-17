import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Food from '@/screen/Home/Food'


const MealPlan = ({ title, items, isExpanded, toggleExpand }) => {
  const navigation = useNavigation()

  const FoodList=()=>(
    navigation.navigate('Food')
  )
  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
      <Animated.View style={[styles.container, { height: isExpanded ? 'auto' : 100 }]}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress ={FoodList}>
              <MaterialIcons name="update" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{item.name}</Text>
              <Text>{item.calories} kcal</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MealPlan;
