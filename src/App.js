import React, {useEffect, useState} from 'react'
import {LogBox} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Provider} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'
import {PersistGate} from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'

import Store from './store/store'
import Router from 'routes'
import {LANGUAGE, getDataLocal} from 'utils'

const App = () => {
  const {i18n} = useTranslation()
  const {store, persister} = Store()
  const [connectionStatus, setConnectionStatus] = useState(null)

  LogBox.ignoreAllLogs()

  useEffect(() => {
    setTimeout(async () => {
      let lang = 'en'
      let storage = await getDataLocal(LANGUAGE, true)
      if (storage != null) {
        i18n.changeLanguage(storage)
      } else {
        i18n.changeLanguage(lang)
      }
    }, 1)

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer>
          <Router connectionStatus={connectionStatus} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
