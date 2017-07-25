import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import CustomKeyPage from './me/CustomKeyPage';
export default class Me extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View>
            <NavigatorBar
                title="我的"
                titleStyle={{color:'white'}}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
            />
            <Text onPress={() => {
                this.props.navigator.push({
                   component:CustomKeyPage,
                    params:{...this.props},
                })
            }}>customkeypage</Text>

        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});
module.exports = Me;