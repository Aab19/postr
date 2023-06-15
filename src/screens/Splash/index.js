import React, {useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'

import {LogoSplash} from 'assets/img'

const Splash = ({navigation: {replace}}) => {
  useEffect(() => {
    setTimeout(async () => {
      replace('Tab')
    }, 2000)
  }, [])

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full justify-center items-center">
        <LogoSplash width={125} height={125} />
      </View>
    </SafeAreaView>
  )
}

export default Splash
