/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Navigator,
} from 'react-native';

var Wisn = require('./Wisn');
export default class Gift extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: Wisn,
                }
                }
                renderScene={(route, navigator1) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator1}/>
                }}
            />
        );
    }
}
module.exports = Gift;