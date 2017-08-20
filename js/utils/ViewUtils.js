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
} from 'react-native';

import GlobalStyles from "../../res/style/GlobalStyles"
export default class ViewUtils{
    static getSettingItem(callBack,icon,text,tinStyle,expandableIcon){
        return  (<TouchableOpacity onPress={()=>callBack(text)}>
            <View style={{flexDirection:"row",height:48,justifyContent:"space-between",alignItems:"center"}}>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Image style={[{width: 20, height: 20, margin: 5,tintColor:"#5b7ee5"},tinStyle]}
                           source={icon} />
                    <Text style={{fontSize:14, marginLeft:5, color:"black"}}>{text}</Text>
                </View>
                <Image  style={{width: 22, height: 22, margin: 5,tintColor:"#5b7ee5"}}
                        source={expandableIcon?expandableIcon:require('../../res/images/ic_tiaozhuan.png')} />
            </View>
            <View style={GlobalStyles.line}/>
        </TouchableOpacity>)
    }
}