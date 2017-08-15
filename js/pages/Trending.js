import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import DataRepository from '../expand/dao/DataRepository';
import TrendingBar from './TrendingBar';
import ScrollViewTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';
import Popover from '../component/Popover.js';
import TimeSpan from '../model/TimeSpan'
var timeSpanArray=[
    new TimeSpan('today','since=daily'),
    new TimeSpan('this week','since=weekly'),
    new TimeSpan('this month','since=monthly')
]
export default class Trending extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.LanguageDao = new LanguageDao();
        this.state = {
            data: [],
            isVisible: false,
            buttonRect: {},
            timeSpanArrayitem:timeSpanArray[0].searchText,
        };
    }

    onLoad() {
        this.LanguageDao.fetch(FLAG_LAGUAGE.flag_language)
            .then(result => {
                this.setState({
                    data: result,
                })
            }).catch(error => {
            this.setState({
                state: error,
            })
        })

    }

    componentDidMount() {
        this.onLoad();
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
        // Alert.alert("showPopover");
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    getTitleCenterView() {
        return <View>
            <TouchableHighlight  ref="button" onPress={()=>this.showPopover()}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white', fontSize: 16}}>Trending</Text>
                    <Image style={{width: 13, height: 13, marginLeft: 4}}
                           source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </TouchableHighlight>
        </View>
    }

    onSelectTimeSpan(timeSpan){
        //this.showText=showText;
        // this.searchText=searchText;
        // Alert.alert(timeSpan.showText+ timeSpan.searchText);

        this.setState({
            timeSpanArrayitem:timeSpan.searchText,
        });
        this.closePopover();
    }
    render() {
        let content = this.state.data.length > 0 ? <ScrollViewTabView
            tabBarBackgroundColor='#5b7ee5'
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: 'white'}}
            renderTabBar={() => <ScrollableTabBar/>}>
            {this.getContentView()}
        </ScrollViewTabView> : null;

        return (<View style={styles.container}>
            <NavigatorBar
                titleView={this.getTitleCenterView()}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor: '#4862b4', barStyle: 'light-content'}}
                rightButton={
                    <Image style={{width: 22, height: 22, marginRight: 15}}
                           source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                }
                rightButtonOnPress={() => this.RightButtonOnPress()}
            />
            {content}
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement="bottom"
                contentStyle={{backgroundColor:'#2b2b2b',opacity:0.8} }
                onClose={()=>this.closePopover()}>
                {
                    timeSpanArray.map((resule,i,arr)=>{
                        return <TouchableOpacity underlayColor='transparent' key={i} onPress={()=>this.onSelectTimeSpan(arr[i])}>
                            <Text style={{backgroundColor:"#2b2b2b" ,padding:4,color:'white',fontSize:22}}>
                                {arr[i].showText}
                            </Text>
                        </TouchableOpacity>
                    })
                }
            </Popover>
        </View>);
    }

    RightButtonOnPress() {

    }

    getContentView() {
        var views = [];
        for (var i = 0, len = this.state.data.length; i < len; i++) {
            var oneTemp = this.state.data[i];
            if (oneTemp.checked) {
                views.push(<TrendingBar
                    tabLabel={oneTemp.name}
                    timeSpan={this.state.timeSpanArrayitem}
                    key={i}  {...this.props}/>);
            }
        }
        return views;
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
module.exports = Trending;