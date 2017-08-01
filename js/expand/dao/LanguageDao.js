import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import keys from '../../../res/data/keys.json';
import langs from '../../../res/data/langs.json';

export var  FLAG_LAGUAGE = {flag_language: 'flag_language',flag_key:'flag_keys'};
export default class DataRepository {
    constructor() {}

    fetch(flag) {
        this.flag=flag;
        return new Promise((resolve, reject) => {
            // console.log(keys);
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result !== null && result !== '') {
                         try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        //保存数据到数据库
                        // console.log("99:" + this.flag + " " + FLAG_LAGUAGE.flag_language);
                        var data = (this.flag === FLAG_LAGUAGE.flag_language ? langs : keys);
                        this.save(this.flag, data);
                        resolve(data);
                    }

                }
            })
        });

    }

    save(flag, data) {
        AsyncStorage.setItem(flag, JSON.stringify(data), (error) => {

        });
    }
}