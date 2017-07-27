import React, {
    Component
} from 'react';
// import {
//     Navigator
// } from 'react-native';
//import Navigator from 'react-native-deprecated-custom-components'
import  CustomerComponents, {Navigator}
    from 'react-native-deprecated-custom-components';

var WelcomePage = require('./WelcomePage');
export default class setup extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{name: 'WelcomePage', component: WelcomePage}}
                configureScene={() => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}

                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.wisn} navigator={navigator}/>;
                }}
            />);
    }
}
// module.exports = setup;
export {setup}