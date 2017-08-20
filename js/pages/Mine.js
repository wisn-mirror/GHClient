import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import CustomKeyPage from './me/CustomKeyPage';
import SortCustomKeyPage from './me/SortCustomKeyPage';
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';
import GlobalStyles from "../../res/style/GlobalStyles"
import  {MORE_MENU}from "../component/MoreMunu"
import ViewUtils from "../utils/ViewUtils"
import AboutMe from "./me/AboutMe"
export default class Mine extends Component {
    constructor(props) {
        super(props);
    }

    _onPress(keys){
        let targetComponent ,param={
            ...this.props,
            menuType:keys,
        }
        switch (keys){
            case MORE_MENU.GitHub_Popular:
                targetComponent=AboutMe;
                break;
            case MORE_MENU.Custom_Language:
                targetComponent=CustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_language;
                param.isRemoveKeyValue=false;
                break;
            case MORE_MENU.Sort_Language:
                targetComponent=SortCustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_language;
                param.isRemoveKeyValue=false;
                break;
            case MORE_MENU.Remove_Language:
                targetComponent=CustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_language;
                param.isRemoveKeyValue=true;
                break;
            case MORE_MENU.Custom_Key:
                targetComponent=CustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_key;
                param.isRemoveKeyValue=false;
                break;
            case MORE_MENU.Sort_Key:
                targetComponent=SortCustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_key;
                param.isRemoveKeyValue=false;
                break;
            case MORE_MENU.Remove_Key:
                targetComponent=CustomKeyPage;
                param.language_flag=FLAG_LAGUAGE.flag_key;
                param.isRemoveKeyValue=true;
                break;
            case MORE_MENU.Night_Mode:
                break;
            case MORE_MENU.Custom_Theme:
                break;
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.About:
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
        return (<View>
            <NavigatorBar
                title="Mine"
                titleStyle={{color: 'white'}}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
            />
            <ScrollView>
                <TouchableOpacity onPress={()=>this._onPress(MORE_MENU.GitHub_Popular)}>
                <View style={{flexDirection:"row",height:100,justifyContent:"space-between",alignItems:"center"}}>
                    <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Image style={{width: 28, height: 28, margin: 5,tintColor:"#5b7ee5"}}
                                  source={require('../../res/images/ic_trending.png')} />
                    <Text style={{fontSize:16, color:"#5b7ee5"}}>{MORE_MENU.GitHub_Popular}</Text>
                    </View>
                    <Image  style={{width: 22, height: 22, margin: 5,tintColor:"#5b7ee5"}}
                            source={require('../../res/images/ic_tiaozhuan.png')} />
                </View>
                <View style={GlobalStyles.line}/>
                </TouchableOpacity>
                <Text style={MineStyle.groutStyle}>Custome trending language</Text>
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_custom_language.png'),
                    MORE_MENU.Custom_Language,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_swap_vert.png'),
                    MORE_MENU.Sort_Language,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_remove.png'),
                    MORE_MENU.Remove_Language,{tintColor:"#5b7ee5"},null)}
                <Text style={MineStyle.groutStyle}>Custome Popular keys</Text>
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_custom_language.png'),
                    MORE_MENU.Custom_Key,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_swap_vert.png'),
                    MORE_MENU.Sort_Key,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_remove.png'),
                    MORE_MENU.Remove_Key,{tintColor:"#5b7ee5"},null)}
                <Text style={MineStyle.groutStyle}>Setting</Text>

                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_view_quilt.png'),
                    MORE_MENU.Custom_Theme,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_brightness.png'),
                    MORE_MENU.Night_Mode,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_insert_emoticon.png'),
                    MORE_MENU.About_Author,{tintColor:"#5b7ee5"},null)}
            </ScrollView>
        </View>)
    }
}

const MineStyle = StyleSheet.create({
    groutStyle: {
        color:'gray',
        fontSize:13,
        textAlign:"left",
        paddingLeft:5,
        paddingTop:8,
        height:30,
        backgroundColor:"#e9e9e9"
    }
})
