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
var ListViewTest=require('./ListViewTest')
var FetchTest=require('./FetchTest')
var FetchUtilsTest=require('./FetchUtilsTest')
import {setup} from './js/pages/Setup'
AppRegistry.registerComponent('GHClient', () => setup);
