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
    RefreshControl,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import DataRepository from '../expand/dao/DataRepository';
import PopularItem from '../component/PopularItem';
const URL='https://api.github.com/search/repositories?q=';
import ScrollViewTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao  ,{FLAG_LAGUAGE} from '../expand/dao/LanguageDao';
const SortByKey='&sort=starts';
export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.DataRepository=new DataRepository();
        this.LanguageDao=new LanguageDao();
        this.state = {
            data: [],

        };
    }
    onLoad(){
        this.LanguageDao.fetch(FLAG_LAGUAGE.flag_language)
            .then(result=>{
            this.setState({
                data:result,
            })
        }).catch (error=>{
            this.setState({
                state:error,
            })
        })

    }
    componentDidMount(){
        this.onLoad();
    }
    render() {
        let content=this.state.data.length>0?  <ScrollViewTabView
            tabBarBackgroundColor='#5b7ee5'
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor:'white'}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
            {
                this.state.data.map(function (item, index, input) {
                    return item.checked?  <PopularBar key={index} tabLabel={item.name}/>:null;
                })
            }
        </ScrollViewTabView>:null;

        return (<View style={styles.container}>
            <NavigatorBar
                title="最热"
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor:'#4862b4',barStyle:'light-content'}}
            />
            {content}
        </View>);
    }

}
class PopularBar extends Component{
    constructor(props) {
        super(props);
        this.DataRepository=new DataRepository();
        this.state = {
            result: '',
            dataSource:new ListView.DataSource({rowHasChanged:(row1,row2)=>row1!==row2}),
            isRefresh:true,
        };
    }
    componentDidMount(){
        this.onLoad();
    }
    onLoad(){
        this.setState({
            isRefresh:true,
        });
        var url=this.getUrl(this.text);
        this.DataRepository.fetchNetRepository(url)
            .then(result =>{
                this.setState({
                    result:JSON.stringify(result),
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isRefresh:false,
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error),
                    isRefresh:false,
                })
            })
    }
    getUrl(){
        return URL+this.props.tabLabel+SortByKey;
    }
    renderRowItem(rowData){
        return (
            <PopularItem
                rowData={rowData}
            />
        );
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRowItem}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={()=>{this.onLoad()}}
                        colors={['#ff8a56','#5b7ee5','#81c0ff']}
                        tintColor={'#5b7ee5'}
                        title="Loading..."
                    />
                }
            />
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    }
});
module.exports = Popular;