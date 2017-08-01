import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import GitHubTrending from 'GitHubTrending';
const URL='https://github.com/trending/';
export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        this.trending=new GitHubTrending();
        this.state = {
            result: '',
        };
    }
    onLoad(){
        // var url=this.getUrl(this.text);
        this.trending.fetchTrending(URL+this.text)
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result),
                });
            }).catch(error=>{
                this.setState(
                    {
                        result:JSON.stringify(error),
                    }
                )
        } )


    }
    // getUrl(key){
    //     // Alert.alert(URL+key+SortByKey);
    //     return URL+key+SortByKey;
    // }
    render() {
        return (<View style={styles.container}>
            <NavigatorBar
                title="Profile"
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
            />
            <Text style={{fontSize: 20}} onPress={() => {
                this.onLoad()
            }}>获取数据</Text>
            <TextInput
                style={{height: 40, borderWidth: 1}}
                onChangeText={text => this.text = text}
            />
            <Text style={{flex:1}}>请求结果：{this.state.result}</Text>
        </View>);
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
module.exports = TrendingTest;