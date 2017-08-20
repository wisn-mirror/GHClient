/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, {Component} from 'react';
import {
    View,
    Clipboard,
    Alert,
} from 'react-native';

import ViewUtils from "../../utils/ViewUtils"
import WebViewPage from "./WebViewPage"
import  {MORE_MENU} from "../../component/MoreMunu"
import AboutComment ,{Flag_About}from './AboutComment'

const Flag={
    REPOSITORY:'open source Project',
    Blog:{
        name:'blog',
        items:{
            github1:{
                title:"github",
                url:"https://github.com/wisn-mirror",
            },
            github2:{
                title:"github1",
                url:"https://github.com/wisn-mirror",
            }
        }
    },
    Email:{
        name:'email',
        items:{
            QQ:{
                title:"qq",
                account:"1136465066",
            },
            email:{
                title:"email",
                account:"wuyishun_kmk@outlook.com",
            }
        }
    }
}
export default class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.aboutComment=new AboutComment(props,(dic)=>this.updateState(dic),Flag_About.flag_about)
        this.state={
           showBlog:false,
           showEmail:false,
        }
    }
    updateState(dic){
        this.setState(dic)
    }

    changeEmail(){
        this.setState({
            showEmail:!this.state.showEmail,
        })
    }
    changeBlag(){
        this.setState({
            showBlog:!this.state.showBlog,
        })
    }
    render() {
        let renderConfig={
            'name':"WINTER IS HERE",
            'description':"Game of Thrones",
            'avatar':"https://avatars1.githubusercontent.com/u/10184291?v=4&u=6bcb2b4b6beb4ecc6b1d55a4fbb55afa0863f715&s=400",
            'backgroundIcon':'http://imgsrc.baidu.com/forum/w%3D580/sign=49523a2b9eeef01f4d1418cdd0ff99e0/b5fd9f2bd40735fa1b10cdf694510fb30d240886.jpg',
        };
        let content=<View>
            {ViewUtils.getSettingItem(()=>this.changeBlag(),
                require('../../../res/images/ic_computer.png'),
                Flag.Blog.name,{tintColor:"#5b7ee5"},this.state.showBlog?
                    require('../../../res/images/ic_tiaozhuan_down.png'):
                    require('../../../res/images/ic_tiaozhuan_up.png'))}
            {this.state.showBlog?this.getContentView(Flag.Blog.items,true):null}
            {ViewUtils.getSettingItem(()=>this.changeEmail(),
                require('../../../res/images/ic_insert_emoticon.png'),
                Flag.Email.name,{tintColor:"#5b7ee5"},this.state.showEmail?
                    require('../../../res/images/ic_tiaozhuan_down.png'):
                    require('../../../res/images/ic_tiaozhuan_up.png')
                )}
            {this.state.showEmail?this.getContentView(Flag.Email.items,false):null}

        </View>

        return this.aboutComment.aboutContent(content,renderConfig);
    }
    getContentView(data,isShowBlog){
        if(!data)return ;
        let views=[];
        for(let i in data){
            var title=isShowBlog?data[i].title:data[i].title+data[i].account;
            views.push(ViewUtils.getSettingItem(()=>this._onPress(data[i]),
                    null,
                title,{tintColor:"#5b7ee5"},null,i))
        }
        return views;
    }
    _onPress(keys){
        switch(keys.title){
            case "qq":
                Clipboard.setString(keys.account);
                Alert.alert("qq已经复制到剪切板了");
                break;
            case "email":
                Clipboard.setString(keys.account);
                Alert.alert("email已经复制到剪切板了");
                break;

        }
    }
}
