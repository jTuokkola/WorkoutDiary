import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { WorkoutContext, SettingsContext } from './components/contexts';
import AddExerciseScreen from './components/AddExerciseScreen';
import WorkoutListScreen from './components/WorkoutListScreen';
import SettingsScreen from './components/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [units, setUnits] = useState("kilometers");

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      <SettingsContext.Provider value={{ units, setUnits }}>
        <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Add Exercise") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Workout List") {
              iconName = focused ? "view-list" : "view-list-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          //add additional style options here
          tabBarLabelStyle: { display: "none"},
          headerShown: false,
          tabBarActiveBackgroundColor:"black",
          tabBarInactiveBackgroundColor:"darkgrey",
        })}
        tabBarOptions={{
          activeTintColor: "orange",
          inactiveTintColor: "black",
        }}>
              <Tab.Screen name="Add Exercise" component={AddExerciseScreen} />
              <Tab.Screen name="Workout List" component={WorkoutListScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SettingsContext.Provider>
    </WorkoutContext.Provider>
  );
};

export default App;

