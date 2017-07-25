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
} from 'react-native';

import NavigatorBar from "../../component/NavigatorBar";
import LanguageDao from '../../expand/dao/LanguageDao';

export var FLAG_LAGUAGE = {flag_language: 'flag_language'};
import CheckBox from 'react-native-check-box';
import WCheckBox from '../../component/WCheckBox';

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LAGUAGE.flag_language);
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
        return (<View>
            <NavigatorBar
                title="标签"
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
            <ScrollView>
                <Text style={{height: 200}}>数据：{
                    JSON.stringify(this.state.data)}</Text>
                {this.renderRowView()}
            </ScrollView>
        </View>)
    }

    leftButtonOnPress() {
        this.props.navigator.pop();
    }
    renderRowView(){
        var views=[];
        var alldata=JSON.parse(this.state.data);
        for(var i=0;i<alldata.length-2;i=i+2){
            console.log('data'+alldata[i])
            views.push(<View key={i} style={{flexDirection:'row',marginTop:10,backgroundColor:'white',justifyContent:'space-between'}} >
                {/*<Text>{alldata[i].name}</Text>
                <Text>{alldata[i+1].name}</Text>*/}
                {this.renderCheckBox(alldata[i])}
                {this.renderCheckBox(alldata[i+1])}
            </View>)
        }
       /* if((alldata.length%2)===1){
            //jishu
        }else{
            views.push(<View key={} style={{flexDirection:'row',marginTop:10,backgroundColor:'white',justifyContent:'space-between'}} >
                {/!*<Text>{alldata[i].name}</Text>
                <Text>{alldata[i+1].name}</Text>*!/}
                {this.renderCheckBox(alldata[i])}
                {this.renderCheckBox(alldata[i+1])}
            </View>)
        }*/
        return views;
    }
    renderCheckBox(item) {
        var name = 'aaa';
        return (
            <WCheckBox
                style={{flex: 1}}
                onClick={(isCheck) => this.checkBoxOnClick(isCheck)}
                isChecked={false}
                leftText={item.name}
                checkedImage={<Image
                    source={require('../../../res/images/ic_check_box.png')}
                />}
                unCheckedImage={<Image
                    source={require('../../../res/images/ic_check_box_outline_blank.png')}
                />}
            />
        );
    }

    RightButtonOnPress() {
        Alert.alert('回调',
            'SAVE');

    }
    checkBoxOnClick(isCheck) {
        console.log("FINAL:"+isCheck);
        // Alert.alert('回调',
        //     isCheck);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});
module.exports = CustomKeyPage;