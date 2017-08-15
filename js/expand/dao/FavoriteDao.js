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
        AsyncStorage.setItem(key,value,(error)=>{
            if(!error){
                //插入成功
                updateFavoritekeys(key,true);
            }
        })
    }
    updateFavoriteKeys(key,isAdd){
        AsyncStorage.getItem(this.flag,(error,result)=>{
            if(!error){
                var data=[];
                if(result){
                    data=JSON.parse(result);
                    var index=data.indexOf(key);
                    if(isAdd){
                        data.push(key);
                    }else{
                        data.splice(index,1);
                    }
                    AsyncStorage.setItem(this.flag,JSON.stringify(data));
                }
            }
        })

    }
    getFavoriteKeys(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result));
                    }catch (e){
                        reject(e);
                    }
                }else{
                    reject(error);
                }
            })
        })
    }
    removeFavorite(key){
        AsyncStorage.removeItem(key,(error)=>{
            if(!error){
                updateFavoritekeys(key,false);
            }
        })

    }
}