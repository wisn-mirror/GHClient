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
import TabNavigator from 'react-native-tab-navigator';
var CustomBadgeView=require('./component/CustomBadgeView');
 export  default class Main extends Component {
   constructor(props) {
     super(props);
     this.state = {
         selectedTab:'home',
     };
   }
  render() {
    return (
        <TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="Home"
              renderIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_polular.png') }/>}
              renderSelectedIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_polular.png')} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'home' })}>
              <View style={{backgroundColor:'red'}}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="Profile"
              renderIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_trending.png')} />}
              renderSelectedIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_trending.png')} />}
              renderBadge={() => this.getView()}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
            <View style={{backgroundColor:'green'}}></View>
          </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'love'}
                title="Home"
                renderIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_favorite.png') }/>}
                renderSelectedIcon={() => <Image style={{width:30,height:20,}} source={require('../res/images/ic_favorite.png')} />}
                badgeText="1"
                onPress={() => this.setState({ selectedTab: 'love' })}>
                <View style={{backgroundColor:'gray'}}></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'me'}
                title="Profile"
                renderIcon={() => <Image style={styles.image} source={require('../res/images/ic_my.png')} />}
                renderSelectedIcon={() => <Image style={{width:30,height:20}} source={require('../res/images/ic_my.png')} />}
                renderBadge={() => this.getView()}
                onPress={() => this.setState({ selectedTab: 'me' })}>
                <View style={{backgroundColor:'white'}}></View>
            </TabNavigator.Item>
        </TabNavigator>
    );

  }
     getView(){
         return <Text style={{color:'red',fontSize:14,borderRadius:7,backgroundColor:'yellow'}}>e</Text>
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
    image:{
        width:20,
        height:20,
    }
})

module.exports=Main