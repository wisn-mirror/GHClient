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

import DataRepository ,{Flag_storage} from '../expand/dao/DataRepository';
import PopularItem from '../component/PopularItem';
import PopularPage from './me/PopularPage';

const URL = 'https://api.github.com/search/repositories?q=';
const SortByKey = '&sort=starts';
export default class TrendingBar extends Component {
    constructor(props) {
        super(props);

        this.DataRepository = new DataRepository(Flag_storage.flag_popular);
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
        var url = this.getUrl();
        this.DataRepository.fetchResponsitory(url)
            .then(result => {
                this.setState({
                    result: JSON.stringify(result),
                    dataSource: this.state.dataSource.cloneWithRows(result.items),
                    isRefresh: false,
                })
                // DeviceEventEmitter.emit("showToast", '网络加载成功！');
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

    callBackItemB(rowData) {
        this.props.navigator.push({
            component: PopularPage,
            props:{
                ...this.props,
                html_url:rowData.html_url,
                title:rowData.full_name,
            }
        });
    }

    renderRowItem(rowData,sectionID,rowID,
                  RowHighlighted) {
        return (
                <PopularItem
                    {...this.props}
                    rowData={rowData}
                    callBackItem={()=>this.callBackItemB(rowData)}
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