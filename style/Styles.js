import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  WoutHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  workoutItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'lightgreen',
  },
  workoutType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDate: {
    fontSize: 14,
    color: '#888',
  },
  expandedInfo: {
    marginTop: 10,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: 'black',
  },
  containerTwo: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '178px',
    maxWidth: '500px',
    color: 'white',
  },
  addExerciseButton: {
    backgroundColor: 'lightgreen',
    padding: 6,
    borderRadius: 5,
    marginTop: 10,
    width: '150px',
  },
  addExerciseText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  selectedIcon: {
    backgroundColor: 'orange',
  },
  totalIcon: {
    backgroundColor: 'black',
  },
  removeIconWrapper: {
    width: 24, //match the width of the trash icon
  },
});

export default Styles;
