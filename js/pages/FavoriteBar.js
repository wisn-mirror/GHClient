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
import TrendingItem from '../component/TrendingItem';
import PopularItem from '../component/PopularItem';
import PopularPage from './me/PopularPage';
import Favorite from '../model/Favorite';
import FavoriteDao from '../expand/dao/FavoriteDao';
export default class FavoriteBar extends Component {
    constructor(props) {
        super(props);
        this.favoriteDao=new FavoriteDao(this.props.tag);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefresh: true,
            keys:[],
        };
    }

    componentDidMount() {
        this.onLoad(false);
    }
    updateState(data){
        if(!this) return ;
        this.setState(data);
    }
    flushData(result){
        var AllFavorite=[];
        if(this.props.tag==="keys"){
            for( var i=0,len=result.length;i<len;i++){
                AllFavorite.push(new Favorite(result[i],this.getIsFavorite(JSON.stringify(result[i].id))))
            }
        }else{
            for( var i=0,len=result.length;i<len;i++){
                AllFavorite.push(new Favorite(result[i],this.getIsFavorite(JSON.stringify(result[i].contributorsUrl))))
            }
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
        this.favoriteDao.getFavoriteKeys()
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
        this.favoriteDao.getAllItems()
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

    callBackItemB(rowData,isFavorite) {
        if(this.props.tag==="keys"){
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
        }else{
            this.props.navigator.push({
                component: PopularPage,
                props:{
                    ...this.props,
                    html_url:GitHubURL+rowData.item.contributorsUrl,
                    title:rowData.item.fullName,
                    isFavorite:isFavorite,
                    rowData:rowData,
                    flag:"language",
                }
            });
        }

    }

    isFavorite(data, isFavorite) {
        console.log(data.item + isFavorite);
        if(this.props.tag==="keys") {
            if (isFavorite) {
                this.favoriteDao.saveFavorite(data.item, data.item.id, null);
            } else {
                this.favoriteDao.removeFavorite(data.item, data.item.id, null);
            }
            DeviceEventEmitter.emit("updateData_popular");
        }else{
            if(isFavorite){
                this.favoriteDao.saveFavorite(data.item,data.item.contributorsUrl,null);
            }else{
                this.favoriteDao.removeFavorite(data.item,data.item.contributorsUrl,null);
            }
            DeviceEventEmitter.emit("updateData_trending");
        }
        //通知刷新
    }

    renderRowItem(rowData, sectionID, rowID,
                  RowHighlighted) {
        if(this.props.tag==="keys"){
            return (
                <PopularItem
                    {...this.props}
                    rowData={rowData}
                    callBackItem={(item, isFavorite) => this.callBackItemB(item, isFavorite)}
                    isFavorite={(item, isFavorite) => this.isFavorite(item, isFavorite)}
                />
            );
        }else{
            return (
                <TrendingItem
                    {...this.props}
                    rowData={rowData}
                    callBackItem={(item, isFavorite)=>this.callBackItemB(item, isFavorite)}
                    isFavorite={(item, isFavorite) => this.isFavorite(item, isFavorite)}
                />
            );
        }

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