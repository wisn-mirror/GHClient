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
    DeviceEventEmitter
} from 'react-native';

import NavigatorBar from "../../component/NavigatorBar";
import LanguageDao, {FLAG_LAGUAGE} from '../../expand/dao/LanguageDao';
import Toast, {DURATION} from 'react-native-easy-toast';

import CheckBox from 'react-native-check-box';
import WCheckBox from '../../component/WCheckBox';

var Dimensions = require('Dimensions');
var Swidth = Dimensions.get('window').width;
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.isRemoveKey=this.props.isRemoveKeyValue;
        this.LanguageDao = new LanguageDao();
        this.ChangeBeforData = [];
        this.RemoveArray = [];
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.LanguageDao.fetch(FLAG_LAGUAGE.flag_language)
            .then(result1 => {
                this.setState({
                    data: result1,
                });
            }).catch(error => {
            this.setState({
                data: error,
            });
        })
    }

    render() {
        let titleName = this.isRemoveKey ? '标签移除' : '自定义标签';
        let rightTitle = this.isRemoveKey ? '移除':'保存';
        return (<View style={{flexDirection: 'column', flex: 1}}>
            <NavigatorBar
                title={titleName}
                titleStyle={{color: 'white'}}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                leftButton={
                    <Image style={{width: 22, height: 22, margin: 5}}
                           source={require('../../../res/images/ic_arrow_back_white_36pt.png')}/>
                }
                rightButton={
                    <Text style={{color: 'white', marginRight: 5, fontSize: 16}}>{rightTitle}</Text>
                }
                leftButtonOnPress={() => this.leftButtonOnPress()}
                rightButtonOnPress={() => this.RightButtonOnPress()}

            />
            <ScrollView style={{backgroundColor: 'white',}}>
                {this.renderRowView()}
            </ScrollView>
        </View>)
    }

    renderRowView() {
        var views = [];
        if (this.state.data !== null && this.state.data !== null && this.state.data.length !== 0) {
            var alldata = this.state.data;
            if ((alldata.length % 2) === 1) {
                for (var i = 0, len = alldata.length - 1; i < len; i = i + 2) {
                    views.push(<View key={i} style={styles.keyItemStyle}>
                        {this.renderCheckBox(alldata[i])}
                        {this.renderCheckBox(alldata[i + 1])}
                    </View>)
                }
                var object = alldata[alldata.length - 1];
                views.push(<View key={alldata.length + 2} style={styles.keyItemStyleSingle}>
                    {this.renderCheckBox(object)}
                </View>);
            } else {
                for (var i = 0, len = alldata.length; i < len; i = i + 2) {
                    views.push(<View key={i} style={styles.keyItemStyle}>
                        {this.renderCheckBox(alldata[i])}
                        {this.renderCheckBox(alldata[i + 1])}
                    </View>)
                }
            }
            return views;
        }
    }

    renderCheckBox(item) {
        return (
            <WCheckBox
                style={{flexDirection: 'row', backgroundColor: 'white', flex: 1, marginRight: 10, marginLeft: 10}}
                onClick={(isCheck) => this.checkBoxOnClick(item, isCheck)}
                isChecked={this.isRemoveKey ? false : item.checked}
                leftText={item.name}
                checkedImage={<Image
                    style={{tintColor: '#5b7ee5'}}
                    source={require('../../../res/images/ic_check_box.png')}
                />}
                unCheckedImage={<Image
                    style={{tintColor: '#5b7ee5'}}
                    source={require('../../../res/images/ic_check_box_outline_blank.png')}
                />}
            />
        );
    }

    RightButtonOnPress() {
        if (this.isRemoveKey) {
            if (this.RemoveArray.length === 0) {
                DeviceEventEmitter.emit("showToast",'未选中任何数据');
            } else {
                this.removeData();
            }
        } else {
            if (this.ChangeBeforData.length !== 0) {
                this.LanguageDao.save(FLAG_LAGUAGE.flag_language, this.state.data);
                DeviceEventEmitter.emit("showToast",'保存成功');
                this.ChangeBeforData.length = 0;
            } else {
                DeviceEventEmitter.emit("showToast",'未修改任何数据');

            }
        }
    }

    removeData() {
        for (var i = 0, len = this.RemoveArray.length; i < len; i++) {
            var item = this.RemoveArray[i];
            var index = this.state.data.indexOf(item);
            this.state.data.splice(index, 1);
        }
        this.LanguageDao.save(FLAG_LAGUAGE.flag_language, this.state.data);
        this.RemoveArray.length = 0;
        DeviceEventEmitter.emit("showToast",'移除成功');
    }

    leftButtonOnPress() {

        if (this.isRemoveKey) {
            if (this.RemoveArray.length > 0) {
                Alert.alert(
                    '移除标签',
                    '退出需要移除标签吗？',
                    [
                        {
                            text: '移除并退出', onPress: () => {
                            this.removeData();
                            this.props.navigator.pop();
                        }
                        },
                        {
                            text: '不移除并退出', onPress: () => {
                            this.props.navigator.pop();
                        }, style: 'cancel'
                        },
                    ],
                    {cancelable: false}
                )
            } else {
                this.props.navigator.pop();
            }
        } else {
            if (this.ChangeBeforData.length === 0) {
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

    checkBoxOnClick(item, isCheck) {
        if (this.isRemoveKey) {
            if (isCheck) {
                this.RemoveArray.push(item);
            } else {
                var index = this.RemoveArray.indexOf(item);
                this.RemoveArray.splice(index, 1);
            }
        } else {
            item.checked = isCheck;
            for (var i = 0, len = this.ChangeBeforData.length; i < len; i++) {
                var temp = this.ChangeBeforData[i];
                if (temp === item) {
                    //移除数组中的元素
                    this.ChangeBeforData.splice(i, 1);
                    return;
                }
            }
            this.ChangeBeforData.push(item);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    keyItemStyle: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingBottom: 1,
        borderBottomColor: '#64a1ea',
    },
    keyItemStyleSingle: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingRight: 0.5 * Swidth,
        borderBottomWidth: 0.5,
        paddingBottom: 1,
        borderBottomColor: '#64a1ea',

    }
});
module.exports = CustomKeyPage;