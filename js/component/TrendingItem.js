import React, {Component, PropTypes} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import HTMLView from "react-native-htmlview"
export default class TrendingItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static proTypes = {
        callBackItem: PropTypes.func,
    }


    render() {
        // console.log("log"+JSON.stringify(this.props.rowData));
        let description='<p>'+this.props.rowData.description+'</p>'
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>
                this.props.callBackItem(this.props.rowData)
            }>
            <View style={styles.item_container}>
                    <Text style={{color: '#000', fontSize: 16}}>{this.props.rowData.fullName}</Text>
                {/*<Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>{this.props.rowData.description}</Text>*/}
                <HTMLView
                    value={description}
                    onLinkPress={(url)=>{}}
                    stylesheet={{
                        p:{color: '#000', fontSize: 16},
                        a:{color: '#000', fontSize: 16},
                    }}
                />
                {this.getMeta()}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/*<Text>{this.props.rowData.html_url}</Text>*/}
                            <Text style={{color: 'gray', fontSize: 12}}>Build by:</Text>
                            {this.getImageViews()}
                        </View>

                        {/*Text>{this.props.rowData.owner.login}</Text>*/}
                        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                            {/*<Text style={{color: 'gray', fontSize: 12}}>Starts:</Text>*/}
                            {/*<Text style={{color: 'gray', fontSize: 12}}>{this.props.rowData.stargazers_count}</Text>*/}
                        {/*</View>*/}
                        <Image style={{width: 18, height: 18, tintColor: "#5b7ee5"}}
                               source={require('../../res/images/ic_star.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    getImageViews(){
        var views=[];
        for(var i=0,len=this.props.rowData.contributors.length;i<len;i++){
            views.push( <Image key={i} style={{width: 18, height: 18, marginLeft: 3, borderRadius: 2}}
                               source={{uri: this.props.rowData.contributors[i]}}
            />)
        }
        return views;
    }
    getMeta(){
        if(this.props.rowData.meta!==null&&this.props.rowData.meta!==""){
           return  (<Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>{this.props.rowData.meta}</Text>);
        }
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