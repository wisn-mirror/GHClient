import React, {
    Component
} from 'react';
import {
    ListView,
    RefreshControl,
} from 'react-native';

import DataRepository ,{Flag_storage} from '../expand/dao/DataRepository';
import TrendingItem from '../component/TrendingItem';
import PopularPage from './me/PopularPage';
const URL = 'https://github.com/trending/';
const GitHubURL = 'https://github.com';
const SortByKey ='?since=daily';
import Favorite from '../model/Favorite';
import FavoriteDao from '../expand/dao/FavoriteDao';
const  favoriteDao=new FavoriteDao("language");
export default class TrendingBar extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository(Flag_storage.flag_trending);
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefresh: true,
            keys:[],
        };
    }

    componentDidMount() {
        this.onLoad(this.props.timeSpan,false);
    }
    updateState(data){
        if(!this) return ;
        this.setState(data);
    }
    /**
     * 收到props属性的时候
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        console.log(this.props.timeSpan+ ""+nextProps.timeSpan);
        if(this.props.timeSpan!==nextProps.timeSpan){
            this.onLoad(nextProps,true);
        }
    }
    flushData(result){
        var AllFavorite=[];
        for( var i=0,len=result.length;i<len;i++){
            // console.log("flushData"+i+JSON.stringify(result[i]))
            AllFavorite.push(new Favorite(result[i],this.getIsFavorite(JSON.stringify(result[i].contributorsUrl))))
        }
        this.setState({
            result: JSON.stringify(result),
            dataSource: this.state.dataSource.cloneWithRows(AllFavorite),
        })
    }
    getIsFavorite(item){
        for(var i=0,len=this.state.keys.length;i<len;i++){
            // console.log("getIsFavorite"+this.state.keys[i]+ ""+item)
            if(this.state.keys[i]==item){
                return true;
            }
        }
        return false;
    }
    getFavoriteKeys(data){
        // console.log("trending getFavoriteKeys"+data)
        favoriteDao.getFavoriteKeys()
            .then(result=>{
                if(result){
                    // console.log("trending getFavoriteKeys"+result)
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

    onLoad(timeSpan,isRefresh) {
        this.setState({
            isRefresh: true,
        });
        var url = this.getUrl(timeSpan);
        console.log("getUrl:"+url);
        this.DataRepository.fetchResponsitory(url,isRefresh)
            .then(result => {
                this.getFavoriteKeys(result);
                this.setState({
                   isRefresh: false,
                })
            })
            .catch(error => {
                // console.log("error:"+JSON.stringify(error));
                this.getFavoriteKeys(error);
                this.setState({
                    isRefresh: false,
                })
            })
    }

    getUrl(timeSpan) {
        return URL + this.props.tabLabel + "?"+timeSpan;
    }

    callBackItemB(rowData,isFavorite) {
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

    isFavorite(data, isFavorite) {
        console.log(data.item + isFavorite);
        if(isFavorite){
            favoriteDao.saveFavorite(data.item,data.item.contributorsUrl,null);
        }else{
            favoriteDao.removeFavorite(data.item,data.item.contributorsUrl,null);
        }
    }
    renderRowItem(rowData,sectionID,rowID,
                  RowHighlighted) {
        return (
                <TrendingItem
                    {...this.props}
                    rowData={rowData}
                    callBackItem={(item, isFavorite)=>this.callBackItemB(item, isFavorite)}
                    isFavorite={(item, isFavorite) => this.isFavorite(item, isFavorite)}
                />
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData,sectionID,rowID,
                    RowHighlighted)=>this.renderRowItem(rowData,sectionID,rowID,
                    RowHighlighted)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            this.onLoad(this.props.timeSpan,false)
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