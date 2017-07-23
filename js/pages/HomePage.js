/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

var CustomBadgeView = require('../component/CustomBadgeView');
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    render() {
        return (
            <TabNavigator>
                {this.getTabNavigator('home', 'Home', require('../../res/images/ic_polular.png'))}
                {this.getTabNavigator('profile', 'Profile', require('../../res/images/ic_trending.png'))}
                {this.getTabNavigator('love', 'Love', require('../../res/images/ic_favorite.png'))}
                {this.getTabNavigator('me', 'Me', require('../../res/images/ic_my.png'))}
            </TabNavigator>
        );
    }
    getTabNavigator(selectedTab1, Title, iconRes) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab1}
                title={Title}
                selectedTitleStyle={{color:'red'}}
                renderIcon={() => <Image style={styles.image} source={iconRes}/>}
                renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={iconRes}/>}
                renderBadge={() => this.getView()}
                onPress={() => this.setState({selectedTab: selectedTab1})}>
                <View><Text>ddd</Text></View>
            </TabNavigator.Item>
        );
    }

    getView() {
        return <Text style={{color: 'red', fontSize: 14, borderRadius: 7, backgroundColor: 'yellow'}}>e</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: 20,
        height: 20,
    }
})

module.exports = HomePage