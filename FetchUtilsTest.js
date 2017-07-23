import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Alert,
    Image,
} from 'react-native';
import HttpUtils from "./js/utils/HttpUtils";

var NavigatorBar = require('./js/component/NavigatorBar')
export default class FetchUtilsTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
    }

    onLoadData(Url) {
       /* fetch(Url)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    result: JSON.stringify(result),
                })
            }).catch(error => {
            this.setState({
                result: JSON.stringify(error),
            })
        })*/
        HttpUtils.get(Url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result),
                })
            }).catch(error => {
            this.setState({
                result: JSON.stringify(error),
            })
        })

    }
    onSubmitData(url,data){
       /* fetch(url,{
            method:'POST',
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=>response.json())
            .then(result=>{
                this.setState({
                    result: JSON.stringify(result),
                })
            }).catch (error=>{
            this.setState({
                result: JSON.stringify(error),
            })
        });*/
       HttpUtils.Post(url,data)
           .then(result=>{
               this.setState({
                   result: JSON.stringify(result),
               })
           })
           .catch(error=>{
               this.setState({
                   result: JSON.stringify(error),
               })
           })
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', alignItems: "center"}}>
                <NavigatorBar
                    title={'FetchUtilsTest'}
                    titleColor={{color: "#fff"}}
                    style={{backgroundColor: '#ff7830'}}
                    statusBar={{
                        barStyle: 'light-content',
                        hidden: false,
                        backgroundColor: '#caff34'
                    }}
                    leftButton={
                        <Image style={{width: 22, height: 22, margin: 5}}
                               source={require('./res/images/ic_arrow_back_white_36pt.png')}/>
                    }
                    rightButton={
                        <Image style={{width: 22, height: 22, margin: 5}} source={require('./res/images/ic_star.png')}/>
                    }
                    leftButtonOnPress={() => this.callBack()}
                />
                <Text style={{color: 'red', fontSize: 20, marginTop: 10}} onPress={() => {
                    this.onLoadData('http://rap.taobao.org/mockjsdata/11793/test')
                }}>获取数据</Text>
                <Text style={{color: 'red', fontSize: 20, marginTop: 10}} onPress={() => {
                    this.onSubmitData('http://rap.taobao.org/mockjsdata/11793/submit',{'userName':'wisn','password':'123wiwiw'} )
                }}>Post提交数据</Text>
                <Text>数据结果：{this.state.result}</Text>
            </View>
        );
    }
    callBack() {
        Alert.alert("回调", "回调");
    }
}
module.exports = FetchUtilsTest;