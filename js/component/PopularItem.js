import React, {Component, PropTypes} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default class PopularItem extends Component {

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
            iconStart:isCheck? require("../../res/images/ic_unstar_navbar.png")
                :require("../../res/images/ic_unstar_transparent.png"),
        });
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(this.props.rowData+ ""+nextProps.rowData);
    //     if(this.props.rowData!==nextProps.rowData){
    //         this.onLoad(nextProps,true);
    //     }
    // }
    getStartView(){
        return <TouchableOpacity onPress={()=>this.changeStartView(this.props.rowData,this.state.isChecked)}>
            <Image style={{width: 25, height: 25, padding:7,tintColor: "#5b7ee5"}}
                   source={this.state.iconStart}/>
        </TouchableOpacity>
    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>
                this.props.callBackItem(this.props.rowData,this.state.isChecked)}>
            <View style={styles.item_container}>
                    <Text style={{color: '#000', fontSize: 16}}>{this.props.rowData.item.full_name}</Text>
                    <Text style={{color: 'gray', fontSize: 13, marginTop: 5}}>{this.props.rowData.item.description}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {/*<Text>{this.props.rowData.html_url}</Text>*/}
                            <Text style={{color: 'gray', fontSize: 12}}>Author:</Text>
                            <Image style={{width: 18, height: 18, marginLeft: 5, borderRadius: 1}}
                                   source={{uri: this.props.rowData.item.owner.avatar_url}}
                            />
                        </View>

                        {/*Text>{this.props.rowData.owner.login}</Text>*/}
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'gray', fontSize: 12}}>Starts:</Text>
                            <Text style={{color: 'gray', fontSize: 12}}>{this.props.rowData.item.stargazers_count}</Text>
                        </View>
                        {this.getStartView()}
                    </View>
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