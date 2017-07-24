import React, {
    Component
} from 'react';
import {
    View,
    Text,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import HomePage from './HomePage'
import Popular from './Popular'
export  default class WelcomePage extends  Component{
    componentDidMount() {
       this.timer= setTimeout(()=>{
            this.props.navigator.resetTo(
                {
                    // component:Popular,
                    component:HomePage,
                }
            )

        },20);
    }

    componentWillUnmount() {
        //清除计时器
        this.timer&&clearTimeout(this.timer);
    }
    render(){
        return <View>
                <NavigatorBar
                    title="WELCOME"
                />
            <Text>Welcome</Text>
        </View>
    }
}
module.exports=WelcomePage;