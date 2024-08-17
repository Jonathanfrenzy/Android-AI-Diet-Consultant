// there seems to be an error at the level of expo in the phone. it seems like there is a problem at the level of using props on customdrawer

import React from 'react';
import { Settings, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack'
import { useState, useEffect } from 'react'

//import DrawerComponent from '../screen/Home/drawer';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';


// Import screens
import HomeScreen from '../screen/Home/Homescreen';
import Diet from '../screen/Diet/Diet';
import Notification from '../screen/Notification/Notification';
import CustomDrawerContent from '../screen/Home/drawer'
import Homescreen from '../screen/Home/Homescreen';
import Survey from '../screen/Diet/Survey'
import Chatbot from '../components/chatbot';
import ChatBot from '../components/chatbotv3';
import ContactDietician from '../screen/dietician/ContactDietician';
import SettingScreen from '../screen/Home/Settings'
import Questionaire from '../screen/Diet/Questionaire';
import QuestionContainer from '../components/QuestionContainer';
import { useNavigation } from 'expo-router';
import Tracker from '../screen/Diet/tracker'
import Food from '../screen/Home/Food'
import MealPlan from '@/screen/Diet/mealplan';
import LoginScreen from '@/screen/login_and_authentication/LoginScreen'
import RegisterScreen from '@/screen/login_and_authentication/LoginScreen'
// stacks
const Stack  = createStackNavigator();


// STACKS 

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
const HomeStack =() => {

return(
  <Stack.Navigator>
    <Stack.Screen name=" " component={Homescreen}/>
    <Stack.Screen name="Questionaire" component={Questionaire}/>
    <Stack.Screen name="Food" component={Food}/>
    <Stack.Screen name="Diet" component={Diet}/> 
    <Stack.Screen name="drawer" component={CustomDrawerContent}/>
  </Stack.Navigator>
)
};
const DrawerComponent = () => {
    const Drawer = createDrawerNavigator()
    const navigation = useNavigation()
    const drawerItems = [
        { label:'Settings', screen:'Settings'},
        { label:'Contact Dietician', screen:'contact_dietician'},
        { label:'Log out', screen:'log out'},   
    ]
    return (
      <NavigationContainer independent= {true}>
        <Drawer.Navigator drawerContent={() =><CustomDrawerContent navigation={navigation} drawerItems={drawerItems}/>}
        >
          <Drawer.Screen name="  " component={HomeStack} 
          options={{
            drawerLabelStyle: {
           fontSize: 18,
          fontWeight: 'bold',
         },
    // Add more options as needed
  }}/>  
        </Drawer.Navigator>
      </NavigationContainer>
  );
};

const DrawerStack = () =>(
  <Stack.Navigator>
    <Stack.Screen name = "drawer" component={CustomDrawerContent}/>
    <Stack.Screen name="Settings" component={SettingScreen}/>
  </Stack.Navigator>
)

const DietStack = () =>(
  <Stack.Navigator>
    
    <Stack.Screen name="Diet" component={Diet}/> 
    <Stack.Screen name="Food" component={Food}/> 
  </Stack.Navigator>
 
);

const NotificationStack = ()=>(

  <Stack.Screen name="Notification" component={Notification}/>
);



// color: rgb(162,213,166)
//#e91e63

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Logic to check if the user is authenticated
    // This could be checking a token, a state, etc.
    // For example, simulate authentication check:
    const checkAuth = async () => {
      // Simulate a check
      const userIsAuthenticated = await checkUserAuthentication();
      setIsAuthenticated(userIsAuthenticated);
    };

    checkAuth();
  }, []);

  const checkUserAuthentication = async () => {
    // Replace with your actual authentication logic
    // For example, check if a token exists in storage
    return false; // Assume user is not authenticated for now
  };

  
  //basic conf setup  
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'rgb(70,200,70)',
          tabBarInactiveTintColor:'rgb(185,195,185)',
          
          tabBarLabelStyle: {
            fontSize: 12,
          },
          "tabBarStyle": [{
            backgroundColor: 'white',
          },
         ]
        }}
      >
        <Tab.Screen
          name="home"
          component={DrawerComponent}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={25} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Diet Plan"
          component={DietStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="cutlery" size={25} color={color} />
            ),
          }}
          />
          <Tab.Screen
          name="Chat Bot"
          component={ChatBot}
          options={{
            tabBarIcon: ({ color }) => (
            <FontAwesome6 name="robot" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Progress"
          component={Tracker}
          options={{
            tabBarIcon: ({ color }) => (
            <AntDesign name="areachart" size={24} color={color} />

            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={({ route }) => ({
           tabBarBadge: route.params?.badgeCount > 0 ? route.params.badgeCount : null,
           tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={25} color={color} />
             ),
            })
          }
        />
      </Tab.Navigator>

      

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'blue',
  },
});