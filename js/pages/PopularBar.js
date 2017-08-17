import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    ListView,
    Image,
    DeviceEventEmitter,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import DataRepository, {Flag_storage} from '../expand/dao/DataRepository';
import PopularItem from '../component/PopularItem';
import PopularPage from './me/PopularPage';
import Favorite from '../model/Favorite';
import FavoriteDao from '../expand/dao/FavoriteDao';
const URL = 'https://api.github.com/search/repositories?q=';
const SortByKey = '&sort=starts';
const  favoriteDao=new FavoriteDao("keys");
export default class PopularBar extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository(Flag_storage.flag_popular);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefresh: true,
            keys:[],
        };
    }

    componentDidMount() {
        console.log("lifecycle----componentDidMount")
        this.onLoad(false);
    }
    /*
      componentWillMount(){
        console.log("lifecycle----componentWillMount")
    }
     componentWillUnmount(){
         console.log("lifecycle----componentWillUnmount")
     }

     componentWillReceiveProps(nextProps) {
         console.log("lifecycle----componentWillReceiveProps")
        // this.onLoad(false);
     }

     shouldComponentUpdate(nextProps, nextState) {
         console.log("lifecycle----shouldComponentUpdate")
         return true;
     }
    componentWillUpdate(){
        console.log("lifecycle----componentWillUpdate")

    }
    componentDidUpdate(){
        console.log("lifecycle----componentDidUpdate")

    }

    componentWillUnmount() {
        console.log("lifecycle----componentWillUnmount")

    }
    */

    updateState(data){
        if(!this) return ;
        this.setState(data);
    }
    flushData(result){
        var AllFavorite=[];
        for( var i=0,len=result.items.length;i<len;i++){
            AllFavorite.push(new Favorite(result.items[i],this.getIsFavorite(JSON.stringify(result.items[i].id))))
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(AllFavorite),
        })
    }
    getIsFavorite(item){
        console.log(this.state.keys+ "  "+item)
        for(var i=0,len=this.state.keys.length;i<len;i++){
            if(this.state.keys[i]==item){
                return true;
            }
        }
        return false;
    }
    getFavoriteKeys(data){
        favoriteDao.getFavoriteKeys()
            .then(result=>{
                if(result){
                    console.log("getFavoriteKeys"+result)
                    this.updateState({
                        keys:result,
                    })
                    this.flushData(data);
                }
            })
            .catch(error=>{
                this.flushData(data);
            })

    }
    onLoad(isRefresh) {
        this.setState({
            isRefresh: true,
        });
        var url = this.getUrl();
        this.DataRepository.fetchResponsitory(url, isRefresh)
            .then(result => {
                this.getFavoriteKeys(result);
                this.setState({
                    isRefresh: false,
                })
            })
            .catch(error => {
                this.getFavoriteKeys(error);
                this.setState({
                    isRefresh: false,
                })
            })
    }

    getUrl() {
        return URL + this.props.tabLabel + SortByKey;
    }

    callBackItemB(rowData,isFavorite) {
        this.props.navigator.push({
            component: PopularPage,
            props: {
                ...this.props,
                html_url: rowData.item.html_url,
                title: rowData.item.full_name,
                isFavorite:isFavorite,
                rowData:rowData,
                flag:"keys",
            }
        });
    }

    isFavorite(data, isFavorite) {
        console.log(data.item + isFavorite);
        if(isFavorite){
            favoriteDao.saveFavorite(data.item,data.item.id,null);
        }else{
            favoriteDao.removeFavorite(data.item,data.item.id,null);
        }
    }

    renderRowItem(rowData, sectionID, rowID,
                  RowHighlighted) {
        return (
            <PopularItem
                {...this.props}
                rowData={rowData}
                callBackItem={(item, isFavorite) => this.callBackItemB(item, isFavorite)}
                isFavorite={(item, isFavorite) => this.isFavorite(item, isFavorite)}
            />
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData, sectionID, rowID,
                            RowHighlighted) => this.renderRowItem(rowData, sectionID, rowID,
                    RowHighlighted)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            this.onLoad(false)
                        }}
                        colors={['#ff8a56', '#5b7ee5', '#81c0ff']}
                        tintColor={'#5b7ee5'}
                        title="Loading..."
                    />
                }
            />
        );
    }
}