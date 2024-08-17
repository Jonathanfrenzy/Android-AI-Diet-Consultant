// DrawerComponent.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import {Text, View, StyleSheet} from 'react-native';

// Import screens
import Settings from './Settings';
import ContactDietician from '../dietician/ContactDietician';

import { useNavigation } from 'expo-router';

// <Drawer.Screen name="Contact Dietician" component={contact_dietician} />
const Drawer = createDrawerNavigator();

const CustomDrawerContent = () => {
  const navigation= useNavigation()
  const handleCustomAction = () => {
    // Implement custom action here
    console.log('Custom action performed!');
    // For example, navigate to a specific screen
    navigation.navigate('Change Language');
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawer}>
      <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Change Language"
        onPress={() => navigation.navigate('Change Language')}
      />
      <DrawerItem
        label="Contact Dietician"
        onPress={() => navigation.navigate('ContactDietician')}
      />
      <DrawerItem
        label="Log Out"
        onPress={() => navigation.navigate('Log Out')}
      />

      {/* Custom button */}
      <DrawerItem
        label="Custom Action"
        onPress={handleCustomAction}
      />
    </DrawerContentScrollView>
  );
};

const DrawerComponent = () => {
  return (
    <NavigationContainer independent= {true}>
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Settings" component={settings} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};



const styles= StyleSheet.create({
  container:{},
  drawer:{
    backgroundColor:'white'
  },
})

export default CustomDrawerContent;
