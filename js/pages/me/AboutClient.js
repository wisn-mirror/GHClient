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
    Linking,
} from 'react-native';

import ViewUtils from "../../utils/ViewUtils"
import WebViewPage from "./WebViewPage"
import  {MORE_MENU} from "../../component/MoreMunu"
import AboutComment ,{Flag_About}from './AboutComment'
export default class AboutClient extends Component {
    constructor(props) {
        super(props);
        this.aboutComment=new AboutComment(props,(dic)=>this.updateState(dic),Flag_About.flag_about_me)
    }
    updateState(dic){
        this.setState(dic)
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
                targetComponent=WebViewPage;
                param.url="https://github.com/wisn-mirror";
                param.title="Wisn";
                break;
            case MORE_MENU.Feedback:
                var url="https://github.com/wisn-mirror";
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
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
        let renderConfig={
            'name':"WINTER IS HERE",
            'description':"Game of Thrones",
            'avatar':"https://avatars1.githubusercontent.com/u/10184291?v=4&u=6bcb2b4b6beb4ecc6b1d55a4fbb55afa0863f715&s=400",
            'backgroundIcon':'http://imgsrc.baidu.com/forum/w%3D580/sign=49523a2b9eeef01f4d1418cdd0ff99e0/b5fd9f2bd40735fa1b10cdf694510fb30d240886.jpg',
        };
        let content=<View>
            {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                require('../../../res/images/ic_computer.png'),
                MORE_MENU.Website,{tintColor:"#5b7ee5"},null)}
            {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                require('../../../res/images/ic_insert_emoticon.png'),
                MORE_MENU.About_Author,{tintColor:"#5b7ee5"},null)}
            {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                require('../../../res/images/ic_feedback.png'),
                MORE_MENU.Feedback,{tintColor:"#5b7ee5"},null)}
        </View>

        return this.aboutComment.aboutContent(content,renderConfig);
    }
}
