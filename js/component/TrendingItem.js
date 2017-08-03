import React, {Component, PropTypes} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default class TrendingItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static proTypes = {
        callBackItem: PropTypes.func,
    }


    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>
                this.props.callBackItem(this.props.rowData)
            }>
            <View style={styles.item_container}>
                    <Text style={{color: '#000', fontSize: 16}}>{this.props.rowData.fullName}</Text>
                    {/*<Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>{this.props.rowData.description}</Text>*/}
                    {/*<View*/}
                        {/*style={{*/}
                            {/*flexDirection: 'row',*/}
                            {/*justifyContent: 'space-between',*/}
                            {/*alignItems: 'center',*/}
                            {/*marginTop: 5*/}
                        {/*}}>*/}
                        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                            {/*/!*<Text>{this.props.rowData.html_url}</Text>*!/*/}
                            {/*<Text style={{color: 'gray', fontSize: 12}}>Author:</Text>*/}
                            {/*<Image style={{width: 18, height: 18, marginLeft: 5, borderRadius: 1}}*/}
                                   {/*source={{uri: this.props.rowData.owner.avatar_url}}*/}
                            {/*/>*/}
                        {/*</View>*/}

                        {/*/!*Text>{this.props.rowData.owner.login}</Text>*!/*/}
                        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                            {/*<Text style={{color: 'gray', fontSize: 12}}>Starts:</Text>*/}
                            {/*<Text style={{color: 'gray', fontSize: 12}}>{this.props.rowData.stargazers_count}</Text>*/}
                        {/*</View>*/}
                        {/*<Image style={{width: 18, height: 18, tintColor: "#5b7ee5"}}*/}
                               {/*source={require('../../res/images/ic_star.png')}/>*/}
                    {/*</View>*/}
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    item_container: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
        borderRadius: 1,
        shadowColor: '#c5c5c5',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,


    }
})

module.exports = TrendingItem;