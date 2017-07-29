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

import DataRepository from '../expand/dao/DataRepository';
import PopularItem from '../component/PopularItem';
import PopularPage from './me/PopularPage';

const URL = 'https://api.github.com/search/repositories?q=';
import ScrollViewTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao, {FLAG_LAGUAGE} from '../expand/dao/LanguageDao';

const SortByKey = '&sort=starts';
export default class PopularBar extends Component {
    constructor(props) {
        super(props);
        this.DataRepository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            isRefresh: true,
        };
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        this.setState({
            isRefresh: true,
        });
        var url = this.getUrl(this.text);
        this.DataRepository.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result),
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isRefresh: false,
                })
                DeviceEventEmitter.emit("showToast", '网络加载成功！');
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                    isRefresh: false,
                })
            })
    }

    getUrl() {
        return URL + this.props.tabLabel + SortByKey;
    }

    callBackItem() {
        console.log("DATA", "   iiii" + rowData + this.props.navigator);
        this.props.navigator.push({
            component: PopularPage,
            props: {
                ...this.props,
            }
        });
    }

    renderRowItem(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.callBackItem} {...this.props}>
                <PopularItem
                    {...this.props}
                    rowData={rowData}
                />
            </TouchableOpacity>
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
                        onRefresh={() => {
                            this.onLoad()
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