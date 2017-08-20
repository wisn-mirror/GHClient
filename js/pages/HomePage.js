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
    DeviceEventEmitter,//事件发射器
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast, {DURATION} from 'react-native-easy-toast';
var CustomBadgeView = require('../component/CustomBadgeView');
// var Popular = require('./Popular');
// var Love = require('./Love');
// var Profile = require('./Profile');
// var Me = require('./Me');
import Popular from './Popular';
import Profile from './Profile';
import Love from './Love';
import Favorite from './Favorite';
import WChrome from './WChrome';
import TrendingTest from './TrendingTest';
import Trending from './Trending';
import Me from './Me';
import Mine from './Mine';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'mine',
        };
    }
    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener('showToast',(message)=>{
                this.toast.show(message,DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount() {
        this.listener.remove();
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <TabNavigator>
                {this.getTabNavigator('popular', 'Popular', require('../../res/images/ic_polular.png'), Popular)}
                {this.getTabNavigator('trending', 'Trending', require('../../res/images/ic_trending.png'), Trending)}
                {this.getTabNavigator('favorite', 'Favorite', require('../../res/images/ic_favorite.png'), Favorite)}
                {this.getTabNavigator('mine', 'Mine', require('../../res/images/ic_my.png'), Mine)}
            </TabNavigator>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        );
    }

    getTabNavigator(selectedTab1, Title, iconRes, Component) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab1}
                title={Title}
                selectedTitleStyle={{color: '#5b7ee5'}}
                renderIcon={() => <Image style={styles.image} source={iconRes}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#5b7ee5'}]} source={iconRes}/>}
                renderBadge={() => this.getView()}
                onPress={() => this.setState({selectedTab: selectedTab1})}
            >
                <Component {...this.props}/>
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
