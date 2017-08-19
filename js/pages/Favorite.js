import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import FavoriteBar from './FavoriteBar';
import ScrollViewTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class Favorite extends Component {
    constructor(props) {
        super(props);
    }

    onLoad() {
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {

        let content =<ScrollViewTabView
            tabBarBackgroundColor='#5b7ee5'
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor: 'white'}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {this.getContentView()}
        </ScrollViewTabView>;

        return (<View style={styles.container}>
            <NavigatorBar
                title="Favorite"
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
        views.push(<FavoriteBar
            tabLabel={"Popular"}
            tag={"keys"}
            key={0}  {...this.props}/>);
        views.push(<FavoriteBar
            tabLabel={"Trending"}
            tag={"language"}
            key={1}  {...this.props}/>);
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
