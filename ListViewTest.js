import React, {Component} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl,
} from 'react-native';

var Evey = require('./Evey');
var NavigatorBar = require('./js/component/NavigatorBar');
import Toast, {DURATION} from 'react-native-easy-toast';

var Dimensions = require('Dimensions');
var Swidth = Dimensions.get('window').width;
export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            word: '',
            count: 0,
            dataSource: ds.cloneWithRows(data.result),
            isLoading: true,
        };
        this.RefreshData();
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'white'}}>
                <NavigatorBar
                    title={'Wisn'}
                    style={{backgroundColor: 'yellow'}}
                    statusBar={{
                        barStyle: 'light-content',
                        hidden: false,
                        backgroundColor: 'green'
                    }}
                    leftButton={
                        <Image style={{width: 22, height: 22, margin: 5}}
                               source={require('./res/images/ic_arrow_back_white_36pt.png')}/>
                    }
                    rightButton={
                        <Image style={{width: 22, height: 22, margin: 5}} source={require('./res/images/ic_star.png')}/>
                    }
                    leftButtonOnPress={() => this.callBack()}
                />
                <Text>Wisn收到Evey的:{this.state.word}+{this.state.count}</Text>
                <Text>Wisn收到Evey的:{this.state.word}+{this.state.count}</Text>
                <Text style={{color: 'red', fontSize: 20}} onPress={() => {
                    this.props.navigator.push({
                        component: Evey,
                        params: {
                            word: '送花',
                            onCallBackMessage: (word) => {
                                var sum = this.state.count + 1;
                                this.setState({
                                    word: word,
                                    count: sum,
                                })
                            }
                        }
                    })
                }}>送花</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,
                                sectionID,
                                rowID, Highlighted) => this.renderRowItem(rowData,
                        sectionID,
                        rowID, Highlighted)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.RefreshData()}
                        />
                    }
                    style={{width: Swidth}}
                />
                <Toast ref={toast => {
                    this.toast = toast
                }}/>
            </View>
        );
    }

    RefreshData() {
        // Alert.alert("refresh",'REFRESH');
        setTimeout(() => {
            this.setState({
                isLoading:false,
            })
        }, 3000);
    }

    callBack() {
        Alert.alert("回调", "回调");
    }

    renderFooter() {
        return <Image style={{width: 100, height: 100}}
                      source={{uri: 'https://avatars1.githubusercontent.com/u/10184291?v=4&u=6bcb2b4b6beb4ecc6b1d55a4fbb55afa0863f715&s=400'}}/>
    }

    renderRowItem(rowData,
                  sectionID,
                  rowID, Highlighted) {
        return <View
            style={{flexDirection: 'column', height: 80}}>
            <TouchableOpacity onPress={() => {
                this.toast.show('click' + rowData.name, DURATION.LENGTH_SHORT)
                }
            }>
                <Text>{rowData.name}</Text><Text>{rowData.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={{backgroundColor: 'red', height: 1}}/>
    }
}
module.exports = ListViewTest;
var data = {
    'result': [
        {
            "name": 'Wisn1',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn3',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn31',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn13',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn3',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn31',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn13',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn3',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn31',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn13',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn3',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn31',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn13',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn132',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn1322',
            "email": 'wuyishun_kmk@outlook.com'
        }, {
            "name": 'Wisn144',
            "email": 'wuyishun_kmk@outlook.com'
        },
    ]
}