import React, {
    Component
} from 'react';
import {
    View,
    StyleSheet,
    DeviceEventEmitter,
    WebView,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';

import NavigatorBar from "../../component/NavigatorBar";
import FavoriteDao from "../../expand/dao/FavoriteDao"
var github = 'https://www.github.com'
var WEBVIEW_REF = 'webview';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.URl = github;
        this.favoriteDao=new FavoriteDao(this.props.flag);
        // rowData:rowData,
            this.state = {
            isLoadFinsh: false,
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            url: this.props.html_url,
            title: this.props.title,
            scalesPageToFit: true,
            isChecked: this.props.isFavorite,
            iconStart: this.props.isFavorite ? require("../../../res/images/ic_unstar_navbar.png")
                : require("../../../res/images/ic_unstar_transparent.png"),
        };
    }

    leftButtonOnPress() {
        if (this.state.backButtonEnabled) {
            this.refs[WEBVIEW_REF].goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    RightButtonOnPress() {

    }

    onPressShare() {
        Alert.alert("share")
    }
    onFavorite(){
        this.changeStatus(!this.state.isChecked);
        var identify="keys";
        if(this.props.flag==="keys"){
            identify=this.props.rowData.item.id;
        }else {
            identify=this.props.rowData.item.contributorsUrl;
        }
        if(!this.state.isChecked){
            this.favoriteDao.saveFavorite(this.props.rowData.item,identify,null);
        }else{
            this.favoriteDao.removeFavorite(this.props.rowData.item,identify,null);
        }
    }

    changeStatus(isCheck){
        this.setState({
            isChecked:isCheck,
            iconStart:isCheck? require("../../../res/images/ic_unstar_navbar.png")
                :require("../../../res/images/ic_unstar_transparent.png"),
        });
    }
    getRightView() {
        return <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity onPress={() => this.onPressShare()}>
                <Image
                       style={{width: 22, height: 22, padding: 5, tintColor: "white",marginRight:10}}
                       source={require('../../../res/images/ic_share.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onFavorite()}>
                <Image style={{width: 22, height: 22, padding: 5, tintColor: "white",marginRight:8}}
                       source={this.state.iconStart}/>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (<View style={styles.container}>
            <NavigatorBar
                title={this.state.title}
                style={{backgroundColor: '#5b7ee5'}}
                statusBarOutViewStyle={{backgroundColor: '#4862b4'}}
                titleStyle={{color: 'white'}}
                statusBar={{backgroundColor: '#4862b4', barStyle: 'light-content'}}
                leftButton={
                    <Image style={{width: 22, height: 22, margin: 5}}
                           source={require('../../../res/images/ic_arrow_back_white_36pt.png')}/>
                }
                rightButton={
                    this.getRightView()
                }
                leftButtonOnPress={() => this.leftButtonOnPress()}
               /* rightButtonOnPress={() => this.RightButtonOnPress()}*/
            />
            {/* <View style={{
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
            </View>*/}
            <WebView
                mediaPlaybackRequiresUserAction={false}
                onError={() => this.onError()}
                onLoad={() => this.onLoad()}
                onLoadEnd={() => this.onLoadEnd()}
                onLoadStart={() => this.onLoadStart()}
                ref={WEBVIEW_REF}
                source={{uri: this.state.url}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate="normal"
                onNavigationStateChange={this.onNavigationStateChange}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />
        </View>);
    }

    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
        })
        this.titleName = navState.title;

    }
    /*onShouldStartLoadWithRequest() {

        return true;
    }*/

    onError() {
        DeviceEventEmitter.emit("showToast", 'onError');

    }

    onLoad() {
        //加载成功
        DeviceEventEmitter.emit("showToast", 'onLoad');
    }

    onLoadEnd() {
        // 加载结束时（无论成功或失败）调用。
        DeviceEventEmitter.emit("showToast", 'onLoadEnd');

    }

    onLoadStart() {
        DeviceEventEmitter.emit("showToast", 'onLoadStart');

    }

    go() {
        if (this.text === null || this.text === '' || this.text === undefined) {
            DeviceEventEmitter.emit("showToast", 'please input url');

        } else {
            this.setState({
                url: this.text,
            });
            this.refs[WEBVIEW_REF].goForward();
        }

    }

    goBack = () => {
        if (this.state.backButtonEnabled) {
            this.refs[WEBVIEW_REF].goBack();
        } else {
            DeviceEventEmitter.emit("showToast", 'can not back');
        }
    };

    goForward = () => {
        if (this.state.forwardButtonEnabled) {
            this.setState({
                url: this.text,
            });
            this.refs[WEBVIEW_REF].goForward();
        } else {
            DeviceEventEmitter.emit("showToast", 'can not fwd');
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