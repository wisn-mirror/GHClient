import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';
import langs from '../../../res/data/langs.json';
var  Favorite = 'Favorite_';
export default class FavoriteDao {
    constructor(flag) {
        this.flag=Favorite+flag;
    }

    saveFavorite(value,key,callback){
        console.log("saveFavorite:"+value+" "+key);
        AsyncStorage.setItem(JSON.stringify(key),JSON.stringify(value),(error)=>{
            if(!error){
                //插入成功
                this.updateFavoritekeys(JSON.stringify(key),true);
            }
        })
    }
    updateFavoritekeys(key,isAdd){
        console.log("flag:  "+this.flag);
        AsyncStorage.getItem(this.flag,(error,result)=>{
            console.log("updateFavoritekeys  "+result);
                var data=[];
                if(result){
                    data=JSON.parse(result);
                    var index=data.indexOf(key);
                    if(index===-1){
                        if(isAdd){
                            data.push(key);
                        }
                    }else{
                       if(!isAdd){
                           data.splice(index,1);
                       }
                    }
                }else{
                    if(isAdd){
                        data.push(key);
                    }
                }
            console.log(" fianl updateFavoritekeys"+ data);
            AsyncStorage.setItem(this.flag,JSON.stringify(data));
        })

    }
    getFavoriteKeys(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(!error){
                    try{
                        console.log("getFavoriteKeys :"+result);
                        if(result){
                            resolve(JSON.parse(result));
                        }else{
                            reject(error);
                        }
                    }catch (e){
                        reject(e);
                    }
                }else{
                    reject(error);
                }
            })
        })
    }
    removeFavorite(value ,key,callback){
        console.log("removeFavorite:"+value+" "+key);
        AsyncStorage.removeItem(JSON.stringify(key),(error)=>{
            if(!error){
                //移除成功
                console.log("removeFavorite success:"+value+" "+key);
                this.updateFavoritekeys(JSON.stringify(key),false);
            } 
        })

    }
    getAllItems(){
        return new Promise((resolve,reject)=>{
            this.getFavoriteKeys().then(keys=>{
                var items=[];
                if(keys){
                    AsyncStorage.multiGet(keys,(error,stores)=>{
                        try{
                            stores.map((result,i,store)=>{
                                let value=store[i][1];
                                console.log("getAllItems:"+store+value);
                                if(value){
                                    items.push(JSON.parse(value));
                                }
                            })
                            resolve(items);
                        }catch (e){
                            reject(e);
                        }
                    }) 
                }else{
                    reject(items);
                }
            })
        })
    }

}