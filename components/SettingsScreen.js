import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SettingsContext } from './contexts';
import { RadioButton } from 'react-native-paper';
import Styles from '../style/Styles';

const SettingsScreen = () => {
  const { units, setUnits } = useContext(SettingsContext);

  return (
    <View style={Styles.containerTwo}>
      <Text style={Styles.WoutHeader}>Settings</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton
          value="kilometers"
          status={units === "kilometers" ? "checked" : "unchecked"}
          onPress={() => setUnits("kilometers")}
          color="orange"
          uncheckedColor="white"
        />
        <Text style={{color:"white"}}>Kilometers</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton
          value="miles"
          status={units === "miles" ? "checked" : "unchecked"}
          onPress={() => setUnits("miles")}
          color="orange"
          uncheckedColor="white"
        />
        <Text style={{color:"white"}}>Miles</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
