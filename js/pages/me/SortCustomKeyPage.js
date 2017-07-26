import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    TouchableHighlight,
} from 'react-native';

import NavigatorBar from "../../component/NavigatorBar";
import LanguageDao, {FLAG_LAGUAGE} from '../../expand/dao/LanguageDao';
import SortableListView from 'react-native-sortable-listview'

var Dimensions = require('Dimensions');
var Swidth = Dimensions.get('window').width;
export default class SortCustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LAGUAGE.flag_language);
        this.changeData = [];
        this.state = {
            ArrayData: [],
        };
    }

    componentDidMount() {
        this.LanguageDao.fetch(FLAG_LAGUAGE.flag_language)
            .then(result1 => {
                this.filterKey(result1);
            }).catch(error => {
            this.setState({
                ArrayData: error,
            });
        })
    }

    filterKey(result) {
        var temp = [];
        for (var i = 0, len = result.length; i < len; i++) {
            var item = result[i];
            if (item.checked) {
                temp.push(item);
                this.changeData.push(item);
            }
        }
        this.setState({
            ArrayData: temp,
        });
        console.log("length" + this.state.ArrayData.length)
    }

    render() {
        return (<View style={{flexDirection: 'column', flex: 1}}>
            <NavigatorBar
                title="标签排序"
                titleStyle={{color: 'white'}}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                leftButton={
                    <Image style={{width: 22, height: 22, margin: 5}}
                           source={require('../../../res/images/ic_arrow_back_white_36pt.png')}/>
                }
                rightButton={
                    <Text style={{color: 'white', marginRight: 5, fontSize: 16}}>保存</Text>
                }
                leftButtonOnPress={() => this.leftButtonOnPress()}
                rightButtonOnPress={() => this.RightButtonOnPress()}

            />
            <SortableListView
                style={{flex: 1}}
                data={this.state.ArrayData}
                order={Object.keys(this.state.ArrayData)}
                onRowMoved={e => {
                    this.state.ArrayData.splice(e.to, 0, this.state.ArrayData.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortItem data={row}/>}
            />
        </View>)
    }


    RightButtonOnPress() {
        console.log("save:" + this.changeData.length);
        if (this.changeData.length === 0) {
            this.props.navigator.pop();
        } else {
            this.LanguageDao.save(FLAG_LAGUAGE.flag_language, this.state.data);
        }
    }

    leftButtonOnPress() {
        if (this.changeData.length === 0) {
            this.props.navigator.pop();
        } else {
            Alert.alert(
                '保存标签',
                '退出需要保存标签吗？',
                [
                    {
                        text: '保存退出', onPress: () => {
                        this.LanguageDao.save(FLAG_LAGUAGE.flag_language, this.state.data);
                        this.props.navigator.pop();
                    }
                    },
                    {
                        text: '不保存退出', onPress: () => {
                        this.props.navigator.pop();
                    }, style: 'cancel'
                    },
                ],
                {cancelable: false}
            )


        }
    }
}

class SortItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                style={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                }}
                {...this.props.sortHandlers}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{tintColor:'#648dff'}} source={require('../../../res/images/ic_sort.png')}/>
                    <Text style={{marginLeft:10,}}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

});
module.exports = SortCustomKeyPage;