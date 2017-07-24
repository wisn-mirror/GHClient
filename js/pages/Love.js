import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    AsyncStorage,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
import Toast, {DURATION} from 'react-native-easy-toast';
const KEY='wisn';
export default class Love extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
    }
    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error)=>{
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_SHORT);
            }else{
                this.toast.show('save error',DURATION.LENGTH_SHORT);
            }
        })
    }
    fetchData(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error){
                if(result!=''&&result!==null){
                    this.toast.show('value:'+result,DURATION.LENGTH_SHORT);
                }else{
                    this.toast.show('value is empty',DURATION.LENGTH_SHORT);
                }
            }else{
                this.toast.show('fetchData error',DURATION.LENGTH_SHORT);

            }
        });
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show('remore success',DURATION.LENGTH_SHORT);
            }else{
                this.toast.show('remore error'+error,DURATION.LENGTH_SHORT);
            }
        })
    }
    render() {
        return (<View style={styles.container}>
            <NavigatorBar
                title="最热"
            />
            <TextInput
                style={ { borderWidth:1,borderColor:'#000',height:50}}
                onChangeText={text=>this.text=text}
            />
            <View style={{flexDirection:'row',marginTop:10, backgroundColor:'#e8e8e8',alignItems:'center',justifyContent:"space-around"}}>
                <Text style={styles.textStyle} onPress={()=>this.fetchData()}>获取</Text>
                <Text style={styles.textStyle} onPress={()=>this.onRemove()}>移除</Text>
                <Text style={styles.textStyle} onPress={()=>this.onSave()}>存储</Text>
            </View>
            <Toast  ref={toast=>this.toast=toast}/>
        </View>);
    }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
    },
    textStyle:{
        fontSize:28,
        height:50,
    }
});
module.exports = Love;