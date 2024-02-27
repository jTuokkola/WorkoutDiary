import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Styles from '../style/Styles';
import { WorkoutContext, SettingsContext } from './contexts';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AddExerciseScreen = () => {
    //retrieve context 
    const { workouts, setWorkouts } = useContext(WorkoutContext);
    const { units } = useContext(SettingsContext);
    
    const [sportType, setSportType] = useState("Running");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState(new Date());

    const handleAddExercise = () => {
        if (!date || !distance || !duration) {
            console.log("missing field")
            Alert.alert("Please fill in all fields");
            return;
        }
    
        if (isNaN(parseFloat(distance)) || isNaN(parseFloat(duration))) {
            console.log("distance or duration is not a number")
            Alert.alert("Distance and duration must be numeric values");
            return;
        }
    
        if (parseFloat(distance) < 0 || parseFloat(duration) < 0) {
            console.log("distance or duration is negative")
            Alert.alert("Distance and duration cannot be negative");
            return;
        }
    
        const distanceInKilometers = units === "miles" ? parseFloat(distance) * 1.60934 : parseFloat(distance);
    
        const newExercise = {
            sportType: sportType,
            distance: distanceInKilometers,
            duration: parseFloat(duration),
            date: date
        };

        // update workout list using setWorkouts provided context
        setWorkouts([...workouts, newExercise]);

        // clear inputs
        setSportType("Running");
        setDistance("");
        setDuration("");
        setDate(new Date());

        console.log("exercise added")
        Alert.alert("exercise added");
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.header}>Workout</Text>
            <View style={Styles.iconContainer}>
                <TouchableOpacity
                    style={[Styles.icon, sportType === "Running" && Styles.selectedIcon]}
                    onPress={() => setSportType("Running")}
                >
                    <MaterialCommunityIcons name="run" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[Styles.icon, sportType === "Cycling" && Styles.selectedIcon]}
                    onPress={() => setSportType("Cycling")}
                >
                    <MaterialCommunityIcons name="bike" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[Styles.icon, sportType === "Swimming" && Styles.selectedIcon]}
                    onPress={() => setSportType("Swimming")}
                >
                    <MaterialCommunityIcons name="swim" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={Styles.input}
                placeholder={`Distance (${units})`}
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
            />
            <TextInput
                style={Styles.input}
                placeholder="Duration (minutes)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
            />
            <DatePicker
                selected={date}
                onChange={(selectedDate) => setDate(selectedDate)}
                dateFormat="MM/dd/yyyy"
                style={Styles.input}
            />
            <TouchableOpacity style={Styles.addExerciseButton} title="Add Exercise" onPress={handleAddExercise}>
            <Text style={Styles.addExerciseText} onPress={handleAddExercise}>Add workout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddExerciseScreen;
