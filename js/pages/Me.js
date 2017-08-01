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
import SortCustomKeyPage from './me/SortCustomKeyPage';

export default class Me extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<View>
            <NavigatorBar
                title="我的"
                titleStyle={{color: 'white'}}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
            />
            <Text onPress={() => {
                this.props.navigator.push({
                    component: CustomKeyPage,
                    props: {
                        ...this.props,
                        isRemoveKeyValue: false,
                    },
                })
            }}>customkeypage</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: CustomKeyPage,
                    props:{
                        ...this.props,
                        isRemoveKeyValue: true,
                    },
                })
            }} style={{marginTop: 10}}>Removekeypage</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: SortCustomKeyPage,
                    props: {...this.props},
                })
            }}
                  style={{marginTop: 10}}>Sortcustomkeypage</Text>
        </View>)
    }
}

module.exports = Me;