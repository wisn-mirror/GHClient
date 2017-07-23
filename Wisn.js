import React,{Component} from 'react';
import {
    View,
    Text,
    Alert,
}from 'react-native';
var Evey=require('./Evey')
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
          <View style={{flex:1,flexDirection:'column',justifyContent:'center', alignItems:'center',backgroundColor:'white'}}>
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
}
module.exports=Wisn;