import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import ImageScreen from "./Screens/ImageScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegistrationScreen";
import AnnotatorScreen from "./Screens/AnnotatorScreen";
import AnnotationImageScreen from "./Screens/AnnotationImageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />  
        <Stack.Screen name="AnnotatorScreen" component={AnnotatorScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="AnnotationImageScreen" component={AnnotationImageScreen}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
