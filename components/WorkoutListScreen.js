import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import Styles from '../style/Styles';
import { WorkoutContext } from './contexts';
import { SettingsContext } from './contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WorkoutListScreen = () => {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const { units } = useContext(SettingsContext);
  const [totalDistances, setTotalDistances] = useState({ Running: 0, Cycling: 0, Swimming: 0 });
  const [expandedWorkoutIndex, setExpandedWorkoutIndex] = useState(null);

  const handleWorkoutPress = (index) => {
    setExpandedWorkoutIndex(expandedWorkoutIndex === index ? null : index);
  };

  useEffect(() => {
    //total distances for each sport type
    const distances = {
      Running: calculateTotalDistance("Running"),
      Cycling: calculateTotalDistance("Cycling"),
      Swimming: calculateTotalDistance("Swimming")
    };
    setTotalDistances(distances);
  }, [workouts]);

  const calculateTotalDistance = (sportType) => {
    return workouts
      .filter((workout) => workout.sportType === sportType)
      .reduce((total, workout) => total + workout.distance, 0);
  };

  // convert distances based on units in settings
  const convertDistance = (distance) => {
    if (units === "miles") {
      return (distance * 0.621371).toFixed(2);
    } else {
      return distance.toFixed(2);
    }
  };

  // render distance with units
  const renderDistance = (distance) => {
    return `${convertDistance(distance)} ${units}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    // remove the workout at the specified index
    updatedWorkouts.splice(index, 1);
    // update context with the updated array
    setWorkouts(updatedWorkouts);
  };

  //render icon for added workout
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
  
  const getIconName = (sportType) => {
    switch (sportType) {
      case "Running":
        return "run";
      case "Cycling":
        return "bike";
      case "Swimming":
        return "swim";
      default:
        return "";
    }
  };
  //render icons with total distance
  const renderTotalIcon = (sportType) => {
    const totalDistance = totalDistances[sportType];
    const distanceAbbreviation = units === "miles" ? "mi" : "km";
    return (
      <TouchableOpacity style={[Styles.icon, sportType === "Running" && Styles.totalIcon, sportType==="Swimming" && Styles.totalIcon, sportType==="Cycling" && Styles.totalIcon ]}>
        <MaterialCommunityIcons name={getIconName(sportType)} size={30} color="white" />
        <Text style={{color:"white", fontWeight:"bold"}}>{`${convertDistance(totalDistance)} ${distanceAbbreviation}`}</Text>
      </TouchableOpacity>
    );
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
      <View style={Styles.iconContainer}>
        {renderTotalIcon("Running")}
        {renderTotalIcon("Cycling")}
        {renderTotalIcon("Swimming")}
      </View>
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
