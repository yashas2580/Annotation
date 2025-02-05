import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ImageScreen from "./ImageScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from './RegistrationScreen';
import AnnotatorScreen from "./AnnotatorScreen";
import AnnotationImageScreen from "./AnnotationImageScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="AnnotatorScreen" component={AnnotatorScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
       <Stack.Screen name="AnnotationImageScreen" component={AnnotationImageScreen}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
