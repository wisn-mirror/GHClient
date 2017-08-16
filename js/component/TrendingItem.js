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
        this.state = {
            isChecked:this.props.rowData.isFavorite,
            iconStart:this.props.rowData.isFavorite?require("../../res/images/ic_unstar_navbar.png")
                :require("../../res/images/ic_unstar_transparent.png"),
        };
    }

    static proTypes = {
        callBackItem: PropTypes.func,
        isFavorite:PropTypes.func,
    }
    changeStartView(item,isFavorite){
        this.changeStatus(!isFavorite)
        this.props.isFavorite(item,!isFavorite)
    }
    changeStatus(isCheck){
        this.setState({
            isChecked:isCheck,
            iconStart:isCheck?require("../../res/images/ic_unstar_navbar.png")
                :require("../../res/images/ic_unstar_transparent.png"),
        });
    }
    getStartView(){
        return <TouchableOpacity onPress={()=>this.changeStartView(this.props.rowData,this.state.isChecked)}>
            <Image style={{width: 22, height: 22, padding:4,tintColor: "#5b7ee5"}}
                   source={this.state.iconStart}/>
            </TouchableOpacity>
    }


    render() {
        // console.log("log"+JSON.stringify(this.props.rowData));
        let description='<p>'+this.props.rowData.item.description+'</p>'
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>
                this.props.callBackItem(this.props.rowData,this.state.isChecked)
            }>
            <View style={styles.item_container}>
                    <Text style={{color: '#000', fontSize: 16}}>{this.props.rowData.item.fullName}</Text>
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
                        {this.getStartView()}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    getImageViews(){
        var views=[];
        for(var i=0,len=this.props.rowData.item.contributors.length;i<len;i++){
            views.push( <Image key={i} style={{width: 18, height: 18, marginLeft: 3, borderRadius: 2}}
                               source={{uri: this.props.rowData.item.contributors[i]}}
            />)
        }
        return views;
    }
    getMeta(){
        if(this.props.rowData.item.meta!==null&&this.props.rowData.item.meta!==""){
           return  (<Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>{this.props.rowData.item.meta}</Text>);
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