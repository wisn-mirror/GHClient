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
export default class Mine extends Component {
    constructor(props) {
        super(props);
    }

    _onPress(keys){
        Alert.alert("keys:"+keys)
    }
    render() {
        return (<View>
            <NavigatorBar
                title="我的"
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
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Custom_Language,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Sort_Language,{tintColor:"#5b7ee5"},null)}
                <Text style={MineStyle.groutStyle}>Custome Popular keys</Text>
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Custom_Key,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Sort_Key,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Remove_Key,{tintColor:"#5b7ee5"},null)}
                <Text style={MineStyle.groutStyle}>Setting</Text>

                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Custom_Theme,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
                    MORE_MENU.Night_Mode,{tintColor:"#5b7ee5"},null)}
                {ViewUtils.getSettingItem((keys)=>this._onPress(keys),
                    require('../../res/images/ic_trending.png'),
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
