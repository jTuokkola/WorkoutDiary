import React, { createContext, useState } from 'react';

export const WorkoutContext = createContext();

export const SettingsContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const SettingsProvider = ({ children }) => {
  const [units, setUnits] = useState('kilometers');

  return (
    <SettingsContext.Provider value={{ units, setUnits }}>
      {children}
    </SettingsContext.Provider>
  );
};
