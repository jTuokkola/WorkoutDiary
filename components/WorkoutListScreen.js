import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import Styles from '../style/Styles';
import { WorkoutContext } from './contexts';
import { SettingsContext } from './contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WorkoutListScreen = () => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const { units } = useContext(SettingsContext);
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);

  const handleWorkoutPress = (index) => {
    setExpandedWorkoutIndex(expandedWorkoutIndex === index ? null : index);
  };

  // convert distance based on units in settings
  const convertDistance = (distance) => {
    if (units === 'miles') {
      return (distance * 0.621371).toFixed(2);
    } else {
      return distance.toFixed(2);
    }
  };

  // render distance with units
  const renderDistance = (distance) => {
    return `${convertDistance(distance)} ${units}`;
  };

   // format date to display only the date without the time
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    // remove the workout at the specified index
    updatedWorkouts.splice(index, 1);
    // update the context with the updated array
    setWorkouts(updatedWorkouts);
  };

  const renderIcon = (sportType) => {
    switch (sportType) {
      case "Running":
        return <MaterialCommunityIcons name="run" size={24} color="black" />;
      case "Cycling":
        return <MaterialCommunityIcons name="bike" size={24} color="black" />;
      case "Swimming":
        return <MaterialCommunityIcons name="swim" size={24} color="black" />;
      default:
        return null;
    }
  };
  
  // render added workout
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleWorkoutPress(index)}>
      <View style={Styles.workoutItem}>
        <View style={Styles.iconContainer}>{renderIcon(item.sportType)}</View>
        <Text style={Styles.workoutType}>{item.sportType}</Text>
        <Text style={Styles.workoutDate}>{formatDate(item.date)}</Text>
        {expandedWorkoutIndex === index && (
          <View style={Styles.expandedInfo}>
            <Text>Distance: {renderDistance(item.distance)}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            {/* remove workout button */}
            <View style={Styles.removeIconWrapper}>
              <TouchableOpacity onPress={() => handleRemoveWorkout(index)} style={Styles.removeIconContainer}>
                <MaterialCommunityIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.containerTwo}>
      <Text style={Styles.WoutHeader}>Workout List</Text>
      {workouts.length === 0 ? (
        <Text style={{ color: "red" }}>No workouts added</Text>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default WorkoutListScreen;
