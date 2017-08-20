/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from "../../utils/ViewUtils"
import  {MORE_MENU}from "../../component/MoreMunu"

export default class AboutMe extends Component {
    constructor(props) {
        super(props);

    }
    getParallaxScrollViewConfig(params) {
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.backgroundIcon,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        )

        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: params.avatar,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.name}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.description}
                </Text>
            </View>
        )

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        )

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                <TouchableOpacity onPress={()=>{ this.props.navigator.pop();}}>
                <Image style={{width: 22, height: 22, margin: 5}}
                       source={require('../../../res/images/ic_arrow_back_white_36pt.png')}/>
                </TouchableOpacity>
            </View>
        )
        return config;
    }
    _onPress(keys){
        let targetComponent ,param={
            ...this.props,
            menuType:keys,
        }
        switch (keys){
            case MORE_MENU.Website:
                break;
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.Feedback:
                break;
        }
        if(targetComponent!==null){
            this.props.navigator.push({
                component: targetComponent,
                props:param,
            })
        }else{
            Alert.alert("keys:"+keys)
        }
    }
    render() {
        let renderConfig=this.getParallaxScrollViewConfig({
            'name':"WINTER IS HERE",
            'description':"Game of Thrones",
            'avatar':"https://avatars1.githubusercontent.com/u/10184291?v=4&u=6bcb2b4b6beb4ecc6b1d55a4fbb55afa0863f715&s=400",
            'backgroundIcon':'http://imgsrc.baidu.com/forum/w%3D580/sign=49523a2b9eeef01f4d1418cdd0ff99e0/b5fd9f2bd40735fa1b10cdf694510fb30d240886.jpg',
        });
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                backgroundColor="#5b7ee5"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...renderConfig}
            >
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../../res/images/ic_computer.png'),
                    MORE_MENU.Website,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../../res/images/ic_insert_emoticon.png'),
                    MORE_MENU.About_Author,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../../res/images/ic_feedback.png'),
                    MORE_MENU.Feedback,{tintColor:"#5b7ee5"},null)}
            </ParallaxScrollView>
        )
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems:'center',
        marginTop:Platform.OS==="ios"?10:0,
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        left:10,
        marginTop:Platform.OS==="ios"?10:0,
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});
