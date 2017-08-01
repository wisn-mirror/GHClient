import React, {Component} from 'react';
import {
    AsyncStorage,
    DeviceEventEmitter,
} from 'react-native';

export default class DataRepository {
    fetchResponsitory(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalResponsitory(url)
                .then(result => {
                    var dataTemp= JSON.parse(result);
                    if (result&&this.checkDataTime(dataTemp.updateTime)) {
                        resolve(dataTemp.data);
                        DeviceEventEmitter.emit("showToast", '本地缓存！');
                    } else {
                        this.fetchNetRepository(url)
                            .then(result => {
                                resolve(result)
                            }).catch(e => {
                            reject(e);
                        })
                    }
                }).catch(e => {
                //本地数据异常
                this.fetchNetRepository(url)
                    .then(result => {
                        resolve(result)
                    }).catch(e => {
                    reject(e);
                })
            })
        })
    }

    fetchLocalResponsitory(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    if(!result){
                        reject(new Error("data is null"));
                        return ;
                    }
                    DeviceEventEmitter.emit("showToast", '网络数据！');
                    this.saveRepository(url,result,(error)=>{
                        console.log("保存网络数据到本地数据！")
                    });
                    resolve(result);

                })
                .catch(error => {
                    reject(error);
                })
        });
    }
    saveRepository(url,result, callback){
        if(!url||!result)return ;
        let dataTemple={data:result,updateTime:new Date().getTime()}
        AsyncStorage.setItem(url,JSON.stringify(dataTemple),callback);
    }
    checkDataTime(longTime){
        let nowData=new Date();
        let lastData=new Date();
        lastData.setTime(longTime);
        DeviceEventEmitter.emit("checkDataTime", nowData.getTime()+" "+lastData.getTime());
        if(nowData.getYear()!==lastData.getYear())return false;
        if(nowData.getMonth()!==lastData.getMonth())return false;
        if(nowData.getDay()!==lastData.getDay())return false;
        if((nowData.getHours()-lastData.getHours())>4)return false;
        return true;
    }

}