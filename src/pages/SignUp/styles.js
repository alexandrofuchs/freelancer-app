import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    alignItems: 'center',
  },
  card: {
    width: '98%',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'transparent',
  },    
  actions:{
    justifyContent: 'center',
  },
  errorText:{
    color: 'red',
    alignSelf: 'center'
  },
  button:{
    margin: 0, padding: 0,
    width: '100%',
  },
});

export default styles;