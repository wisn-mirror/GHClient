import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import DataRepository from '../expand/dao/DataRepository';
import TrendingBar from './TrendingBar';
import ScrollViewTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';

export default class Trending extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.LanguageDao = new LanguageDao();
        this.state = {
            data: [],
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
                title="Trending"
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor: '#4862b4', barStyle: 'light-content'}}
            />
            {content}
        </View>);
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