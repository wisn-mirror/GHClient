import React, {
    Component
} from 'react';
// import {
//     Navigator
// } from 'react-native';
import Navigator from 'react-native-deprecated-custom-components'
// import  CustomerComponents, {Navigator}
//     from 'react-native-deprecated-custom-components';

var WelcomePage = require('./WelcomePage');
export default class setup extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
        return (
            <Navigator.Navigator
                initialRoute={{name: 'WelcomePage', component: WelcomePage,
                    props:{
                        ...this.props,
                    },
                }}
                configureScene={() => {
                    return Navigator.Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.props} navigator={navigator}/>;
                }}
            />);
    }
}
// module.exports = setup;
export {setup}
