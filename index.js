/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import i18n from './src/utils/languange/index'

AppRegistry.registerComponent(appName, () => App)
