import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Alert,
} from 'react-native';

export default class Evey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
        };
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: "center"}}>
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