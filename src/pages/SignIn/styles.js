import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  card: {
    width: '98%',
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: 'transparent',
  },    
  actions:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorText:{
    color: 'red',
  }
});

export default styles;