/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Image,
} from 'react-native';
 export  default class CustomBadgeView extends Component {
   constructor(props) {
     super(props);

   }
  render() {
    return (
        <Text style={styles.text}>3</Text>
    );

  }
}

const styles = StyleSheet.create({
  text: {
   color:'red',
      fontSize:10,
  },

});