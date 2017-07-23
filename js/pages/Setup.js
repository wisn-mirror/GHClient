import React, {
    Component
} from 'react';
import {
    Navigator
} from 'react-native';

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