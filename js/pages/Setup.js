import React, {
    Component
} from 'react';
// import {
//     Navigator
// } from 'react-native';
import {Navigator}
    from 'react-native-deprecated-custom-components'
var WelcomePage = require('./WelcomePage');

function setup() {
    class Root extends Component {
        render() {
            return <Navigator
                initialRoute={{
                    component: WelcomePage,
                }
                }
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route} navigator={navigator}/>
                }
                }
            />
        }
    }
    return <Root/>
}
module.exports = setup;