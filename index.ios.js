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
    Navigator,
} from 'react-native';
var Main=require("./js/Main")
var Gift = require('./gift');

export default class GHClient extends Component {
    render() {
        return (
            <Gift/>
        );
    }
}
AppRegistry.registerComponent('GHClient', () => GHClient);
