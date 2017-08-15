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
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';

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
                        language_flag:FLAG_LAGUAGE.flag_key,
                    },
                })
            }}>customkeypage</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: CustomKeyPage,
                    props:{
                        ...this.props,
                        isRemoveKeyValue: true,
                        language_flag:FLAG_LAGUAGE.flag_key,
                    },
                })
            }} style={{marginTop: 10}}>Removekeypage</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: CustomKeyPage,
                    props: {
                        ...this.props,
                        isRemoveKeyValue: false,
                        language_flag:FLAG_LAGUAGE.flag_language,
                    },
                })
            }}  style={{marginTop: 30}}>custom language page</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: CustomKeyPage,
                    props:{
                        ...this.props,
                        isRemoveKeyValue: true,
                        language_flag:FLAG_LAGUAGE.flag_language,
                    },
                })
            }} style={{marginTop: 10}}>Remove language page</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: SortCustomKeyPage,
                    props: {
                        ...this.props,
                        language_flag:FLAG_LAGUAGE.flag_key,
                    },

                })
            }}
                  style={{marginTop: 30}}>Sortcustomkeypage</Text>
            <Text onPress={() => {
                this.props.navigator.push({
                    component: SortCustomKeyPage,
                    props: {
                        ...this.props,
                        language_flag:FLAG_LAGUAGE.flag_language,
                    },
                })
            }}
                  style={{marginTop: 10}}>Sortcustom language page</Text>
        </View>)
    }
}

module.exports = Me;