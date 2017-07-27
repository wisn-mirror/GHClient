import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    DeviceEventEmitter,
    WebView,
} from 'react-native';

import NavigatorBar from "../component/NavigatorBar";
var github='https://www.github.com'
var WEBVIEW_REF = 'webview';
export default class WChrome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            url: github,
            title: 'CHROME',
            scalesPageToFit: true
        };
    }

    render() {
        return (<View style={styles.container}>
            <NavigatorBar
                title={this.state.title}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor: '#4862b4', barStyle: 'light-content'}}
            />
            <View style={{
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
                marginLeft: 5,
                marginRight: 5
            }}>
                <Text style={{fontSize: 18,}} onPress={() => this.goBack()}>back</Text>
                <Text style={{fontSize: 18,marginLeft:2}} onPress={() => this.goForward()
                }>fwd</Text>
                <TextInput
                    placeholder='please input url'
                    // onChange={this.handleTextInputChange}
                    onChangeText={text=>this.text=text}
                    // defaultValue={this.state.url}
                    clearButtonMode="while-editing"
                    style={{
                        flex: 1,
                        borderColor: '#000',
                        borderWidth: 0.5,
                        marginLeft: 3,
                        padding: 3,
                        marginRight: 5,
                        fontSize: 14,
                        marginRight:2,
                    }}
               />
                <Text style={{fontSize: 18}} onPress={() => this.go()
                }>Go</Text>
                <Text style={{fontSize: 18, marginLeft: 3}} onPress={() => this.reload()
                }>reload</Text>
            </View>
            <WebView
                mediaPlaybackRequiresUserAction={true}
                onError={this.onError()}
                onLoad={this.onLoad()}
                onLoadEnd={this.onLoadEnd()}
                onLoadStart={this.onLoadStart()}
                ref={WEBVIEW_REF}
                automaticallyAdjustContentInsets={false}
                style={styles.webView}
                source={{uri: this.state.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                onNavigationStateChange={this.onNavigationStateChange}

            />
        </View>);
    }
    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            title: navState.title,
            scalesPageToFit: true
        });
    };
    onError() {

    }

    onLoad() {
        //加载成功
    }

    onLoadEnd() {
        // 加载结束时（无论成功或失败）调用。

    }

    onLoadStart() {

    }
    go(){
        if(this.text===null||this.text===''||this.text===undefined){
            DeviceEventEmitter.emit("showToast",'please input url');

        }else{
            this.setState({
                url: this.text,
            });
            this.refs[WEBVIEW_REF].goForward();
        }

    }

    goBack = () => {
        if(this.state.backButtonEnabled){
            this.refs[WEBVIEW_REF].goBack();
        }else{
            DeviceEventEmitter.emit("showToast",'can not back');
        }
    };

    goForward = () => {
        if(this.state.forwardButtonEnabled){
            this.setState({
                url:this.text,
            });
            this.refs[WEBVIEW_REF].goForward();
        }else{
            DeviceEventEmitter.emit("showToast",'can not fwd');
        }

    };
    reload = () => {
        this.refs[WEBVIEW_REF].reload();
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 28,
        height: 50,
    }
});
module.exports = WChrome;