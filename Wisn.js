import React,{Component} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    Image,
}from 'react-native';
var Evey=require('./Evey');
var NavigatorBar=require('./js/component/NavigatorBar');
export default class Wisn extends Component{
  constructor(props) {
    super(props);
    this.state = {
        word:'',
        count:0,
    };
  }
  render(){
      return (
          <View style={{flex:1,flexDirection:'column', alignItems:'center',backgroundColor:'white'}}>
              <NavigatorBar
                  title={'Wisn'}
                  style={{backgroundColor:'yellow'}}
                  statusBar={{
                      barStyle:'light-content',
                      hidden:false,
                      backgroundColor:'green'
                  }}
                  leftButton={
                          <Image style={{width:22,height:22,margin:5}} source={require('./res/images/ic_arrow_back_white_36pt.png')}/>
                  }
                  rightButton={
                          <Image  style={{width:22,height:22,margin:5}} source={require('./res/images/ic_star.png')}/>
                  }
                  leftButtonOnPress={()=>this.callBack()}
              />
              <Text>Wisn收到Evey的:{this.state.word}+{this.state.count}</Text>
            <Text style={{color:'red' ,fontSize:20}} onPress={()=>{
                this.props.navigator.push({
                    component:Evey,
                    params:{
                        word:'送花',
                        onCallBackMessage:(word)=>{
                            var sum=this.state.count+1;
                            this.setState({
                                word:word,
                                count:sum,
                            })
                        }
                    }
                })
            }}>送花</Text>
          </View>
      );
  }
  callBack(){
      Alert.alert("回调","回调");
  }
}
module.exports=Wisn;