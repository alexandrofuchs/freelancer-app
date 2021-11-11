import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: 'transparent',
  },    
  actions:{
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button:{
    margin: 0, padding: 0,
    width: '100%',
  },
  errorText:{
    color: 'red',
  }
});

export default styles;