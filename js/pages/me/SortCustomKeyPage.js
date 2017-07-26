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
import Toast, {DURATION} from 'react-native-easy-toast';

var Dimensions = require('Dimensions');
var Swidth = Dimensions.get('window').width;
export default class SortCustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LAGUAGE.flag_language);
        this.OldArray=[];
        this.ResultArray=[];
        this.ChangeBeforData = [];
        this.state = {
            ChangeArrayData: [],
        };
    }

    componentDidMount() {
        this.LanguageDao.fetch(FLAG_LAGUAGE.flag_language)
            .then(result1 => {
                this.filterKey(result1);
            }).catch(error => {
            this.setState({
                ChangeArrayData: error,
            });
        })
    }

    filterKey(result) {
        this.OldArray=this.copyArray(result);
        this.ResultArray=this.copyArray(this.OldArray);
        var temp = [];
        for (var i = 0, len = result.length; i < len; i++) {
            var item = result[i];
            if (item.checked) {
                temp.push(item);
                this.ChangeBeforData.push(item);
            }
        }
        this.setState({
            ChangeArrayData: temp,
        });
        // console.log("length" + this.state.ChangeArrayData.length)
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
                data={this.state.ChangeArrayData}
                order={Object.keys(this.state.ChangeArrayData)}
                onRowMoved={e => {
                    this.state.ChangeArrayData.splice(e.to, 0, this.state.ChangeArrayData.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortItem data={row}/>}
            />
            <Toast  ref={toast=>this.toast=toast}/>
        </View>)
    }


    RightButtonOnPress() {
        if(!this.isEquals(this.ChangeBeforData,this.state.ChangeArrayData)){
            this.saveData();
            this.toast.show('保存成功',DURATION.LENGTH_SHORT);
            this.ChangeBeforData=this.copyArray(this.state.ChangeArrayData);
        }else{
            this.toast.show("未修改任何数据",DURATION.LENGTH_SHORT);
        }
    }

    leftButtonOnPress() {
        if(!this.isEquals(this.ChangeBeforData,this.state.ChangeArrayData)){
            Alert.alert(
                '保存标签',
                '退出需要保存标签吗？',
                [
                    {
                        text: '保存退出', onPress: () => {
                        this.saveData();
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
        }else{
            this.props.navigator.pop();
        }
    }
    saveData(){
        for(var i=0,len=this.ChangeBeforData.length; i<len; i++){
            var item=this.ChangeBeforData[i];
            var index=this.OldArray.indexOf(item);
            this.ResultArray.splice(index,1,this.state.ChangeArrayData[i])
        }
        this.LanguageDao.save(FLAG_LAGUAGE.flag_language,this.ResultArray );

    }
    /**
     * 比较两个集合是否相等
     * @param data1
     * @param data2
     * @returns {boolean}
     */
    isEquals(data1,data2){
        if(data1.length!==data2.length||data1===null||data2===null){
            return false ;
        }
        for(var i=0,len=data1.length;i<len;i++){
            if(data1[i]!==data2[i]){
                return false;
            }
        }
        return true;
    }
    copyArray(data1){
        if(data1===null){
            return [];
        }
        var data2=[];
        for(var i=0,len=data1.length;i<len;i++){
            data2.push(data1[i]);
        }
        return data2;
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

module.exports = SortCustomKeyPage;