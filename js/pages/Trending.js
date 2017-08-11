import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Alert,
    TouchableHighlight,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import DataRepository from '../expand/dao/DataRepository';
import TrendingBar from './TrendingBar';
import ScrollViewTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';
import Popover from '../component/Popover.js';

export default class Trending extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.LanguageDao = new LanguageDao();
        this.state = {
            data: [],
            isVisible: false,
            buttonRect: {},
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
        // this.refs.button.measure((ox, oy, width, height, px, py) => {
        //     this.setState({
        //         isVisible: true,
        //         buttonRect: {x: px, y: py, width: width, height: height}
        //     });
        // });
        Alert.alert("showPopover");
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    render() {
        let content = this.state.data.length > 0 ? <ScrollViewTabView
            tabBarBackgroundColor='#5b7ee5'
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: 'white'}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {this.getContentView()}
        </ScrollViewTabView> : null;

        return (<View style={styles.container}>
            <NavigatorBar
                // title="Trending"
                titleView={
                    <TouchableHighlight ref='button' onPress={this.showPopover}>
                        <Text style={{color: 'white', fontSize: 20}} >Trending</Text>
                    </TouchableHighlight>
                }
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor: '#4862b4', barStyle: 'light-content'}}
                // leftButton={
                //     <Image style={{width: 22, height: 22, margin: 5}}
                //            source={require('../../../res/images/ic_arrow_back_white_36pt.png')}/>
                // }
                rightButton={
                    <Image style={{width: 22, height: 22, marginRight: 15}}
                           source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
                }
                // leftButtonOnPress={() => this.leftButtonOnPress()}
                rightButtonOnPress={() => this.RightButtonOnPress()}
            />
            {content}
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                onClose={this.closePopover}>
                <Text>I'm the content of this popover!</Text>
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