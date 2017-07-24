import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";

export default class Love extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
    }

    render() {
        return (<View style={styles.container}>
            <NavigatorBar
                title="最热"
            />
            <Text>获取数据</Text>
            <Text>result:{this.state.result}</Text>
        </View>);
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    }
});
module.exports = Love;