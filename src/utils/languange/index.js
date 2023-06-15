import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import * as RNLocalize from 'react-native-localize'
import english from './en.json'
import indonesia from './idn.json'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    return callback(RNLocalize.getLocales()[0].languageCode)
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

const i18n = i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en: english,
    idn: indonesia,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
