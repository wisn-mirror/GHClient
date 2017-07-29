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
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import DataRepository from '../expand/dao/DataRepository';
import PopularBar from './PopularBar';
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
            renderTabBar={()=><ScrollableTabBar  {...this.props}/>
            }
        >
            {
                this.state.data.map(function (item, index, input) {
                    return item.checked?  <PopularBar  {...this.props}  key={index} tabLabel={item.name} />:null;
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    }
});
module.exports = Popular;