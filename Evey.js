import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Alert,
    Image,
} from 'react-native';
var NavigatorBar=require('./js/component/NavigatorBar')
export default class Evey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
        };
    }

    render() {
        return (
            <View style={{flex: 1,flexDirection:'column', backgroundColor: 'white', alignItems: "center"}}>
                <NavigatorBar
                    title={'Evey'}
                    titleColor={{color:"#fff"}}
                    style={{backgroundColor:'#ff7830'}}
                    statusBar={{
                        barStyle:'light-content',
                        hidden:false,
                        backgroundColor:'#caff34'
                    }}
                    leftButton={
                        <Image style={{width:22,height:22,margin:5}} source={require('./res/images/ic_arrow_back_white_36pt.png')}/>
                    }
                    rightButton={
                        <Image  style={{width:22,height:22,margin:5}} source={require('./res/images/ic_star.png')}/>
                    }
                    leftButtonOnPress={()=>this.callBack()}
                />
                <Text>Evey收到：{this.props.word}+{this.state.count}</Text>
                <Text style={{color: 'red', fontSize: 20}} onPress={() => {
                    this.props.onCallBackMessage('巧克力')
                    this.props.navigator.pop();
                }}>送一个巧克力</Text>
                <Text onPress={() => {
                    this.props.navigator.pop();
                 }
                }>return</Text>
            </View>
        );
    }

    _onPress() {
        Alert.alert('click', 'click')
    }
}
module.exports = Evey;