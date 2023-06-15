import React from 'react'
import {SafeAreaView, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'

import {LANGUAGE, setDataLocal} from 'utils'
import {gstyles} from 'utils/styles'

import {TextView} from 'components'
import CustomToast, {toast} from 'components/CustomToast'

import {IconArrowBack, IconEngland, IconIndonesia} from 'assets/img'

const Setting = ({navigation: {navigate, goBack}, route}) => {
  const {t, i18n} = useTranslation()

  const changeLang = async lang => {
    i18n.changeLanguage(lang)
    toast.show({
      type: 'postrToast',
      props: {
        title: t('success'),
        desc: lang === 'idn' ? t('change-indonesia') : t('change-english'),
      },
      position: 'bottom',
    })
    await setDataLocal(LANGUAGE, lang)
  }

  return (
    <SafeAreaView className="flex-1">
      <CustomToast />
      <View className="px-4">
        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={() => goBack()}>
            <IconArrowBack />
          </TouchableOpacity>
          <TextView
            customClass="text-[20px] ml-4 font-bold"
            content={t('setting')}
          />
        </View>

        <View className="flex flex-col mt-4">
          <TextView
            content={t('choose-language')}
            customClass="text-[22px] mb-4"
            customStyle={gstyles.typefaceBold}
          />
          <View className="flex flex-row gap-4">
            <IconIndonesia
              width={50}
              height={50}
              onPress={() => changeLang('idn')}
            />
            <IconEngland
              width={50}
              height={50}
              onPress={() => changeLang('en')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Setting
